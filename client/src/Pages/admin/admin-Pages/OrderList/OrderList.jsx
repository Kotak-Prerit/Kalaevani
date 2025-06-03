import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllOrders,
  clearErrors,
  deleteOrder,
} from "../../../../actions/orderAction";
import MetaData from "../../../../Meta/MetaData";
import SideBar from "../../admin-components/Sidebar/Sidebar";
import { toast } from "sonner";
import { FaPencil } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import QuoteLoader from "../../../../utils/QuoteLoader/QuoteLoader";
import "../ProductList/ProductList.css";
import { DELETE_ORDER_RESET } from "../../../../constants/orderConstants";

const OrderList = () => {
  const dispatch = useDispatch();
  const { error, orders, loading } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  // State for delete dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, isDeleted]);

  // Delete handlers
  const handleDeleteDialogOpen = (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteId(null);
    setDeleteDialogOpen(false);
  };

  const deleteOrderHandler = () => {
    dispatch(deleteOrder(deleteId));
    handleDeleteDialogClose();
  };

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 200,
      flex: 1,
    },
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
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.3,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-center w-full h-full gap-2">
            <Link to={`/admin/order/${params.row.id}`}>
              <FaPencil className="productEditIcon" />
            </Link>
            <Button
              className="productDeleteBtn"
              onClick={() => handleDeleteDialogOpen(params.row.id)}
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
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <Fragment>
      <MetaData title="All Orders - Admin" />
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 className="productListHeading">ALL ORDERS</h1>
          {loading ? (
            <QuoteLoader />
          ) : (
            <div className="productListTable">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListGrid"
                autoHeight
              />
            </div>
          )}

          {/* Delete Dialog */}
          <Dialog
            open={deleteDialogOpen}
            onClose={handleDeleteDialogClose}
            aria-labelledby="delete-dialog-title"
          >
            <DialogTitle id="delete-dialog-title">Delete Order</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this order?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteDialogClose}>Cancel</Button>
              <Button onClick={deleteOrderHandler} autoFocus color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
