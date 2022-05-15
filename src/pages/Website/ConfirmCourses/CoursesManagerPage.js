 
 
 

import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  notification,
  Table,
  Popconfirm,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showPhoto } from "../../../components/componentsWebsite/ShowPhoto/showPhoto";
import { Api } from "../../../utils/Api";
import { getCourses } from "./CoursesManagerSlice";
const ConfirmCoursesPage = () => {
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const [visibleCancel, setVisibleCancel] = useState(false);
  const [id, setId] = useState("");
  const user = useSelector((state) => state.InfoUser.infoUser);
  const studentCourses = useSelector((state) => state.coursesStudent.items);
  const loading = useSelector((state) => state.coursesStudent.loading);
  const [scheduleData, setScheduleData] = useState(null);

  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const showModalConfirm = (data) => {
    setScheduleData(data);
    setVisibleConfirm(true);
  };

  const Unscheduled = studentCourses?.filter(
    (item) => item?.status === "Unscheduled" && item.user_consent === "Sent"
  );

  useEffect(() => {
    dispatch(getCourses());
  }, []);

  const handleConfirm = async (id) => {
    try {
      await Api.get(`user-agrees-course-student/${id}`);
      notification.success({ message: `Xác nhận thành công !!!` });
      dispatch(getCourses(user?.id));
    } catch (error) {
      return notification.error({ message: `${error.response.data.message}` });
    }
  };

  const handleCancel = async (id) => {
    try {
      await Api.get(`user-dis-agrees-course-student/${id}`);
      notification.success({ message: `Hủy thành công !!!` });
      dispatch(getCourses(user?.id));
    } catch (error) {
      return notification.error({ message: `${error.response.data.message}` });
    }
  };

  const unscheduledColumns = [
    {
      title: "STT",
      width: 20,
      render: (t, r, i) => i + 1,
    },
    {
      title: "Hình ảnh",
      width: 50,
      render: (t, r) => showPhoto(r?.courses?.image),
    },
    {
      title: "Khóa học",
      width: 400,
      render: (text, record) => {
        return record.courses?.name;
      },
    },
    {
      title: "PT",
      width: 100,
      render: (t, r) => {
        return r?.courses?.teacher?.name;
      },
    },
    {
      title: "Lịch học",
      width: 100,
      render: (t, r) => {
        return (
          <>
            {r.schedules?.length}{" "}
            <span
              className="tw-text-blue-400 tw-cursor-pointer"
              onClick={() => showModalConfirm(r?.schedules)}
            >
              (Chi tiết)
            </span>
            <Modal
              title="Lịch học"
              visible={visibleConfirm}
              onOk={() => setVisibleConfirm(false)}
              onCancel={() => setVisibleConfirm(false)}
              width={1500}
            >
              <Table
                loading={loading}
                columns={scheduleColumns}
                dataSource={scheduleData}
                scroll={{ x: 1366 }}
              />
            </Modal>
          </>
        );
      },
    },

    {
      title: "Trạng thái",
      width: 100,
      render: (text, record, index) => {
        return (
          <>
            <span
              style={{
                background:
                  record.status === "Unscheduled"
                    ? "#fff1e6"
                    : record.status === "Schedule"
                    ? "#e0f9f4"
                    : record.status === "Canceled"
                    ? "#dd716a"
                    : record.status === "CanceledByPt"
                    ? "#dd716a"
                    : record.status === "Complete"
                    ? "#e0f9f4"
                    : "#fff1e6",
                borderRadius: 5,
                fontSize: "13px",
                color:
                  record.status === "Unscheduled"
                    ? "#feaa54"
                    : record.status === "Schedule"
                    ? "#4adabb"
                    : record.status === "Canceled"
                    ? "#fff"
                    : record.status === "CanceledByPt"
                    ? "#fff"
                    : record.status === "Complete"
                    ? "#4adabb"
                    : "#feaa54",
                padding: 7,
                border:
                  record.status === "Unscheduled"
                    ? "1px solid #ffe5d1"
                    : record.status === "Schedule"
                    ? "1px solid #c6f4eb"
                    : record.status === "Canceled"
                    ? "1px solid #ffe5d1"
                    : record.status === "CanceledByPt"
                    ? "1px solid #ffe5d1"
                    : record.status === "Complete"
                    ? "1px solid #c6f4eb"
                    : " 1px solid #ffe5d1",
              }}
            >
              {record.status === "Unscheduled"
                ? "Chưa xếp lịch"
                : record.status === "Schedule"
                ? "Đã xếp lịch"
                : record.status === "Canceled"
                ? "Đã hủy"
                : record.status === "CanceledByPt"
                ? "Đã hủy"
                : record.status === "Complete"
                ? "Hoàn thành"
                : ""}
            </span>
          </>
        );
      },
    },
    {
      title: "Chức năng",
      key: "action",
      width: 50,
      render: (record) => (
        <div>
          <div className="tw-flex">
            <div className="tw-px-1">
              <Popconfirm
                title="Bạn có chắc chắn muốn xác nhận?"
                onConfirm={() => handleConfirm(record.id)}
                okText="Xác nhận"
                cancelText="Thoát"
              >
                <Button type="primary" >
                  Xác nhận
                </Button>
              </Popconfirm>
            </div>

            <div className="tw-px-1">
              <Popconfirm
                title="Bạn có chắc chắn muốn hủy?"
                onConfirm={() => handleCancel(record.id)}
                okText="Hủy"
                cancelText="Thoát"
              >
                <Button type="primary" danger>
                  Hủy
                </Button>
              </Popconfirm>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const scheduleColumns = [
    {
      title: "STT",
      width: 20,
      render: (t, r, i) => i + 1,
    },
    {
      title: "Tên buổi học",
      width: 200,
      render: (text, record) => {
        return record?.title;
      },
    },
    {
      title: "Ngày",
      width: 100,
      render: (t, r) => {
        return r?.date;
      },
    },
    {
      title: "Giờ bắt đầu",
      width: 100,
      render: (t, r) => {
        return r?.time_start;
      },
    },
    {
      title: "Giờ kết thúc",
      width: 100,
      render: (t, r) => {
        return r?.time_end;
      },
    },
    {
      title: "Link room",
      width: 100,
      render: (t, r) => {
        return (
          <>
            {" "}
            <a href={r?.link_room} target="_blank">
              <span className="tw-text-blue-400">{r?.link_room}</span>
            </a>{" "}
          </>
        );
      },
    },

    {
      title: "Trạng thái",
      width: 100,
      render: (text, record, index) => {
        return (
          <>
            <span
              style={{
                background:
                  record.status === "unfinished"
                    ? "#fff1e6"
                    : record.status === "Schedule"
                    ? "#e0f9f4"
                    : record.status === "Canceled"
                    ? "#dd716a"
                    : record.status === "CanceledByPt"
                    ? "#dd716a"
                    : record.status === "Complete"
                    ? "#e0f9f4"
                    : "#fff1e6",
                borderRadius: 5,
                fontSize: "13px",
                color:
                  record.status === "unfinished"
                    ? "#feaa54"
                    : record.status === "Schedule"
                    ? "#4adabb"
                    : record.status === "Canceled"
                    ? "#fff"
                    : record.status === "CanceledByPt"
                    ? "#fff"
                    : record.status === "Complete"
                    ? "#4adabb"
                    : "#feaa54",
                padding: 7,
                border:
                  record.status === "unfinished"
                    ? "1px solid #ffe5d1"
                    : record.status === "Schedule"
                    ? "1px solid #c6f4eb"
                    : record.status === "Canceled"
                    ? "1px solid #ffe5d1"
                    : record.status === "CanceledByPt"
                    ? "1px solid #ffe5d1"
                    : record.status === "Complete"
                    ? "1px solid #c6f4eb"
                    : " 1px solid #ffe5d1",
              }}
            >
              {record.status === "unfinished"
                ? "Chưa xong"
                : record.status === "Schedule"
                ? "Đã xếp lịch"
                : record.status === "Canceled"
                ? "Đã hủy"
                : record.status === "CanceledByPt"
                ? "Đã hủy"
                : record.status === "Complete"
                ? "Hoàn thành"
                : ""}
            </span>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Card title="Xác nhận lịch học">
        <Table
          loading={loading}
          columns={unscheduledColumns}
          dataSource={Unscheduled}
          scroll={{ x: 768 }}
        />
      </Card>
    </>
  );
};

export default ConfirmCoursesPage;
