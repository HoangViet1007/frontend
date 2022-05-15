
 
import FullCalendar from "@fullcalendar/react";
import viLocale from "@fullcalendar/core/locales/vi";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCoursePlan, getSchedule } from "../ScheduleSlice";
import ModalAdd from "./ModalAdd";
import ModalDetailEvent from "./ModalDetailEvent";
import ModalEdit from "./ModalEdit";
const CalenderPt = () => {
  const dispatch = useDispatch();
  const { id_course_student } = useParams();
  const { loadingdata, schedules, CoursePlans } = useSelector(
    (state) => state.SchedulePt
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [infoSchedule, setInfoSchedule] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [dataEventClicks, setDataEventClick] = useState({});
  const showModal = () => {
    setIsModalVisible(true);
  };
  const showModalInfo = () => {
    setInfoSchedule(true);
  };
  const showModalEdit = () => {
    setIsModalEdit(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setInfoSchedule(false);
  };
  const handleCancelEdit = () => {
    setIsModalEdit(false);
  };
  useEffect(() => {
    dispatch(getSchedule(id_course_student));
    dispatch(getCoursePlan(id_course_student));
  }, [id_course_student]);

  return (
    <Spin spinning={loadingdata}>
      <div className="tw-pb-4">
        <button
          className="tw-px-4 tw-py-2 tw-rounded-md tw-text-sm  tw-border-0 focus:tw-outline-none tw-transition tw-text-white tw-bg-[#2C3E50] hover:tw-bg-[#1e2b37] active:tw-bg-[#1e2b37]"
          onClick={showModal}
        >
          Thêm lịch
        </button>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        }}
        eventClassNames={(arg) => {
          if (arg.event.id === 11) {
            return ["cursor-pointer"];
          } else {
            return [""];
          }
        }}
        timeZone="local"
        allDaySlot={false}
        // weekends={false}
        events={schedules}
        locale={viLocale}
        // windowResize={function (arg) {}}
        // selectable={true}
        dateClick={function (info) {
          // alert("clicked " + info.date.getDate(), info.date.getHours());
          console.log(info);
        }}
        // select={function (info) {
        //   alert("selected " + info.startStr + " to " + info.endStr);
        // }}2
        eventClick={(e) => {
          const record = {
            ...e.event._def.extendedProps,
            id: e.event.id,
            title: e.event.title,
            start: e.event.startStr,
            end: e.event.endStr,
          };
          setDataEventClick(record);
          showModalInfo();
        }}
      />
      <ModalAdd
        visible={isModalVisible}
        onCancel={handleCancel}
        CoursePlans={CoursePlans}
        student_id={id_course_student}
      />
      <ModalDetailEvent
        visible={infoSchedule}
        onCancel={handleCancel}
        dataEventClicks={dataEventClicks}
        onModalEdit={showModalEdit}
      />
      <ModalEdit
        visible={isModalEdit}
        onCancel={handleCancelEdit}
        CoursePlans={CoursePlans}
        student_id={id_course_student}
      />
    </Spin>
  );
};

export default CalenderPt;
