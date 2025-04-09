import React, { Fragment, lazy, Suspense } from "react";
import logo from "../../assets/kalaevaniBlack.webp";
import MetaData from "../../Meta/MetaData";

const Navbar = lazy(() => import("../../components/Navbar/Navbar"));
const Footer = lazy(() => import("../../components/Footer/Footer"));
const WholesaleGrid = lazy(() =>
  import("../../components/Wholesale-Grid/WholesaleGrid")
);
const Steps = lazy(() => import("../../components/Steps/Steps"));
const Faqs = lazy(() => import("../../components/Faqs/Faqs"));

const Wholesale = () => {
  return (
    <Fragment>
      <MetaData title={"Wholesale Enquiry"} />
      <Suspense>
        <Navbar props={logo} />

        <div className="px-[1.5vw]">
          <WholesaleGrid />
          <Steps />
          <Faqs />
        </div>

        <Footer />
      </Suspense>
    </Fragment>
  );
};

export default Wholesale;
