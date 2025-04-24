import React, { useEffect, useState, Fragment } from "react";
import MetaData from "../../Meta/MetaData";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  forgotPassword,
  resetPassword,
} from "../../actions/userAction";
import { toast } from "sonner";
import Navbar from "../../components/Navbar/Navbar";
import logo from "../../assets/kalaevaniBlack.webp";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, message } = useSelector((state) => state.forgotPassword);

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split(" ");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const forgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setIsSendingOtp(true);
    setIsEmailSent(false);
    const myForm = new FormData();
    myForm.set("email", email);
    try {
      await dispatch(forgotPassword(myForm));
      setIsEmailSent(true);
      toast.success("OTP sent to your email!");
    } catch (error) {
      toast.error("Error sending email: " + error);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const resetPasswordSubmit = async (e) => {
    e.preventDefault();

    // Collect OTP from input fields
    const otpArray = inputRefs.current.map((input) => input.value);
    const otp = otpArray.join("");

    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setIsUpdatingPassword(true);

    try {
      const response = await dispatch(resetPassword(email, otp, newPassword));
      if (response?.success) {
        toast.success("Password reset successfully!");
        navigate("/login");
      } else {
        toast.error(response.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error("Error resetting password: " + error.message);
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message]);

  return (
    <>
      <Fragment>
        <MetaData title={"Forgot Password"} />
        <Navbar props={logo} />
        <div className="w-screen h-screen flex justify-center items-center bg-cover bg-no-repeat">
          <div className="w-[70%] h-[80%] bg-white rounded-[10px] overflow-hidden flex flex-col justify-center items-center max-sm:w-full max-sm:h-screen max-sm:rounded-t-2xl">
            {!isEmailSent ? (
              <form
                className="flex flex-col justify-start items-start w-[90%] -mt-[10%]"
                onSubmit={forgotPasswordSubmit}
              >
                <h2 className="text-[25px] uppercase futuraLt">
                  Forgot Password
                </h2>
                <p className="text-left mb-4">
                  An email will be sent to your registered email address to
                  reset the password!
                </p>
                <div className="w-full mb-4">
                  <p>Email</p>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <input
                  type="submit"
                  value={
                    isSendingOtp
                      ? "Sending..."
                      : isEmailSent
                        ? "Sent"
                        : "Send OTP"
                  }
                  className="w-full mt-5 py-5 text-lg font-light border-none rounded-md bg-black text-white cursor-pointer transition duration-300 hover:bg-neutral-800"
                />
              </form>
            ) : (
              <form
                className="flex flex-col justify-start items-start w-[90%] -mt-[10%]"
                onSubmit={resetPasswordSubmit}
              >
                <h2 className="text-3xl Apercu font-bold">Reset Password</h2>
                <p className="text-left mb-4">
                  Enter the OTP sent to your email and a new password
                </p>
                <div
                  onPaste={handlePaste}
                  className="flex gap-2 justify-center items-center mb-4"
                >
                  {Array(6)
                    .fill(0)
                    .map((_, index) => (
                      <input
                        type="text"
                        maxLength={1}
                        key={index}
                        required
                        ref={(el) => (inputRefs.current[index] = el)}
                        onInput={(e) => handleInput(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="h-[50px] w-[50px] border border-black rounded-[7px] text-center text-[20px]"
                      />
                    ))}
                </div>
                <div className="h-[1px] w-[150%] bg-black my-[3vh] -ml-[25%]"></div>
                <div className="w-full mb-4">
                  <p className="text-3xl Apercu font-bold mb-5">New Password</p>
                  <div className="relative">
                    <input
                      type={visible ? "text" : "password"}
                      placeholder="Enter your new password"
                      required
                      name="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <div
                      className="absolute right-2 top-2 text-white bg-black px-2 py-1 text-sm text-center w-[100px] cursor-pointer"
                      onClick={() => setVisible(!visible)}
                    >
                      {visible ? "Hide" : "Show"}
                    </div>
                  </div>
                </div>
                <input
                  type="submit"
                  value={isUpdatingPassword ? "Resetting..." : "Reset Password"}
                  className="w-full mt-5 py-5 text-lg font-light border-none rounded-md bg-black text-white cursor-pointer transition duration-300 hover:bg-neutral-800"
                  disabled={isUpdatingPassword}
                />
              </form>
            )}
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default ForgotPassword;