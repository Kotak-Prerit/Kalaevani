import React, { useState } from "react";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";

const Steps = () => {
  const stepsData = [
    {
      id: 1,
      title: "Design",
      description:
        "If you have your designs or renders, share them with us to get started on costing and timeline. You can also employ our team in the design process. Design fees applicable.",
      image:
        "https://toffle.in/cdn/shop/files/P1190344.jpg?v=1695880447&width=832",
    },
    {
      id: 2,
      title: "Sampling",
      description:
        "Once the design is finalized, we move to the sampling stage where prototypes are made for approval before bulk production.",
      image:
        "https://toffle.in/cdn/shop/files/P1190311.jpg?v=1695881128&width=832",
    },
    {
      id: 3,
      title: "Advance",
      description:
        "After sample approval, production begins upon receiving an advance payment. We ensure the highest quality standards are met.",
      image:
        "https://toffle.in/cdn/shop/files/P1190392.jpg?v=1695881060&width=832",
    },
    {
      id: 4,
      title: "Delivery",
      description:
        "The final step involves delivery of the finished products, ensuring safe and timely arrival at your location.",
      image:
        "https://toffle.in/cdn/shop/files/P1190403.jpg?v=1695881180&width=832",
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prevStep) =>
      prevStep < stepsData.length - 1 ? prevStep + 1 : 0
    );
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) =>
      prevStep > 0 ? prevStep - 1 : stepsData.length - 1
    );
  };

  const handleStepClick = (index) => {
    setCurrentStep(index);
  };

  return (
    <div className="flex flex-col items-start w-full my-[10vh] px-[2.5vw]">
      <div className="flex items-start gap-[5%] mb-[30px]">
        <div className="w-1/2 overflow-hidden rounded-[10px]">
          <img
            src={stepsData[currentStep].image}
            alt={stepsData[currentStep].title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-[500px]">
          <h4 className="text-[16px] font-bold text-[#333] poppins">
            Step {stepsData[currentStep].id}
          </h4>
          <h1 className="text-[3vmax] leading-[2] futuraLt">
            {stepsData[currentStep].title}
          </h1>
          <p className="text-[16px] text-[#666] poppins">
            {stepsData[currentStep].description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-[20px] w-full">
        <div className="relative flex gap-[25%] w-[88%]">
          <div className="absolute top-1/2 w-full h-[2px] bg-[#333] -translate-y-1/2"></div>
          {stepsData.map((step, index) => (
            <div key={step.id} className="relative">
              <div
                className={`w-[15px] h-[15px] border border-[#333] rounded-full cursor-pointer transition-colors duration-300 z-10 ${
                  index === currentStep ? "bg-[#333]" : "bg-white"
                }`}
                onClick={() => handleStepClick(index)}
              ></div>
              <span
                className={`absolute text-[1.2vmax] font-semibold poppins ${
                  index === currentStep ? "text-[#222]" : "text-[#999]"
                }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-[10px]">
          <button
            className="text-[24px] bg-white text-black border border-black rounded-full cursor-pointer transition-all duration-300 p-[10px] hover:bg-[#333] flex items-center justify-center"
            onClick={handlePrev}
          >
            <IoIosArrowRoundBack className="arrow-icon hover:text-white" />
          </button>
          <button
            className="text-[24px] bg-white text-black border border-black rounded-full cursor-pointer transition-all duration-300 p-[10px] hover:bg-[#333] flex items-center justify-center"
            onClick={handleNext}
          >
            <IoIosArrowRoundForward className="arrow-icon hover:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Steps;
