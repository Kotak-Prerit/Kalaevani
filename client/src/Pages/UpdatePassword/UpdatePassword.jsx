import React, { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../../Meta/MetaData";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadUser,
  updatePassword,
} from "../../actions/userAction";
import { toast } from "sonner";
import Navbar from "../../components/Navbar/Navbar";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import logo from "../../assets/kalaevaniBlack.webp";
import QuoteLoader from "../../utils/QuoteLoader/QuoteLoader";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const [oldVisible, setOldVisible] = useState(false);
  const [newVisible, setNewVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Password updated succesfully 🥳");
      dispatch(loadUser());
      navigate("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, isUpdated, navigate]);

  return (
    <>
      {loading ? (
        <QuoteLoader />
      ) : (
        <Fragment>
          <MetaData title={"Update Password"} />
          <Navbar props={logo} />
          <div className="w-screen h-screen max-w-full flex justify-center items-center bg-cover bg-center mt-[80px]">
            <div className="w-[80%] h-[80%] bg-white rounded-[10px] overflow-hidden box-border md:h-screen md:w-full md:mt-0 md:rounded-t-[20px] flex justify-start items-center flex-col">
              <h2 className="futuraLt text-[25px] uppercase w-[90%] px-[2vw] mb-5">
                Change Password
              </h2>
              <form
                className=" w-[90%] px-[2vw] flex flex-col items-start justify-start"
                onSubmit={updatePasswordSubmit}
              >
                <div className="w-full mb-8">
                  <div className="flex justify-start items-center">
                    <p className="uppercase font-poppins text-black tracking-[1px] font-bold">
                      old password
                    </p>
                  </div>
                  <div className="flex relative w-full items-center ">
                    <input
                      type={oldVisible ? "text" : "password"}
                      placeholder="Old Password"
                      required
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full p-3 border border-[#333] rounded"
                    />
                    <div
                      className="absolute right-4 cursor-pointer"
                      onClick={() => {
                        setOldVisible(!oldVisible);
                      }}
                    >
                      {oldVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                    </div>
                  </div>
                </div>

                <div className="w-full mb-8">
                  <div className="flex justify-start items-center">
                    <p className="uppercase font-poppins text-black tracking-[1px] font-bold">
                      new password
                    </p>
                  </div>
                  <div className="flex relative w-full items-center">
                    <input
                      type={newVisible ? "text" : "password"}
                      placeholder="New Password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full border border-[#333] rounded p-3"
                    />
                    <div
                      className="absolute right-4 cursor-pointer"
                      onClick={() => {
                        setNewVisible(!newVisible);
                      }}
                    >
                      {newVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                    </div>
                  </div>
                </div>

                <div className="w-full mb-8">
                  <div className="flex justify-start items-center">
                    <p className="uppercase font-poppins text-black tracking-[1px] font-bold">
                      confirm password
                    </p>
                  </div>
                  <div className="flex relative w-full items-center">
                    <input
                      type={confirmVisible ? "text" : "password"}
                      placeholder="Confirm Password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full border border-[#333] rounded p-3"
                    />
                    <div
                      className="absolute right-4 cursor-pointer"
                      onClick={() => {
                        setConfirmVisible(!confirmVisible);
                      }}
                    >
                      {confirmVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                    </div>
                  </div>
                </div>

                <input
                  type="submit"
                  value="Change Password"
                  className="w-full mt-[20px] py-[20px] text-[18px] font-light border-none rounded-[8px] bg-[#222] text-white cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#333] Apercu"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default UpdatePassword;
