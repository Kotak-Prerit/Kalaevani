import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../../Meta/MetaData";
import CheckoutSteps from "../../components/checkoutStepper/CheckoutSteps";
import { toast } from "react-toastify";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Shipping = () => {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const [houseNo, setHouseNo] = useState(shippingInfo.houseNo || "");
  const [street, setStreet] = useState(shippingInfo.street || "");
  const [zipCode, setZipCode] = useState(shippingInfo.zipCode || "");
  const [info, setInfo] = useState(shippingInfo.info || "");
  const [selectedState, setSelectedState] = useState(shippingInfo.state || "");
  const [selectedCity, setSelectedCity] = useState(shippingInfo.city || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");
  const country = "India";

  const handleInputChange = async (e) => {
    const value = e.target.value;

    // Allow only numeric values and limit to 6 digits
    if (/^\d*$/.test(value) && value.length <= 6) {
      setZipCode(value);

      if (value.length === 6) {
        try {
          const response = await axios.get(
            `https://api.postalpincode.in/pincode/${value}`
          );
          const postState = response.data[0]?.PostOffice?.[0]?.State;

          if (postState) {
            setSelectedState(postState);
          } else {
            setSelectedState("No information found for this zipcode");
          }
        } catch (error) {
          setSelectedState("Error fetching data. Please try again.");
        }
      } else {
        setSelectedState("Type valid State");
      }
      if (value.length === 6) {
        try {
          const response = await axios.get(
            `https://api.postalpincode.in/pincode/${value}`
          );
          const district = response.data[0]?.PostOffice?.[0]?.District;

          if (district) {
            setSelectedCity(district);
          } else {
            setSelectedCity("No information found for this zipcode");
          }
        } catch (error) {
          setSelectedCity("Error fetching data. Please try again.");
        }
      } else {
        setSelectedCity("Type valid City");
      }
    }
  };

  const ShippingSubmit = (e) => {
    e.preventDefault();

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNo)) {
      toast.error("Please enter a valid 10-digit Indian phone number.");
      return;
    }

    dispatch(
      saveShippingInfo({
        houseNo,
        street,
        info,
        zipCode,
        city: selectedCity,
        state: selectedState,
        country,
        phoneNo,
      })
    );
    navigate("/order/confirm");
  };

  return (
    <Fragment>
      <MetaData title={"Kalaevani- ShippingInfo"} />
      <div className="max-w-full flex justify-start items-center flex-col py-[60px] pb-[100px] bg-black text-white">
        <Link
          to={"/cart"}
          className="fixed top-[15px] left-[15px] flex items-center justify-center h-10 w-10 rounded-full bg-white"
        >
          <MdOutlineKeyboardArrowLeft className="text-3xl text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </Link>
        <CheckoutSteps activeStep={0} />
        <div className="w-3/4 mt-[30px] md:w-full">
          <h1 className="text-center uppercase text-[25px] futuraLt">
            Shipping Details
          </h1>
          <form
            className="mt-[30px] flex justify-start items-start flex-col w-full px-[2vw] Apercu"
            encType="multipart/form-data"
            onSubmit={ShippingSubmit}
          >
            {/* House/Door/FlatNo */}
            <div className="w-full flex items-start flex-col mb-[10px]">
              <div>
                <p className="uppercase  text-white font-bold">
                  House/Door/FlatNo :{" "}
                </p>
              </div>
              <div className="w-full mt-[10px]">
                <input
                  type="text"
                  placeholder="House/Door/FlatNo"
                  required
                  value={houseNo}
                  onChange={(e) => setHouseNo(e.target.value)}
                  className={`w-full border ${
                    houseNo ? "border-green-500" : "border-gray-500"
                  } bg-transparent text-white text-lg rounded-lg p-4 mb-7`}
                />
              </div>
            </div>

            {/* Street/Locality */}
            <div className="w-full flex items-start flex-col mb-[10px]">
              <div>
                <p className="uppercase text-white font-bold">
                  Street/Locality/Police Station :{" "}
                </p>
              </div>
              <div className="w-full mt-[10px]">
                <input
                  type="text"
                  placeholder="Street/Locality/Police Station"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className={`w-full border ${
                    street ? "border-green-500" : "border-gray-500"
                  } bg-transparent text-white text-lg rounded-lg p-4 mb-7`}
                />
              </div>
            </div>

            {/* Zip Code */}
            <div className="w-full flex items-start flex-col mb-[10px]">
              <div>
                <p className="uppercase  text-white font-bold">
                  Enter Zip Code
                </p>
              </div>
              <div className="w-full mt-[10px]">
                <input
                  type="text"
                  id="zipcode"
                  placeholder="enter zip code of your area"
                  value={zipCode}
                  onChange={handleInputChange}
                  required
                  className={`w-full border ${
                    zipCode ? "border-green-500" : "border-gray-500"
                  } bg-transparent text-white text-lg rounded-lg p-4 mb-7`}
                />
              </div>
            </div>

            {/* Landmark */}
            <div className="w-full flex items-start flex-col mb-[10px]">
              <div>
                <p className="uppercase  text-white font-bold">
                  Enter Landmark
                </p>
              </div>
              <div className="w-full mt-[10px]">
                <input
                  type="text"
                  placeholder="Landmark"
                  required
                  value={info}
                  onChange={(e) => setInfo(e.target.value)}
                  className={`w-full border ${
                    info ? "border-green-500" : "border-gray-500"
                  } bg-transparent text-white text-lg rounded-lg p-4 mb-7`}
                />
              </div>
            </div>

            {/* City */}
            <div className="w-full flex items-start flex-col mb-[10px]">
              <div>
                <p className="uppercase  text-white font-bold">Enter City</p>
              </div>
              <div className="w-full mt-[10px]">
                <input
                  type="text"
                  placeholder="city"
                  required
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className={`w-full border ${
                    selectedCity ? "border-green-500" : "border-gray-500"
                  } bg-transparent text-white text-lg rounded-lg p-4 mb-7`}
                />
              </div>
            </div>

            {/* State */}
            <div className="w-full flex items-start flex-col mb-[10px]">
              <div>
                <p className="uppercase  text-white font-bold">Enter State</p>
              </div>
              <div className="w-full mt-[10px]">
                <input
                  type="text"
                  placeholder="Landmark"
                  required
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className={`w-full border ${
                    selectedState ? "border-green-500" : "border-gray-500"
                  } bg-transparent text-white text-lg rounded-lg p-4 mb-7`}
                />
              </div>
            </div>

            {/* Country */}
            <div className="w-full flex items-start flex-col mb-[10px]">
              <div>
                <p className="uppercase  text-white font-bold">
                  Default Country
                </p>
              </div>
              <div className="w-full mt-[10px]">
                <input
                  type="text"
                  name="India"
                  id="country"
                  readOnly
                  value={"India"}
                  className={`w-full border ${
                    "India" ? "border-green-500" : "border-gray-500"
                  } bg-transparent text-white text-lg rounded-lg p-4 mb-7`}
                />
              </div>
            </div>

            {/* Contact */}
            <div className="w-full flex items-start flex-col mb-[10px]">
              <div>
                <p className="uppercase  text-white font-bold">Your contact</p>
              </div>
              <div className="w-full mt-[10px]">
                <input
                  type="tel"
                  placeholder="Enter your 10-digit Indian phone number"
                  required
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  maxLength={10}
                  className={`w-full border ${
                    phoneNo ? "border-green-500" : "border-gray-500"
                  } bg-transparent text-white text-lg rounded-lg p-4 mb-7`}
                />
              </div>
            </div>

            {/* Submit Button */}
            <input
              type="submit"
              value="Continue"
              className="w-full mt-5 py-5 text-lg font-light border-none rounded-lg bg-[#222] text-white cursor-pointer transition-all duration-300 ease-in-out font-['Apercu'] hover:bg-[#333]"
            />
          </form>
        </div>
      </div>

      {/* Custom styles for MUI components that can't be directly styled with Tailwind */}
      <style jsx global>{`
        .MuiStepLabel-labelContainer p {
          color: #fff;
        }

        .MuiStepConnector-line {
          display: none !important;
        }

        .MuiStepConnector-root {
          height: 1px;
          background-color: #ffffff;
          margin-top: 10px;
          margin-inline: 10px;
        }

        .MuiStepConnector-active,
        .MuiStepConnector-completed {
          background: #fff;
        }

        .Mui-completed svg {
          background: linear-gradient(
            95deg,
            #69fb61 0%,
            #40e946 50%,
            #14ca00 100%
          );
          height: 40px;
          border-radius: 100px;
          padding: 10px;
          width: 50px;
          height: 50px;
          color: #123b00;
        }

        select option {
          color: #fff;
          background: #000;
        }
      `}</style>
    </Fragment>
  );
};

export default Shipping;
