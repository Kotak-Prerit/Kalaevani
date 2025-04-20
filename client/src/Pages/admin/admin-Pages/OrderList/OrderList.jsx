import React, { useEffect, useState } from "react";
import "../ProductList/ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, deleteOrder } from "../../../../actions/orderAction";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../../admin-components/Sidebar/Sidebar";
import { toast } from "sonner";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import MetaData from "../../../../Meta/MetaData";
import { getAllOrders } from "../../../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../../../constants/orderConstants";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, orders } = useSelector((state) => state.allOrders);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleClickOpen = (id) => {
    setOrderId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteOrderHandler = () => {
    dispatch(deleteOrder(orderId));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Order deleted successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, navigate, isDeleted, deleteError]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "size",
      headerName: "Item Size",
      type: "string",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-center w-full h-full">
            <Link to={`/admin/order/${params.row.id}`} className="productEdit flex items-center justify-center">
              <CiEdit className="productEditIcon" />
            </Link>
            <Button
              className="productDeleteBtn"
              onClick={() => handleClickOpen(params.row.id)}
            >
              <AiOutlineDelete className="productDeleteBtnIcon" />
            </Button>
          </div>
        );
      },
    },
  ];
  const rows = [];
  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        status: item.orderStatus,
        itemsQty: item.orderItems.reduce((acc, curr) => acc + curr.quantity, 0),
        size: item.orderItems.map((orderItem) => orderItem.size).join(", "),
        amount: `₹${item.totalPrice}`,
      });
    });

  return (
    <React.Fragment>
      <MetaData title={`Order Management`} />

      {isAuthenticated && user.role === "admin" ? (
        <div className="dashboard">
          <SideBar />
          <div className="productListContainer">
            <p className="dashboardHeading poppins">All Orders</p>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableRowSelectionOnClick
              className="productListTable"
            />
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Delete Order"}
              </DialogTitle>
              <DialogContent>
                Are you sure you want to delete this order?
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={deleteOrderHandler} autoFocus>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      ) : (
        <div className="unauthorized flex justify-center items-center Apercu">
          <p>You don't Belong here</p>
        </div>
      )}
    </React.Fragment>
  );
};

export default ProductList;
