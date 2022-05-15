 

import FullCalendar from "@fullcalendar/react";
import viLocale from "@fullcalendar/core/locales/vi";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Input, Modal, Spin, Form, notification } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLinkRecord,
  getEventsPt,
  setInfoEventClick,
} from "../AllSchedulePtSlice";
import { unwrapResult } from "@reduxjs/toolkit";
const CalenderPt = () => {
  const { events, loading, event, loadingRecord } = useSelector(
    (state) => state.AllschedulePt
  );
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isModalRecord, setIsModalRecord] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleEventClick = (e) => {
    const record = {
      ...e.event._def.extendedProps,
      id: e.event.id,
      title: e.event.title,
      start: e.event.startStr,
      end: e.event.endStr,
    };
    showModal();
    dispatch(setInfoEventClick(record));
  };
  const showAddLinkRecord = (value) => {
    if (value) {
      form.setFieldsValue({
        link_record: value,
      });
    }

    setIsModalRecord(true);
    setIsModalVisible(false);
  };
  useEffect(() => {
    dispatch(getEventsPt());
  }, []);
  const onFinish = async (data) => {
    try {
      const resulDispatch = await dispatch(
        addLinkRecord({ data, id: event.id })
      );
      unwrapResult(resulDispatch);
      notification.success({
        message: "Cập nhật link record thành công",
      });
      setIsModalRecord(false);
      form.resetFields();
    } catch (error) {
      if (typeof error !== "object") {
        notification.error({
          message: error,
        });
      } else {
        notification.error({
          message: "Cập nhật link record thất bại",
        });
      }
    }
  };
  return (
    <Spin spinning={loading}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        }}
        timeZone="local"
        allDaySlot={false}
        events={events}
        locale={viLocale}
        eventClick={(e) => {
          handleEventClick(e);
        }}
      ></FullCalendar>
      <Modal
        title={event?.title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="tw-flex">
          <i className="far fa-calendar-alt tw-text-lg tw-min-w-[30px]"></i>
          <div className="tw-font-medium">
            {moment(event?.newDate).format(
              "dddd, [ngày] DD [tháng] MM [năm] YYYY"
            )}
            <div>
              {moment(event?.start).format("HH:mm")} -{" "}
              {moment(event?.end).format("HH:mm")}
            </div>
          </div>
        </div>
        <div className="tw-flex tw-pt-3 tw-items-center">
          <i className="fas fa-user-graduate tw-text-lg tw-min-w-[30px]"></i>
          <div className="tw-font-medium">
            Học Viên:{" "}
            <span className="tw-capitalize">
              {event?.course_student?.users?.name}
            </span>
          </div>
        </div>
        <div className="tw-flex tw-pt-3 tw-items-center">
          <i className="fas fa-book-open tw-min-w-[30px] tw-text-lg"></i>
          <div className="tw-font-medium">
            khóa học:{" "}
            <span className="tw-capitalize">
              {event?.course_student?.courses?.name}
            </span>
          </div>
        </div>
        <div className="tw-flex tw-pt-3 tw-items-center">
          <i className="far fa-clipboard tw-min-w-[30px] tw-text-lg"></i>
          <div className="tw-font-medium">
            Buổi học:{" "}
            <span className="tw-capitalize">{event?.course_planes?.name}</span>
          </div>
        </div>
        <div className="tw-flex tw-pt-3 tw-items-center">
          <i className="fab fa-blackberry tw-min-w-[30px] tw-text-lg"></i>
          <div className="tw-font-medium">
            Giai đoạn:{" "}
            <span className="tw-capitalize">
              {event?.course_planes?.stage?.name}
            </span>
          </div>
        </div>
        <div className="tw-flex tw-pt-3 tw-items-center">
          <i className="fas fa-link tw-text-lg tw-min-w-[30px]"></i>
          <div className="tw-font-medium">
            Link room:{" "}
            <a
              href={event?.link_room}
              className="tw-capitalize tw-text-blue-500 hover:tw-text-blue-700 hover:!tw-underline"
            >
              {event?.link_room}
            </a>
          </div>
        </div>
        <div className="tw-flex tw-pt-3 tw-justify-between tw-items-center">
          <div className="tw-flex tw-items-center tw-w-4/5">
            <i className="fas fa-video tw-text-lg tw-min-w-[30px]"></i>
            <div className="tw-font-medium">
              Link record:{" "}
              {event?.link_record ? (
                <a
                  href={event?.link_record}
                  className="tw-capitalize tw-text-blue-500 hover:tw-text-blue-700 hover:!tw-underline"
                >
                  {event?.link_record}
                </a>
              ) : (
                "Chưa có Link record"
              )}
            </div>
          </div>
          <div className="tw-w-1/5 tw-text-right">
            <span
              className="tw-text-xs  tw-px-2 tw-py-1 tw-rounded-[30px] tw-cursor-pointer tw-text-blue-500 tw-border-blue-500 tw-border"
              onClick={() => showAddLinkRecord(event?.link_record)}
            >
              Cập nhật
            </span>
          </div>
        </div>
        <div className="tw-flex tw-pt-3 tw-items-center">
          <i className="fas fa-thermometer tw-text-lg tw-min-w-[30px]"></i>
          <div className="tw-font-medium">
            Tình trạng:{" "}
            <span>
              {event?.status === "unfinished"
                ? "Chưa hoàn thành"
                : "Hoàn thành"}
            </span>
          </div>
        </div>
      </Modal>
      <Modal
        title="Nhập link record"
        visible={isModalRecord}
        onCancel={() => {
          form.resetFields();
          setIsModalRecord(false);
        }}
        okText="Lưu"
        cancelText="Hủy"
        confirmLoading={loadingRecord}
        okButtonProps={{ form: "form-link-record", htmlType: "submit" }}
      >
        <Form
          layout="vertical"
          id="form-link-record"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item label="Link Record" name="link_record">
            <Input size="large" />
          </Form.Item>
        </Form>
      </Modal>
    </Spin>
  );
};

export default CalenderPt;
