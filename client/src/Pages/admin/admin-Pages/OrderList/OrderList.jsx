import React, { useEffect } from "react";
import "../ProductList/ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, deleteOrder } from "../../../../actions/orderAction";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../../admin-components/Sidebar/Sidebar";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
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

  //   const productList = adminProducts?.products || [];

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
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
      navigate("/admin/orders897451569418741");
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
          <React.Fragment>
            <Link to={`/admin/order/${params.row.id}`} className="productEdit">
              <CiEdit className="productEditIcon" />
            </Link>
            <Button
              className="productDeleteBtn"
              onClick={() => deleteOrderHandler(params.row.id)}
            >
              <AiOutlineDelete className="productDeleteBtnIcon" />
            </Button>
          </React.Fragment>
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
