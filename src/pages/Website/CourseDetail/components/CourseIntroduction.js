import { Card } from "antd";
import React from "react";
import ReactHtmlParser from "react-html-parser";
const CourseIntroduction = ({ courseDetail }) => {
  return (
    <Card
      id="course-intro"
      title="Giới thiệu khóa học"
      headStyle={{ fontSize: "18px", paddingLeft: "10px", fontWeight: "bold" }}
      className="tw-mt-2"
    >
      <div className="course-intro-content">
        {ReactHtmlParser(courseDetail?.content)}
      </div>
    </Card>
  );
};

export default CourseIntroduction;
