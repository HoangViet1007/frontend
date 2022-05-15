import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  notification,
  Table,
  Tabs,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Api } from "../../../utils/Api";
import "./CoursesManagerPage.css";
import { getCourses } from "./CoursesManagerSlice";
import { showPhoto } from "../../../components/componentsWebsite/ShowPhoto/showPhoto";
const CoursesManagerPage = () => {
  const { TabPane } = Tabs;
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const [visibleCancel, setVisibleCancel] = useState(false);
  const [id, setId] = useState("");
  const user = useSelector((state) => state.InfoUser.infoUser);
  const studentCourses = useSelector((state) => state.coursesStudent.items);
  const loading = useSelector((state) => state.coursesStudent.loading);
  const Unscheduled = studentCourses?.filter(
    (item) => item?.status === "Unscheduled"
  );
  const Schedule = studentCourses?.filter(
    (item) => item?.status === "Schedule"
  );
  const Canceled = studentCourses?.filter(
    (item) => item?.status === "Canceled"
  );
  const Complete = studentCourses?.filter(
    (item) => item?.status === "Complete"
  );
  useEffect(() => {
    dispatch(getCourses());
  }, []);

  const handleCancel = (e) => {
    setId(e);
    setVisibleCancel(true);
  };

  const cancelHandle = async (value) => {
    try {
      await Api.post(`customer-cancel/${id}`, value);
      notification.success({ message: `Hủy thành công !!!` });
      setVisibleCancel(false);
      dispatch(getCourses(user?.id));
    } catch (error) {
      return notification.error({ message: `${error.response.data.message}` });
    }
  };

  const unscheduledColumns = [
    {
      title: "STT",
      width: 10,
      render: (t, r, i) => i + 1,
    },
    {
      title: "Hình ảnh",
      width: 50,
      render: (t, r) => showPhoto(r?.courses?.image),
    },
    {
      title: "Khóa học",
      width: 250,
      render: (text, record) => {
        return record.courses?.name;
      },
    },
    {
      title: "PT",
      width: 50,
      render: (t, r) => {
        return r?.courses?.teacher?.name;
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
                ? "Chờ xếp lịch"
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
          <Tooltip title="Khi hủy số tiền nhận lại còn 95% số tiền đăng ký khóa học">
            <div className="tw-px-1">
              <Button
                type="primary"
                danger
                onClick={() => handleCancel(record.id)}
              >
                Hủy
              </Button>
            </div>
          </Tooltip>
          <Modal
            title="HỦY KHÓA HỌC"
            centered
            visible={visibleCancel}
            onOk={() => setVisibleCancel(false)}
            onCancel={() => setVisibleCancel(false)}
            width={1000}
            okButtonProps={{ hidden: true }}
            cancelButtonProps={{ hidden: true }}
          >
            <Form layout="vertical" id="courses" onFinish={cancelHandle}>
              <Form.Item
                label="Lý do hủy"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Mời nhập lý do",
                  },
                  {
                    min: 3,
                    message: "Lí do phải tối thiểu 3 kí tự trở lên !",
                  },
                ]}
              >
                <TextArea rows={4} placeholder="Nhập lý do" />
              </Form.Item>

              <div className="tw-text-center tw-flex-auto">
                <Form.Item>
                  <Button type="primary" className="" htmlType="submit">
                    Hủy khóa học
                  </Button>
                  <Button
                    className="ml-4"
                    type="primary"
                    danger
                    onClick={() => setVisibleCancel(false)}
                  >
                    Thoát
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Modal>
        </div>
      ),
    },
  ];

  const scheduleColumns = [
    {
      title: "STT",
      width: 10,
      render: (t, r, i) => i + 1,
    },
    {
      title: "Hình ảnh",
      width: 50,
      render: (t, r) => showPhoto(r?.courses?.image),
    },
    {
      title: "Khóa học",
      width: 250,
      render: (text, record, index) => {
        return record.courses?.name;
      },
    },
    {
      title: "PT",
      width: 50,
      render: (t, r) => {
        return r?.courses?.teacher?.name;
      },
    },
    {
      title: "Trạng thái",
      width: 120,
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
                ? "Chờ xếp lịch"
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
      width: 100,
      render: (record) => (
        <div className="tw-flex">
          <div className="tw-px-1 tw-flex">
            <Link to={`/khach-hang/lich-hoc/${record.id}`} className="tw-pr-2">
              <Button type="primary">Xem lịch học</Button>
            </Link>
            <Link to={`/khach-hang/bai-hoc/${record.id}`}>
              <Button type="danger">Bài học</Button>
            </Link>
          </div>
        </div>
      ),
    },
  ];

  const cancelColumns = [
    {
      title: "STT",
      width: 10,
      render: (t, r, i) => i + 1,
    },
    {
      title: "Hình ảnh",
      width: 50,
      render: (t, r) => showPhoto(r?.courses?.image),
    },
    // {
    //   title: "Nội dung",
    //   width: 220,
    //   render: (text, record, index) => {
    //     return record.description;
    //   },
    // },
    {
      title: "Khóa học",
      width: 250,
      render: (text, record, index) => {
        return record.courses?.name;
      },
    },
    {
      title: "PT",
      width: 50,
      render: (t, r) => {
        return r?.courses?.teacher?.name;
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
                ? "Chờ xếp lịch"
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

  const completeColumns = [
    {
      title: "STT",
      width: 10,
      render: (t, r, i) => i + 1,
    },
    {
      title: "Hình ảnh",
      width: 50,
      render: (t, r) => showPhoto(r?.courses?.image),
    },
    {
      title: "Khóa học",
      width: 250,
      render: (text, record, index) => {
        return record.courses?.name;
      },
    },
    {
      title: "PT",
      width: 50,
      render: (t, r) => {
        return r?.courses?.teacher?.name;
      },
    },
    {
      title: "Trạng thái",
      width: 50,
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
                ? "Chờ xếp lịch"
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
      <Card title="Quản lý khóa học">
        <Tabs
          defaultActiveKey="1"
          centered
          animated={true}
          // onChange={() => dispatch(getCourses(user?.id))}
        >
          <TabPane tab="Chờ xếp lịch" key="1">
            <Table
              loading={loading}
              columns={unscheduledColumns}
              dataSource={Unscheduled}
              scroll={{ x: 768 }}
            />
          </TabPane>
          <TabPane tab="Đã xếp lịch" key="2">
            <Table
              loading={loading}
              columns={scheduleColumns}
              dataSource={Schedule}
              scroll={{ x: 768 }}
            />
          </TabPane>
          <TabPane tab="Đã hủy" key="3">
            <Table
              loading={loading}
              columns={cancelColumns}
              dataSource={Canceled}
              scroll={{ x: 768 }}
            />
          </TabPane>

          <TabPane tab="Hoàn thành" key="4">
            <Table
              loading={loading}
              columns={completeColumns}
              dataSource={Complete}
              scroll={{ x: 768 }}
            />
          </TabPane>
        </Tabs>
      </Card>
    </>
  );
};

export default CoursesManagerPage;
