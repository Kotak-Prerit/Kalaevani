import React from "react";
import { Link } from "react-router-dom";
import { IoTrash } from "react-icons/io5";

const CartItems = ({ increaseQty, decreaseQty, deleteCartItems, item }) => {
  return (
    <div className="border-b border-gray-500 py-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-5 items-center md:w-1/3 w-2/4">
          <img
            src={item.image}
            alt={item.name}
            className="w-[50px] h-[50px] object-cover rounded-lg none md:flex"
          />
          <article>
            <Link
              to={`/product/${item.product}`}
              className="block text-sm md:text-lg sm:text-[12px] text-white uppercase tracking-wide futuraLt"
            >
              {item.name}
            </Link>
            <p className="text-gray-300 text-sm">Size : {item.size}</p>
          </article>
        </div>
        <div className="flex items-center md:gap-3 gap-0 md:w-1/3 w-1/4 justify-center">
          <button
            type="button"
            className="px-1 md:px-3 py-1 bg-transparent text-white text-lg rounded hover:bg-gray-700"
            onClick={() => decreaseQty(item.product, item.quantity, item.size)}
          >
            -
          </button>
          <input
            type="number"
            value={item.quantity}
            readOnly
            className="w-7 md:w-12 bg-transparent text-center text-white text-lg border-none rounded focus:outline-none"
          />
          <button
            type="button"
            className="px-1 md:px-3py-1 bg-transparent text-white text-lg rounded hover:bg-gray-700"
            onClick={() => increaseQty(item.product, item.quantity, item.size)}
          >
            +
          </button>
        </div>
        <div className="flex items-center gap-2 md:gap-4 md:w-1/3 w-1/4 justify-end">
          <p className="text-white font-semibold montserrat text-[12px] md:text-lg">
            ₹ {item.quantity * item.price}
          </p>
          <IoTrash
            className="text-white text-xl cursor-pointer hover:text-red-500"
            onClick={() => deleteCartItems(item.product, item.size)}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItems;
