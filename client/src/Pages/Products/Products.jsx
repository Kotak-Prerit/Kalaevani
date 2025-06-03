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
import { useNavigate, useParams } from "react-router-dom";
import logoBlack from "../../assets/kalaevaniBlack.webp";
import { Slider, Rating, FormControl, InputLabel, Select, MenuItem, TextField, InputAdornment } from "@mui/material";
import { LuSearch, LuFilter } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

function Products() {
  const dispatch = useDispatch();
  const { error, productCount, products, loading } = useSelector(
    (state) => state.products
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([500, 10000]);
  const [ratings, setRatings] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const { keyword } = useParams();
  const [keywords, setKeywords] = useState("");

  const sortOptions = [
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "rating_desc", label: "Highest Rated" },
    { value: "newest", label: "Newest First" }
  ];

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  const ratingHandler = (e, newRating) => {
    // If user selects 5 stars, we'll use 4.5 as the minimum rating
    setRatings(newRating === 5 ? 4.5 : newRating);
  };

  const sortHandler = (e) => {
    setSortBy(e.target.value);
  };

  const clearFilters = () => {
    setPrice([500, 10000]);
    setRatings(0);
    setSortBy("");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    window.scrollTo(0, 0);
    dispatch(getProduct(keyword, currentPage, price, "", ratings, sortBy));
  }, [dispatch, keyword, currentPage, error, price, ratings, sortBy]);

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


        {/* Search Bar */}
        <div className="w-full flex justify-center px-[1.6vw] mt-[100px]">
          <form onSubmit={searchSubmitHandler} className="w-[90%] md:w-[52%] relative">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search products..."
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <button type="submit" className="p-2">
                      <LuSearch className="text-gray-500" />
                    </button>
                  </InputAdornment>
                ),
              }}
              className="bg-white"
            />
          </form>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="ml-4 p-2 border border-black rounded-lg hover:bg-black hover:text-white transition-colors"
          >
            <LuFilter className="text-xl" />
          </button>
        </div>

        {/* Filters Section */}
        {showFilters && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-start overflow-y-auto">
            <div className="bg-white w-[90%] md:w-[600px] rounded-lg p-6 my-4 relative">
              <div className="sticky top-0 bg-white pb-4 z-10">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">Filters</h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <IoClose className="text-2xl" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Price Range</h3>
                  <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    min={500}
                    max={10000}
                    className="mt-4"
                  />
                  <div className="flex justify-between mt-2">
                    <span>₹{price[0]}</span>
                    <span>₹{price[1]}</span>
                  </div>
                </div>

                {/* Ratings */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Minimum Rating</h3>
                  <Rating
                    value={ratings === 4.5 ? 5 : ratings}
                    onChange={ratingHandler}
                    precision={0.5}
                    size="large"
                  />
                  {ratings > 0 && (
                    <p className="text-sm text-gray-600 mt-1">
                      {ratings === 4.5 ? "Showing products rated 4.5 stars and above" : `Showing products rated ${ratings} stars and above`}
                    </p>
                  )}
                </div>

                {/* Sort By */}
                <div>
                  <FormControl fullWidth>
                    <InputLabel>Sort By</InputLabel>
                    <Select
                      value={sortBy}
                      onChange={sortHandler}
                      label="Sort By"
                    >
                      <MenuItem value="">None</MenuItem>
                      {sortOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between gap-4 sticky bottom-0 bg-white pt-4">
                  <button
                    onClick={clearFilters}
                    className="flex-1 py-2 border border-black rounded-lg hover:bg-gray-100"
                  >
                    Clear Filters
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="flex-1 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="h-[70vh] w-full p-[4vh] rounded-[10px]">
            <div className="h-full w-full animate-pulse bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded-inherit"></div>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:p-6 p-2 mt-5"
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

        {/* Pagination */}
        {productCount > 0 && (
          <div className="flex justify-center my-8">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={6}
              totalItemsCount={productCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="active"
              activeLinkClass="active-link"
              className="flex gap-2"
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

      {/* Custom styles */}
      <style jsx>{`
        .page-item {
          padding: 0.5rem 1rem;
          border: 1px solid #ddd;
          margin: 0 0.25rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .page-item:hover {
          background-color: #f5f5f5;
        }

        .page-link {
          color: #333;
          text-decoration: none;
        }

        .active {
          background-color: #000;
          color: #fff;
        }

        .active-link {
          color: #fff;
        }
      `}</style>
    </Fragment>
  );
}

export default Products;
