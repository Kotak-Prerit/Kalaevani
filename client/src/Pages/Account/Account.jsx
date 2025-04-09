import React, { Fragment } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useSelector } from "react-redux";
import { loadUser } from "../../actions/userAction";
import store from "../../store/store";
import MetaData from "../../Meta/MetaData";
import orderImg from "../../assets/order.png";
import profile from "../../assets/edit-profile.png";
import dashboard from "../../assets/dashboard.png";
import password from "../../assets/password.png";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../actions/userAction";
import { useDispatch } from "react-redux";
import UserAccount from "../../components/UserAccount/UserAccount";
import logo from "../../assets/kalaevaniBlack.webp";
import banner from "../../assets/banner.jpg";

const Account = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const card = [
    {
      img: orderImg,
      heading: "Your orders",
      summary: "Track or history of your orders",
      func: orders,
    },
    {
      img: profile,
      heading: "Edit Profile",
      summary: "Edit Name, email, phone number, etc",
      func: editProfile,
    },
    {
      img: password,
      heading: "Change Password",
      summary: "Edit password",
      func: passwordFunc,
    },
  ];

  if (!user) {
    return null;
  }

  if (user.role === "admin") {
    card.unshift({
      img: dashboard,
      heading: "Dashboard",
      summary: "Create, add, update, delete functionalities for admin",
      func: power,
    });
  }

  function power() {
    navigate("/admin/dashboard");
  }
  function orders() {
    navigate("/orders");
  }
  function editProfile() {
    navigate("/me/change");
  }
  function logoutUser() {
    dispatch(logout());
    toast.success("Logged out Successfully");
    navigate("/");
  }
  function passwordFunc() {
    navigate("/password/change");
  }

  const createdAt = new Date(user.createdAt);
  const formattedDate = createdAt.toLocaleDateString("en-GB");

  return (
    <Fragment>
      <MetaData title={`Kalaevani - ${user.name}`} />
      <Navbar props={logo} />
      <div className="w-full mb-28">
        {isAuthenticated && (
          <Fragment>
            <div
              className="w-full bg-cover bg-center bg-black relative flex flex-col items-center justify-center h-[45vh] mt-6"
              style={{ backgroundImage: `url(${banner})` }}
            >
              <div className="flex flex-col items-center absolute top-10 translate-x-30p">
                <p className="text-2xl md:text-xl font-bold capitalize poppins">
                  {user.name}
                </p>
                <p className="text-lg text-gray-600">{user.email}</p>
              </div>
              <div className="absolute bottom-[-50px] left-[20px] flex items-center justify-center w-[100px] h-[100px] md:w-[70px] md:h-[70px] rounded-full bg-white border-2 border-black transform translate-y-[50%]">
                <p className="text-4xl md:text-2xl font-medium text-black">
                  {user.name.charAt(0)}
                </p>
              </div>
            </div>

            <div className="mt-16 md:mt-10 flex justify-end pr-8">
              <p className="text-lg md:text-lg text-gray Apercu">
                Joined on : {formattedDate}
              </p>
            </div>

            <div className="flex flex-col items-center mt-8">
              <div className="flex flex-wrap justify-center gap-4 p-4">
                {card.map((content) => (
                  <UserAccount
                    key={content.heading}
                    img={content.img}
                    head={content.heading}
                    summary={content.summary}
                    click={content.func}
                  />
                ))}
              </div>

              <div className="mt-10">
                <button
                  onClick={logoutUser}
                  className="text-red-500 hover:text-white hover:bg-red-500 transition-colors border border-gray-400 px-6 py-4 rounded-lg text-lg flex items-center gap-2"
                >
                  <IoLogOutOutline />
                  Log out
                </button>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Account;
