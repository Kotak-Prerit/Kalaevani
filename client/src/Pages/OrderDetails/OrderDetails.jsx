import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../Meta/MetaData";
import { Link } from "react-router-dom";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import logo from "../../assets/kalaevaniBlack.webp";
import QuoteLoader from "../../utils/QuoteLoader/QuoteLoader";

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading || !order) {
    return <QuoteLoader />;
  }
  return (
    <Fragment>
      <MetaData title="Order Details" />
      <div className="bg-white mb-24 font-poppins px-[5vw] pt-[4vh] poppins">
        <Link to={"/"}>
          <img src={logo} alt="logo" className="mb-[3vh] h-[60px] w-auto" />
        </Link>

        <h1 className="text-3xl font-bold mb-16 text-black">
          Order #{order?.paymentInfo?.razor_order_id}
        </h1>

        <h3 className="text-xl font-semibold mb-4">Shipping Info</h3>
        <div className="my-8">
          <div className="flex mb-4">
            <p className="font-semibold text-base text-black">Name:</p>
            <span className="ml-4 text-base">{order.user?.name}</span>
          </div>
          <div className="flex mb-4">
            <p className="font-semibold text-base text-black">Phone:</p>
            <span className="ml-4 text-base">
              {order.shippingInfo?.phoneNo}
            </span>
          </div>
          <div className="flex mb-4">
            <p className="font-semibold text-base text-black">Address:</p>
            <span className="ml-4 text-base">
              {order.shippingInfo &&
                `${order.shippingInfo.houseNo}, ${order.shippingInfo.street}, ${order.shippingInfo.info}, ${order.shippingInfo.zipCode}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.country}`}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-4">Payment</h3>
        <div className="my-8">
          <div className="flex mb-4">
            <p className="font-semibold text-base text-black">
              Payment Method:
            </p>
            <span className="ml-4 text-base">
              {order.paymentMethod ||
                "Your order might be older and made before v1.0 is launched"}
            </span>
          </div>
          <div className="flex mb-4">
            <p className="font-semibold text-base text-black">Order Amount:</p>
            <span className="ml-4 text-base">
              ₹
              {order.totalPrice ||
                "Your order might be older and made before v1.0 is launched"}
            </span>
          </div>
          <div className="flex mb-4">
            <p className="font-semibold text-base text-black">
              Payment Status:
            </p>
            <span
              className={`ml-4 text-base ${
                order.paymentStatus === "Paid"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {order.paymentStatus}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-4">Order Status</h3>
        <div className="my-8">
          <div className="flex mb-4">
            <p
              className={`text-base font-semibold ${
                order.orderStatus === "Delivered"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {order.orderStatus}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-8 mt-8">
          <h3 className="text-xl font-semibold mb-6">Ordered Item:</h3>
          <div className="flex flex-col gap-6">
            {order.orderItems?.map((item) => (
              <div
                key={item.product}
                className="flex justify-between items-center border p-5 flex-wrap"
              >
                <div className="flex items-center gap-5 flex-wrap">
                  <img
                    src={item.image}
                    alt="Product"
                    className="w-12 sm:w-20"
                  />
                  <div>
                    <Link
                      to={`/product/${item.product}`}
                      className="font-medium text-black no-underline block"
                    >
                      {item.name}
                    </Link>
                    <p>Size: {item.size}</p>
                  </div>
                </div>
                <span className="text-gray-700 text-sm sm:text-base">
                  {item.quantity} X ₹{item.price} ={" "}
                  <b>₹{item.price * item.quantity}</b>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-12 flex justify-center items-center mt-12">
          <button
            className="bg-[#2d2d2d] text-white text-lg px-6 py-3 rounded-lg hover:bg-black transition duration-300"
            onClick={handlePrint}
          >
            Download Invoice
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderDetails;
