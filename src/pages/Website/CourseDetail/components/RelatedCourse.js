import React from "react";
import { Card } from "antd";
import ListCourse from "../../../../components/componentsWebsite/ShowListCourse/ListCourse";
const RelatedCourse = ({ Courses }) => {
  return (
    <div className="tw-mt-2">
      <Card title="Khóa học liên quan">
        <ListCourse Courses={Courses} />
      </Card>
    </div>
  );
};

export default RelatedCourse;
