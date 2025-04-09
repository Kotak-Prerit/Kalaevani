import React, { Fragment } from "react";
import notFound from "../../assets/404.png";
import logo from "../../assets/kalaevaniBlack.webp";
import { Link } from "react-router-dom";
import MetaData from "../../Meta/MetaData";

const PageNotFound = () => {
  return (
    <Fragment>
      <MetaData title={"404 🤨"} />
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <Link to="/" className="absolute top-5 left-8">
          <img src={logo} alt="Home" className="h-12 w-auto" />
        </Link>

        <img src={notFound} alt="Not Found" className="h-[50vh] max-w-full" />

        <p className="text-4xl font-extrabold uppercase tracking-tight mt-4">
          Page Not Found
        </p>

        <p className="text-lg mt-2 max-w-lg">
          The page you are looking for might have been removed, had its name
          changed, doesn't exist, or is temporarily unavailable.
        </p>

        <Link
          to="/"
          className="mt-5 px-6 py-3 bg-black text-white uppercase text-sm rounded-full hover:bg-gray-800 transition"
        >
          Go to Homepage
        </Link>
      </div>
    </Fragment>
  );
};

export default PageNotFound;
