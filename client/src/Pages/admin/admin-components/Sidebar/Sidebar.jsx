import React, { useState } from "react";
import "./Sidebar.css";
import logo from "../../../../assets/kalaevaniWhite.webp";
import { Link } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { FaStore, FaPencil } from "react-icons/fa6";
import { MdLibraryAdd, MdReviews } from "react-icons/md";
import { FaUserCircle, FaThList } from "react-icons/fa";

const Sidebar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="sidebar">
      <Link to="/" className="dashboardLogo">
        <img src={logo} alt="Kalaevani-logo" className="h-[30px]" />
        <h1 className="logoTxt montserrat">Kalaevani</h1>
      </Link>
      <Link to="/admin/dashboard" className="d-link Apercu">
        <p className="flex">
          <BiSolidDashboard className="ds-icon" /> Dashboard
        </p>
      </Link>
      <li className="d-link Apercu product-dd">
        <button
          onClick={toggleDropdown}
          style={{ cursor: "pointer" }}
          className="flex white"
        >
          <FaStore className="pr-icon" /> Products
        </button>
        <ul
          className={`product-dropdown ${
            isDropdownVisible ? "visible" : "hidden"
          }`}
        >
          <li>
            <Link to="/admin/products897451569418741" className="flex">
              <FaThList /> All Products
            </Link>
          </li>
          <li>
            <Link to="/admin/product897451569418741" className="flex">
              <MdLibraryAdd /> Create Product
            </Link>
          </li>
        </ul>
      </li>
      <Link to="/admin/orders897451569418741" className="d-link Apercu">
        <p className="flex">
          <FaPencil className="odr-icon" />
          Orders
        </p>
      </Link>
      <Link to="/admin/users897451569418741" className=" d-link Apercu">
        <p className="flex">
          <FaUserCircle className="usr-icon" /> Users
        </p>
      </Link>
      <div className="d-link Apercu">
        <p className="flex">
          <MdReviews className="rv-icon" />
          Reviews
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
