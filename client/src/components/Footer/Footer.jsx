import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsInstagram, BsYoutube, BsWhatsapp, BsTwitterX } from "react-icons/bs";
import Logo from "../../assets/kalaevaniWhite.webp";
import { useSelector } from "react-redux";
import sizeChart from "../../assets/sizechart.webp";

export default function Footer() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [sizeChartIsOpen, setSizeChartIsOpen] = useState(false);

  const openSizeChart = () => setSizeChartIsOpen(true);
  const closeSizeChart = () => setSizeChartIsOpen(false);

  const authenticate = () => {
    if (isAuthenticated) {
      navigate("/orders");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col bg-black text-white w-full p-8 pb-24">
      <div className="flex flex-col sm:flex-row justify-between gap-8">
        <div className="mb-8">
          <p className="text-xl uppercase font-medium text-gray-400 mb-3">
            Uff Stuff
          </p>
          <div className="flex flex-col gap-2">
            <Link to="/products" className="text-lg hover:underline">
              Clothing
            </Link>
            <Link to="/about" className="text-lg hover:underline">
              About Us
            </Link>
            <Link to="/login" className="text-lg hover:underline">
              Account
            </Link>
            <Link to="/cart" className="text-lg hover:underline">
              Cart
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-xl uppercase font-medium text-gray-400 mb-3">
            Ordinary Stuff
          </p>
          <div className="flex flex-col gap-2 poppins">
            <button
              onClick={authenticate}
              className="text-lg hover:underline text-left"
            >
              Track Order
            </button>
            <Link to="/shipping-policy" className="text-lg hover:underline">
              Shipping Policy
            </Link>
            <Link to="/contact" className="text-lg hover:underline">
              Contact Us
            </Link>
            <button
              onClick={openSizeChart}
              className="text-lg hover:underline text-left"
            >
              Size Chart
            </button>
            <Link to="/privacy" className="text-lg hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-lg hover:underline">
              Terms & Condition
            </Link>
            <Link to="/return-refund" className="text-lg hover:underline">
              Return & Refund Policy
            </Link>
          </div>
        </div>

        {sizeChartIsOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={closeSizeChart}
            ></div>
            <div className="relative bg-white p-5 rounded-[10px] max-w-[90%] max-h-[90%] flex flex-col items-center justify-center">
              <button
                className="absolute top-[10px] right-[10px] bg-red-600 text-white border-none rounded-[8px] w-[30px] h-[30px] flex items-center justify-center cursor-pointer"
                onClick={closeSizeChart}
              >
                X
              </button>
              <img
                src={sizeChart}
                alt="Size Chart"
                className="max-w-full max-h-full"
              />
            </div>
          </div>
        )}

        <div>
          <p className="text-xl uppercase font-medium text-gray-400 mb-3">
            Catch Up
          </p>
          <div className="flex flex-col gap-2">
            <Link
              to="mailto:support@kalaevani.com"
              className="text-lg hover:underline"
            >
              support@kalaevani.com
            </Link>
            <Link to="/faqs" className="text-lg hover:underline">
              FAQs
            </Link>
            <p className="text-lg text-gray-400">11am to 6pm Mon-Sun</p>
            <p className="text-lg text-gray-400">Except on public holidays</p>
            <div className="flex gap-4 mt-5">
              <Link
                to="https://www.instagram.com/kalaevani"
                target="_blank"
                className="text-4xl hover:text-instagram duration-300"
              >
                <BsInstagram />
              </Link>
              <Link
                to="https://www.youtube.com/@Kalaevani"
                target="_blank"
                className="text-4xl hover:text-youtube  duration-300"
              >
                <BsYoutube />
              </Link>
              <Link
                to="https://x.com/kalaevani"
                target="_blank"
                className="text-4xl hover:text-twitter  duration-300"
              >
                <BsTwitterX />
              </Link>
              <Link
                to="https://www.pinterest.com"
                target="_blank"
                className="text-4xl hover:text-whatsapp  duration-300"
              >
                <BsWhatsapp />
              </Link>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xl uppercase font-medium text-gray-400 mb-3">
            For Business
          </p>
          <div className="flex flex-col gap-2">
            <Link to="/collab" className="text-lg hover:underline">
              Collab
            </Link>
            <Link to="/wholesale" className="text-lg hover:underline">
              Whole Sale Enquiry
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-20" />
        </Link>
        <p className="text-xl text-gray-400">© 2025 Kalaevani-Clothing, Inc.</p>
      </div>
    </div>
  );
}
