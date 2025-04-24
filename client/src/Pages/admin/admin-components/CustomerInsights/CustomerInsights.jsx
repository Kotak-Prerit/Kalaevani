import React, { useEffect, useState, useCallback } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement
} from 'chart.js';
import { useSelector, useDispatch } from 'react-redux';
import { getAllOrders } from '../../../../actions/orderAction';
import { getAllUsers } from '../../../../actions/userAction';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement
);

const CustomerInsights = () => {
    const dispatch = useDispatch();
    const { orders, loading: ordersLoading } = useSelector((state) => state.allOrders);
    const { users, loading: usersLoading } = useSelector((state) => state.allUsers);

    const [customerMetrics, setCustomerMetrics] = useState({
        totalCustomers: 0,
        newCustomers: 0,
        repeatCustomers: 0,
        averageOrderValue: 0,
        monthlyGrowth: [],
    });

    useEffect(() => {
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    }, [dispatch]);

    const calculateCustomerMetrics = useCallback(() => {
        try {
            // Count orders per customer
            const customerOrders = {};
            orders.forEach(order => {
                customerOrders[order.user] = (customerOrders[order.user] || 0) + 1;
            });

            // Calculate repeat customers (customers with more than 1 order)
            const repeatCustomers = Object.values(customerOrders).filter(count => count > 1).length;

            // Calculate average order value
            const totalOrderValue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
            const averageOrderValue = orders.length ? totalOrderValue / orders.length : 0;

            // Calculate monthly growth
            const last6Months = Array.from({ length: 6 }, (_, i) => {
                const date = new Date();
                date.setMonth(date.getMonth() - i);
                return date;
            }).reverse();

            const monthlyGrowth = last6Months.map(date => {
                const month = date.getMonth();
                const year = date.getFullYear();
                return users.filter(user => {
                    const userDate = new Date(user.createdAt);
                    return userDate.getMonth() === month && userDate.getFullYear() === year;
                }).length;
            });

            setCustomerMetrics({
                totalCustomers: users.length,
                newCustomers: users.filter(user =>
                    new Date(user.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                ).length,
                repeatCustomers,
                averageOrderValue: averageOrderValue.toFixed(2),
                monthlyGrowth,
            });
        } catch (error) {
            console.error('Error calculating metrics:', error);
        }
    }, [orders, users]);

    useEffect(() => {
        if (orders && users) {
            calculateCustomerMetrics();
        }
    }, [orders, users, calculateCustomerMetrics]);

    // Customer Growth Chart Data
    const customerGrowthData = {
        labels: Array.from({ length: 6 }, (_, i) => {
            const date = new Date();
            date.setMonth(date.getMonth() - 5 + i);
            return date.toLocaleDateString('en-US', { month: 'short' });
        }),
        datasets: [
            {
                label: 'New Customers',
                data: customerMetrics.monthlyGrowth,
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                tension: 0.4,
                fill: true,
            },
        ],
    };

    // Customer Segmentation Chart Data
    const customerSegmentationData = {
        labels: ['New Customers', 'Repeat Customers', 'Inactive Customers'],
        datasets: [
            {
                data: [
                    customerMetrics.newCustomers,
                    customerMetrics.repeatCustomers,
                    customerMetrics.totalCustomers - (customerMetrics.newCustomers + customerMetrics.repeatCustomers)
                ],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(249, 115, 22, 0.8)',
                ],
                borderColor: [
                    'rgba(16, 185, 129, 1)',
                    'rgba(99, 102, 241, 1)',
                    'rgba(249, 115, 22, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // Order Value Distribution Chart Data
    const orderValueData = {
        labels: ['0-500', '501-1000', '1001-2000', '2000+'],
        datasets: [
            {
                label: 'Order Value Distribution',
                data: orders ? orders.reduce((acc, order) => {
                    if (order.totalPrice <= 500) acc[0]++;
                    else if (order.totalPrice <= 1000) acc[1]++;
                    else if (order.totalPrice <= 2000) acc[2]++;
                    else acc[3]++;
                    return acc;
                }, [0, 0, 0, 0]) : [0, 0, 0, 0],
                backgroundColor: 'rgba(99, 102, 241, 0.8)',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#ffffff',
                    font: {
                        size: 12,
                        family: "'Poppins', sans-serif"
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleFont: {
                    size: 14,
                    family: "'Poppins', sans-serif"
                },
                bodyFont: {
                    size: 13,
                    family: "'Poppins', sans-serif"
                },
                padding: 12,
                callbacks: {
                    label: function (context) {
                        const label = context.dataset.label || '';
                        const value = context.parsed.y || 0;
                        return `${label}: ${value}`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: '#4a4a4a',
                    borderDash: [5, 5],
                },
                ticks: {
                    color: '#ffffff',
                    font: {
                        size: 12,
                        family: "'Poppins', sans-serif"
                    }
                }
            },
            y: {
                grid: {
                    color: '#4a4a4a',
                    borderDash: [5, 5],
                },
                ticks: {
                    color: '#ffffff',
                    font: {
                        size: 12,
                        family: "'Poppins', sans-serif"
                    },
                    callback: function (value) {
                        return Math.round(value);
                    }
                },
                beginAtZero: true
            }
        }
    };

    if (ordersLoading || usersLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#131417]">
                <div className="text-white text-xl">Loading analytics...</div>
            </div>
        );
    }

    return (
        <div className="p-8 text-white bg-[#131417] min-h-screen">
            <h2 className="text-3xl font-medium mb-8 poppins">Customer Insights</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#1e1f26] border border-[#484848] rounded-lg p-6 transition-transform duration-200 hover:-translate-y-1">
                    <h3 className="text-gray-400 text-sm mb-2 poppins">Total Customers</h3>
                    <p className="text-2xl font-semibold">{customerMetrics.totalCustomers}</p>
                </div>
                <div className="bg-[#1e1f26] border border-[#484848] rounded-lg p-6 transition-transform duration-200 hover:-translate-y-1">
                    <h3 className="text-gray-400 text-sm mb-2 poppins">New Customers (30d)</h3>
                    <p className="text-2xl font-semibold">{customerMetrics.newCustomers}</p>
                </div>
                <div className="bg-[#1e1f26] border border-[#484848] rounded-lg p-6 transition-transform duration-200 hover:-translate-y-1">
                    <h3 className="text-gray-400 text-sm mb-2 poppins">Repeat Customers</h3>
                    <p className="text-2xl font-semibold">{customerMetrics.repeatCustomers}</p>
                </div>
                <div className="bg-[#1e1f26] border border-[#484848] rounded-lg p-6 transition-transform duration-200 hover:-translate-y-1">
                    <h3 className="text-gray-400 text-sm mb-2 poppins">Avg. Order Value</h3>
                    <p className="text-2xl font-semibold">₹{customerMetrics.averageOrderValue}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#1e1f26] border border-[#484848] rounded-lg p-6">
                    <h3 className="text-gray-400 text-lg mb-6 poppins">Customer Growth Trend</h3>
                    <div className="h-[300px]">
                        <Line data={customerGrowthData} options={chartOptions} />
                    </div>
                </div>

                <div className="bg-[#1e1f26] border border-[#484848] rounded-lg p-6">
                    <h3 className="text-gray-400 text-lg mb-6 poppins">Customer Segmentation</h3>
                    <div className="h-[300px]">
                        <Doughnut
                            data={customerSegmentationData}
                            options={{
                                ...chartOptions,
                                cutout: '60%'
                            }}
                        />
                    </div>
                </div>

                <div className="bg-[#1e1f26] border border-[#484848] rounded-lg p-6 lg:col-span-2">
                    <h3 className="text-gray-400 text-lg mb-6 poppins">Order Value Distribution</h3>
                    <div className="h-[300px]">
                        <Bar data={orderValueData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerInsights;