import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { getProductDetails } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import gsm from "../../assets/GSM.webp";

const MaterialPopup = ({ isOpen, onClose, materialName }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product } = useSelector((state) => state.productDetails);

  const [selectedMaterial, setSelectedMaterial] = useState({
    name: "",
    data: "",
  });

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    const careContent = product.care;
    const fabricContent = product.fabric;
    const artworkContent = product.artwork;
    switch (materialName) {
      case "fabric":
        setSelectedMaterial({
          name: "Fabric",
          data: fabricContent,
          image: gsm,
        });
        break;
      case "care":
        setSelectedMaterial({
          name: "care",
          data: careContent,
        });
        break;
      case "artwork":
        setSelectedMaterial({
          name: "artwork",
          data: artworkContent,
        });
        break;
      default:
        setSelectedMaterial({ name: "Default", data: "Default content..." });
        break;
    }
  }, [materialName, product.fabric, product.care, product.artwork]);

  useEffect(() => {
    const handleBodyScroll = (event) => {
      if (isOpen) {
        event.preventDefault();
      }
    };

    document.body.addEventListener("scroll", handleBodyScroll, {
      passive: false,
    });

    return () => {
      document.body.removeEventListener("scroll", handleBodyScroll);
    };
  }, [isOpen]);

  return (
    <Modal
      className="absolute top-1/2 left-1/2 w-3/5 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-8 flex flex-col items-start justify-center max-h-[80vh] overflow-y-scroll"
      isOpen={isOpen}
      onRequestClose={onClose}
      appElement={document.getElementById("root")}
      style={{
        overlay: {
          background: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(5px)",
          zIndex: 10,
        },
      }}
    >
      <h2 className="text-left border-b border-black pb-2 text-black capitalize text-2xl Apercu">
        {selectedMaterial.name}
      </h2>
      <p className="text-left mt-5 mb-5 text-black max-w-full overflow-hidden break-words whitespace-normal text-[20px] font-poppins">
        {selectedMaterial.data}
      </p>
      <img
        src={selectedMaterial.image}
        alt=""
        className="w-[70%] h-auto rounded-lg"
      />
      <button
        onClick={onClose}
        className="bg-black text-white px-4 py-2 text-lg border-none cursor-pointer self-end mr-[2%] rounded-md font-poppins"
      >
        close
      </button>
    </Modal>
  );
};

export default MaterialPopup;
