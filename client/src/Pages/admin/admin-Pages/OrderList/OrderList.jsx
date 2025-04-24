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
import { Button } from "@mui/material";
import { UPDATE_ORDER_RESET } from "../../../../constants/orderConstants";
import "../ProccessOrder/processOrder.css";
import QuoteLoader from "../../../../utils/QuoteLoader/QuoteLoader";

const ProcessOrder = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrder(id, myForm));
  };

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

  const getStatusClass = (status) => {
    switch (status) {
      case "Processing":
        return "status-processing";
      case "Shipped":
        return "status-shipped";
      case "Delivered":
        return "status-delivered";
      default:
        return "";
    }
  };

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        {loading ? (
          <QuoteLoader />
        ) : (
          <div className="processOrder-container">
            <div className="processOrder-grid">
              <div>
                <div className="shipping-payment-section">
                  <h3 className="section-title">Shipping Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <p className="info-label">Name</p>
                      <p className="info-value">{order.user && order.user.name}</p>
                    </div>
                    <div className="info-item">
                      <p className="info-label">Phone</p>
                      <p className="info-value">
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </p>
                    </div>
                    <div className="info-item">
                      <p className="info-label">Address</p>
                      <p className="info-value">
                        {order.shippingInfo &&
                          `${order.shippingInfo.houseNo}, ${order.shippingInfo.street}, ${order.shippingInfo.info}, ${order.shippingInfo.zipCode}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.country}`}
                      </p>
                    </div>
                  </div>

                  <h3 className="section-title">Payment Details</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <p className="info-label">Method</p>
                      <p className="info-value">Cash on Delivery (COD)</p>
                    </div>
                    <div className="info-item">
                      <p className="info-label">Total Amount</p>
                      <p className="info-value">₹{order.totalPrice && order.totalPrice}</p>
                    </div>
                  </div>

                  <h3 className="section-title">Order Status</h3>
                  <div className="info-item">
                    <p className={`order-status ${getStatusClass(order.orderStatus)}`}>
                      {order.orderStatus}
                    </p>
                  </div>
                </div>

                <div className="cart-items-section">
                  <h3 className="section-title">Order Items</h3>
                  <div className="cart-items-container">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product} className="cart-item">
                          <img src={item.image} alt="Product" />
                          <div className="item-details">
                            <Link to={`/product/${item.product}`} className="item-name">
                              {item.name}
                            </Link>
                            <span className="item-size">Size: {item.size}</span>
                          </div>
                          <div className="item-price">
                            {item.quantity} × ₹{item.price} =
                            <strong> ₹{item.price * item.quantity}</strong>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {order.orderStatus !== "Delivered" && (
                <div className="update-status-section">
                  <h3 className="section-title">Update Status</h3>
                  <form onSubmit={updateOrderSubmitHandler}>
                    <select
                      className="status-select"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Choose Status</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}
                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                    <Button
                      className="update-button"
                      type="submit"
                      disabled={loading || status === ""}
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      {loading ? "Updating..." : "Update Status"}
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ProcessOrder;