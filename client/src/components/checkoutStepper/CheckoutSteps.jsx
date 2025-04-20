import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@mui/material";
import { RiBarcodeBoxLine, RiMotorbikeFill } from "react-icons/ri";
import { FaMoneyBillTransfer } from "react-icons/fa6";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <RiMotorbikeFill />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <RiBarcodeBoxLine />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <FaMoneyBillTransfer />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };
  return (
    <Fragment>
      <Stepper
        className="my-[15px] w-full"
        alternativeLabel
        activeStep={activeStep}
        style={stepStyles}
      >
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "#00FF00" : "#303030",
              }}
              icon={item.icon}
              className="text-[40px]"
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
