import React from "react";
import { Modal, notification, Popconfirm, Spin } from "antd";
import { DeleteOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import "moment/locale/vi";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailEvent,
  removeDetailEvent,
  removeSchedule,
} from "../ScheduleSlice";
import { unwrapResult } from "@reduxjs/toolkit";
const ModalDetailEvent = ({
  visible,
  onCancel,
  dataEventClicks,
  onModalEdit,
}) => {
  const { loading } = useSelector((state) => state.SchedulePt);
  const dispatch = useDispatch();
  const removeDataEvent = async (id) => {
    try {
      const resulDispatch = await dispatch(removeSchedule(id));
      unwrapResult(resulDispatch);
      onCancel();
      notification.success({ message: "Xóa thành công" });
      dispatch(removeDetailEvent(id));
    } catch (error) {
      error
        ? notification.error({ message: error })
        : notification.error({ message: "Xóa thất bại" });
    }
  };
  return (
    <Modal
      visible={visible}
      // onOk={handleOk}
      className="lg:!tw-w-5/12"
      onCancel={onCancel}
      closable={false}
      maskClosable={true}
      footer={null}
    >
      <Spin spinning={loading}>
        <div className="header-modal-info tw-flex tw-justify-between">
          <div className="tw-font-semibold tw-text-xl tw-flex-1">
            {dataEventClicks?.title}
          </div>
          <div>
            <EditOutlined
              className="tw-cursor-pointer hover:tw-text-blue-400"
              onClick={() => {
                onCancel();
                onModalEdit();
                dispatch(getDetailEvent(dataEventClicks));
              }}
            />
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa không ?"
              onConfirm={() => removeDataEvent(dataEventClicks?.id)}
              okText="Có"
              cancelText="Không"
            >
              <DeleteOutlined className="tw-cursor-pointer tw-mx-6 hover:tw-text-blue-400 focus:tw-text-blue-400" />
            </Popconfirm>

            <CloseOutlined
              className="tw-cursor-pointer hover:tw-text-blue-400"
              onClick={onCancel}
            />
          </div>
        </div>
        <div className="tw-flex  tw-pt-5">
          <i className="far fa-calendar-alt tw-text-lg tw-min-w-[30px]"></i>
          <div className="tw-font-medium">
            {moment(dataEventClicks?.newDate).format(
              "dddd, [ngày] DD [tháng] MM [năm] YYYY"
            )}
            <div>
              {moment(dataEventClicks?.start).format("HH:mm")} -{" "}
              {moment(dataEventClicks?.end).format("HH:mm")}
            </div>
          </div>
        </div>
        <div className="tw-flex tw-pt-3 tw-items-center">
          <i className="fas fa-user-graduate tw-text-lg tw-min-w-[30px]"></i>
          <div className="tw-font-medium">
            Học Viên:{" "}
            <span className="tw-capitalize">
              {dataEventClicks?.course_student?.users?.name}
            </span>
          </div>
        </div>
        <div className="tw-flex tw-pt-3 tw-items-center">
          <i className="fas fa-book-open tw-min-w-[30px] tw-text-lg"></i>
          <div className="tw-font-medium">
            khóa học:{" "}
            <span className="tw-capitalize">
              {dataEventClicks?.course_student?.courses?.name}
            </span>
          </div>
        </div>
        <div className="tw-flex tw-pt-3 tw-items-center">
          <i className="far fa-clipboard tw-min-w-[30px] tw-text-lg"></i>
          <div className="tw-font-medium">
            Buổi học:{" "}
            <span className="tw-capitalize">
              {dataEventClicks?.course_planes?.name}
            </span>
          </div>
        </div>
        <div className="tw-flex tw-pt-3 tw-items-center">
          <i className="fab fa-blackberry tw-min-w-[30px] tw-text-lg"></i>
          <div className="tw-font-medium">
            Giai đoạn:{" "}
            <span className="tw-capitalize">
              {dataEventClicks?.course_planes?.stage?.name}
            </span>
          </div>
        </div>
        <div className="tw-flex tw-pt-3 tw-items-center">
          <i className="fas fa-link tw-text-lg tw-min-w-[30px]"></i>
          <div className="tw-font-medium">
            Link room:{" "}
            <a
              href={dataEventClicks?.link_room}
              className="tw-capitalize tw-text-blue-500 hover:tw-text-blue-700 hover:!tw-underline"
            >
              {dataEventClicks?.link_room}
            </a>
          </div>
        </div>
        <div className="tw-flex tw-pt-3 tw-items-center">
          <i className="fas fa-thermometer tw-text-lg tw-min-w-[30px]"></i>
          <div className="tw-font-medium">
            Tình trạng:{" "}
            <span>
              {dataEventClicks?.status === "unfinished"
                ? "Chưa hoàn thành"
                : "Hoàn thành"}
            </span>
          </div>
        </div>
      </Spin>
    </Modal>
  );
};
export default ModalDetailEvent;
