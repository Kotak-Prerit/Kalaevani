import React, { useEffect, useState, useRef, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./auth.css";
import { Link } from "react-router-dom";
import MetaData from "../../Meta/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar/Navbar";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import logo from "../../assets/kalaevaniBlack.webp";
import QuoteLoader from "../../utils/QuoteLoader/QuoteLoader";

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
          <div className="loginSignUpcontainer" id="container">
            <Navbar props={logo} />

            {showSignIn ? (
              <div className="form-container sign-in-container">
                <form
                  className="loginForm"
                  ref={loginTab}
                  onSubmit={loginSubmit}
                >
                  <h1 className="form-title">Log in</h1>

                  <label className="lr-label">email</label>
                  <input
                    className="lr-input"
                    type="email"
                    placeholder="example@gmail.com"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                  <label className="lr-label">password</label>
                  <div className="loginPasswordWrapper">
                    <input
                      type={visible ? "text" : "password"}
                      placeholder="••••••••••••"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <div
                      className="eyeIcon"
                      onClick={() => {
                        setVisible(!visible);
                      }}
                    >
                      {visible ? <FaRegEye /> : <FaRegEyeSlash />}
                    </div>
                  </div>
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

                  <input type="submit" value="Log in" className="sign-in" />
                  <button
                    className="toSignUp flex-center"
                    type="button"
                    onClick={() => setShowSignIn(false)}
                  >
                    Don't have an account? Sign up
                  </button>
                </form>
              </div>
            ) : (
              <div className="form-container sign-up-container">
                <form
                  ref={registerTab}
                  encType="multipart/form-data"
                  onSubmit={registerSubmit}
                  className="registerForm"
                >
                  <h1 className="form-title">Register with your e-mail</h1>
                  <label className="lr-label">username *</label>
                  <input
                    className="lr-input"
                    type="text"
                    placeholder="Enter your name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                  <label className="lr-label">email *</label>
                  <input
                    className="lr-input"
                    type="email"
                    placeholder="Enter your email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                  <div className="signUpPassword">
                    <div className="password">
                      <p className="lr-label">password *</p>
                    </div>
                    <div className="lr-passwordWrapper">
                      <input
                        type={rvisible ? "text" : "password"}
                        placeholder="Create a Password"
                        required
                        name="password"
                        value={password}
                        onChange={registerDataChange}
                        className={`lr-input ${
                          password.length >= 8
                            ? "valid-password"
                            : "invalid-password"
                        }`}
                      />
                      <div
                        className="eyeIcon"
                        onClick={() => {
                          setRvisible(!rvisible);
                        }}
                      >
                        {rvisible ? "HIDE" : "SHOW"}
                      </div>
                    </div>
                    <p
                      className="passReq poppins"
                      style={{ color: password.length >= 8 ? "green" : "red" }}
                    >
                      Password must contain at least 8 characters
                    </p>
                  </div>
                  <input
                    type="submit"
                    value="Register"
                    className="sign-up"
                    disabled={loading ? true : false}
                  />
                  <button
                    className="toSignIn"
                    type="button"
                    onClick={() => setShowSignIn(true)}
                  >
                    Already have an account? Sign In
                  </button>
                </form>
              </div>
            )}
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Login;
