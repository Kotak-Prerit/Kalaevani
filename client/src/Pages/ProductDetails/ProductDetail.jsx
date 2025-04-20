import React, { Fragment, Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  getProduct,
  newReview,
} from "../../actions/productAction";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MaterialPopup from "../../components/Popup/MaterialPopup";
import Rating from "../../components/Rating/Rating";
import ReviewCard from "../../components/Reviews/ReviewCard";
import { toast } from "sonner";
import MetaData from "../../Meta/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import Product from "../../components/ProductCard/ProductCard";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import logo from "../../assets/kalaevaniBlack.webp";
import sizeChart from "../../assets/sizechart.webp";
import QuoteLoader from "../../utils/QuoteLoader/QuoteLoader";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, error } = useSelector((state) => state.productDetails);
  const navigate = useNavigate();

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const { products } = useSelector((state) => state.products);
  const [size, setSize] = useState();
  const location = useLocation();

  const carousel = useRef();

  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productDetailRef = useRef(null);

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const updateMaxQuantity = (selectedSize) => {
    if (selectedSize) {
      setMaxQuantity(selectedSize.quantity);
      if (quantity > selectedSize.quantity) {
        setQuantity(selectedSize.quantity);
      }
    }
  };

  const handleSizeChange = (e) => {
    const selectedSizeName = e.target.value;
    setSize(selectedSizeName);
    const selectedSize = product.sizes.find((s) => s.name === selectedSizeName);
    updateMaxQuantity(selectedSize);
  };

  const increaseQuantity = () => {
    if (!size) {
      toast.error("Please select a size first");
      return;
    }

    if (quantity >= maxQuantity) {
      toast.error("Maximum quantity reached for this size");
      return;
    }

    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [sizeChartIsOpen, setSizeChartIsOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState("");

  const openPopup = (material) => {
    setSelectedMaterial(material);
    setPopupIsOpen(true);
  };

  const closePopup = () => {
    setPopupIsOpen(false);
  };

  const openSizeChart = () => {
    setSizeChartIsOpen(true);
  };

  const closeSizeChart = () => {
    setSizeChartIsOpen(false);
  };

  const addToCartHandler = () => {
    if (!size) {
      toast.error("Please select a size first");
      return;
    }

    dispatch(addItemsToCart(id, quantity, size));
    toast.success("Item Added to cart");
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  const reviewSubmitHandler = () => {
    if (!rating || !comment.trim()) {
      toast.error("Please write a review.");
      return; // Don't proceed with the form submission if validation fails
    }

    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Review submitted successfully 🥳");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(id));
    dispatch(getProduct());
  }, [dispatch, error, id, reviewError, success]);

  if (!product || !product.images || product.images.length === 0) {
    return null;
  }

  const showcaseImage = product.images[4] ? product.images[4].url : null;
  const productImage = product.images[5] ? product.images[5].url : null;

  const scrollToProductDetail = () => {
    if (!size) {
      toast.error("Please select a size first");
      return;
    }
    dispatch(addItemsToCart(id, quantity, size));
    navigate("/login?redirect=shipping");
  };

  const options = {
    edit: false,
    color1: "#777",
    color2: "#FFD700",
    value: product.ratings,
    half: true,
    size: window.innerWidth < 400 ? 15 : 20
  };

  const stockStatus = () => {
    if (product.Stock < 5 && product.Stock < 0) {
      return <p className="red">Last 5 left</p>;
    } else if (product.Stock > 5) {
      return <p className="green">Only {product.Stock} left</p>;
    } else if (product.Stock === 0) {
      return <p className="red">Out of stock</p>;
    }
  };

  return (
    <Fragment>
      <Fragment>
        <MetaData title={` ${product.name} `} />
        <Suspense fallback={<QuoteLoader />}>
          <Navbar props={logo} />
          <div className="absolute top-[13vh] z-10 left-[2vw] flex flex-col items-start justify-center font-poppins">
            <div className="flex items-center text-xs">
              <p className="text-[25px] text-[#131313] bebas mb-2">
                {product.name}
              </p>
            </div>
            <span className="text-sm">{stockStatus()}</span>

            <div className="flex justify-center items-center gap-[5px]">
              <Rating {...options} />
              <span className="text-xs">
                ({product.numberOfReviews} Reviews)
              </span>
            </div>

            <div>
              <button
                onClick={openSizeChart}
                className="bg-transparent border-none underline cursor-pointer font-poppins z-5"
              >
                size chart
              </button>
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

          <section className="flex flex-col justify-center items-center h-[calc(100vh-10vh)] w-full">
            <div className="flex flex-col justify-center items-center">
              <div className="relative flex justify-center items-center h-[calc(100vh-20vh)] w-full">
                {showcaseImage && (
                  <img
                    src={showcaseImage}
                    alt={product.name}
                    className="absolute h-[90vh] mt-[-13vh] sm:h-[70vh] sm:mt-[-130px] max-[618px]:h-[60vh] max-[618px]:mt-[-90px] max-[415px]:h-[58vh] max-[415px]:mt-[-70px] max-[335px]:h-[55vh]"
                  />
                )}
              </div>

              <div className="mt-[-100px] w-[65vw] z-[5] max-[860px]:w-[90vw] max-[860px]:mt-[-180px]">
                <div className="flex justify-between w-full Apercu">
                  {/* Price */}
                  <div className="w-1/4 h-[60px] max-[860px]:w-[35%] max-[860px]:h-[50px] flex justify-center items-center bg-black rounded-full">
                    <p className="text-white font-bold text-[18px] px-[30px] capitalize h-full flex items-center rounded-full max-[860px]:text-[16px] max-[415px]:px-[10px]">
                      ₹ {product.price}
                    </p>
                  </div>

                  {/* Quantity Counter */}
                  <div className="w-1/4 max-h-[60px] text-white max-[860px]:w-[35%] max-[860px]:h-[50px] flex justify-center items-center bg-black border border-black rounded-full overflow-hidden">
                    <button
                      onClick={decreaseQuantity}
                      className="w-[30%] h-full bg-transparent cursor-pointer"
                    >
                      -
                    </button>
                    <input
                      readOnly
                      type="number"
                      value={quantity}
                      className="w-[40%] h-full bg-transparent text-center font-bold border-none appearance-none outline-none"
                    />
                    <button
                      onClick={increaseQuantity}
                      className="w-[30%] h-full bg-transparent cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Size Dropdown */}
                  <div className="w-1/4 max-h-[60px] max-[860px]:w-[35%] max-[860px]:h-[50px] relative border border-black rounded-full overflow-hidden flex items-center justify-center">
                    <select
                      className="w-full h-full font-bold text-[20px] text-center bg-black text-white border-none outline-none font-poppins capitalize max-[860px]:text-[16px]"
                      value={size}
                      onChange={handleSizeChange}
                    >
                      <option
                        value=""
                        className="bg-black text-white text-center"
                      >
                        Size
                      </option>
                      {product.sizes.map((size, i) => (
                        <option
                          key={i}
                          value={size.name}
                          className="bg-black text-white text-center"
                        >
                          {size.name}
                        </option>
                      ))}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-[25%] bg-black pointer-events-none max-[860px]:w-[30%]">
                      <span className="absolute left-1/2 transform -translate-x-1/2 top-[30%] border-x-[8px] border-x-transparent border-b-[8px] border-b-white max-[618px]:border-b-[6px]" />
                      <span className="absolute left-1/2 transform -translate-x-1/2 top-[55%] border-x-[8px] border-x-transparent border-t-[8px] border-t-white max-[618px]:border-t-[6px]" />
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-[5px] w-full h-[60px] rounded-full flex overflow-hidden max-[415px]:h-[50px] poppins">
                  <div className="w-1/2 flex justify-center items-center bg-black border border-black text-white rounded-l-full">
                    <button
                      disabled={product.Stock < 1}
                      onClick={addToCartHandler}
                      className="w-full h-full bg-transparent border-none text-[20px] text-white cursor-pointer"
                    >
                      {product.Stock > 0 ? "Add to cart" : "Not available"}
                    </button>
                  </div>
                  <div className="w-1/2 flex justify-center items-center bg-white border border-black text-black rounded-r-full">
                    <button
                      onClick={scrollToProductDetail}
                      disabled={product.Stock < 1}
                      className="h-full bg-transparent border-none text-[20px] cursor-pointer"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="h-[125vh] w-screen bg-black">
            <div className="flex justify-between items-center w-full py-[2vmax] h-[20vh] px-[2vmax]">
              <h1 className="text-white text-3xl text-left futuraLt">
                Close look 👀
              </h1>
              <MdOutlineDoubleArrow className="text-white text-[35px] rotate-180 animate-[swipeLeft_1s_ease-in-out_infinite_forwards]" />
            </div>

            <motion.div className="overflow-hidden cursor-grab" ref={carousel}>
              <motion.div
                drag="x"
                dragConstraints={{ right: 0, left: -1600 }}
                className="flex ml-[10%]"
              >
                {product.images &&
                  product.images.slice(0, 4).map((item, i) => (
                    <motion.div
                      className="md:min-h-[40rem] min-h-[30rem] min-w-[20rem] md:min-w-[30rem] p-2.5 relative"
                      key={i}
                    >
                      <img
                        src={item.url}
                        alt={`${i} Slide`}
                        className="h-full w-full object-cover"
                        draggable="false"
                      />
                      <Link
                        to={`/product/${product._id}/images`}
                        className="no-underline"
                      >
                        <HiOutlinePlusCircle className="absolute text-[2.5rem] top-5 right-5 z-[100] text-black" />
                      </Link>
                    </motion.div>
                  ))}
              </motion.div>
            </motion.div>
          </section>

          <section
            className="h-screen flex flex-col justify-center items-center bg-white relative overflow-hidden"
            ref={productDetailRef}
          >
            <h1 className="absolute top-[15px] left-[15px] uppercase z-[5] text-lg md:text-4xl futuraLt">
              fabric / care & Artwork Meaning
            </h1>
            <p className="absolute top-[5%] md:top-[7%] left-[15px] text-sm md:text-lg z-[5] Apercu">
              Click on the blinking buttons
            </p>

            <div className="relative flex justify-center items-center ">
              <img
                src={productImage}
                alt=""
                className="w-auto h-[60vh] md:h-[90vh] -mt-[10vh] object-cover"
              />
              <Fragment>
                <div className="absolute w-full h-full top-0 left-0">
                  <span
                    className="absolute top-[55%] left-[-5px] h-[13px] w-[13px] rounded-full bg-[#999] shadow-[0_0_0_4px_black] cursor-pointer animate-[pop_1s_ease-in-out_infinite_forwards]"
                    onClick={() => openPopup("fabric")}
                  ></span>
                  <span
                    className="absolute top-[55%] right-[-5px] h-[13px] w-[13px] rounded-full bg-[#999] shadow-[0_0_0_4px_black] cursor-pointer animate-[pop_1s_ease-in-out_0.3s_infinite_forwards]"
                    onClick={() => openPopup("care")}
                  ></span>
                  <span
                    className="absolute top-[85%] left-[-5px] h-[13px] w-[13px] rounded-full bg-[#999] shadow-[0_0_0_4px_black] cursor-pointer animate-[pop_1s_ease-in-out_0.5s_infinite_forwards]"
                    onClick={() => openPopup("artwork")}
                  ></span>
                </div>
                <MaterialPopup
                  isOpen={popupIsOpen}
                  onClose={closePopup}
                  materialName={selectedMaterial}
                />
              </Fragment>
            </div>
          </section>

          <Fragment>
            <div className="touch-pan-y">
              <header className="flex justify-between items-center mb-6 px-[1.5vw] text-xl">
                <h1 className="uppercase futuraLt">you may also like</h1>
                <Link to={"/products"} className="underline text-blue-600">
                  See all
                </Link>
              </header>

              <div className="w-full flex gap-[10px] items-center justify-center flex-wrap my-[5vh]">
                {products &&
                  products
                    .slice(0, 8)
                    .map((product) => (
                      <Product key={product._id} product={product} />
                    ))}
              </div>

              <div className="flex justify-center items-center mt-12 w-full">
                <Link
                  to={"/products"}
                  className="bg-white text-black border border-black rounded-full py-5 px-6 uppercase hover:bg-black hover:text-white transition-all duration-300 font-Apercu my-5 mb-10"
                >
                  more products
                </Link>
              </div>
            </div>
          </Fragment>

          <p className="text-[30px] text-white text-left p-[2.5vw] uppercase bg-gradient-to-b from-[#222] to-[#111] futuraLt">
            Customer Reviews{" "}
          </p>

          <section className="bg-gradient-to-b from-[#111] to-black px-[2vw] pb-[5vw] pt-[2vw]">
            <div>
              {product.reviews && product.reviews[0] ? (
                <div>
                  <div className="bg-[#111] text-white block md:flex justify-center items-center gap-3 p-4 relative w-full">
                    <p className="text-[4vmax] md:text-[3vmax] font-bold">
                      {product.ratings.toFixed(1)}
                    </p>
                    <div>
                      <Rating {...options} size={window.innerWidth < 600 ? 15 : 40} />
                      <span className="text-sm ml-2">
                        Based on {product.numberOfReviews} Reviews
                      </span>
                    </div>
                    <button
                      className="relative md:absolute right-[2vw] top-1/2 -translate-y-1/2 bg-white text-black px-5 py-2 font-semibold uppercase text-sm tracking-wider"
                      onClick={submitReviewToggle}
                    >
                      Write a review
                    </button>
                  </div>

                  <Dialog
                    aria-labelledby="simple-dialog-title"
                    open={open}
                    onClose={submitReviewToggle}
                    className="bg-black/25 backdrop-blur-sm"
                  >
                    <DialogTitle className="text-center futuraLt">
                      Share your thoughts
                    </DialogTitle>
                    <DialogContent>
                      <p className="font-Apercu pb-5">Rate your experience*</p>
                      <Rating
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                        size="large"
                        precision={0.5}
                        sx={{ color: "#000", fontSize: "40px" }}
                        required
                      />
                      <p className="mt-5 font-Apercu">Write a review*</p>
                      <textarea
                        className="border border-black w-full px-3 py-2 mt-2 focus:border-b-black focus:outline-none"
                        cols={20}
                        rows={5}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                      ></textarea>
                    </DialogContent>
                    <DialogActions>
                      <Button color="secondary" onClick={submitReviewToggle}>
                        Cancel
                      </Button>
                      <Button color="primary" onClick={reviewSubmitHandler}>
                        Submit
                      </Button>
                    </DialogActions>
                  </Dialog>

                  {product.reviews.map((review, i) => (
                    <ReviewCard review={review} key={i} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <p className="text-2xl text-white text-center py-8 font-poppins">
                    No Reviews Yet
                  </p>
                  <div className="w-full flex justify-center items-center">
                    <button
                      className="bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-Apercu"
                      onClick={submitReviewToggle}
                    >
                      Be the First One to Review
                    </button>
                  </div>

                  <Dialog
                    aria-labelledby="simple-dialog-title"
                    open={open}
                    onClose={submitReviewToggle}
                    className="bg-black/25 backdrop-blur-sm"
                  >
                    <DialogTitle className="text-center futuraLt">
                      Share your thoughts
                    </DialogTitle>
                    <DialogContent>
                      <p className="font-Apercu pb-5">Rate your experience*</p>
                      <Rating
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                        size="large"
                        precision={0.5}
                        sx={{ color: "#000", fontSize: "40px" }}
                      />
                      <p className="mt-5 font-Apercu">Write a review*</p>
                      <textarea
                        className="border border-black w-full px-3 py-2 mt-2 focus:border-b-black focus:outline-none"
                        cols={20}
                        rows={5}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </DialogContent>
                    <DialogActions>
                      <Button color="secondary" onClick={submitReviewToggle}>
                        Cancel
                      </Button>
                      <Button color="primary" onClick={reviewSubmitHandler}>
                        Submit
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              )}
            </div>
          </section>

          <Footer />
          {/* Custom keyframes and responsive overrides */}
          <style>
            {`
          @keyframes swipeLeft {
            0%, 100% {
              margin-right: 0;
            }
            50% {
              margin-right: 20px;
            }
          }

          @keyframes pop {
            0%, 100% {
              height: 13px;
              width: 13px;
            }
            50% {
              height: 16px;
              width: 16px;
            }
          }

          @media screen and (max-width: 415px) {
            section.h-\\[125vh\\] {
              height: 130vh !important;
            }
          }
        `}
          </style>
        </Suspense>
      </Fragment>
    </Fragment>
  );
};

export default ProductDetails;
