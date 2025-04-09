import React, { useEffect } from "react";
import "../ProductList/ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../../admin-components/Sidebar/Sidebar";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import MetaData from "../../../../Meta/MetaData";
import { DELETE_PRODUCT_RESET } from "../../../../constants/productConstants";
import {
  getAllUsers,
  clearErrors,
  deleteUser,
} from "../../../../actions/userAction";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
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
      toast.success(message);
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, isDeleted, navigate, message]);

  const columns = [
    { field: "id", headerName: "User ID", minwidth: 200, flex: 0.8 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 250,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
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
            <Link to={`/admin/users`} className="productEdit">
              <CiEdit className="productEditIcon" />
            </Link>
            <Button
              className="productDeleteBtn"
              onClick={() => deleteUserHandler(params.row.id)}
            >
              <AiOutlineDelete className="productDeleteBtnIcon" />
            </Button>
          </React.Fragment>
        );
      },
    },
  ];
  const rows = [];
  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <React.Fragment>
      <MetaData title={`Product Management`} />

      {/* {isAuthenticated && user.role === "admin" ? ( */}
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <p className="dashboardHeading poppins">All Users</p>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableRowSelectionOnClick
            className="productListTable"
          />
        </div>
      </div>
      {/* ) : (
        <div className="unauthorized flex justify-center items-center Apercu">
          <p>You don't Belong here</p>
        </div>
      )} */}
    </React.Fragment>
  );
};

export default UserList;
