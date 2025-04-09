import React, { Fragment, useState } from "react";
import CheckoutSteps from "../../components/checkoutStepper/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../../Meta/MetaData";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CartItems from "../../components/CartItems/CartItems";
import { toast } from "react-toastify";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = shippingInfo.state === "Gujarat" ? 0 : 0;

  const totalPrice = subtotal + shippingCharges;

  const address = `${shippingInfo.houseNo}, ${shippingInfo.street}, ${shippingInfo.info}, ${shippingInfo.zipCode}, ${shippingInfo.city},${shippingInfo.state},${shippingInfo.country}`;
  const phoneNo = shippingInfo.phoneNo;

  const [quantity, setQuantity] = useState(1);

  const IncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const DecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const deleteCartItems = (id) => {
    toast.error("Cannot delete product in confirm order page");
  };

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <div className="bg-black min-h-[110vh] pt-5 text-white">
        <CheckoutSteps activeStep={1} />

        <div className="flex flex-col md:flex-row w-full mt-12 px-[4vw] md:px-[2vw]">
          {/* Left Side - Shipping Info & Cart Items */}
          <div className="w-full md:w-3/5 flex flex-col justify-start">
            {/* Shipping Information */}
            <div className="w-full">
              <Typography
                style={{
                  fontSize: "25px",
                  fontWeight: 400,
                  fontFamily: "poppins",
                  marginBottom: "25px",
                }}
              >
                Shipping Info :
              </Typography>

              <div>
                <div className="flex items-center gap-1.5 mb-4 Apercu">
                  <p className="text-[20px]">
                    <strong>Name :</strong> {user.name}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 mb-4">
                  <p className="text-[20px]">
                    <strong>Phone :</strong> {phoneNo}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 mb-4">
                  <p className="text-[20px]">
                    <strong>Address :</strong> {address}
                  </p>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="pt-5">
              <Typography
                style={{
                  fontSize: "25px",
                  fontWeight: 400,
                  fontFamily: "poppins",
                  marginBottom: "25px",
                }}
              >
                Your Cart Items:
              </Typography>

              <div>
                {cartItems &&
                  cartItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="justify-center my-8 pb-2.5 w-[98%]"
                    >
                      <CartItems
                        item={item}
                        currentquantity={quantity}
                        increaseQty={IncreaseQuantity}
                        decreaseQty={DecreaseQuantity}
                        deleteCartItems={deleteCartItems}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="w-full md:w-2/5 md:border-l border-[#778899] mt-5 md:mt-0">
            <div className="px-0 md:px-8 montserrat ">
              <Typography
                style={{
                  padding: "0 1vmax 1vmax",
                  fontSize: "25px",
                  fontWeight: 400,
                  fontFamily: "poppins",
                  marginBottom: "25px",
                  textAlign: "start",
                }}
              >
                Order Summary
              </Typography>

              <div className="text-lg">
                <div className="flex justify-between my-8">
                  <p>Subtotal : </p>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between my-8">
                  <p>Shipping Charges :</p>
                  <span>{shippingCharges}</span>
                </div>
                <div className="flex justify-between my-8">
                  <p>GST :</p>
                  <span>Included</span>
                </div>
              </div>

              <div className="flex justify-between border-t border-white py-8">
                <p>
                  <b>Total :</b>
                </p>
                <span className="font-bold">₹{subtotal + shippingCharges}</span>
              </div>

              <button
                onClick={proceedToPayment}
                className="bg-[#222] text-white mb-[20vh] w-full py-5 px-8 border-none rounded-lg cursor-pointer transition duration-500 text-lg hover:bg-white hover:text-black"
              >
                Proceed To Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
