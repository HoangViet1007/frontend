import React from "react";
import { Link } from "react-router-dom";
import bgImg from "../../../assets/images/clinet/page-title.jpg";
const PageTitle = ({ namePage }) => {
  return (
    <section
      className="page-title tw-pt-[200px] tw-pb-[40px] fade-main"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className=" tw-px-3 md:tw-px-10">
        <div className="tw-relative tw-flex sm:tw-items-center sm:tw-justify-between tw-flex-col sm:tw-flex-row">
          <div className="pull-left">
            {/* <div className="tw-text-white tw-text-[25px] tw-mb-2 tw-font-normal tw-capitalize">
              {namePage}
            </div> */}
            <ul className="page-breadcrumb">
              <li className="tw-inline-block">
                <Link
                  className="tw-text-white hover:tw-text-[#ff0000] tw-transition tw-duration-300 tw-font-normal tw-capitalize tw-text-xs"
                  to="/"
                >
                  Trang chủ
                </Link>
              </li>
              <li className="fa default"></li>

              <li className="tw-inline-block tw-text-[#ff0000] tw-capitalize tw-text-xs">
                {namePage}
              </li>
            </ul>
          </div>
          {/* <div className="pull-right tw-relative tw-z-10">
            <ul className="page-breadcrumb">
              <li className="tw-inline-block ">
                <Link
                  className="tw-text-white hover:tw-text-[#ff0000] tw-transition tw-duration-300 tw-font-normal tw-capitalize tw-text-[16px]"
                  to="/"
                >
                  Trang chủ
                </Link>
              </li>
              <li className="tw-inline-block tw-text-white tw-px-3">/</li>
              <li className="tw-inline-block tw-text-[#ff0000] tw-capitalize tw-text-[16px]">
                {namePage}
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default PageTitle;
