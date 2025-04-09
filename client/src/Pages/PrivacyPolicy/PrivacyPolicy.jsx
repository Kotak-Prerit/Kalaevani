import React, { Fragment, lazy, Suspense } from "react";
import logo from "../../assets/kalaevaniBlack.webp";

const Navbar = lazy(() => import("../../components/Navbar/Navbar"));
const Footer = lazy(() => import("../../components/Footer/Footer"));

const PrivacyPolicy = () => {
  return (
    <Fragment>
      <Suspense>
        <Navbar props={logo} />
        <div className="mt-[50px] px-[5vh] pb-[5vh] poppins">
          <h1 className="futuraLt text-5xl font-bold mb-5">Privacy Policy</h1>

          <p className="mt-2 text-[18px]">
            We are committed to maintaining the accuracy, confidentiality, and
            security of your personally identifiable information ("Personal
            Information"). As part of this commitment, our privacy policy
            governs our actions as they relate to the collection, use, and
            disclosure of Personal Information.
          </p>

          <p className="mt-[30px] font-bold text-[21px]">1. Introduction</p>
          <p className="mt-2 text-[18px]">
            We are responsible for maintaining and protecting the Personal
            Information under our control. We have designated individuals who
            are accountable for compliance with our privacy policy.
          </p>

          <p className="mt-[30px] font-bold text-[21px]">
            2. Identifying Purposes
          </p>
          <p className="mt-2 text-[18px]">
            We collect, use, and disclose Personal Information to provide you
            with the product or service you have requested and to offer you
            additional products and services we believe you might be interested
            in. The purposes for which we collect Personal Information will be
            identified before or at the time we collect the information.
          </p>

          <p className="mt-[30px] font-bold text-[21px]">3. Consent</p>
          <p className="mt-2 text-[18px]">
            Knowledge and consent are required for the collection, use, or
            disclosure of Personal Information except where required or
            permitted by law. Providing us with your Personal Information is
            always your choice. However, your decision not to provide certain
            information may limit our ability to provide you with our products
            or services.
          </p>

          <p className="mt-[30px] font-bold text-[21px]">
            4. Limiting Collection
          </p>
          <p className="mt-2 text-[18px]">
            The Personal Information collected will be limited to those details
            necessary for the purposes identified by us. With your consent, we
            may collect Personal Information from you in person, over the
            telephone or by corresponding with you via mail, facsimile, or the
            Internet.
          </p>

          <p className="mt-[30px] font-bold text-[21px]">
            5. Limiting Use, Disclosure and Retention
          </p>
          <p className="mt-2 text-[18px]">
            Personal Information may only be used or disclosed for the purpose
            for which it was collected unless you have otherwise consented, or
            when it is required or permitted by law. Personal Information will
            only be retained for the period of time required to fulfill the
            purpose for which we collected it or as may be required by law.
          </p>

          <p className="mt-[30px] font-bold text-[21px]">6. Accuracy</p>
          <p className="mt-2 text-[18px]">
            Personal Information will be maintained in as accurate, complete,
            and up-to-date form as is necessary to fulfill the purposes for
            which it is to be used.
          </p>

          <p className="mt-[30px] font-bold text-[21px]">
            7. Safeguarding Customer Information
          </p>
          <p className="mt-2 text-[18px]">
            Personal Information will be protected by security safeguards that
            are appropriate to the sensitivity level of the information. We take
            all reasonable precautions to protect your Personal Information from
            any loss or unauthorized use, access, or disclosure.
          </p>

          <p className="mt-[30px] font-bold text-[21px]">8. Openness</p>
          <p className="mt-2 text-[18px]">
            We will make information available to you about our policies and
            practices with respect to the management of your Personal
            Information.
          </p>

          <p className="mt-[30px] font-bold text-[21px]">9. Customer Access</p>
          <p className="mt-2 text-[18px]">
            Upon request, you will be informed of the existence, use, and
            disclosure of your Personal Information and will be given access to
            it. You may verify the accuracy and completeness of your Personal
            Information and may request that it be amended, if appropriate.
            However, in certain circumstances permitted by law, we will not
            disclose certain information to you.
          </p>

          <p className="mt-[30px] font-bold text-[21px]">
            10. Handling Customer Complaints and Suggestions
          </p>
          <p className="mt-2 text-[18px]">
            You may direct any questions or enquiries with respect to our
            privacy policy or our practices by contacting us at the details
            provided on our website.
          </p>

          <p className="mt-[30px] font-bold text-[21px]">Cookies</p>
          <p className="mt-2 text-[18px]">
            A cookie is a small computer file or piece of information that may
            be stored in your computer's hard drive when you visit our websites.
            We may use cookies to improve our website’s functionality and, in
            some cases, to provide visitors with a customized online experience.
            <br />
            <br />
            Cookies are widely used and most web browsers are configured
            initially to accept cookies automatically. You may change your
            Internet browser settings to prevent your computer from accepting
            cookies or to notify you when you receive a cookie so that you may
            decline its acceptance.
          </p>

          <p className="mt-[30px] font-bold text-[21px]">Other Websites</p>
          <p className="mt-2 text-[18px]">
            Our website may contain links to other third-party sites that are
            not governed by this privacy policy. Although we endeavor to only
            link to sites with high privacy standards, our privacy policy will
            no longer apply once you leave our website. Additionally, we are not
            responsible for the privacy practices employed by third-party
            websites.
          </p>
        </div>
        <Footer />
      </Suspense>
    </Fragment>
  );
};

export default PrivacyPolicy;
