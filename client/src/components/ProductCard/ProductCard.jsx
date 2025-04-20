import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    size: 20,
    edit: false,
    isHalf: true,
  };

  return (
    <Fragment>
      <div className="w-[300px] h-[400px] flex flex-col items-center justify-center relative border border-black">
        <Link to={`/product/${product._id}`} className="w-full h-[350px] overflow-hidden">
          <div className="relative h-full w-full group cursor-pointer">
            <img
              src={product.images[0]?.url}
              alt={product.name}
              className="w-full h-[400px] object-cover transition-opacity duration-300 group-hover:opacity-0"
            />
            <img
              src={product.images[2]?.url || product.images[0]?.url}
              alt={product.name}
              className="w-full h-[400px] object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </div>
        </Link>
        <Link to={`/product/${product._id}`} className="w-full bg-white border border-t-black p-3">
          <div className="w-full flex items-center px-1 justify-between bg-white">
            <p className="text-[14px] futuraLt">{product.name}</p>
            <span className="text-[14px] font-montserrat font-medium">
              ₹{product.price}
            </span>
          </div>
          <div className="flex items-center gap-2 px-1">
            <Rating {...options} />
            <span className="text-[12px] font-montserrat">
              ({product.numberOfReviews} Reviews)
            </span>
          </div>
        </Link>
      </div>
    </Fragment>
  );
};

export default ProductCard;
