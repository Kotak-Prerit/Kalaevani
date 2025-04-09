import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import { motion } from "framer-motion";

const ProductImages = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, error } = useSelector((state) => state.productDetails);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, error, id]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex >= product.images.length - 1) {
        return 0;
      }
      return prevIndex + 1;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex <= 0) {
        return product.images.length - 1;
      }
      return prevIndex - 1;
    });
  };

  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      <button
        onClick={handleGoBack}
        className="fixed top-5 right-5 z-10 h-10 w-10 border border-black rounded-full bg-transparent flex justify-center items-center text-2xl cursor-pointer"
      >
        <IoMdClose />
      </button>

      <div className="h-full w-full flex justify-center items-center">
        <button
          className="fixed top-1/2 left-0 transform -translate-y-1/2 p-2 text-2xl z-10 cursor-pointer ml-4 border-none bg-black"
          onClick={handlePrev}
        >
          <BsArrowLeftShort className="text-white" />
        </button>

        {product.images.length > 0 && (
          <motion.img
            src={product.images[currentIndex].url}
            alt={`${currentIndex} Slide`}
            className="w-full min-h-screen object-cover"
            draggable="false"
          />
        )}

        <button
          className="fixed top-1/2 right-0 transform -translate-y-1/2 p-2 text-2xl z-10 cursor-pointer bg-black mr-4 border-none"
          onClick={handleNext}
        >
          <BsArrowRightShort className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default ProductImages;
