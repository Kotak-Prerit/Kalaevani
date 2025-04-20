import React, { useState, useEffect, Fragment } from "react";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Product from "../../components/ProductCard/ProductCard";
import { motion } from "framer-motion";
import MetaData from "../../Meta/MetaData";
import Pagination from "react-js-pagination";
import { toast } from "sonner";
import { Link, useNavigate, useParams } from "react-router-dom";
import logoBlack from "../../assets/kalaevaniBlack.webp";
import { Slider } from "@mui/material";
import { LuSearch } from "react-icons/lu";

function Products() {
  const dispatch = useDispatch();
  const { error, productCount, products, perPage, loading } = useSelector(
    (state) => state.products
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([500, 10000]);

  const { keyword } = useParams();
  const [keywords, setkeyword] = useState("");

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    window.scrollTo(0, 0);
    dispatch(getProduct(keyword, currentPage, price));
  }, [dispatch, keyword, currentPage, error, price]);

  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keywords.trim()) {
      navigate(`/products/${keywords}`);
    } else {
      navigate("/products");
    }
  };

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  const variants = {
    default: { x: mousePosition.x - 7.5, y: mousePosition.y - 7.5 },
    text: {
      height: 300,
      width: 300,
      x: mousePosition.x - 150,
      y: mousePosition.y - 150,
      backgroundColor: "#6969697a",
    },
  };

  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");

  return (
    <Fragment>
      <MetaData title="All Products" />
      <div className="relative">
        <Navbar props={logoBlack} />
        <Link
          to="/"
          className="fixed top-[15px] left-[2.6vw] z-[1000] w-[60px] h-[60px]"
        >
          <img
            src={logoBlack}
            alt="logo"
            className="w-full h-full object-cover"
          />
        </Link>

        <div className="flex justify-center items-center">
          <div className="mx-[1.5vw] mt-[50px] mb-2 min-h-[150px] w-[90%] md:w-1/2 border border-black pb-4">
            <div className="flex justify-center font-semibold py-4 border-b border-black uppercase text-base font-sans">
              Filters
            </div>
            <div className="flex items-center justify-center">
              <div className="flex flex-col w-[90%] pr-10">
                <p className="text-center font-medium">Select Price Range</p>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay={window.innerWidth < 600 ? "on" : "auto"}
                  aria-labelledby="range-slider"
                  min={500}
                  max={10000}
                  color="primary"
                />
              </div>
            </div>
          </div>
        </div>

        <form
          className="w-full flex justify-center px-[1.6vw]"
          onSubmit={searchSubmitHandler}
        >
          <div className="relative w-[93%] md:w-[52%] h-10 overflow-hidden border border-black">
            <input
              type="text"
              placeholder="Search a Product ..."
              onChange={(e) => setkeyword(e.target.value)}
              value={keyword}
              className="w-full h-full bg-white p-5 border-none focus:outline-none"
            />
            <LuSearch className="absolute top-0 right-0 h-10 w-[50px] p-2.5 text-gray-500" />
            <input
              type="submit"
              value=" o "
              className="absolute top-0 right-0 w-[50px] h-full opacity-0 cursor-pointer z-10"
            />
          </div>
        </form>

        {loading ? (
          <div className="h-[70vh] w-full p-[4vh] rounded-[10px]">
            <div className="h-full w-full animate-pulse bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded-inherit"></div>
          </div>
        ) : (
          <div
            className="flex flex-wrap justify-center gap-2 py-[5vh]"
            onMouseEnter={textEnter}
            onMouseLeave={textLeave}
          >
            {products &&
              products.map((product) => (
                <Product
                  key={product._id}
                  product={product}
                  loading={loading}
                />
              ))}
          </div>
        )}

        {perPage < productCount && (
          <div className="flex justify-center my-4">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={perPage}
              totalItemsCount={productCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="cursor-pointer border border-white px-4 py-2 transition-all hover:bg-white"
              linkClass="no-underline text-white font-medium"
              activeClass="bg-white"
              activeLinkClass="text-black"
            />
          </div>
        )}

        <motion.div
          className="cursor"
          variants={variants}
          animate={cursorVariant}
        />

        <Footer />
      </div>
    </Fragment>
  );
}

export default Products;
