import React from "react";

const WholesaleGrid = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-4 p-10 mt-5 md:gid-cols-2 md:grid-rows-2">
      <div className="flex items-center h-64 justify-center text-white bg-black font-bold text-xl rounded-lg relative bg-cover bg-center overflow-hidden ">
        <span className="z-10">Wholesale</span>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://toffle.in/cdn/shop/files/Snapinsta.app_123136848_392978805415229_7779262836566044387_n_1080.jpg?v=1695926570&width=500")',
            opacity: 0.5,
          }}
        ></div>
      </div>
      <div className="flex items-center justify-center text-white bg-black font-bold text-xl rounded-lg relative bg-cover bg-center overflow-hidden">
        <span className="z-10">Project Based Orders</span>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://toffle.in/cdn/shop/files/318140506_5570985126320587_3422542843174832509_n.jpg?v=1687511036&width=500")',
          }}
        ></div>
      </div>
      <div className="flex items-center justify-center text-white bg-black font-bold text-xl rounded-lg relative bg-cover bg-center overflow-hidden">
        <span className="z-10">For Your Brand</span>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://toffle.in/cdn/shop/files/P1190284.jpg?v=1695880914&width=500")',
          }}
        ></div>
      </div>
      <div className="col-span-3 flex items-center justify-center text-white bg-black font-bold text-xl rounded-lg">
        <span>Avail our services at bulk rates in 4 simple steps</span>
      </div>
    </div>
  );
};

export default WholesaleGrid;
