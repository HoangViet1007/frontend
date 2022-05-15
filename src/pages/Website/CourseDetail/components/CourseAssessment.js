import { Card, Progress, Rate } from "antd";
import React, { useState, useEffect } from "react";

const CourseAssessment = ({ courseDetail, comments }) => {
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
          avg_start: 0,
        });
      }
    };
    avg_start();
  }, [comments]);

  const filterByStart = (number_stars) => {
    const course = comments?.filter((x) => x.number_stars === number_stars);
    return ((course?.length / comments?.length) * 100).toFixed(0);
  };

  return (
    <Card
      id="course-assessment"
      title="Đánh giá của học viên"
      headStyle={{ fontSize: "18px", paddingLeft: "10px", fontWeight: "bold" }}
      className="tw-mt-2"
    >
      <div className="tw-flex tw-flex-col lg:tw-flex-row lg:tw-items-center tw-mb-1.5">
        <div className="assessment-left tw-text-center">
          <div className="tw-text-[70px] tw-font-bold tw-text-[#333] tw-leading-[70px]">
            {avgStart.avg_start}
          </div>
          <Rate allowHalf disabled value={avgStart?.defaultValueRate} />
          <div className="tw-text-black tw-font-medium">
            {comments?.length} đánh giá
          </div>
        </div>
        <div className="assessment-left tw-flex-1 lg:tw-pl-10 tw-mt-5 lg:tw-mt-0">
          <div className="tw-flex tw-items-center tw-mb-1.5">
            <Progress
              strokeColor="#ff0000"
              strokeLinecap="square"
              percent={parseFloat(filterByStart(5))}
              status="active"
            />
            <Rate
              className="tw-text-sm tw-flex tw-pl-2"
              allowHalf
              disabled
              defaultValue={5}
            />
          </div>
          <div className="tw-flex tw-items-center tw-mb-1.5">
            <Progress
              strokeColor="#ff0000"
              strokeLinecap="square"
              percent={parseFloat(filterByStart(4))}
              status="active"
            />
            <Rate
              className="tw-text-sm tw-flex tw-pl-2"
              allowHalf
              disabled
              defaultValue={4}
            />
          </div>
          <div className="tw-flex tw-items-center tw-mb-1.5">
            <Progress
              strokeColor="#ff0000"
              strokeLinecap="square"
              percent={parseFloat(filterByStart(3))}
              status="active"
            />
            <Rate
              className="tw-text-sm tw-flex tw-pl-2"
              allowHalf
              disabled
              defaultValue={3}
            />
          </div>
          <div className="tw-flex tw-items-center tw-mb-1.5">
            <Progress
              strokeColor="#ff0000"
              strokeLinecap="square"
              percent={parseFloat(filterByStart(2))}
              status="active"
            />
            <Rate
              className="tw-text-sm tw-flex tw-pl-2"
              allowHalf
              disabled
              defaultValue={2}
            />
          </div>
          <div className="tw-flex tw-items-center tw-mb-1.5">
            <Progress
              strokeColor="#ff0000"
              strokeLinecap="square"
              percent={parseFloat(filterByStart(1))}
              status="active"
            />
            <Rate
              className="tw-text-sm tw-flex tw-pl-2"
              allowHalf
              disabled
              defaultValue={1}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CourseAssessment;
