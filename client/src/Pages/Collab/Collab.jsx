import React, { Suspense, useRef, useState, lazy } from "react";
import emailjs from "@emailjs/browser";
import collab from "../../assets/collab.png";
import { toast } from "sonner";
import MetaData from "../../Meta/MetaData";
import logo from "../../assets/kalaevaniBlack.webp";
import QuoteLoader from "../../utils/QuoteLoader/QuoteLoader";

const Navbar = lazy(() => import("../../components/Navbar/Navbar"));
const Footer = lazy(() => import("../../components/Footer/Footer"));

function Contact() {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  window.scrollTo(0, 0);

  const validateForm = () => {
    const formData = form.current;
    const name = formData.brand_name.value;
    const email = formData.business_email.value;
    const phone = formData.business_contact.value;

    const errors = {};

    if (name.length < 3) {
      errors.name = "Name must be at least 3 characters";
    }

    if (!/^[a-zA-Z0-9._%+-]{3,}@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(email)) {
      errors.email = "Invalid email address";
    }

    if (phone && (phone.length < 10 || phone.length > 10)) {
      errors.phone = "Phone number must be 10 digits";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    emailjs
      .sendForm("service_89xz4sp", "template_nnopsmp", form.current, {
        publicKey: "_K19r9dC2hGs8J9_9",
      })
      .then(() => {
        toast.success("We will get right back to you!");
        form.current.reset();
      })
      .catch((error) => {
        toast.error("An error occurred while sending the email:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <MetaData title="Collab with Kalaevani" />
      <Suspense fallback={<QuoteLoader />}>
        <Navbar props={logo} />
        <div id="contact" className="min-h-screen flex flex-col mt-12">
          <p className="text-left w-3/4 font-semibold text-[#222] tracking-wide text-[10vw] leading-tight capitalize font-['Bebas_Neue',sans-serif] px-[5vw]">
            <img src={collab} alt="gif" className="h-[20vh] mr-2.5 inline" />
            collab with us
          </p>

          <div className="px-[5vw] pb-[5vw]">
            <div className="mt-[15vh]">
              <p className="text-[5vw] font-light font-poppins">
                Write your brief below
              </p>
            </div>

            <div>
              <p className="text-[1.5vw] font-poppins sm:text-base">
                Our team will reach out to you in 48 business hours...
              </p>
            </div>

            <form
              className="mt-[8vh] text-[#222] font-poppins"
              onSubmit={sendEmail}
              ref={form}
            >
              <div className="flex w-full mb-[8vh]">
                <div className="text-[#666] font-semibold">01</div>
                <div className="ml-[2vw] w-full">
                  <p className="flex justify-between text-lg">
                    What's your Brand name?*
                  </p>
                  <input
                    type="text"
                    name="brand_name"
                    id="name"
                    placeholder="Milton"
                    className="bg-transparent border-b border-[#666] text-lg my-[2vh] py-2.5 w-full text-black focus:outline-none focus:border-b-2 focus:border-black placeholder:text-[#bbb] placeholder:font-light"
                    minLength={3}
                    maxLength={25}
                    required
                  />
                  {errors.name && (
                    <div className="text-red-500">{errors.name}</div>
                  )}
                </div>
              </div>

              <div className="flex w-full mb-[8vh]">
                <div className="text-[#666] font-semibold">02</div>
                <div className="ml-[2vw] w-full">
                  <p className="flex justify-between text-lg">
                    What's your business email?*
                  </p>
                  <input
                    type="email"
                    name="business_email"
                    placeholder="milton@gmail.com"
                    id="email"
                    className="bg-transparent border-b border-[#666] text-lg my-[2vh] py-2.5 w-full text-black focus:outline-none focus:border-b-2 focus:border-black placeholder:text-[#bbb] placeholder:font-light"
                    required
                    pattern="^[a-zA-Z0-9._%+-]{3,}@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$"
                  />
                  {errors.email && (
                    <div className="text-red-500">{errors.email}</div>
                  )}
                </div>
              </div>

              <div className="flex w-full mb-[8vh]">
                <div className="text-[#666] font-semibold">03</div>
                <div className="ml-[2vw] w-full">
                  <p className="flex justify-between text-lg">
                    What's your business contact number?
                  </p>
                  <input
                    type="tel"
                    placeholder="9265092650"
                    name="business_contact"
                    id="phone"
                    className="bg-transparent border-b border-[#666] text-lg my-[2vh] py-2.5 w-full text-black focus:outline-none focus:border-b-2 focus:border-black placeholder:text-[#bbb] placeholder:font-light"
                    required
                    maxLength={10}
                    minLength={10}
                  />
                  {errors.phone && (
                    <div className="text-red-500">{errors.phone}</div>
                  )}
                </div>
              </div>

              <div className="flex w-full mb-[8vh]">
                <div className="text-[#666] font-semibold">04</div>
                <div className="ml-[2vw] w-full">
                  <p className="flex justify-between text-lg">
                    How can we help you?
                  </p>
                  <textarea
                    name="business_message"
                    id="aboutProject"
                    cols="20"
                    rows="3"
                    placeholder="Describe it as you can"
                    className="bg-transparent border-b border-[#666] text-lg my-[2vh] py-2.5 w-full text-black focus:outline-none focus:border-b-2 focus:border-black placeholder:text-[#bbb] placeholder:font-light font-poppins"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="ml-[3vw] text-white bg-[#222] py-5 text-xl rounded-full w-[calc(100%-3vw)] border border-[#222] cursor-pointer transition-all duration-300 ease-in-out hover:bg-black"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </Suspense>
    </>
  );
}

export default Contact;
