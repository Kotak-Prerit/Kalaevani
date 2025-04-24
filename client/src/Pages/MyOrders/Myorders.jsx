import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import MetaData from "../../Meta/MetaData";
import Navbar from "../../components/Navbar/Navbar";
import { MdOutlineFileDownload } from "react-icons/md";
import logo from "../../assets/kalaevaniBlack.webp";
import Footer from "../../components/Footer/Footer";

const MyOrders = () => {
  const dispatch = useDispatch();

  const { error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      minWidth: window.innerWidth <= 600 ? 110 : 300,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: window.innerWidth <= 600 ? 70 : 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Qty",
      type: "number",
      minWidth: window.innerWidth <= 600 ? 70 : 150,
      flex: 0.3,
    },
    {
      field: "size",
      headerName: " Size",
      type: "string",
      minWidth: window.innerWidth <= 600 ? 70 : 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: window.innerWidth <= 600 ? 70 : 150,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: window.innerWidth <= 600 ? 70 : 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.row.id}`}>
            <MdOutlineFileDownload className="downloadBtn" />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.reduce((acc, curr) => acc + curr.quantity, 0),
        id: item._id,
        status: item.orderStatus,
        size: item.orderItems.map((orderItem) => orderItem.size).join(", "),
        amount: `₹${item.totalPrice}`,
      });
    });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title={`Orders of ${user.name} `} />
      <Navbar props={logo} />
      <div className="w-full min-h-[50vh] mt-5 flex flex-col">
        <div className="w-full max-w-full min-h-[50vh] px-[2.5%] box-border">
          <div className="overflow-x-auto">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="bg-white text-center font-light"
              localeText={{
                noRowsLabel: "No Orders Yet",
              }}
              sx={{
                ".MuiDataGrid-columnHeaders": {
                  backgroundColor: "#333",
                  color: "#000",
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  fontSize: window.innerWidth <= 600 ? 10 : "1.1vmax",
                },
                ".MuiDataGrid-columnHeaderTitle": {
                  whiteSpace: "normal",
                  lineHeight: "1.5rem",
                },
                ".MuiDataGrid-menuIcon, .MuiDataGrid-iconButtonContainer, .MuiDataGrid-iconSeparator":
                {
                  display: "none",
                },
                ".MuiDataGrid-cell": {
                  fontFamily: "Apercu",
                  fontSize: window.innerWidth <= 600 ? 10 : "1vmax",
                  color: "#000",
                  textAlign: "center",
                  padding: window.innerWidth <= 600 ? "4vw" : "auto",
                },
                ".MuiDataGrid-overlay, .MuiTablePagination-toolbar": {
                  fontFamily: "Apercu",
                  fontSize: window.innerWidth <= 600 ? 10 : "1vmax",
                  color: "#000",
                  textAlign: "center",
                  padding: window.innerWidth <= 600 ? "4vw" : "auto",
                },
              }}
            />
          </div>
        </div>
        <Footer />
      </div>
    </Fragment>
  );
};

export default MyOrders;
