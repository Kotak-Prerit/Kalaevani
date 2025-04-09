import React, { Fragment, Suspense, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import about01 from "../../assets/d01.webp";
import about02 from "../../assets/d02.webp";
import aboutVid from "../../assets/about-vid.mp4";
import logo from "../../assets/kalaevaniBlack.webp";
import MetaData from "../../Meta/MetaData";
import QuoteLoader from "../../utils/QuoteLoader/QuoteLoader";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Fragment>
      <MetaData title={"About Kalaevani"} />
      <div className="bg-gray-100 text-gray-800">
        <Navbar props={logo} />

        <div className="max-w-6xl mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">
            About <span className="text-blue-600">Kalaevani</span>
          </h1>

          {/* Section 1 */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="w-full md:w-2/5 flex justify-center">
              <Suspense fallback={<QuoteLoader />}>
                <video
                  className="rounded-lg shadow-lg max-w-[400px] md:max-w-[500px] w-full"
                  muted
                  autoPlay
                  loop
                >
                  <source src={aboutVid} type="video/mp4" />
                </video>
              </Suspense>
            </div>
            <div className="w-full md:w-3/5">
              <p className="text-lg md:text-xl leading-relaxed">
                With <span className="font-bold text-blue-600">KALAEVANI</span>,
                we have embarked on a journey of learnings, success, and
                prosperity. Our mission is to motivate artists to capitalize on
                their skills and create a sustainable livelihood. KALAEVANI is a
                beautiful association of art and an idea—an initiative to
                revolutionize the perception of art in society.
              </p>
            </div>
          </div>

          <hr className="my-12 border-gray-300" />

          {/* Section 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-16">
            <div className="w-full md:w-2/5 flex justify-center">
              <img
                src={about01}
                alt="about-image"
                className="rounded-lg shadow-lg max-w-[400px] md:max-w-[500px] w-full"
              />
            </div>
            <div className="w-full md:w-3/5">
              <p className="text-lg md:text-xl leading-relaxed">
                As we explored ways to build our community, we discovered the
                world of streetwear fashion. This led us to create{" "}
                <span className="font-bold text-blue-600">FRESCO</span>, an
                artistic community that coexists with KALAEVANI. We design
                high-quality streetwear featuring artwork from our fine arts
                artists. KALAEVANI represents a lifestyle, while FRESCO is the
                creative force behind it.
              </p>
            </div>
          </div>

          <hr className="my-12 border-gray-300" />

          {/* Section 3 */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="w-full md:w-2/5 flex justify-center">
              <img
                src={about02}
                alt="about-image"
                className="rounded-lg shadow-lg max-w-[400px] md:max-w-[500px] w-full"
              />
            </div>
            <div className="w-full md:w-3/5">
              <p className="text-lg md:text-xl leading-relaxed">
                These artistic pieces reflect emotions and stories told through
                visual expression. We invite you to support these artists by
                embracing and sharing their work. Art deserves respect, and we
                aim to create a movement where creativity is valued as a
                profession. Our vision is simple:
                <span className="font-bold text-blue-600">
                  {" "}
                  "Cloth becomes the canvas, threads become the paints."
                </span>
                Join us in this journey and wear the story of KALAEVANI.
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </Fragment>
  );
};

export default About;
