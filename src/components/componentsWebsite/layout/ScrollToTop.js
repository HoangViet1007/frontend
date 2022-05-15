import React from "react";
import { BackTop } from "antd";
const ScrollToTop = () => {
  return (
    <BackTop
      // duration={1000}
      style={{ bottom: "30px", right: "30px" }}
      className="tw-animate-bounce"
    >
      <div className="scroll-to-top tw-bg-white tw-text-[#ff0000] tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center hover:tw-text-white hover:tw-bg-[#ff0000] tw-transition tw-duration-300 tw-rounded-full shadow-scroll-to-top ">
        <i className="fas fa-arrow-up"></i>
      </div>
    </BackTop>
  );
};

export default ScrollToTop;
