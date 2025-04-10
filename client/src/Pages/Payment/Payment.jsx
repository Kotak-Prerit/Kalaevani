import React, { Fragment, useEffect, useState } from "react";
import CheckoutSteps from "../../components/checkoutStepper/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../Meta/MetaData";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartItems from "../../components/CartItems/CartItems";
import axios from "axios";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("online");

  const dispatch = useDispatch();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const navigate = useNavigate();

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const increaseQauntity = () => {
    toast.error("cannot change quantity while payment");
  };

  const decreaseQauntity = () => {
    toast.error("cannot change quantity while payment");
  };

  const deleteCartItems = () => {
    toast.error("Cannot delete Item while payment");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (paymentMethod === "online") {
        setLoading(true);

        // Creating Razorpay Order
        const paymentResponse = await axios.post(
          "/api/v1/process/payment",
          { amount: orderInfo.totalPrice },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const { order_id, amount, currency } = await paymentResponse.data;

        // Get Razorpay API Key
        const apiKeyResponse = await axios.get("/api/v1/razorpayapikey", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const { razorpayApiKey } = apiKeyResponse.data;

        // Open Razorpay Checkout
        const options = {
          key: razorpayApiKey,
          amount: amount,
          currency: currency,
          name: "Kalaevani",
          description: "Wear your Emotions",
          order_id: order_id,
          handler: async (response) => {
            // Verify Payment
            const verifyRes = await axios.post("/api/v1/verify", response, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });

            if (verifyRes.data.success) {
              // Creating Order with Complete Payment Info
              const paymentInfo = {
                razor_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                status: "Paid",
              };

              dispatch(
                createOrder({
                  ...order,
                  paymentInfo,
                  paymentMethod: "Online",
                  paymentStatus: "Paid",
                  amountPaid: orderInfo.totalPrice,
                })
              ).then(() => {
                navigate("/success");
              });
            } else {
              alert("Payment Verification Failed!");
            }
            setLoading(false);
          },
          prefill: {
            name: user?.name || "Guest",
            email: user?.email || "guest@example.com",
            contact: shippingInfo?.phoneNo || "9999999999",
          },
          modal: {
            ondismiss: () => {
              // User closed the modal without payment
              toast.error("Payment cancelled.");
              setLoading(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Handle Cash on Delivery (COD)
        const fakeOrderId = `order_${Math.random().toString(36).substr(2, 9)}`;
        const paymentInfo = {
          razor_order_id: fakeOrderId,
          razorpay_payment_id: `COD-order_pay_${Math.random()
            .toString(36)
            .substr(2, 9)}`,
          razorpay_signature: `COD-order_sig_${Math.random()
            .toString(36)
            .substr(2, 9)}`,
          status: "Pending",
        };

        dispatch(
          createOrder({
            ...order,
            paymentInfo,
            paymentMethod: "COD",
            paymentStatus: "Pending",
            amountPaid: 0,
          })
        ).then(() => {
          navigate("/success");
        });
      }
    } catch (error) {
      toast.error("An error occurred during payment processing");
      setLoading(false);
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const address = `${shippingInfo.houseNo}, ${shippingInfo.street}, ${shippingInfo.info}, ${shippingInfo.zipCode}, ${shippingInfo.city},${shippingInfo.state},${shippingInfo.country}`;
  return (
    <Fragment>
      <MetaData title={"Payment Process"} />
      <div className="bg-black min-h-screen py-12 flex justify-center items-center flex-col">
        <CheckoutSteps activeStep={2} />
        <div className="w-11/12 bg-gradient-to-b from-green-900 to-green-700 mt-5 rounded-xl overflow-hidden">
          <div className="h-36 bg-green-300 rounded-b-[80px] text-white text-center pt-5">
            <h1 className="text-3xl font-light futuraLt">PAYMENT</h1>
          </div>
          <div className="bg-gradient-to-b from-green-500 to-green-400 -mt-16 mx-8 text-white text-center text-xs rounded-lg py-3 flex flex-col items-center">
            <h1 className="text-5xl font-normal Apercu relative">
              <span className="text-lg absolute -left-4">₹</span>
              {orderInfo.totalPrice}
            </h1>
          </div>
          <div className="w-[calc(100%-65px)] bg-green-500 rounded-lg py-3 flex gap-8 p-5 ml-8 mt-5 justify-center">
            {["cod", "online"].map((method) => (
              <div key={method} className="bg-white px-4 py-2 rounded">
                <input
                  type="radio"
                  className="hidden"
                  id={method}
                  name="payment"
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                />
                <label
                  htmlFor={method}
                  className="relative pl-6 text-base cursor-pointer font-medium text-black"
                >
                  <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full transition-all ${
                      paymentMethod === method ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                  {method === "cod" ? "Cash on delivery" : "Pay Online"}
                </label>
              </div>
            ))}
          </div>
          <form onSubmit={submitHandler} className="w-full">
            <div className="w-[calc(100%-60px)] mx-8 my-5 bg-gradient-to-b from-green-400 to-green-600 p-5 rounded-lg overflow-hidden">
              <h3 className="text-green text-lg mb-2 montserrat font-semibold">
                Your details are mentioned below
              </h3>
              <p className="text-black font-semibold Apercu text-xl ">
                Name : <span className="font-light">{user.name}</span>
              </p>
              <p className="text-black font-semibold Apercu text-xl">
                Contact :{" "}
                <span className="font-light">{shippingInfo.phoneNo}</span>
              </p>
              <p className="text-black font-semibold Apercu text-xl border-b border-gray-500 pb-5">
                Address : <span className="font-light">{address}</span>
              </p>
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
              <div className="flex flex-col items-end mt-3 pb-3 border-b border-gray-500">
                <div className="flex gap-4">
                  <p className="font-bold Apercu text-xl ">Subtotal :</p>
                  <span className="text-black text-lg montserrat">
                    ₹{orderInfo.subtotal}
                  </span>
                </div>
                <div className="flex gap-4">
                  <p className="font-bold Apercu text-xl">Shipping Charges :</p>
                  <span className="text-black text-lg poppins">
                    ₹{orderInfo.shippingCharges}
                  </span>
                </div>
                <div className="flex gap-4">
                  <p className="font-bold Apercu text-xl">GST :</p>
                  <span className="text-black text-lg poppins">included</span>
                </div>
              </div>
              <div className="text-black poppins text-right text-xl font-bold py-2">
                Grand Total :{" "}
                <span className="montserrat">₹ {orderInfo.totalPrice}</span>
              </div>
            </div>
            <input
              type="submit"
              disabled={loading}
              value={
                paymentMethod === "online"
                  ? "Pay with Razorpay"
                  : "Reserve Order via Cash on Delivery"
              }
              className="bg-green-400 hover:bg-green-900 transition-all text-black hover:text-white w-[calc(100%-60px)] mx-8 mb-5 py-3 rounded-lg text-lg cursor-pointer Apercu tracking-wide"
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
