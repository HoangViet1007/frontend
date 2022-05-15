 
 
 
 
import { Card, PageHeader } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ListCoursePlan from "../components/ListCoursePlan";
import { getCoursesPlan } from "../CoursePlanCustomerSlice";
const CoursePlanCustomerPage = () => {
  const dispatch = useDispatch();
  const { id_course_student } = useParams();
  useEffect(() => {
    dispatch(getCoursesPlan(id_course_student));
  }, []);
  return (
    <Card
      title={
        <PageHeader
          className="site-page-header tw-p-0"
          onBack={() => window.history.back()}
          title="Bài học"
        />
      }
    >
      <ListCoursePlan />
    </Card>
  );
};

export default CoursePlanCustomerPage;
