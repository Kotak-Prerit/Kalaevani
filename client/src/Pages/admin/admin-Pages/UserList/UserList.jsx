import React, { useEffect, useState } from "react";
import "../ProductList/ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideBar from "../../admin-components/Sidebar/Sidebar";
import { toast } from "sonner";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from "@mui/material";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import MetaData from "../../../../Meta/MetaData";
import { DELETE_USER_RESET, UPDATE_USER_RESET } from "../../../../constants/userConstants";
import {
  getAllUsers,
  clearErrors,
  deleteUser,
  updateUser
} from "../../../../actions/userAction";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for delete dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // State for edit dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  const { error, users } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message: deleteMessage,
    loading: deleteLoading
  } = useSelector((state) => state.profile);

  const {
    error: updateError,
    isUpdated,
    loading: updateLoading
  } = useSelector((state) => state.profile);

  // Delete handlers
  const handleDeleteDialogOpen = (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteId(null);
    setDeleteDialogOpen(false);
  };

  const deleteUserHandler = () => {
    if (deleteId) {
      dispatch(deleteUser(deleteId));
      handleDeleteDialogClose();
    }
  };

  // Edit handlers
  const handleEditDialogOpen = (id, currentRole) => {
    setEditId(id);
    setSelectedRole(currentRole);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditId(null);
    setSelectedRole("");
    setEditDialogOpen(false);
  };

  const updateRoleHandler = () => {
    if (editId && selectedRole) {
      const userData = {
        role: selectedRole
      };
      dispatch(updateUser(editId, userData));
      handleEditDialogClose();
    }
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

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success(deleteMessage);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
      dispatch(getAllUsers());
    }

    if (isUpdated) {
      toast.success("User Role Updated Successfully");
      dispatch({ type: UPDATE_USER_RESET });
      dispatch(getAllUsers());
    }

    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, updateError, isDeleted, isUpdated, navigate, deleteMessage]);

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
          <div className="flex items-center justify-center w-full h-full gap-2">
            <Button
              className="productEdit flex items-center justify-center"
              onClick={() => handleEditDialogOpen(params.row.id, params.row.role)}
              disabled={updateLoading || deleteLoading}
            >
              <CiEdit className="productEditIcon" />
            </Button>
            <Button
              className="productDeleteBtn"
              onClick={() => handleDeleteDialogOpen(params.row.id)}
              disabled={updateLoading || deleteLoading}
            >
              <AiOutlineDelete className="productDeleteBtnIcon" />
            </Button>
          </div>
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
      <MetaData title={`User Management`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <p className="dashboardHeading poppins">All Users</p>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 25 },
              },
            }}
            pageSizeOptions={[25]}
            disableRowSelectionOnClick
            className="productListTable"
          />

          {/* Delete Dialog */}
          <Dialog
            open={deleteDialogOpen}
            onClose={handleDeleteDialogClose}
            aria-labelledby="delete-dialog-title"
          >
            <DialogTitle id="delete-dialog-title">
              Delete User
            </DialogTitle>
            <DialogContent>
              Are you sure you want to delete this user?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteDialogClose} disabled={deleteLoading}>
                Cancel
              </Button>
              <Button
                onClick={deleteUserHandler}
                autoFocus
                color="error"
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Edit Role Dialog */}
          <Dialog
            open={editDialogOpen}
            onClose={handleEditDialogClose}
            aria-labelledby="edit-dialog-title"
          >
            <DialogTitle id="edit-dialog-title">
              Update User Role
            </DialogTitle>
            <DialogContent>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="role-select-label">Role</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="role-select"
                  value={selectedRole}
                  label="Role"
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditDialogClose} disabled={updateLoading}>
                Cancel
              </Button>
              <Button
                onClick={updateRoleHandler}
                color="primary"
                disabled={updateLoading || selectedRole === ""}
              >
                {updateLoading ? "Updating..." : "Update"}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserList;