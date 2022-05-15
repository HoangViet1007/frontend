import React, { useState, useEffect } from "react";
import { Card, Rate } from "antd";
import ReactHtmlParser from "react-html-parser";
const InfoTop = ({ courseDetail, comments }) => {
  const [avgStart, setAvgStart] = useState({
    defaultValueRate: 0,
    avg_start: 0,
  });
  useEffect(() => {
    const avg_start = () => {
      if (comments?.length > 0) {
        let totalAvgStart = 0;
        comments.map((x) => (totalAvgStart += x.number_stars));
        const IntAvg = parseInt(totalAvgStart / comments.length);
        const Avg = (totalAvgStart / comments.length).toFixed(1);
        if (IntAvg < +Avg && +Avg < IntAvg + 0.5) {
          setAvgStart({ defaultValueRate: IntAvg + 0.5, avg_start: +Avg });
        } else {
          setAvgStart({
            defaultValueRate: +Avg,
            avg_start: +Avg,
          });
        }
      } else {
        setAvgStart({
          defaultValueRate: 0,
          avg_start: "0.0",
        });
      }
    };
    avg_start();
  }, [comments]);

  return (
    <Card className="tw-mb-2">
      <div className="container sm:tw-px-0">
        <h1 className="name-course tw-text-xl sm:tw-text-2xl md:tw-text-4xl tw-font-semibold tw-text-black">
          {courseDetail?.name}
        </h1>
        <div className="desc-course tw-text-black tw-my-5">
          {ReactHtmlParser(courseDetail?.description)}
        </div>
        <div className="author-course tw-flex tw-flex-col md:tw-flex-row md:tw-items-center">
          <div className="tw-flex tw-items-center">
            <div className="author-course-img tw-w-10 tw-h-10 ">
              <img
                className="tw-rounded-full tw-w-full tw-h-full tw-object-cover"
                src={courseDetail?.specialize_details?.user?.image}
                alt="Hình ảnh không tồn tại"
              />
            </div>
            <div className="author-course-name tw-capitalize tw-text-black tw-pl-3 tw-font-medium">
              {courseDetail?.specialize_details?.user?.name}
            </div>
          </div>
          <div className="author-course-rate md:tw-px-10 tw-flex tw-items-center tw-py-3 md:tw-py-0">
            <span className="tw-text-yellow-300 tw-font-medium tw-text-[17px]">
              {avgStart.avg_start}
            </span>
            <Rate
              allowHalf
              disabled
              className="tw-text-sm"
              value={avgStart?.defaultValueRate}
            />
            <span className="tw-text-black tw-pl-1 tw-text-xs">
              ({comments?.length} đánh giá)
            </span>
          </div>
          <div className="tw-text-black detail-student">
            <i className="fas fa-users"></i>
            <span className="tw-text-xs tw-pl-1">
              {courseDetail?.course_students?.length} học viên
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InfoTop;
