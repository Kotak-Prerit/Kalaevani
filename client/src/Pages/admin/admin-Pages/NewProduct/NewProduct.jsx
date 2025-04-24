import React from "react"; //, { Fragment, useEffect, useState }
import "./NewProduct.css";
// import { useSelector, useDispatch } from "react-redux";
// import { createProduct, clearErrors } from "../../../../actions/productAction";
// import { Button } from "@mui/material";
import MetaData from "../../../../Meta/MetaData";
// import { LuPaintbrush } from "react-icons/lu";
// import { GiClothes, GiThermometerCold } from "react-icons/gi";
// import { AiOutlineProduct } from "react-icons/ai";
// import { RiMoneyRupeeCircleLine, RiStockLine } from "react-icons/ri";
import Sidebar from "../../admin-components/Sidebar/Sidebar";
// import { NEW_PRODUCT_RESET } from "../../../../constants/productConstants";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

const NewProduct = () => {
  // const dispatch = useDispatch();
  // const Navigate = useNavigate();

  // const { loading, error, success } = useSelector((state) => state.newProduct);

  // const [name, setName] = useState("");
  // const [price, setPrice] = useState(0);
  // const [fabric, setFabric] = useState("");
  // const [care, setCare] = useState("");
  // const [artWork, setArtwork] = useState("");
  // const [Stock, setStock] = useState(0);
  // const [images, setImages] = useState([]);
  // const [imagesPreview, setImagesPreview] = useState([]);

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //     dispatch(clearErrors());
  //   }

  //   if (success) {
  //     toast.success("Product Created Successfully");
  //     Navigate("/admin/dashboard");
  //     dispatch({ type: NEW_PRODUCT_RESET });
  //   }
  // }, [dispatch, error, success, Navigate]);

  // const createProductSubmitHandler = (e) => {
  //   e.preventDefault();

  //   const myForm = new FormData();

  //   myForm.set("name", name);
  //   myForm.set("price", price);
  //   myForm.set("Fabric", fabric);
  //   myForm.set("Care", care);
  //   myForm.set("ArtWork", artWork);
  //   myForm.set("Stock", Stock);

  //   images.forEach((image) => {
  //     myForm.append("images", image);
  //   });
  //   dispatch(createProduct(myForm));
  // };

  // const createProductImagesChange = (e) => {
  //   const files = Array.from(e.target.files);

  //   setImages([]);
  //   setImagesPreview([]);

  //   files.forEach((file) => {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setImagesPreview((old) => [...old, reader.result]);
  //         setImages((old) => [...old, reader.result]);
  //       }
  //     };

  //     reader.readAsDataURL(file);
  //   });
  // };

  return (
    <React.Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer flex justify-center items-center">
          Not ready yet
          {/* <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <AiOutlineProduct />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <RiMoneyRupeeCircleLine />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <GiClothes />

              <textarea
                placeholder="Product Fabric Description"
                value={fabric}
                onChange={(e) => setFabric(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            <div>
              <GiThermometerCold />

              <textarea
                placeholder="Product Care Description"
                value={care}
                onChange={(e) => setCare(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            <div>
              <LuPaintbrush />

              <textarea
                placeholder="Product artwork description"
                value={artWork}
                onChange={(e) => setArtwork(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <RiStockLine />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewProduct;
