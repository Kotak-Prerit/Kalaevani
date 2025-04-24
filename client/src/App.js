import { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Lenis from "lenis";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { loadUser } from "./actions/userAction";
import { useDispatch } from "react-redux";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import Login from "./Pages/Login/Login";
import Account from "./Pages/Account/Account";
import UpdateProfile from "./Pages/updateProfile/UpdateProfile";
import UpdatePassword from "./Pages/UpdatePassword/UpdatePassword";
import PageNotFound from "./Pages/404/PageNotFound";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import Cart from "./Pages/Cart/Cart";
import Shipping from "./Pages/Shipping/Shipping";
import About from "./Pages/About/About";
import ConfirmOrder from "./Pages/confirmOrder/confirmOrder";
import Payment from "./Pages/Payment/Payment";
import ShippingPolicy from "./Pages/ShippingReturn/ShippingPolicy";
import Contact from "./Pages/Contact/Contact";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import Terms from "./Pages/TermsAndConditions/Terms";
import ReturnRefund from "./Pages/ReturnAndRefund/ReturnRefund";
import Wholesale from "./Pages/Wholesale/Wholesale";
import ProductDetails from "./Pages/ProductDetails/ProductDetail";
import ProductImages from "./Pages/ProductImages/ProductImages";
import Collab from "./Pages/Collab/Collab";
import Dashboard from "./Pages/admin/admin-Pages/Dashboard/Dashboard";
import ProductList from "./Pages/admin/admin-Pages/ProductList/ProductList";
import NewProduct from "./Pages/admin/admin-Pages/NewProduct/NewProduct";
import OrderList from "./Pages/admin/admin-Pages/OrderList/OrderList";
import Unauthorized from "./utils/Route/unauthorize";
import Faq from "./Pages/Faq/Faq";
import UserList from "./Pages/admin/admin-Pages/UserList/UserList";
import Success from "./Pages/success/Success";
import MyOrders from "./Pages/MyOrders/Myorders";
import OrderDetails from "./Pages/OrderDetails/OrderDetails";
import ProcessOrder from "./Pages/admin/admin-Pages/ProccessOrder/ProccessOrder.jsx";
import QuoteLoader from "./utils/QuoteLoader/QuoteLoader.jsx";
import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./utils/Route/ProtectedRoute";

function App() {
  const dispatch = useDispatch();

   const lenis = new Lenis({
     duration: 1.2,
     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
     orientation: 'vertical',
     gestureOrientation: 'vertical',
     smoothWheel: true,
     wheelMultiplier: 1,
     smoothTouch: false,
     touchMultiplier: 2,
     infinite: false,
   });
  lenis.on("scroll", (e) => {});
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => clearTimeout(timer);
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (
  //       (event.ctrlKey || event.metaKey) &&
  //       event.shiftKey &&
  //       (event.code === "KeyJ" || event.code === "KeyI")
  //     ) {
  //       event.preventDefault();
  //     }

  //     if (event.code === "F12") {
  //       event.preventDefault();
  //     }
  //   };

  //   document.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Fragment>
      {isLoading ? (
        <QuoteLoader />
      ) : (
        <Fragment>
          <HelmetProvider>
            <Router>
              <Layout>
                 <Routes>
                   {/* Public Routes */}
                   <Route path="/" element={<Home />} />
                   <Route path="/products" element={<Products />} />
                   <Route path="/products/:keyword" element={<Products />} />
                   <Route path="/product/:id" element={<ProductDetails />} />
                   <Route path="/product/:id/images" element={<ProductImages />} />
                   <Route path="/faqs" element={<Faq />} />
                   <Route path="/login" element={<Login />} />
                   <Route path="/account" element={<Account />} />
                   <Route path="/me/change" element={<UpdateProfile />} />
                   <Route path="/password/change" element={<UpdatePassword />} />
                   <Route path="/password/forgot" element={<ForgotPassword />} />
                   <Route path="/cart" element={<Cart />} />
                   <Route path="/shipping" element={<Shipping />} />
                   <Route path="/about" element={<About />} />
                   <Route path="/order/confirm" element={<ConfirmOrder />} />
                   <Route path="/process/payment" element={<Payment />} />
                   <Route path="/orders" element={<MyOrders />} />
                   <Route path="/order/:id" element={<OrderDetails />} />
                   <Route path="/shipping-policy" element={<ShippingPolicy />} />
                   <Route path="/contact" element={<Contact />} />
                   <Route path="/privacy" element={<PrivacyPolicy />} />
                   <Route path="/terms" element={<Terms />} />
                   <Route path="/return-refund" element={<ReturnRefund />} />
                   <Route path="/wholesale" element={<Wholesale />} />
                   <Route path="/collab" element={<Collab />} />
                   <Route path="/unauthorized" element={<Unauthorized />} />
                   <Route path="/success" element={<Success />} />
                   <Route path="*" element={<PageNotFound />} />
 
                   {/* Admin Routes */}
                   <Route element={<ProtectedRoute isAdmin={true} />}>
                     <Route path="/admin/dashboard" element={<Dashboard />} />
                     <Route path="/admin/products" element={<ProductList />} />
                     <Route path="/admin/orders" element={<OrderList />} />
                     <Route path="/admin/order/:id" element={<ProcessOrder />} />
                     <Route path="/admin/product" element={<NewProduct />} />
                     <Route path="/admin/users" element={<UserList />} />
                   </Route>
                 </Routes>
               </Layout>
            </Router>
          </HelmetProvider>
          <Toaster 
            position="top-center" 
            richColors
          />
        </Fragment>
      )}
    </Fragment>
  );
}

export default App;
