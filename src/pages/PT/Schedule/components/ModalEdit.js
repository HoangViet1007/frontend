import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select,
  notification,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { editSchedule, getSchedule } from "../ScheduleSlice";
import { unwrapResult } from "@reduxjs/toolkit";
const ModalEdit = ({ visible, onCancel, CoursePlans, student_id }) => {
  const { eventDetail, loading } = useSelector((state) => state.SchedulePt);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      title: eventDetail.title,
      course_plan_id: eventDetail.course_plan_id,
      link_room: eventDetail.link_room,
      date: moment(eventDetail.newDate, "YYYY-MM-DD"),
      time_start: moment(eventDetail.time_start, "HH:mm:ss"),
      time_end: moment(eventDetail.time_end, "HH:mm:ss"),
    });
  }, [eventDetail, form]);
  const onFinish = async (value) => {
    try {
      const newData = {
        ...value,
        date: value?.date?.format("YYYY-MM-DD"),
        time_start: value?.time_start?.format("HH:mm:ss"),
        time_end: value?.time_end?.format("HH:mm:ss"),
        course_student_id: +student_id,
      };
      const result = await dispatch(
        editSchedule({ id: eventDetail?.id, data: newData })
      );
      unwrapResult(result);
      onCancel();
      notification.success({ message: "Sửa thành công" });
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
        notification.error({ message: "Sửa thất bại" });
      } else {
        notification.error({
          message: error,
        });
      }
    }
  };
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      className="lg:!tw-w-1/2"
      okText="Cập nhật"
      cancelText="Hủy"
      okButtonProps={{ form: "form-edit-event", htmlType: "submit" }}
      confirmLoading={loading}
    >
      <div className="tw-font-semibold tw-pb-3 tw-text-lg">{`Cập nhật ${eventDetail?.title}`}</div>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        id="form-edit-event"
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
          label="Giai đoạn"
          rules={[{ required: true, message: "Hãy chọn giai đoạn" }]}
        >
          <Select placeholder="Chọn giai đoạn" allowClear size="large">
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
            // defaultValue={moment("2021-01-01", "YYYY-MM-DD")}
            size="large"
            className="tw-w-full"
            placeholder="2021-11-07"
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

export default ModalEdit;
