import React from "react";
import { Card, Collapse, Empty } from "antd";
const CourseContent = ({ courseDetail }) => {
  return (
    <Card
      id="courseContent"
      title="Nội dung khóa học"
      headStyle={{ fontSize: "18px", paddingLeft: "10px", fontWeight: "bold" }}
      className="tw-mt-2"
    >
      <Collapse
        accordion
        bordered={false}
        defaultActiveKey={[1]}
        className="site-collapse-custom-collapse tw-bg-white"
      >
        {courseDetail?.stages_client &&
        courseDetail?.stages_client.length === 0 ? (
          <div className="tw-flex tw-justify-center">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<span>Chưa có khóa học</span>}
            ></Empty>
          </div>
        ) : (
          courseDetail?.stages_client &&
          courseDetail?.stages_client.map((detail, index) => {
            return (
              <Collapse.Panel
                className="course-panel-item site-collapse-custom-panel tw-font-semibold"
                header={detail.name}
                key={index + 1}
              >
                {detail?.course_planes && detail?.course_planes.length > 0 ? (
                  detail?.course_planes.map((course_plane, i) => {
                    return (
                      <div
                        className="tw-border-b hover:tw-bg-[#ff0000] hover:tw-text-white tw-transition tw-duration-300"
                        key={i}
                      >
                        <div className="tw-h-10 tw-flex tw-items-center tw-font-normal tw-px-5">
                          <span>
                            {course_plane.name}{" "}
                            <span className="tw-text-xs tw-font-medium">
                              {course_plane?.type === 1
                                ? "(Video)"
                                : "(Trực tiếp)"}
                            </span>
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="tw-flex tw-justify-center">
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={<span>Chưa có buổi học</span>}
                    ></Empty>
                  </div>
                )}
              </Collapse.Panel>
            );
          })
        )}

        {/* detail?.course_planes.map((course_plane, i) => {
                    return (
                      <div className="tw-border-b hover:tw-bg-[#ff0000] hover:tw-text-white tw-transition tw-duration-300">
                        <div className="tw-h-10 tw-flex tw-items-center tw-font-normal tw-px-5">
                          <span>{`Bài ${i + 1}: ${course_plane.name}`}</span>
                        </div>
                      </div>
                    );
                  }) */}

        {/* {courseDetail?.stages_client &&
          courseDetail?.stages_client.map((detail, index) => {
            return (
              <Collapse.Panel
                className="course-panel-item site-collapse-custom-panel tw-font-semibold"
                header={`Buổi ${index + 1}: ${detail.name}`}
                key={index + 1}
              >
                {detail?.course_planes &&
                  detail?.course_planes.map((course_plane, i) => {
                    return (
                      <div className="tw-border-b hover:tw-bg-[#ff0000] hover:tw-text-white tw-transition tw-duration-300">
                        <div className="tw-h-10 tw-flex tw-items-center tw-font-normal tw-px-5">
                          <span>{`Bài ${i + 1}: ${course_plane.name}`}</span>
                        </div>
                      </div>
                    );
                  })}
              </Collapse.Panel>
            );
          })} */}
        {/* <Collapse.Panel
          className="course-panel-item site-collapse-custom-panel tw-font-semibold"
          header="Buổi 1: Chuẩn bị tinh thần, phổ biến khóa học, chuẩn bị các phụ kiện hỗ trợ trong quá trình tập"
          key="1"
        >
          <div className="tw-border-b hover:tw-bg-[#ff0000] hover:tw-text-white tw-transition tw-duration-300">
            <div className="tw-h-10 tw-flex tw-items-center tw-font-normal tw-px-5">
              <span>Bài 1: Tổng quan công tác đào tạo tại doanh nghiệp</span>
            </div>
          </div>
          <div className="tw-border-b hover:tw-bg-[#ff0000] hover:tw-text-white tw-transition tw-duration-300">
            <div className="tw-h-10 tw-flex tw-items-center tw-font-normal tw-px-5">
              <span>
                Bài 2: Yêu cầu kiến thức, kỹ năng của Chuyên viên đào tạo
              </span>
            </div>
          </div>
        </Collapse.Panel>
        <Collapse.Panel
          className="course-panel-item site-collapse-custom-panel tw-font-semibold"
          header="Buổi 2: Chuẩn bị tinh thần, phổ biến khóa học, chuẩn bị các phụ kiện hỗ trợ trong quá trình tập"
          key="2"
        >
          <div className="tw-border-b hover:tw-bg-[#ff0000] hover:tw-text-white tw-transition tw-duration-300">
            <div className="tw-h-10 tw-flex tw-items-center tw-font-normal tw-px-5">
              <span>Bài 1: Tổng quan công tác đào tạo tại doanh nghiệp</span>
            </div>
          </div>
          <div className="tw-border-b hover:tw-bg-[#ff0000] hover:tw-text-white tw-transition tw-duration-300">
            <div className="tw-h-10 tw-flex tw-items-center tw-font-normal tw-px-5">
              <span>
                Bài 2: Yêu cầu kiến thức, kỹ năng của Chuyên viên đào tạo
              </span>
            </div>
          </div>
        </Collapse.Panel>
        <Collapse.Panel
          className="course-panel-item site-collapse-custom-panel tw-font-semibold"
          header="Buổi 3: Chuẩn bị tinh thần, phổ biến khóa học, chuẩn bị các phụ kiện hỗ trợ"
          key="3"
        >
          <div className="tw-border-b hover:tw-bg-[#ff0000] hover:tw-text-white tw-transition tw-duration-300">
            <div className="tw-h-10 tw-flex tw-items-center tw-font-normal tw-px-5">
              <span>Bài 1: Tổng quan công tác đào tạo tại doanh nghiệp</span>
            </div>
          </div>
          <div className="tw-border-b hover:tw-bg-[#ff0000] hover:tw-text-white tw-transition tw-duration-300">
            <div className="tw-h-10 tw-flex tw-items-center tw-font-normal tw-px-5">
              <span>
                Bài 2: Yêu cầu kiến thức, kỹ năng của Chuyên viên đào tạo
              </span>
            </div>
          </div>
        </Collapse.Panel>
        <Collapse.Panel
          className="course-panel-item site-collapse-custom-panel tw-font-semibold"
          header="Buổi 4: Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima"
          key="4"
        >
          <div className="tw-border-b hover:tw-bg-[#ff0000] hover:tw-text-white tw-transition tw-duration-300">
            <div className="tw-h-10 tw-flex tw-items-center tw-font-normal tw-px-5">
              <span>Bài 1: Tổng quan công tác đào tạo tại doanh nghiệp</span>
            </div>
          </div>
          <div className="tw-border-b hover:tw-bg-[#ff0000] hover:tw-text-white tw-transition tw-duration-300">
            <div className="tw-h-10 tw-flex tw-items-center tw-font-normal tw-px-5">
              <span>
                Bài 2: Yêu cầu kiến thức, kỹ năng của Chuyên viên đào tạo
              </span>
            </div>
          </div>
        </Collapse.Panel> */}
      </Collapse>
    </Card>
  );
};

export default CourseContent;
