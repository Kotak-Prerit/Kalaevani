import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import project from "../../assets/project.gif";
import { toast } from "sonner";
import logo from "../../assets/kalaevaniBlack.webp";
import MetaData from "../../Meta/MetaData";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Contact() {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const formData = form.current;
    const name = formData.user_name.value;
    const email = formData.user_email.value;
    const phone = formData.user_contact.value;

    const errors = {};

    if (name.length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!/^[a-zA-Z0-9._%+-]{3,}@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(email)) {
      errors.email = "Invalid email address";
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      errors.phone =
        "Enter a valid 10-digit Indian mobile number starting with 6-9";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    emailjs
      .sendForm("service_89xz4sp", "template_8oeqwao", form.current, {
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
        setIsSubmitting(true);
      });
  };

  return (
    <React.Fragment>
      <MetaData title="Contact Us" />
      <Navbar props={logo} />
      <div id="contact" className="min-h-screen flex flex-col mt-12">
        <p className="text-left w-3/4 font-semibold text-[#222] tracking-wide text-[10vw] leading-tight capitalize font-['Bebas_Neue',sans-serif] px-[5vw]">
          <img src={project} alt="gif" className="h-[18vh] mr-2.5 inline" />
          let's get connected
        </p>

        <div className="px-[5vw] pb-[5vw]">
          <div className="mt-[15vh]">
            <p className="text-[5vw] font-light font-poppins">
              Write your query below
            </p>
          </div>

          <div>
            <p className="text-14 font-poppins sm:text-base">
              Our notebook is open, and we're ready to take your brief...
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
                  What's your name?*
                </p>
                <input
                  type="text"
                  name="user_name"
                  id="name"
                  placeholder="otis milburn"
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
                  What's your email?*
                </p>
                <input
                  type="email"
                  name="user_email"
                  placeholder="otis@gmail.com"
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
                  What's your phone number?
                </p>
                <input
                  type="tel"
                  placeholder="9265092650"
                  name="user_contact"
                  id="phone"
                  className="bg-transparent border-b border-[#666] text-lg my-[2vh] py-2.5 w-full text-black focus:outline-none focus:border-b-2 focus:border-black placeholder:text-[#bbb] placeholder:font-light"
                  required
                  pattern="[6-9]{1}[0-9]{9}"
                  title="Enter a valid 10-digit Indian mobile number"
                  maxLength={10}
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
                  name="user_message"
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
    </React.Fragment>
  );
}

export default Contact;
