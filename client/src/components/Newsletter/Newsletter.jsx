import React, { Fragment, Suspense } from "react";
import Earth from "./earth/earth";
import Projects from "./projects/Projects";
import QuoteLoader from "../../utils/QuoteLoader/QuoteLoader";

const Newsletter = () => {
  return (
    <Suspense fallback={<QuoteLoader />}>
      <Fragment>
        <div
          className="min-h-screen w-full flex items-center justify-center bg-[#111] transition-all duration-300 ease-in-out mt-[-10px]"
          id="newsletter"
        >
          <main className="h-screen w-full bg-[#0f0f0f] relative flex items-center justify-center">
            <Earth />
            <Projects />
          </main>
        </div>
      </Fragment>
    </Suspense>
  );
};

export default Newsletter;
