import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../../../../Meta/MetaData";
import { Link, useParams } from "react-router-dom";
import SideBar from "../../admin-components/Sidebar/Sidebar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { UPDATE_ORDER_RESET } from "../../../../constants/orderConstants";
import QuoteLoader from "../../../../utils/QuoteLoader/QuoteLoader";

const ProcessOrder = ({ history, match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const { id } = useParams();

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  const dispatch = useDispatch();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id, isUpdated, updateError]);

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="flex">
        <SideBar />
        <div className="absolute top-0 right-0 w-4/5 p-6 bg-gray-100 min-h-screen h-full overflow-y-auto max-h-screen">
          {loading || !order ? (
            <QuoteLoader />
          ) : (
            <div className={`w-full pb-20 ${order.orderStatus === "Delivered" ? "block" : "grid grid-cols-1 lg:grid-cols-2 gap-6"}`}>
              <div className="space-y-6">
                {/* Shipping Info */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Shipping Info</h3>
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-start">
                      <p className="font-medium text-gray-600 min-w-[100px]">Name:</p>
                      <span className="text-gray-800">{order.user?.name || "N/A"}</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-start">
                      <p className="font-medium text-gray-600 min-w-[100px]">Phone:</p>
                      <span className="text-gray-800">{order.shippingInfo?.phoneNo || "N/A"}</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-start">
                      <p className="font-medium text-gray-600 min-w-[100px]">Address:</p>
                      <span className="text-gray-800">
                        {order.shippingInfo
                          ? `${order.shippingInfo.houseNo || ""}, ${order.shippingInfo.street || ""
                          }, ${order.shippingInfo.info || ""}, ${order.shippingInfo.zipCode || ""
                          }, ${order.shippingInfo.city || ""}, ${order.shippingInfo.state || ""
                          }, ${order.shippingInfo.country || ""}`
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Payment</h3>
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-start">
                      <p className="font-medium text-gray-600">Cash on Delivery (COD)</p>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-start">
                      <p className="font-medium text-gray-600 min-w-[100px]">Amount:</p>
                      <span className="text-gray-800">₹{order.totalPrice || 0}</span>
                    </div>
                  </div>
                </div>

                {/* Order Status */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Order Status</h3>
                  <div>
                    <p className={`inline-block px-3 py-1 rounded-md font-medium ${order.orderStatus && order.orderStatus === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : order.orderStatus === "Shipped"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                      }`}>
                      {order.orderStatus || "Processing"}
                    </p>
                  </div>
                </div>

                {/* Cart Items */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Your Cart Items:</h3>
                  <div className="space-y-4">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div
                          key={item.product}
                          className="flex flex-col md:flex-row items-center justify-between p-3 border-b border-gray-200 last:border-b-0"
                        >
                          <div className="flex flex-col md:flex-row items-center mb-3 md:mb-0">
                            <img src={item.image} alt="Product" className="w-16 h-16 object-cover rounded-md mr-4" />
                            <Link
                              to={`/product/${item.product}`}
                              className="text-gray-800 hover:text-blue-600 font-medium"
                            >
                              {item.name} <br /> <span className="text-sm text-gray-600">Size: {item.size}</span>
                            </Link>
                          </div>
                          <span className="text-gray-800">
                            {item.quantity} X ₹{item.price} ={" "}
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Process Order Form */}
              {order.orderStatus !== "Delivered" && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <form
                    className="space-y-4"
                    onSubmit={updateOrderSubmitHandler}
                  >
                    <h1 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Process Order</h1>

                    <div>
                      <select
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      >
                        <option value="">Choose Status</option>
                        {order.orderStatus === "Processing" && (
                          <option value="Shipped">Shipped</option>
                        )}

                        {order.orderStatus === "Shipped" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      disabled={loading || status === ""}
                    >
                      Process
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
