import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale,
  Legend,
  Title,
  Tooltip,
  Filler
} from "chart.js";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders } from "../../../../actions/orderAction";

ChartJS.register(
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale,
  Legend,
  Title,
  Tooltip,
  Filler
);

const LineGraph = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.allOrders);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const generateDatesArray = (startDate) => {
    const result = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      result.push({
        dateString: `${day}-${month}-${year}`,
        date: date
      });
    }
    return result;
  };

  const today = new Date();
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  startOfDay.setDate(startOfDay.getDate() - 6);
  const datesArray = generateDatesArray(startOfDay);

  // Calculate daily sales
  const dailySales = datesArray.map(({ dateString, date }) => {
    if (!orders) return { date: dateString, amount: 0 };

    const dayStart = new Date(date);
    const dayEnd = new Date(date);
    dayEnd.setDate(dayEnd.getDate() + 1);

    const dayOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= dayStart && orderDate < dayEnd;
    });

    const daySales = dayOrders.reduce((total, order) => total + order.totalPrice, 0);
    return {
      date: dateString,
      amount: daySales
    };
  });

  const LineChartData = {
    labels: dailySales.map(day => day.date),
    datasets: [
      {
        label: "Daily Sales (₹)",
        data: dailySales.map(day => day.amount),
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#10B981",
        pointBorderColor: "#ffffff",
        pointHoverBackgroundColor: "#ffffff",
        pointHoverBorderColor: "#10B981",
        pointRadius: 4,
        pointHoverRadius: 6
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ffffff",
          font: {
            size: 14,
            family: "'Poppins', sans-serif"
          }
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
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
          label: function(context) {
            return `Sales: ₹${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: "#4a4a4a",
          borderDash: [5, 5],
        },
        ticks: {
          color: "#ffffff",
          font: {
            size: 12,
            family: "'Poppins', sans-serif"
          }
        }
      },
      y: {
        grid: {
          color: "#4a4a4a",
          borderDash: [5, 5],
        },
        ticks: {
          color: "#ffffff",
          font: {
            size: 12,
            family: "'Poppins', sans-serif"
          },
          callback: function(value) {
            return '₹' + value.toLocaleString();
          }
        },
        beginAtZero: true
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <div style={{ height: "400px", width: "100%", padding: "20px 0" }}>
      <Line data={LineChartData} options={options} />
    </div>
  );
};

export default LineGraph;
