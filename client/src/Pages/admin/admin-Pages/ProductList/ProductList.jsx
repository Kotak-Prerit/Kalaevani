import React, { useEffect } from "react";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteProduct,
  getAdminProducts,
} from "../../../../actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../../admin-components/Sidebar/Sidebar";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import MetaData from "../../../../Meta/MetaData";
import { DELETE_PRODUCT_RESET } from "../../../../constants/productConstants";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, products } = useSelector((state) => state.adminProduct);
  // const { isAuthenticated, user } = useSelector((state) => state.user);

  const productList = products || [];

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteProduct
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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
      toast.success("Product deleted successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProducts());
  }, [dispatch, error, deleteError, isDeleted, navigate]);

  const columns = [
    {
      field: "productImage",
      headerName: "Image",
      minWidth: 100,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <img
            src={params.value}
            alt="product"
            style={{ width: "auto", height: "50px" }}
          />
        );
      },
    },
    { field: "id", headerName: "Product ID", minwidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
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
            <Link
              to={`/admin/product/${params.row.id}`}
              className="productEdit"
            >
              <CiEdit className="productEditIcon" />
            </Link>
            <Button
              className="productDeleteBtn"
              onClick={() => deleteProductHandler(params.row.id)}
            >
              <AiOutlineDelete className="productDeleteBtnIcon" />
            </Button>
          </React.Fragment>
        );
      },
    },
  ];
  const rows = [];
  productList &&
    productList.forEach((item) => {
      rows.push({
        productImage: item.images[4].url,
        id: item._id,
        stock: item.Stock,
        price: `₹${item.price}`,
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
          <p className="dashboardHeading poppins">All Products</p>
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

export default ProductList;
