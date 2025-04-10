import React, { Fragment, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";

const Product = ({ product }) => {
  const options = {
    edit: false,
    color1: "#ccc",
    color2: "#000",
    value: product.ratings,
    half: true,
    size: 20,
  };

  const wrapper = useRef();
  const pressed = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [loadingImages, setLoadingImages] = useState(
    product.images.map(() => true)
  );

  const handleMouseDown = (e) => {
    pressed.current = true;
    startX.current = e.clientX;
    if (wrapper.current) {
      scrollLeft.current = wrapper.current.scrollLeft;
      wrapper.current.style.cursor = "grabbing";
    }
  };

  const handleMouseUp = () => {
    pressed.current = false;
    if (wrapper.current) {
      wrapper.current.style.cursor = "grab";
    }
  };

  const handleMouseMove = (e) => {
    if (!pressed.current) return;
    const x = e.clientX - startX.current;
    if (wrapper.current) {
      wrapper.current.scrollLeft = scrollLeft.current - x;
    }
  };

  const handleMouseLeave = () => {
    pressed.current = false;
  };

  const handleImageLoad = (index) => {
    setLoadingImages((prev) => {
      const newState = [...prev];
      newState[index] = false;
      return newState;
    });
  };

  return (
    <Fragment>
      <div className="w-[350px] h-[510px] border border-black relative overflow-hidden">
        <Link to={`/product/${product._id}`} className="no-underline">
          <div
            className="flex overflow-x-auto w-[350px] cursor-grab scroll-smooth snap-x snap-mandatory touch-pan-x select-none"
            ref={wrapper}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchEnd={handleMouseUp}
          >
            {product.images.map((image, i) => (
              <div key={i} className="snap-start flex-none w-full">
                {loadingImages[i] && (
                  <div className="w-full h-[400px] flex items-center justify-center bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse">
                    <div className="w-full h-[400px] bg-gradient-to-r from-gray-300 to-gray-200 animate-pulse"></div>
                  </div>
                )}
                <img
                  src={image.url}
                  alt={`${product.name}`}
                  className={`w-[350px] h-[400px] object-cover object-top border-b border-black ${
                    loadingImages[i] ? "hidden" : ""
                  }`}
                  onLoad={() => handleImageLoad(i)}
                  fetchpriority={i === 0 ? "high" : "auto"}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 px-4">
            <p className="font-bold uppercase text-xl truncate futuraLt">
              {product.name}
            </p>
            <p className="font-semibold text-lg ">₹ {product.price}</p>
          </div>
          <div className="flex items-center mt-2 px-4">
            <ReactStars {...options} />
            <span className="text-lg ml-2">
              (
              {product.numberOfReviews === 0
                ? "No reviews"
                : `${product.numberOfReviews} review${
                    product.numberOfReviews > 1 ? "s" : ""
                  }`}
              )
            </span>
          </div>
        </Link>
      </div>
    </Fragment>
  );
};

export default Product;
