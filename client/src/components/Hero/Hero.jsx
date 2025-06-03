import React, { useEffect, useRef, useState } from "react";
import Spheres1Background from "threejs-components/build/backgrounds/spheres1.cdn.min.js";
import { IoIosColorFill } from "react-icons/io";
import Loader from "../../assets/bubble-placeholder.webp";

const Hero = () => {
  const canvasRef = useRef(null);
  const bgRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => loadBackground());
    } else {
      setTimeout(() => loadBackground(), 200);
    }
  }, []);

  const loadBackground = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      bgRef.current = Spheres1Background(canvas, {
        count: 90,
        minSize: 0.5,
        maxSize: 0.7,
        gravity: 0,
      });
      setIsLoaded(true);
    }
  };

  const changeColors = () => {
    if (bgRef.current) {
      bgRef.current.spheres.setColors([
        0xffffff * Math.random(),
        0xffffff * Math.random(),
        0xffffff * Math.random(),
      ]);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white -mt-[12vh]">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="futuraLt uppercase text-black text-[7vw] md:text-[9vw] leading-none z-10">
          Wear your
        </h1>
        <h2 className="futuraLt uppercase text-black text-[9vw] md:text-[10vw] leading-none z-10">
          Emotions
        </h2>
      </div>

      <div
        className="absolute md:top-1/2 top-[10%] right-4 flex justify-center items-center gap-4 -translate-y-1/2"
        style={{ zIndex: 100 }}
      >
        <button
          type="button"
          onClick={changeColors}
          className="bg-black hover:bg-white border border-black text-white hover:text-black rounded-full p-4 transition-all duration-300 ease-in-out"
        >
          <IoIosColorFill className="text-lg" />
        </button>
      </div>

      {!isLoaded && (
        <img
          src={Loader}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      ></canvas>
    </div>
  );
};

export default Hero;
