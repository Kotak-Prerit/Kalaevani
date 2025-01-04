import { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../../../actions/productAction.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const dispatch = useDispatch();
  const { products: adminProducts } = useSelector(
    (state) => state.adminProduct
  );

  let outOfStock = 0;

  const productList = adminProducts?.products || [];

  productList.forEach((item) => {
    if (item.Stock === 0) {
      outOfStock += 1;
    }
  });

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  if (
    !adminProducts ||
    !adminProducts.products ||
    adminProducts.products.length === 0
  ) {
    return <div>Loading...</div>;
  }

  const data = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        label: "Stock Status",
        data: [outOfStock, productList.length - outOfStock],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };
  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
