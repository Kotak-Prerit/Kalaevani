import React, { useEffect } from "react";
import MetaData from "../../Meta/MetaData";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  const toOrders = () => {
    navigate("/orders");
    localStorage.removeItem("cartItems");
    sessionStorage.clear();
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <React.Fragment>
      <MetaData title={"Kalaevani - Payment succeed"} />
      <div className="min-h-screen bg-[#e4f6fa]">
        <div className="cursor-pointer absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden w-[330px] h-[360px] bg-white rounded-[15px] shadow-[0_2px_12px_0_rgba(0,0,0,0.1)] text-center">
          <div className="absolute top-0 h-[10px] w-full bg-[#12c06a]"></div>

          <svg
            width="166"
            height="150"
            className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2"
          >
            <g id="Shot" fill="none" fillRule="evenodd">
              <g id="shot2" transform="translate(-135 -157)">
                <g id="success-card" transform="translate(48 120)">
                  <g id="Top-Icon" transform="translate(99.9 47.7)">
                    <g id="Bubbles" fill="#12C06A">
                      <g id="bottom-bubbles" transform="translate(0 76)">
                        <ellipse
                          id="Oval-Copy-3"
                          cx="12.8571429"
                          cy="13.2605405"
                          rx="12.8571429"
                          ry="12.8432432"
                        />
                        <ellipse
                          id="Oval-Copy-4"
                          cx="25.0714286"
                          cy="34.4518919"
                          rx="8.35714286"
                          ry="8.34810811"
                        />
                        <ellipse
                          id="Oval-Copy-6"
                          cx="42.4285714"
                          cy="31.2410811"
                          rx="7.71428571"
                          ry="7.70594595"
                        />
                      </g>
                      <g id="top-bubbles" transform="translate(92)">
                        <ellipse
                          id="Oval"
                          cx="13.4285714"
                          cy="23.76"
                          rx="12.8571429"
                          ry="12.8432432"
                        />
                        <ellipse
                          id="Oval-Copy"
                          cx="37.8571429"
                          cy="25.0443243"
                          rx="5.14285714"
                          ry="5.1372973"
                        />
                        <ellipse
                          id="Oval-Copy-2"
                          cx="30.1428571"
                          cy="7.70594595"
                          rx="7.71428571"
                          ry="7.70594595"
                        />
                      </g>
                    </g>
                    <g id="Circle" transform="translate(18.9 11.7)">
                      <ellipse
                        id="blue-color"
                        cx="56.341267"
                        cy="54.0791109"
                        fill="#12C06A"
                        rx="51.2193336"
                        ry="51.5039151"
                      />
                      <ellipse
                        id="border"
                        cx="51.2283287"
                        cy="51.5039151"
                        stroke="#12C06A"
                        strokeWidth="5"
                        rx="51.2193336"
                        ry="51.5039151"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>

          <div
            className="h-[105px] w-[105px] absolute top-[15%] left-1/2 -translate-x-1/2 rounded-full"
            style={{
              background:
                "url('https://i.pinimg.com/originals/e8/06/52/e80652af2c77e3a73858e16b2ffe5f9a.gif') center/200%",
            }}
          ></div>

          <h3 className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 font-bold text-[24px] text-[#606060] montserrat">
            SUCCESS!
          </h3>
          <p className="absolute left-1/2 top-[68%] -translate-x-1/2 -translate-y-1/2 w-[90%] font-normal text-[16px] text-[#616161] tracking-[0.18px] poppins">
            Your order has been placed successfully.
          </p>

          <button
            onClick={toOrders}
            className="absolute left-1/2 -translate-x-1/2 bg-[#12c06a] border border-[#12c06a] shadow-[0_3px_20px_0_rgba(90,233,186,0.6)] rounded-full tracking-[1.5px] font-medium text-white w-[186px] h-[40px] text-[13px] cursor-pointer animate-[fadeUp_1s_ease-in_0.3s_forwards]"
          >
            VIEW ORDERS
          </button>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadeUp {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
            bottom: 20px;
          }
        }
      `}</style>
    </React.Fragment>
  );
};

export default Success;
