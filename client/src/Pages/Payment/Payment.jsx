import React, { Fragment, useEffect, useState } from "react";
import CheckoutSteps from "../../components/checkoutStepper/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../Meta/MetaData";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { MdOutlineArrowRightAlt, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { IoIosCheckmark, IoIosClose } from "react-icons/io";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const handlePaymentError = (error) => {
    setProcessingPayment(false);
    setLoading(false);
    toast.error(error.message || "Payment failed. Please try again.");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (paymentMethod === "online" && !razorpayLoaded) {
      toast.error("Payment system is still loading. Please wait a moment.");
      return;
    }

    if (processingPayment) {
      toast.info("Payment is already being processed. Please wait.");
      return;
    }

    try {
      setLoading(true);
      setProcessingPayment(true);

      if (paymentMethod === "online") {
        // Creating Razorpay Order
        const paymentResponse = await axios.post(
          "/api/v1/process/payment",
          { amount: orderInfo.totalPrice },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );

        if (!paymentResponse.data.success) {
          throw new Error(paymentResponse.data.message || "Failed to create payment order");
        }

        const { order_id, amount, currency } = paymentResponse.data;

        // Get Razorpay API Key
        const apiKeyResponse = await axios.get("/api/v1/razorpayapikey", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!apiKeyResponse.data.razorpayApiKey) {
          throw new Error("Payment system configuration error");
        }

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
            try {
              // Verify Payment
              const verifyRes = await axios.post(
                "/api/v1/verify",
                {
                  ...response,
                  order_id: order_id,
                  amount: amount,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );

              if (!verifyRes.data.success) {
                throw new Error(verifyRes.data.message || "Payment verification failed");
              }

              // Creating Order with Complete Payment Info
              const paymentInfo = {
                razor_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                status: "Paid",
              };

              await dispatch(
                createOrder({
                  ...order,
                  paymentInfo,
                  paymentMethod: "Online",
                  paymentStatus: "Paid",
                  amountPaid: orderInfo.totalPrice,
                })
              );

              setProcessingPayment(false);
              setLoading(false);
              navigate("/success");
            } catch (error) {
              handlePaymentError(error);
            }
          },
          prefill: {
            name: user?.name || "Guest",
            email: user?.email || "guest@example.com",
            contact: shippingInfo?.phoneNo || "",
          },
          theme: {
            color: "#32CD32",
            backdrop_color: "#000000b3",
            hide_topbar: false,
            checkout_logo: "https://res.cloudinary.com/daafwyyne/image/upload/v1745179044/kalaevaniBlack_aqwg60.png"
          },
          retry: {
            enabled: true,
            max_count: 3,
          },
          timeout: 300,
          remember_customer: true,
          send_sms_hash: false,
          allow_rotation: true,
          modal: {
            confirm_close: true,
            escape: true,
            animation: true,
            backdropclose: false,
            handleback: true,
            ondismiss: () => {
              setProcessingPayment(false);
              setLoading(false);
              toast.error(`Payment cancelled by ${user?.name || "Guest"}`);
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

        await dispatch(
          createOrder({
            ...order,
            paymentInfo,
            paymentMethod: "COD",
            paymentStatus: "Pending",
            amountPaid: 0,
          })
        );

        setProcessingPayment(false);
        setLoading(false);
        navigate("/success");
      }
    } catch (error) {
      handlePaymentError(error);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title={"Payment Process"} />
      <div className="relative min-h-screen w-full">
        <button
          onClick={handleGoBack}
          disabled={loading || processingPayment}
          className={`fixed border-none top-[10px] left-[10px] flex items-center justify-center h-10 w-10 rounded-lg bg-[#303030] ${loading || processingPayment ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          <MdOutlineKeyboardArrowLeft className="text-3xl text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </button>
        <div className="relative bg-black min-h-screen py-12 flex justify-center items-center flex-col">
          <CheckoutSteps activeStep={2} />
          <div className="w-11/12 bg-gradient-to-b from-green-900 to-green-700 mt-5 rounded-xl overflow-hidden">
            <div className="h-36 bg-green-300 rounded-b-[80px] text-white text-center pt-5">
              <h1 className="text-3xl font-light futuraLt">PAYMENT</h1>
            </div>
            <div className="bg-gradient-to-b from-green-500 to-green-400 -mt-16 mx-4 md:mx-8 text-white text-center text-xs rounded-lg py-3 flex flex-col items-center">
              <h1 className="text-5xl font-normal Apercu relative">
                <span className="text-lg absolute -left-4">₹</span>
                {orderInfo.totalPrice}
              </h1>
            </div>
            <div className="md:w-[calc(100%-65px)] w-[calc(100%-35px)] bg-green-500 rounded-lg py-3 flex gap-4 md:gap-8 md:p-5 p-2 ml-4 md:ml-8 mt-5 justify-center">
              {["cod", "online"].map((method) => (
                <div key={method} className="bg-white px-2 md:px-4 py-2 rounded">
                  <input
                    type="radio"
                    className="hidden"
                    id={method}
                    name="payment"
                    disabled={loading || processingPayment}
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                  />
                  <label
                    htmlFor={method}
                    className={`relative pl-4 md:pl-6 text-xs md:text-sm cursor-pointer font-medium text-black flex items-center gap-1 ${(loading || processingPayment) ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                  >
                    <span
                      className={`absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full transition-all ${paymentMethod === method ? "bg-green-500" : "bg-red-500"
                        }`}
                    ></span>
                    {method === "cod" ? "Cash on delivery" : "Pay Online"}
                    {paymentMethod === method ? <IoIosCheckmark className="text-green-500 text-lg" /> : <IoIosClose className="text-red-500 text-lg" />}
                  </label>
                </div>
              ))}
            </div>
            <form onSubmit={submitHandler} className="w-full">
              <div className="md:w-[calc(100%-60px)] w-[calc(100%-35px)] mx-4 md:mx-8 my-5 bg-gradient-to-b from-green-400 to-green-600 p-5 rounded-lg overflow-hidden">
                <h3 className="text-green text-sm md:text-lg mb-2 montserrat font-semibold">
                  Your details are mentioned below :
                </h3>
                <p className="text-black font-semibold Apercu text-sm md:text-lg ">
                  Name : <span className="font-light">{user.name}</span>
                </p>
                <p className="text-black font-semibold Apercu text-sm md:text-lg">
                  Contact : <span className="font-light">{shippingInfo.phoneNo}</span>
                </p>
                <p className="text-black font-semibold Apercu text-sm md:text-lg border-b border-gray-500 pb-5">
                  Address : <span className="font-light">{`${shippingInfo.houseNo}, ${shippingInfo.street}, ${shippingInfo.info}, ${shippingInfo.zipCode}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country}`}</span>
                </p>
                {cartItems.map((item, idx) => (
                  <div key={idx} className="border-b border-gray-500 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-5 items-center w-full">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-[50px] h-[50px] object-cover rounded-lg none md:flex"
                        />
                        <article>
                          <p className="block text-sm md:text-lg sm:text-[12px] text-black uppercase tracking-wide futuraLt">
                            {item.name}
                          </p>
                          <p className="text-gray-300 text-sm text-[#303030]">
                            Size : {item.size}
                          </p>
                        </article>
                      </div>
                      <div className="flex items-center gap-2 pr-2 Apercu">
                        <p className="text-black text-sm text-[#303030] flex items-center gap-2">Qty <MdOutlineArrowRightAlt className="text-black text-sm text-[#303030]" /> {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex flex-col items-end mt-3 pb-3 border-b border-gray-500">
                  <div className="flex gap-4">
                    <p className="font-bold Apercu text-sm md:text-lg">Subtotal :</p>
                    <span className="text-black text-sm md:text-lg montserrat">
                      ₹{orderInfo.subtotal}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <p className="font-bold Apercu text-sm md:text-lg">
                      Shipping Charges :
                    </p>
                    <span className="text-black text-sm md:text-lg poppins">
                      ₹{orderInfo.shippingCharges}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <p className="font-bold Apercu text-sm md:text-lg">GST :</p>
                    <span className="text-black text-sm md:text-lg poppins">
                      included
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || processingPayment || !razorpayLoaded}
                  className={`w-full mt-6 py-4 px-8 rounded-lg text-lg Apercu transition-all duration-300 ${loading || processingPayment || !razorpayLoaded
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black hover:bg-[#303030] text-white"
                    }`}
                >
                  {loading || processingPayment
                    ? "Processing Payment..."
                    : !razorpayLoaded
                      ? "Loading Payment System..."
                      : `Pay ₹${orderInfo.totalPrice} via Razorpay`}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
