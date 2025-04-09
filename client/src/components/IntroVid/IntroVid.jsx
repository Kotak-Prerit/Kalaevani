import React from "react";

const IntroVid = () => {
  return (
    <div className="flex justify-center items-center w-full relative">
      <div className="relative w-full mx-[1.5vw]">
        <div className="relative w-full pt-[56.25%] flex justify-center items-center">
          <iframe
            src="https://www.youtube.com/embed/h_tBRIcGw7Q?si=zpBXB7AGmvV6YGDd&modestbranding=1&rel=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-0"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default IntroVid;
