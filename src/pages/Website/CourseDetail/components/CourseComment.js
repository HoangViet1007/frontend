import {
  Avatar,
  Card,
  Form,
  Input,
  notification,
  Rate,
  List,
  Empty,
} from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { addComment } from "../CourseDetailSlice";
import { unwrapResult } from "@reduxjs/toolkit";
const CourseComment = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { courseDetail, loadingAddComment, comments_client } = useSelector(
    (state) => state.CourseDetail
  );
  const { infoUser } = useSelector((state) => state.InfoUser);
  const onFinish = async (data) => {
    try {
      const newData = {
        ...data,
        id_course: courseDetail?.detail_course?.id,
        user_id: infoUser?.id,
      };
      const resulDispatch = await dispatch(addComment(newData));
      unwrapResult(resulDispatch);
      notification.success({
        message: "Đánh giá khóa học thành công",
        description:
          "Cảm ơn bạn đã đánh giá khóa học. Đánh giá của bạn rất hữu ích cho những học viên đang quan tâm khóa học này",
      });
      form.resetFields();
    } catch (error) {
      if (typeof error !== "object") {
        notification.error({
          message: error,
        });
      }
    }
  };
  return (
    <Card
      id="course-comment"
      title="Nhận xét của học viên"
      headStyle={{ fontSize: "18px", paddingLeft: "10px", fontWeight: "bold" }}
      className="tw-mt-2"
    >
      {/* <div className="tw-flex"> */}
      {infoUser && (
        <div className="tw-flex tw-pb-10">
          <div className="tw-pr-3 tw-pt-[8px]">
            <Avatar size="large" src={infoUser?.image} />
          </div>
          <div className="tw-flex-1">
            <Form
              onFinish={onFinish}
              layout="horizontal"
              colon={false}
              form={form}
              initialValues={{
                number_stars: 1,
                content: "",
              }}
            >
              <Form.Item
                name="number_stars"
                label={<p style={{ fontWeight: "500" }}>Đánh giá của bạn:</p>}
                className="tw-mb-1"
              >
                <Rate
                  tooltips={["Rất tệ", "Tệ", "Bình Thường", "Tốt", "Rất tốt"]}
                  className="tw-ml-4"
                />
              </Form.Item>
              <Form.Item
                name="content"
                label={
                  <div>
                    <span style={{ fontWeight: "500" }}>Nhận xét: </span>
                    <span className="tw-text-sm tw-text-gray-400">
                      (Ý kiến của bạn sẽ thêm thông tin cho nhiều học viên tham
                      gia khác)
                    </span>
                  </div>
                }
                className="tw-block"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập nội dung đánh giá",
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="Nội dung đánh giá" />
              </Form.Item>
              <div className="tw-text-right">
                <button
                  className="theme-btn btn-style-three tw-border-0 tw-bg-black tw-p-2"
                  type="submit"
                >
                  <div className="tw-relative tw-z-[1] ">
                    <span
                      className="tw-normal-case
                 tw-text-white tw-px-2 tw-font-medium"
                    >
                      {loadingAddComment && (
                        <LoadingOutlined className="tw-mr-2" />
                      )}
                      Gửi đánh giá
                    </span>
                  </div>
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}
      <div className="tw-font-semibold">Tất cả nhận xét</div>
      <List
        pagination={comments_client?.lenght > 0}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<span>Chưa có nhận xét nào</span>}
            />
          ),
        }}
        itemLayout="horizontal"
        dataSource={comments_client}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={<Avatar size="large" src={item?.user_comment?.image} />}
              title={
                <>
                  <div className="tw-font-medium tw-capitalize">
                    {item?.user_comment?.name}
                  </div>
                  <div>
                    <Rate
                      defaultValue={item.number_stars}
                      disabled
                      className="tw-text-sm ant-rate-star-custom"
                    />
                  </div>
                </>
              }
              description={
                <div className="tw-text-gray-600">{item.content}</div>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default CourseComment;
