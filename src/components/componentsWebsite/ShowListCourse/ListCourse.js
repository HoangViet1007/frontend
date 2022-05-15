import { Empty, Rate, Tag } from "antd";
import React from "react";
import { convertCurrency, convertToUnicode } from "../../../utils/index";
// import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import noImage from "../../../assets/images/clinet/no-image.jpg";
const ListCourse = ({ Courses }) => {
  return Courses && Courses.length > 0 ? (
    <div className="container tw-pb-16 sm:tw-px-0">
      <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 tw-gap-5">
        {Courses?.map((course) => {
          return (
            <div className="course-item bg-white tw-shadow" key={course?.id}>
              <div className="course-img-wrapper tw-h-40 sm:tw-h-52 lg:tw-h-44">
                <Link
                  to={`/khoa-hoc/${convertToUnicode(course?.name)}/${
                    course?.id
                  }`}
                >
                  <img
                    className="tw-h-full tw-w-full tw-object-cover course-img"
                    src={course?.image}
                    alt={course?.name}
                    onError={(e) => {
                      e.target.src = noImage;
                    }}
                  />
                </Link>
              </div>
              <div className="course-content tw-p-3">
                {/* <div className="learned tw-text-xs tw-font-medium tw-text-black tw-pb-2">
              30 người học
            </div> */}
                <div className="featured-course-title tw-text-black tw-font-semibold tw-text-lg">
                  <Link
                    to={`/khoa-hoc/${convertToUnicode(course?.name)}/${
                      course?.id
                    }`}
                    className="hover:tw-text-[#ff0000] tw-block"
                  >
                    {course?.name}
                  </Link>
                </div>
                {/* <div className="course-desc tw-text-sm tw-mb-3">
            {ReactHtmlParser(course?.description)}
            </div> */}
                <div className="name-PT tw-font-semibold tw-capitalize">
                  PT: {course?.teacher?.name}
                </div>
                <div className="course-rating tw-flex tw-items-center tw-mt-1">
                  <span className="tw-text-yellow-500 tw-text-md tw-pr-1 tw-font-normal">
                    {course?.avg_start === null
                      ? "0.0"
                      : parseFloat(course?.avg_start).toFixed(1)}
                  </span>
                  <Rate
                    className="tw-text-sm"
                    disabled
                    allowHalf
                    defaultValue={
                      course?.avg_start === null
                        ? 0
                        : parseInt(course?.avg_start) <
                            parseFloat(course?.avg_start) &&
                          parseFloat(course?.avg_start) <
                            parseInt(course?.avg_start) + 0.5
                        ? parseInt(course?.avg_start) + 0.5
                        : parseFloat(course?.avg_start)
                    }
                  />
                  <span className="tw-text-[10px] tw-pl-2">
                    ({course?.count_comment})
                  </span>
                </div>
                <div className="tw-text-black tw-font-medium tw-py-2">
                  {convertCurrency(course?.price)}
                </div>
                <Tag color="#f50">
                  <div className="tw-text-xs tw-py-1">
                    {course?.customer_level?.name}
                  </div>
                </Tag>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="tw-flex tw-justify-center">
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={<span>Không có khóa học</span>}
      ></Empty>
    </div>
  );
};

export default ListCourse;
