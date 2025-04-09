import React, { Fragment } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../../Meta/MetaData";
import CartItems from "../../components/CartItems/CartItems";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import logoWhite from "../../assets/kalaevaniWhite.webp";
import Marquee from "react-fast-marquee";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);
  const navigate = useNavigate();

  const increaseQauntity = (id, quantity, size) => {
    const newQty = quantity + 1;
    const product = products.find((item) => item._id === id);
    if (product) {
      const sizeData = product.sizes.find((item) => item.name === size);
      if (sizeData) {
        if (quantity >= sizeData.quantity) {
          toast.error("Maximum quantity reached for this size");
          return;
        }
        dispatch(addItemsToCart(id, newQty, size));
      }
    }
  };

  const decreaseQauntity = (id, quantity, size) => {
    const newQty = quantity - 1;
    if (quantity <= 1) {
      return;
    }
    dispatch(addItemsToCart(id, newQty, size));
  };

  const deleteCartItems = (id, size) => {
    dispatch(removeItemsFromCart(id, size));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Fragment>
      <MetaData title={"Cart"} />
      <div className="bg-black min-h-screen pb-[5vh]">
        <Navbar props={logoWhite} />
        <div className="flex justify-end">
          <main className="w-full">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center mt-5">
                <p className="text-white font-black text-[5vmax] text-center poppins">
                  Your cart is empty.
                </p>
                <div className="w-full my-6 flex justify-center">
                  <Link
                    to="/products"
                    className="border rounded-full py-5 px-8 border-white text-lg font-semibold text-white uppercase hover:bg-white hover:text-black transition"
                  >
                    Explore Wearables
                  </Link>
                </div>
                <div className="relative w-full overflow-hidden border-t border-white py-4 mt-5">
                  <Marquee autoFill>
                    <p className="mr-2 text-6xl text-white pb-10 uppercase montserrat">
                      cart
                    </p>
                  </Marquee>
                </div>
                <div className="relative w-full overflow-hidden border-t border-b border-white py-4">
                  <Marquee autoFill direction="right">
                    <p className="mr-2 text-6xl text-white uppercase montserrat">
                      empty
                    </p>
                  </Marquee>
                </div>
                <div className="mt-20 text-white text-center font-semibold ">
                  <p className="text-[3vmax] Apercu">
                    Keep Exploring... <br /> We've got amazing wearables for
                    you. <br /> Click on{" "}
                    <strong>
                      <Link to={"/products"} className="text-twitter">
                        Explore wearables
                      </Link>
                    </strong>{" "}
                    button above <br />
                    to buy your first product
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-10 px-6 mt-5 md:mt-16 ">
                <div className="flex justify-between items-center">
                  <p className="uppercase text-gray-500 text-sm font-medium">
                    cart
                  </p>
                  <p className="uppercase text-gray-500 text-sm font-medium">
                    quantity
                  </p>
                  <p className="uppercase text-gray-500 text-sm font-medium">
                    subtotal
                  </p>
                </div>

                {cartItems.map((item, idx) => (
                  <CartItems
                    key={idx}
                    item={item}
                    quantity={item.quantity}
                    stock={item.stock}
                    increaseQty={increaseQauntity}
                    decreaseQty={decreaseQauntity}
                    deleteCartItems={deleteCartItems}
                  />
                ))}

                <div className="mt-[5vh] w-full flex justify-end">
                  <div className="w-full md:w-1/2">
                    <div className="flex justify-between items-center mb-4">
                      <p className="font-bold text-base text-white uppercase">
                        delivery :
                      </p>
                      <p className="text-sm poppins text-shipping capitalize">
                        shipping calculated at checkout.
                      </p>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <p className="font-bold text-lg text-white uppercase">
                        Gross Total
                      </p>
                      <p className="font-bold text-2xl text-twitter Apercu">
                        ₹{subtotal}
                      </p>
                    </div>
                    <button
                      onClick={checkoutHandler}
                      className="w-full border rounded-full py-5 text-lg font-black text-white bg-transparent border-white hover:bg-white hover:text-black transition montserrat"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
                <div className="mt-[10vh] flex items-start text-white">
                  <p className="text-[5vw] leading-tight poppins">
                    Thank you for embracing our artistry! Your fashion inspires
                    us to create more uniqueness
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;
