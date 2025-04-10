import React, { useEffect, useState, useRef, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import MetaData from "../../Meta/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar/Navbar";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import logo from "../../assets/kalaevaniBlack.webp";
import QuoteLoader from "../../utils/QuoteLoader/QuoteLoader";
import signInBanner from "../../assets/signInBanner.png";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { error, isAuthenticated, loading } = useSelector(
    (state) => state.user
  );

  const [visible, setVisible] = useState(false);
  const [rvisible, setRvisible] = useState(false);

  const [showSignIn, setShowSignIn] = useState(true);

  const loginTab = useRef(null);
  const registerTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);

    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const redirect = location.search
    ? `/${location.search.split("=")[1]}`
    : "/account";

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, isAuthenticated, navigate, redirect]);

  return (
    <Fragment>
      {loading ? (
        <QuoteLoader />
      ) : (
        <>
          <MetaData title="SignIn - SignUp | Kalaevani" />
          <Navbar props={logo} />
          <div className="relative w-full min-h-screen flex flex-col items-center justify-center font-poppins mt-[-80px]">
            {showSignIn ? (
              <div className="absolute left-0 w-full sm:w-1/2 z-20 p-10">
                <form
                  className="bg-white flex flex-col text-left h-full"
                  ref={loginTab}
                  onSubmit={loginSubmit}
                >
                  <h1 className="text-2xl font-semibold mb-6">Log in</h1>

                  <label className="text-sm uppercase text-gray-700">
                    Email
                  </label>
                  <input
                    className="border-b border-black bg-transparent py-2 mb-4 outline-none"
                    type="email"
                    placeholder="example@gmail.com"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />

                  <label className="text-sm uppercase text-gray-700">
                    Password
                  </label>
                  <div className="relative w-full mb-4">
                    <input
                      className="w-full border-b border-black bg-transparent py-2 pr-10 outline-none"
                      type={visible ? "text" : "password"}
                      placeholder="••••••••••••"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <div
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setVisible(!visible)}
                    >
                      {visible ? <FaRegEye /> : <FaRegEyeSlash />}
                    </div>
                  </div>
<<<<<<< HEAD
                  <Link to="/password/forgot" className="forgot-password">
                    Forget Password ?
                  </Link>
                  <div className="tAndc flex-center">
                    <p className="forgot-password">
                      By signing in you agree to our{" "}
                      <Link to={"/terms"} className="poppins">
                        Terms & conditions
                      </Link>
                    </p>
                  </div>
=======
>>>>>>> master

                  <Link
                    to="/password/forgot"
                    className="text-sm text-gray-600 underline"
                  >
                    Forget Password?
                  </Link>

                  <p className="text-sm text-gray-600 mt-4">
                    By signing in you agree to our{" "}
                    <Link to="/terms" className="text-blue-500 underline">
                      Terms & Conditions
                    </Link>
                  </p>

                  <input
                    type="submit"
                    value="Log in"
                    className="bg-black text-white rounded-lg py-3 mt-6 hover:bg-white hover:text-black border border-black transition-all duration-300 cursor-pointer"
                  />

                  <button
                    type="button"
                    onClick={() => setShowSignIn(false)}
                    className="mt-4 text-sm underline"
                  >
                    Don't have an account? Sign up
                  </button>
                </form>
              </div>
            ) : (
              <div className="absolute left-0 w-full sm:w-1/2 z-20 p-10">
                <form
                  ref={registerTab}
                  encType="multipart/form-data"
                  onSubmit={registerSubmit}
                  className="bg-white flex flex-col text-left h-full"
                >
                  <h1 className="text-2xl font-semibold mb-6">
                    Register with your e-mail
                  </h1>

                  <label className="text-sm uppercase text-gray-700">
                    Username *
                  </label>
                  <input
                    className="border-b border-black bg-transparent py-2 mb-4 outline-none"
                    type="text"
                    placeholder="Enter your name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />

                  <label className="text-sm uppercase text-gray-700">
                    Email *
                  </label>
                  <input
                    className="border-b border-black bg-transparent py-2 mb-4 outline-none"
                    type="email"
                    placeholder="Enter your email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />

                  <label className="text-sm uppercase text-gray-700">
                    Password *
                  </label>
                  <div className="relative w-full mb-2">
                    <input
                      type={rvisible ? "text" : "password"}
                      placeholder="Create a Password"
                      required
                      name="password"
                      value={password}
                      onChange={registerDataChange}
                      className="w-full border-b border-black bg-transparent py-2 pr-10 outline-none"
                    />
                    <div
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-sm"
                      onClick={() => setRvisible(!rvisible)}
                    >
                      {rvisible ? "HIDE" : "SHOW"}
                    </div>
                  </div>
                  <p
                    className={`text-sm ${
                      password.length >= 8 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    Password must contain at least 8 characters
                  </p>

                  <input
                    type="submit"
                    value="Register"
                    className="bg-black text-white rounded-lg py-3 mt-6 hover:bg-white hover:text-black border border-black transition-all duration-300 cursor-pointer"
                    disabled={loading}
                  />

                  <button
                    type="button"
                    onClick={() => setShowSignIn(true)}
                    className="mt-4 text-sm underline"
                  >
                    Already have an account? Sign In
                  </button>
                </form>
              </div>
            )}

            <img
              src={signInBanner}
              alt="banner"
              className="absolute h-screen top-0 right-0 w-1/2 object-cover hidden sm:block"
            />
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Login;
