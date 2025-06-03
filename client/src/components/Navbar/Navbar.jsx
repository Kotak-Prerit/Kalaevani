import React from "react";
import LogoWhite from "../../assets/kalaevaniWhite.webp";
import cartSvg from "../../assets/cart.svg";
import accountSvg from "../../assets/account.svg";
import shopSvg from "../../assets/shop.svg";
import { Link } from "react-router-dom";
import { StrictMode, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useSelector } from "react-redux";
import { FaInstagram, FaFacebook, FaWhatsapp, FaYoutube } from "react-icons/fa";

const Navbar = (props) => {
  const [clicked, setClicked] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <StrictMode>
      {/* Main container: toggles between closed (sticky) and open (fixed) states */}
      <div
        className={`w-full flex top-0 ${clicked
            ? "h-[102vh] items-center justify-between px-[2.5vw] fixed z-[9999] transition duration-500 bg-black overflow-hidden"
            : "h-[80px] items-center justify-between px-[2.6vw] transition duration-300 sticky z-[99] max-sm:h-[10vh]"
          }`}
      >
        {/* Logo Wrapper */}
        <div className="transition duration-1000 relative overflow-hidden z-[9]">
          <Link to="/">
            <img
              src={props.props}
              className={
                clicked
                  ? "hidden"
                  : "mt-[10px] mix-blend-color-burn max-sm:ml-0 h-auto w-[60px]"
              }
              alt="logo"
              height={60}
              width={60}
            />
          </Link>
          <Link to="/">
            <img
              src={LogoWhite}
              className={clicked ? "fixed top-[2vh] h-auto w-[60px]" : "hidden"}
              alt="logo"
              height={60}
              width={60}
            />
          </Link>
        </div>

        <div>
          {/* Right Section */}
          <div
            className={`flex items-center justify-center max-sm:${clicked
                ? ""
                : "fixed bottom-[3vh] md:left-[6vw] left-[2vw] flex-row-reverse gap-[10px]"
              }`}
          >
            {/* Search Icon */}
            <Link
              to="/products"
              className={`bg-white border border-[#d3d3d3] h-[45px] w-[45px] rounded-[50px] flex items-center justify-center text-[18px] text-black mr-[10px] ${clicked
                  ? "sm:absolute sm:top-[18px] sm:right-[245px] max-sm:fixed max-sm:top-[70px] max-sm:right-[10px] max-sm:rounded-[100px]"
                  : ""
                }`}
            >
              <LuSearch />
            </Link>

            <div
              className={`flex justify-between items-center h-[45px] rounded-[50px] px-[15px] bg-white border border-[#d3d3d3] ${clicked
                  ? "fixed top-[2vh] right-[2.5vw] max-sm:top-[20px] max-sm:right-[20px] w-[200px]"
                  : "w-[200px] max-sm:w-[78vw] max-sm:mt-[5px]"
                }`}
            >
              <Link className="h-full relative" to="/cart">
                <img
                  src={cartSvg}
                  alt="cart"
                  className="h-full flex items-center justify-center cursor-pointer transition duration-500 text-black hover:rotate-[-15deg]"
                  height={45}
                />
                <span className="absolute h-[15px] w-[15px] bg-black top-[3px] right-[3px] rounded-[50px] text-[10px] grid place-items-center text-white poppins">
                  {cartItems.length}
                </span>
              </Link>

              {/* Account */}
              <Link to="/login" className="profile">
                <img
                  src={accountSvg}
                  alt="account"
                  onClick={handleClick}
                  className="h-[40px] mt-[20px] ml-[5px] max-sm:ml-[20px] cursor-pointer transition duration-500"
                />
              </Link>

              {/* Shop Icon (visible on small screens) */}
              <Link
                to="/products"
                className="hidden max-sm:flex max-sm:justify-center max-sm:items-center max-sm:h-[50px] max-sm:w-[50px] max-sm:relative"
              >
                <img
                  src={shopSvg}
                  alt="shop"
                  onClick={handleClick}
                  className="h-[25px] w-[25px] mr-[10px]"
                />
              </Link>

              {/* Hamburger Menu */}
              <div
                className="cursor-pointer flex items-center justify-center flex-col h-full w-auto group"
                onClick={handleClick}
              >
                <i
                  className={`h-[1px] w-[20px] bg-black ${clicked
                      ? "rotate-[45deg] m-0"
                      : "my-[1.5px] group-hover:my-[2px] transition duration-500"
                    }`}
                ></i>
                <i
                  className={`h-[1px] w-[20px] bg-black ${clicked
                      ? "rotate-[-45deg] m-0"
                      : "my-[1.5px] group-hover:my-[2px] transition duration-500"
                    }`}
                ></i>
              </div>
            </div>
          </div>

          {/* Menu Links and Socials Container */}
          <div className="menuLinksContainer">
            {/* Social Links */}
            <div
              className={`absolute bottom-[2.5vw] left-[2.5vw] max-sm:left-[5vw] max-sm:bottom-[100px] md:top-[15vh] md:bottom-auto ${clicked ? "" : "hidden"
                }`}
            >
              <h1
                className={
                  clicked
                    ? "text-[#ffffffa4] mb-[10px] font-['Montserrat'] text-[20px] font-extrabold uppercase"
                    : "hidden"
                }
              >
                Connect with us
              </h1>
              <div className="flex items-start justify-start gap-[15px] font-bold tracking-[1px] uppercase">
                <Link
                  to="https://www.instagram.com/kalaevani"
                  target="_blank"
                  className={
                    clicked
                      ? "no-underline text-white leading-[1.3] transition duration-300 text-[25px] hover:text-[#ff3589]"
                      : "hidden"
                  }
                >
                  <FaInstagram />
                </Link>
                <Link
                  to="https://www.facebook.com/profile.php?id=61562478641808"
                  target="_blank"
                  className={
                    clicked
                      ? "no-underline text-white leading-[1.3] transition duration-300 text-[25px] hover:text-[#4169e1]"
                      : "hidden"
                  }
                >
                  <FaFacebook />
                </Link>
                <Link
                  to="https://wa.me/+917359291555"
                  target="_blank"
                  className={
                    clicked
                      ? "no-underline text-white leading-[1.3] transition duration-300 text-[25px] hover:text-[#00b900]"
                      : "hidden"
                  }
                >
                  <FaWhatsapp />
                </Link>
                <Link
                  to="https://www.youtube.com/@Kalaevani"
                  target="_blank"
                  className={
                    clicked
                      ? "no-underline text-white leading-[1.3] transition duration-300 text-[25px] hover:text-red-500"
                      : "hidden"
                  }
                >
                  <FaYoutube />
                </Link>
              </div>
            </div>

            {/* Navigation Links */}
            <div
              className={`h-fit flex flex-col items-end justify-end absolute right-[2vw] bottom-[5vh] font-normal max-sm:right-[5vw] max-sm:top-[25vh] montserrat ${clicked ? "" : "hidden"
                }`}
            >
              <Link
                to="/"
                className={
                  clicked
                    ? "no-underline text-white font-bold leading-[1] hover:text-[#ff9500] transition duration-300 uppercase"
                    : "hidden"
                }
              >
                <p className="text-[60px]  max-sm:text-[9vw] sm:text-[5vw]">
                  Home
                </p>
              </Link>
              <Link
                to="/About"
                className={
                  clicked
                    ? "no-underline text-white font-bold leading-[1] hover:text-[#ff9500] transition duration-300 uppercase"
                    : "hidden"
                }
              >
                <p className="text-[60px] max-sm:text-[9vw] sm:text-[5vw]">
                  About
                </p>
              </Link>
              <Link
                to="/contact"
                className={
                  clicked
                    ? "no-underline text-white font-bold leading-[1] hover:text-[#ff9500] transition duration-300 uppercase"
                    : "hidden"
                }
              >
                <p className="text-[60px] max-sm:text-[9vw] sm:text-[5vw]">
                  Contact
                </p>
              </Link>
              <Link
                to="/products"
                className={
                  clicked
                    ? "no-underline text-white font-bold leading-[1] hover:text-[#ff9500] transition duration-300 uppercase"
                    : "hidden"
                }
              >
                <p className="text-[60px] max-sm:text-[9vw] sm:text-[5vw]">
                  Products
                </p>
              </Link>
              <Link
                to="/login"
                className={
                  clicked
                    ? "no-underline text-white font-bold leading-[1] hover:text-[#ff9500] transition duration-300 uppercase"
                    : "hidden"
                }
              >
                <p className="text-[60px] max-sm:text-[9vw] sm:text-[5vw]">
                  Account
                </p>
              </Link>
              <Link
                to="/collab"
                className={
                  clicked
                    ? "no-underline text-white font-bold leading-[1] hover:text-[#ff9500] transition duration-300 uppercase cursor-pointer"
                    : "hidden"
                }
              >
                <p className="text-[60px] max-sm:text-[9vw] sm:text-[5vw]">
                  Collaborate
                </p>
              </Link>
              <Link
                to="/privacy"
                className={
                  clicked
                    ? "no-underline text-white font-bold leading-[1] hover:text-[#ff9500] transition duration-300 uppercase"
                    : "hidden"
                }
              >
                <p className="text-[60px] max-sm:text-[9vw] sm:text-[5vw]">
                  Privacy Policy
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </StrictMode>
  );
};

export default Navbar;
