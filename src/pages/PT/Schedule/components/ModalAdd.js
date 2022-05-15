import React from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select,
  notification,
} from "antd";
import moment from "moment";
import "moment/locale/vi";
import { createSchedule, getSchedule } from "../ScheduleSlice";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
const ModalAdd = ({ visible, onCancel, CoursePlans, student_id }) => {
  const { loading } = useSelector((state) => state.SchedulePt);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onFinish = async (value) => {
    try {
      const newData = {
        ...value,
        date: value?.date?.format("YYYY-MM-DD"),
        time_start: value?.time_start?.format("HH:mm:ss"),
        time_end: value?.time_end?.format("HH:mm:ss"),
        course_student_id: +student_id,
      };
      const resulDispatch = await dispatch(createSchedule(newData));
      unwrapResult(resulDispatch);
      onCancel();
      form.resetFields();
      notification.success({
        message: "Thêm lịch thành công",
      });
      dispatch(getSchedule(student_id));
    } catch (error) {
      if (typeof error === "object") {
        form.setFields([
          error?.course_plan_id
            ? {
                name: "course_plan_id",
                errors: [error?.course_plan_id[0]],
              }
            : "",
          error?.date
            ? {
                name: "date",
                errors: [error?.date[0]],
              }
            : "",
          error?.link_room
            ? {
                name: "link_room",
                errors: [error?.link_room[0]],
              }
            : "",
          error?.time_end
            ? {
                name: "time_end",
                errors: [error?.time_end[0]],
              }
            : "",
          error?.time_start
            ? {
                name: "time_start",
                errors: [error?.time_start[0]],
              }
            : "",
          error?.title
            ? {
                name: "title",
                errors: [error?.title[0]],
              }
            : "",
        ]);
        notification.error({
          message: "Thêm lịch thất bại",
        });
      } else {
        notification.error({
          message: error,
        });
      }
    }
  };
  return (
    <Modal
      title="Thêm lịch dạy"
      visible={visible}
      onCancel={onCancel}
      //   footer={null}
      confirmLoading={loading}
      className="lg:!tw-w-1/2"
      okText="Lưu"
      cancelText="Hủy"
      okButtonProps={{ form: "form-add-event", htmlType: "submit" }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        id="form-add-event"
      >
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[
            {
              required: true,
              message: "Hãy nhập tiêu đề",
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="course_plan_id"
          label="Buổi học"
          rules={[{ required: true, message: "Hãy chọn buổi học" }]}
        >
          <Select placeholder="Chọn buổi học" allowClear size="large">
            {CoursePlans?.map((CoursePlan) => {
              return (
                <Select.Option value={CoursePlan.id} key={CoursePlan.id}>
                  {CoursePlan.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="Link room"
          name="link_room"
          rules={[
            {
              required: true,
              message: "Hãy nhập Link rom",
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="date"
          label="Ngày"
          rules={[
            {
              type: "object",
              required: true,
              message: "hãy chọn ngày!",
            },
          ]}
        >
          <DatePicker
            size="large"
            className="tw-w-full"
            placeholder={moment().format("YYYY-MM-DD")}
          />
        </Form.Item>
        <div className="tw-flex tw-flex-col lg:tw-flex-row">
          <Form.Item
            name="time_start"
            label="Giờ bắt đầu"
            className="tw-flex-1 tw-pr-2"
            rules={[
              {
                type: "object",
                required: true,
                message: "Nhập giờ bắt đầu!",
              },
            ]}
          >
            <TimePicker
              size="large"
              className="tw-w-full"
              placeholder="00:00:00"
            />
          </Form.Item>

          <Form.Item
            name="time_end"
            label="Giờ kết thúc"
            className="tw-flex-1 tw-pl-2"
            rules={[
              {
                type: "object",
                required: true,
                message: "Nhập giờ kết thúc!",
              },
            ]}
          >
            <TimePicker
              size="large"
              className="tw-w-full"
              placeholder="00:00:00"
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalAdd;
