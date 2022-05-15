import FullCalendar from "@fullcalendar/react";
import viLocale from "@fullcalendar/core/locales/vi";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Modal, Spin } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCalenderEvents } from "../ScheduleCustomerSlice";
const CalenderCustom = () => {
  const { id } = useParams();
  const { loading, events } = useSelector((state) => state.ScheduleCustom);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataEventClick, setDataEventClick] = useState({});
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
    dispatch(getCalenderEvents(id));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
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
            setDataEventClick(record);
          }}
        ></FullCalendar>
      </Spin>
      <Modal
        title={dataEventClick?.title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="tw-flex">
          <i className="far fa-calendar-alt tw-text-lg tw-min-w-[30px] "></i>
          <div className="tw-font-medium">
            {moment(dataEventClick?.newDate).format(
              "dddd, [ngày] DD [tháng] MM [năm] YYYY"
            )}
            <div>
              {moment(dataEventClick?.start).format("HH:mm")} -{" "}
              {moment(dataEventClick?.end).format("HH:mm")}
            </div>
          </div>
        </div>

        <div className="tw-flex tw-pt-3 tw-items-center">
          <i className="fas fa-user-tie tw-min-w-[30px] tw-text-lg"></i>
          <div className="tw-font-medium">
            PT:{" "}
            <span className="tw-capitalize">
              {dataEventClick?.course_student?.courses?.teacher?.name}
            </span>
          </div>
        </div>

        <div className="tw-flex tw-pt-3 tw-items-center">
          <i className="fas fa-book-open tw-min-w-[30px] tw-text-lg"></i>
          <div className="tw-font-medium ">
            khóa học:{" "}
            <span className="tw-capitalize">
              {dataEventClick?.course_student?.courses?.name}
            </span>
          </div>
        </div>
        <div className="tw-flex tw-pt-3 tw-items-center">
          <i className="far fa-clipboard tw-min-w-[30px] tw-text-lg"></i>
          <div className="tw-font-medium">
            Buổi học:{" "}
            <span className="tw-capitalize">
              {dataEventClick?.course_planes?.name}
            </span>
          </div>
        </div>
        <div className="tw-flex tw-pt-3 tw-items-center">
          <i className="fab fa-blackberry tw-min-w-[30px] tw-text-lg"></i>
          <div className="tw-font-medium">
            Giai đoạn:{" "}
            <span className="tw-capitalize">
              {dataEventClick?.course_planes?.stage?.name}
            </span>
          </div>
        </div>
        <div className="tw-flex tw-pt-3 tw-items-center">
          <i className="fas fa-link tw-text-lg tw-min-w-[30px]"></i>
          <div className="tw-font-medium">
            Link room:{" "}
            <a
              href={dataEventClick?.link_room}
              className="tw-capitalize tw-text-blue-500 hover:tw-text-blue-700 hover:!tw-underline"
            >
              {dataEventClick?.link_room}
            </a>
          </div>
        </div>
        <div className="tw-flex tw-pt-3 tw-items-center">
          <i className="fas fa-thermometer tw-text-lg tw-min-w-[30px]"></i>
          <div className="tw-font-medium">
            Tình trạng:{" "}
            <span>
              {dataEventClick?.status === "unfinished"
                ? "Chưa hoàn thành"
                : "Hoàn thành"}
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CalenderCustom;
