import { useEffect } from "react";
import React from "react";
import Sidebar from "../../admin-components/Sidebar/Sidebar.jsx";
import LineGraph from "../../admin-components/LineGraph/LineGraph.jsx";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { LuBox } from "react-icons/lu";
import { RiBarcodeBoxLine } from "react-icons/ri";
import { FaArrowTrendUp } from "react-icons/fa6";
import { VscLinkExternal } from "react-icons/vsc";
import { useSelector } from "react-redux";
import DoughnutChart from "../../admin-components/DoughnutChart/DoughnutChart.jsx";
import { useDispatch } from "react-redux";
import { getAdminProducts } from "../../../../actions/productAction.js";
import { getAllOrders } from "../../../../actions/orderAction.js";
import { getAllUsers } from "../../../../actions/userAction.js";
import PageNotFound from "../../../404/PageNotFound.jsx";
import MetaData from "../../../../Meta/MetaData.js";
import CustomerInsights from "../../admin-components/CustomerInsights/CustomerInsights.jsx";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.adminProduct);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      <MetaData title={"Kalaevani - Dashboard"} />
      {isAuthenticated && user.role === "admin" ? (
        <div className="dashboard">
          <Sidebar />
          <div className="dashboardContainer">
            <p className="dashboardHeading poppins">Dashboard</p>
            <div className="dashboardSummary">
              <div className="dashboardBox">
                <p className="boxTitle poppins flex justify-center items-center">
                  <FaRupeeSign className="rupee" /> Total Sales
                </p>
                <p className="boxNumbers">NA</p>
              </div>
              <div className="dashboardBox">
                <Link to="/admin/products">
                  <p className="boxTitle poppins flex justify-center items-center">
                    {" "}
                    <LuBox className="box" />
                    Products
                  </p>
                  <p className="boxNumbers">{products && products.length}</p>
                  <VscLinkExternal className="dash-link" />
                </Link>
              </div>
              <div className="dashboardBox">
                <Link to="/admin/orders">
                  <p className="boxTitle poppins flex justify-center items-center">
                    <RiBarcodeBoxLine className="barcode" />
                    Orders
                  </p>
                  <p className="boxNumbers">{orders && orders.length}</p>
                  <VscLinkExternal className="dash-link" />
                </Link>
              </div>
              <div className="dashboardBox">
                <Link to="/admin/users">
                  <p className="boxTitle poppins flex justify-center items-center">
                    {" "}
                    <FaArrowTrendUp className="usergrow" />
                    Users
                  </p>
                  <p className="boxNumbers">{users && users.length}</p>
                  <VscLinkExternal className="dash-link" />
                </Link>
              </div>
            </div>
            <div className="chart-container flex justify-center items-center">
              <div className="chart dashboardBox">
                <p className="chart-title poppins">Sales Statistics</p>
                <LineGraph />
              </div>
            </div>
            <div className="chart-container flex justify-center items-center">
              <div className="chart dashboardBox flex justify-center items-center">
                <p className="chart-title poppins">Stock Status</p>
                <DoughnutChart />
              </div>
            </div>

            <CustomerInsights />
          </div>
        </div>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default Dashboard;