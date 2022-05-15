 
import FullCalendar from "@fullcalendar/react";
import React, { useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import viLocale from "@fullcalendar/core/locales/vi";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { useDispatch, useSelector } from "react-redux";
import {
  getEventsCustomer,
  setInfoEventClick,
} from "../../../Website/AllScheduleCustomer/AllScheduleCustomerSlice";
import { Modal, Spin } from "antd";
import moment from "moment";
const CalenderAll = () => {
  const { events, loading, event } = useSelector(
    (state) => state.AllscheduleCustomer
  );
  const dispatch = useDispatch();
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
  useEffect(() => {
    dispatch(getEventsCustomer());
  }, []);
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
          showModal();
          const record = {
            ...e.event._def.extendedProps,
            id: e.event.id,
            title: e.event.title,
            start: e.event.startStr,
            end: e.event.endStr,
          };
          dispatch(setInfoEventClick(record));
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
          <i className="far fa-calendar-alt tw-text-lg tw-min-w-[30px] "></i>
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
          <i className="fas fa-user-tie tw-min-w-[30px] tw-text-lg"></i>
          <div className="tw-font-medium">
            PT:{" "}
            <span className="tw-capitalize">
              {event?.course_student?.courses?.teacher?.name}
            </span>
          </div>
        </div>

        <div className="tw-flex tw-pt-3 tw-items-center">
          <i className="fas fa-book-open tw-min-w-[30px] tw-text-lg"></i>
          <div className="tw-font-medium ">
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
    </Spin>
  );
};

export default CalenderAll;
