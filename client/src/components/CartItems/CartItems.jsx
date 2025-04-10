import React from "react";
import { Link } from "react-router-dom";
import { IoTrash } from "react-icons/io5";

const CartItems = ({ increaseQty, decreaseQty, deleteCartItems, item }) => {
  return (
    <div className="border-b border-gray-500 py-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-5 items-center w-1/3">
          <img
            src={item.image}
            alt={item.name}
            className="w-[50px] h-[50px] object-cover rounded-lg"
          />
          <article>
            <Link
              to={`/product/${item.product}`}
              className="block text-white uppercase tracking-wide futuraLt"
            >
              {item.name}
            </Link>
            <p className="text-gray-300 text-sm">Size : {item.size}</p>
          </article>
        </div>
        <div className="flex items-center gap-3 w-1/5">
          <button
            type="button"
            className="px-3 py-1 bg-transparent text-white text-lg rounded hover:bg-gray-700"
            onClick={() => decreaseQty(item.product, item.quantity, item.size)}
          >
            -
          </button>
          <input
            type="number"
            value={item.quantity}
            readOnly
            className="w-12 bg-transparent text-center text-white text-lg border-none rounded focus:outline-none"
          />
          <button
            type="button"
            className="px-3 py-1 bg-transparent text-white text-lg rounded hover:bg-gray-700"
            onClick={() => increaseQty(item.product, item.quantity, item.size)}
          >
            +
          </button>
        </div>
        <div className="flex items-center gap-4 w-1/5 justify-end">
          <p className="text-white font-semibold text-lg montserrat">
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
