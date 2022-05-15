import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import PageTitle from "../../../../components/componentsWebsite/TitlePage";
import CourseAssessment from "../components/CourseAssessment";
import CourseBuy from "../components/CourseBuy";
import CourseComment from "../components/CourseComment";
import CourseContent from "../components/CourseContent";
import CourseIntroduction from "../components/CourseIntroduction";
import InfoDetail from "../components/InfoDetail";
import InfoTop from "../components/InfoTop";
import { getCourseDetail } from "../CourseDetailSlice";
import { Skeleton } from "antd";
import RelatedCourse from "../components/RelatedCourse";
import { unwrapResult } from "@reduxjs/toolkit";
const CourseDetailPage = () => {
  const history = useHistory();
  const { courseDetail, loading, comments_client } = useSelector(
    (state) => state.CourseDetail
  );
  const dispatch = useDispatch();
  let { id } = useParams();
  useEffect(async () => {
    try {
      const result = await dispatch(getCourseDetail(id));
      unwrapResult(result);
    } catch (error) {
      if (error.status === 400 || error.status === 500) {
      }
      history.push("/404");
    }
  }, [id]);
  return (
    <>
      {/* <Helmet>
        <title>{courseDetail.detail_course?.name + SITE_TITLE}</title>
        <meta
          name="description"
          content={`${courseDetail.detail_course?.description}`}
        />
        <meta
          property="og:title"
          content={`${courseDetail.detail_course?.name}`}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:description"
          content={`${courseDetail.detail_course?.description}`}
        />
        <meta
          property="og:image"
          content={`${courseDetail.detail_course?.image}`}
        />
      </Helmet> */}
      <section>
        <PageTitle namePage={courseDetail.detail_course?.name} />
        <div className="tw-bg-[#f3f3f3] fade-main">
          <div className="container sm:tw-px-0  tw-py-10 ">
            <Skeleton loading={loading} active>
              <InfoTop
                courseDetail={courseDetail.detail_course}
                comments={comments_client}
              />
              <div className="tw-flex tw-flex-col lg:tw-flex-row">
                <div className="tw-w-full lg:tw-w-[66.66666667%] lg:tw-pr-3">
                  {/* <InfoTop courseDetail={courseDetail} /> */}
                  <InfoDetail courseDetail={courseDetail.detail_course} />
                  <CourseIntroduction
                    courseDetail={courseDetail.detail_course}
                  />
                  <CourseContent courseDetail={courseDetail.detail_course} />
                  <CourseAssessment
                    comments={comments_client}
                    courseDetail={courseDetail.detail_course}
                  />
                  <CourseComment />
                </div>
                <div className="tw-flex-1">
                  <CourseBuy courseDetail={courseDetail.detail_course} />
                </div>
              </div>
              <RelatedCourse Courses={courseDetail.get_course} />
            </Skeleton>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseDetailPage;
