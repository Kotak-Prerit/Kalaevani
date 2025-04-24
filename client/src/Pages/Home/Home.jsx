import React, {
  Fragment,
  useEffect,
  useState,
  lazy,
  Suspense,
  startTransition,
} from "react";
import { motion } from "framer-motion";
import { clearErrors, getProduct } from "../../actions/productAction.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import MetaData from "../../Meta/MetaData";
import logo from "../../assets/kalaevaniBlack.webp";
import Navbar from "../../components/Navbar/Navbar";
import Product from "../../components/ProductCard/ProductCard.jsx";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero.jsx";
import IntroVid from "../../components/IntroVid/IntroVid";
import QuoteLoader from "../../utils/QuoteLoader/QuoteLoader.jsx";

const Display = lazy(() => import("../../components/display/Display.jsx"));
const Newsletter = lazy(() =>
  import("../../components/Newsletter/Newsletter.jsx")
);

Display.preload = () => import("../../components/display/Display.jsx");
Newsletter.preload = () => import("../../components/Newsletter/Newsletter.jsx");

const Home = () => {
  const dispatch = useDispatch();
  const { error, products } = useSelector((state) => state.products);

  useEffect(() => {
    Display.preload();
    Newsletter.preload();

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    startTransition(() => {
      dispatch(getProduct());
    });
  }, [dispatch, error]);

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 7.5,
      y: mousePosition.y - 7.5,
      backgroundColor: "#6969697a",
      opacity: 1,
    },
    text: {
      height: 300,
      width: 300,
      x: mousePosition.x - 150,
      y: mousePosition.y - 150,
      backgroundColor: "#6969697a",
      opacity: 1,
    },
  };

  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");

  return (
    <Fragment>
      <MetaData title="Kalaevani" />
      <Navbar props={logo} />
      <Hero />
      <IntroVid />
      <div className="LightTheme">
        <header className="w-full flex justify-between items-end border-b pb-[5vh] pt-[5vh] px-[2.5vw]">
          <h1 className="uppercase font-montserrat font-bold text-[25px] leading-none md:text-[20px]">
            Latest products
          </h1>
          <Link
            to="/products"
            className="uppercase font-montserrat font-medium text-[14px] no-underline text-black"
          >
            See all
          </Link>
        </header>

        <div
          className="px-[2.5vw] flex flex-wrap justify-around"
          onMouseEnter={textEnter}
          onMouseLeave={textLeave}
        >
          <div className="w-full flex gap-[10px] items-center justify-center flex-wrap my-[5vh]">
            {products &&
              products
                .slice(0, 8)
                .map((product) => (
                  <Product key={product._id} product={product} />
                ))}
          </div>

          <motion.div
            className="fixed top-0 left-0 pointer-events-none rounded-full z-[1] mix-blend-color-burn"
            variants={variants}
            animate={cursorVariant}
          />
        </div>

        <div className="w-full py-[50px] flex justify-center items-center font-poppins">
          <Link
            to="/products"
            className="border border-black px-[30px] py-[20px] rounded-full uppercase text-black transition-all duration-300 hover:bg-black hover:text-white"
          >
            more products
          </Link>
        </div>
      </div>
      <Suspense fallback={<QuoteLoader />}>
        <Display />
        <Newsletter />
      </Suspense>
      <Footer />
    </Fragment>
  );
};

export default Home;
