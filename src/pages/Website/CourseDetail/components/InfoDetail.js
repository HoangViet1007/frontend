import React from "react";
// import { Img } from "react-image";
const InfoDetail = ({ courseDetail }) => {
  return (
    // <div className="tw-bg-[#f3f3f3]">
    //   <div className="container tw-flex tw-pt-3">
    //     <div className=" tw-w-[66.66666667%] tw-pr-3">
    <>
      <div className="tw-w-full tw-h-[27rem]">
        {/* {courseDetail?.image && (
          <Img
            className="tw-w-full tw-h-full tw-object-cover"
            src={courseDetail?.image}
            loader={
              <img
                className="tw-w-full tw-h-full tw-object-cover"
                src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/04de2e31234507.564a1d23645bf.gif"
                alt="Hình ảnh không tồn tại"
              />
            }
          />
        )} */}
        <img src={courseDetail?.image} className="tw-w-full tw-h-full tw-object-cover" alt="Hình ảnh không tồn tại" />
      </div>
      <div className="tab-course tw-bg-white tw-mt-2 tw-rounded">
        <ul className="tw-flex tw-items-center">
          <li>
            <a
              href="#course-intro"
              className="tw-font-bold tw-text-sm tw-py-[10px] hover:tw-bg-[#ff0000] tw-block tw-px-[24px]  hover:tw-text-white tw-transition tw-duration-300"
            >
              Giới thiệu
            </a>
          </li>
          <li>
            <a
              href="#courseContent"
              className="tw-font-bold tw-text-sm tw-py-[10px] hover:tw-bg-[#ff0000] tw-block tw-px-[24px]  hover:tw-text-white tw-transition tw-duration-300"
            >
              Nội dung <span className="tw-hidden sm:tw-inline-block">khóa học</span>
            </a>
          </li>
          <li>
            <a
              href="#course-assessment"
              className="tw-font-bold tw-text-sm tw-py-[10px] hover:tw-bg-[#ff0000] tw-block tw-px-[24px]  hover:tw-text-white tw-transition tw-duration-300"
            >
              Đánh giá
            </a>
          </li>
          <li>
            <a
              href="#course-comment"
              className="tw-font-bold tw-text-sm tw-py-[10px] hover:tw-bg-[#ff0000] tw-block tw-px-[24px]  hover:tw-text-white tw-transition tw-duration-300"
            >
              Nhận xét
            </a>
          </li>
        </ul>
      </div>
    </>
    // </div>
    // <div className="tw-bg-gray-800 tw-flex-1">InfoDetail</div>
    //   </div>
    // </div>
  );
};

export default InfoDetail;
