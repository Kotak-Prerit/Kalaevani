import React, { useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import logo from "../../assets/kalaevaniBlack.webp";
import MetaData from "../../Meta/MetaData";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const contentRefs = useRef([]);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How much time does delivery take?",
      answer: `We process orders every day before 9 am except on public holidays. After dispatch, it takes about 5-7 working days for delivery. \n We ship your parcel from Surat, Gujarat.`,
    },
    {
      question: "Do you have an EMI option?",
      answer: `No, this option will be available soon.`,
    },
    {
      question: "Where is my order?",
      answer:
        "You can track the status of your order from the 'order history' section on your account page. You will receive a confirmation email when your order is shipped. Once the order is shipped, You can track orders using your order id.",
    },
    {
      question: "How do I cancel my order?",
      answer:
        "If you intend to cancel your order reach out to customer support by submitting your request via the 'contact us' form with your order ID. If your order is not dispatched from our warehouse, only then we will be able to cancel the order the same day.",
    },
    {
      question: "What are the operation timings?",
      answer: `It is open on all 7 days except public holidays \n Our operation timing is from 11 am to 6 pm Monday to Sunday.`,
    },
    {
      question: "Can I change my shipping/billing address?",
      answer:
        "Yes, you can change your shipping or billing address within 3 hours of placing the order. Once the order is shipped already, it gets difficult. Kindly reach out to our customer support team by submitting your request via the `contact us` form.",
    },
    {
      question: "Can I change the items in my order?",
      answer:
        "Yes, it is only possible to change items in your order if the order has not been dispatched from our warehouse.",
    },
    {
      question: "How do I exchange or return my order/product?",
      answer:
        "We only have an exchange policy and for this you check our exchange and return policy page.",
    },
    {
      question:
        "How much time does it take for a returned item to reach the warehouse?",
      answer:
        "It takes about 5-7 business days for the returned order to be delivered back to us.",
    },
    {
      question: "Where is the operation located?",
      answer: "Our operation is located in Surat.",
    },
    {
      question: "Are there any discounts on 1st purchase?",
      answer:
        "Each of our pieces is part of a specially curated, limited art work collection. We do very limited pieces to maintain the value of the artist and its art work. No space for discounts :(",
    },
    {
      question: "Do you provide a warranty on products?",
      answer:
        "Not all products come with a warranty. Please read the description of the product you intend to purchase for detailed information.",
    },
    {
      question: "Do you have a same-day delivery service?",
      answer: `Same-day delivery is currently only for Surat orders at an extra cost borne by the customer. You can reach out to our customer support on WhatsApp at +91 8160936541 \n -- before 4 pm (except Sundays) to get a quote for the same. Once the delivery charges are accepted by you, we'll have your parcel delivered the same day.`,
    },
    {
      question: "What are the payment options available?",
      answer:
        "We offer COD. The options available for placing prepaid orders: \n Google pay, \n Paytm UPI, \n Phone pe , \n UPI ID,Credit Card, Debit card",
    },
    {
      question: "Do you have cash on delivery?",
      answer:
        "Yes, we do offer cash on delivery services. :) There will be an additional cash on delivery charge applied.",
    },
    {
      question:
        "Do you have any shipping charges on international/within-India orders?",
      answer:
        "Within India, shipping charges are applicable. Shipping to foreign countries is chargeable, shipping cost will be calculated at the time of checkout automatically and will increase depending on the order value of the product",
    },
    {
      question: "Who will pay customs duties for International orders?",
      answer:
        "For international orders, you will have to incur any additional customs handling fees, duties, and/or taxes. Since each country is different and these fees change often, please contact your local post/customs office for more information.",
    },
    {
      question: "What is your customer service timing?",
      answer:
        "Our customer service timing is from 11 am to 5 pm Monday to Saturday.",
    },
    {
      question: "How to collaborate with Kalaevani?",
      answer:
        "For collaborations, kindly email us at kalaevani@gmail.com .If things work out, we will get in touch with you :)",
    },
    {
      question: "How can I join the kalaevani team?",
      answer:
        "We are delighted that you would like to join us, mail us your CV/resume at kalaevani@gmail.com. If things work out, we will get in touch with you :)",
    },
    {
      question: "How will refund amount will initiate?",
      answer:
        "It will be through bank transfer to your respective bank account number provided by the user.",
    },
    {
      question: "Got any other questions?",
      answer: "Please visit our Contact page",
    },
  ];
  return (
    <>
      <MetaData title="Kalaevani - Faqs" />
      <Navbar props={logo} />
      <div className="faqs flex justify-center items-center">
        <h1 className="faqs-head futuraLt">FAQs</h1>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item flex justify-center items-center"
            >
              <div
                className="faq-question montserrat"
                onClick={() => toggleAnswer(index)}
              >
                <h3>{faq.question}</h3>
                <span className="toggle-icon">
                  {activeIndex === index ? (
                    <MdKeyboardArrowUp className="faq-icon" />
                  ) : (
                    <MdKeyboardArrowDown className="faq-icon" />
                  )}
                </span>
              </div>
              <div
                className="faq-answer poppins"
                ref={(el) => (contentRefs.current[index] = el)}
                style={{
                  maxHeight: activeIndex === index ? `100px` : "0",
                  overflow: "hidden",
                  transition: "max-height 200ms ease-in-out",
                }}
              >
                <p style={{ width: "90%" }}>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Faq;
