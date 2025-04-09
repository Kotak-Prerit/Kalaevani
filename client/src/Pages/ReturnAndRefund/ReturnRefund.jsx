import React, { Fragment, lazy, Suspense } from "react";
import logo from "../../assets/kalaevaniBlack.webp";
import MetaData from "../../Meta/MetaData";

const Navbar = lazy(() => import("../../components/Navbar/Navbar"));
const Footer = lazy(() => import("../../components/Footer/Footer"));

const ReturnRefund = () => {
  return (
    <Fragment>
      <Suspense>
        <MetaData title={"Returns & Refunds - Kalaevani"} />
        <Navbar props={logo} />
        <div className=" w-full py-[5vh]">
          <div className="w-full">
            <h1 className="text-left px-[10vh] text-2xl md:text-3xl futuraLt">
              Returns & Refunds
            </h1>
            <div className="p-[2vh_10vh] text-[18px] poppins md:px-[10vh] px-[5vh]">
              <ul className="list-disc space-y-4">
                <li>
                  We do not accept returns or exchanges unless the item you
                  purchased is defective or damaged.
                </li>
                <li>
                  If you receive a defective or damaged item, please contact us
                  at{" "}
                  <a
                    href="mailto:kalaevanii@gmail.com"
                    className="underline underline-offset-2 text-blue-600"
                  >
                    kalaevanii@gmail.com
                  </a>{" "}
                  with details and photographic evidence of the product and the
                  defect.
                </li>
                <li>
                  Upon receipt of the returned product, we will fully examine it
                  and notify you via e-mail within a reasonable period whether
                  you are entitled to a replacement as a result of the defect.
                </li>
                <li>
                  If you are eligible, we will send you a replacement product or
                  offer store credit within a certain number of days.
                </li>
                <li>
                  No refunds will be issued unless the product is not available
                  for replacement.
                </li>
                <li>
                  The refund process will take 5-7 working days and will be
                  processed in the original mode of payment.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </Suspense>
    </Fragment>
  );
};

export default ReturnRefund;
