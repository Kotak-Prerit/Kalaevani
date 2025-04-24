import React, { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../../Meta/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { toast } from "sonner";
import Navbar from "../../components/Navbar/Navbar";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import QuoteLoader from "../../utils/QuoteLoader/QuoteLoader";
import logo from "../../assets/kalaevaniBlack.webp";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const updateprofileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    dispatch(updateProfile(myForm));
  };

  useEffect(() => {
    if (user && user.avatar) {
      setName(user.name);
      setEmail(user.email);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Profile updated succesfully 🥳");
      dispatch(loadUser());
      navigate("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, user, isUpdated, navigate]);

  return (
    <>
      {loading ? (
        <QuoteLoader />
      ) : (
        <Fragment>
          <MetaData title={"Update Profile"} />
          <Navbar props={logo} />

          <div className="w-screen h-screen max-w-full flex justify-center items-start mt-[10vh] bg-white">
            <div className="w-[70%] h-[80%] bg-white rounded-[10px] flex justify-center items-start fixed overflow-hidden box-border p-6 shadow-lg md:w-full md:h-screen md:rounded-t-2xl">
              <div className="w-full">
                <h2 className="text-[25px] uppercase futuraLt mb-6">
                  Update Profile
                </h2>

                <form
                  className="absolute w-[90%] flex flex-col justify-start items-start gap-3 px-[2vw] mt-[70px]"
                  encType="multipart/form-data"
                  onSubmit={updateprofileSubmit}
                >
                  {/* Name Field */}
                  <div className="w-full flex flex-col items-start mb-3">
                    <label className="uppercase text-black font-bold tracking-wide mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      required
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent border-b border-black text-lg py-2 px-4 placeholder:text-gray-600 focus:outline-none focus:border-black"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="w-full flex flex-col items-start mb-3">
                    <label className="uppercase text-black font-bold tracking-wide mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent border-b border-black text-lg py-2 px-4 placeholder:text-gray-600 focus:outline-none focus:border-black"
                    />
                  </div>

                  {/* Submit Button */}
                  <input
                    type="submit"
                    value="Update Profile"
                    className="w-full mt-5 py-5 text-lg font-light rounded-lg bg-[#222] text-white font-['Apercu'] cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#333]"
                  />
                </form>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default Profile;
