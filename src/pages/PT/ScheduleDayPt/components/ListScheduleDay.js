 

import moment from "moment";
import "moment/locale/vi";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLinkRecord,
  endLesson,
  getEventsPt,
  startLesson,
} from "../../AllSchedulePt/AllSchedulePtSlice";
import {
  Table,
  Button,
  Empty,
  Tabs,
  Card,
  notification,
  Modal,
  Form,
  Input,
} from "antd";
import { unwrapResult } from "@reduxjs/toolkit";
const ListScheduleDay = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { events, loading, loadingStart, loadindEnd, loadingRecord } =
    useSelector((state) => state.AllschedulePt);
  const [idClick, setIdClick] = useState("");
  const [isModalRecord, setIsModalRecord] = useState(false);
  const [isModalUpdateRecord, setIsModalUpdateRecord] = useState(false);
  useEffect(() => {
    const presentTime = moment().format("YYYY-MM-DD");
    dispatch(getEventsPt(presentTime));
  }, []);
  const onChangeTabs = (key) => {
    if (key === "1") {
      const yesterday = moment().add(-1, "d").format("YYYY-MM-DD");
      dispatch(getEventsPt(yesterday));
    }
    if (key === "2") {
      const presentTime = moment().format("YYYY-MM-DD");
      dispatch(getEventsPt(presentTime));
    }
  };
  const handleStart = async (id) => {
    setIdClick(id);
    try {
      const resulDispatch = await dispatch(startLesson(id));
      unwrapResult(resulDispatch);
      notification.success({
        message: "Đã bắt đầu buổi học",
      });
    } catch (error) {
      if (typeof error !== "object") {
        notification.error({
          message: error,
        });
      } else {
        notification.error({
          message: "Bắt đầu buổi học thất bại",
        });
      }
    }
  };
  const columns = [
    {
      title: "STT",
      key: "STT",
      render: (t, r, i) => i + 1,
      width: "5%",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      width: "15%",
    },
    {
      title: "Khóa học",
      dataIndex: "course_student",
      key: "course_student",
      render: (course_student) => course_student?.courses?.name,
    },
    {
      title: "Học viên",
      dataIndex: "course_student",
      key: "student",
      render: (course_student) => (
        <div className="tw-capitalize">{course_student?.users?.name}</div>
      ),
    },

    {
      title: "Thời gian",
      dataIndex: "start",
      key: "start",
      width: 100,
      render: (t, r) => (
        <div>
          {moment(r?.start).format("HH:mm")} - {moment(r?.end).format("HH:mm")}
        </div>
      ),
      responsive: ["lg"],
    },
    {
      title: "Chức năng",
      key: "action",
      render: (t, record) => {
        if (record.participation === "NoJoin" && record.status === "Complete") {
          return <div className="tw-text-red-500">Không tham gia</div>;
        }
        if (record.participation === "Join" && record.status === "Complete") {
          return (
            <Button
              type="primary"
              onClick={() => {
                setIdClick(record.id);
                if (record?.link_record) {
                  form.setFieldsValue({
                    link_record1: record?.link_record,
                  });
                }

                setIsModalUpdateRecord(true);
              }}
            >
              Cập nhật record
            </Button>
          );
        }
        if (
          (record.participation === "Join" && record.status === "unfinished") ||
          (record.participation === null && record.status === "unfinished")
        ) {
          return (
            <Button
              loading={idClick === record.id && loadingStart}
              onClick={() => handleStart(record.id)}
              type="primary"
            >
              Bắt đầu
            </Button>
          );
        }

        if (record.status === "happenning") {
          return (
            <Button
              // loading={loadingJoin}
              onClick={() => {
                setIdClick(record.id);
                setIsModalRecord(true);
              }}
              type="danger"
            >
              Kết thúc
            </Button>
          );
        }
      },
    },
  ];

  const onFinishUpdateLink = async (value) => {
    const data = { link_record: value.link_record1 };
    try {
      const resulDispatch = await dispatch(
        addLinkRecord({ data, id: idClick })
      );
      unwrapResult(resulDispatch);
      notification.success({
        message: "Cập nhật link record thành công",
      });
      setIsModalUpdateRecord(false);
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

  const onFinish = async (data) => {
    try {
      const resulDispatch = await dispatch(endLesson({ data, id: idClick }));
      unwrapResult(resulDispatch);
      notification.success({
        message: "Thêm link record thành công",
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
          message: "Thêm link record thất bại",
        });
      }
    }
  };
  return (
    <>
      <Modal
        title="Nhập link record"
        visible={isModalRecord}
        onCancel={() => {
          form.resetFields();
          setIsModalRecord(false);
        }}
        okText="Lưu"
        cancelText="Hủy"
        confirmLoading={loadindEnd}
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

      <Modal
        title="Cập nhật link record"
        visible={isModalUpdateRecord}
        onCancel={() => {
          form.resetFields();
          setIsModalUpdateRecord(false);
        }}
        okText="Cập nhật"
        cancelText="Hủy"
        confirmLoading={loadingRecord}
        okButtonProps={{ form: "form-update-link-record", htmlType: "submit" }}
      >
        <Form
          layout="vertical"
          id="form-update-link-record"
          form={form}
          onFinish={onFinishUpdateLink}
        >
          <Form.Item
            label="Link Record"
            name="link_record1"
            rules={[
              {
                required: true,
                message: "Hãy nhập Link Record",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
        </Form>
      </Modal>

      <Tabs defaultActiveKey="2" animated={true} onChange={onChangeTabs}>
        <Tabs.TabPane tab="Hôm qua" key="1">
          <Card
            title={`Lịch Học Hôm qua - ${moment()
              .add(-1, "d")
              .format("dddd, YYYY-MM-DD")}`}
          >
            <Table
              locale={{
                emptyText: (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                      <span>Không có lịch dạy nào trong hôm nay</span>
                    }
                  />
                ),
              }}
              loading={loading}
              columns={columns}
              dataSource={!loading && events}
              rowKey={(record) => record.id}
              expandable={{
                expandedRowRender: (record) => {
                  return (
                    <ul className="tw-text-xs">
                      <li className="tw-py-2">
                        <span className=" tw-min-w-[130px] tw-inline-block tw-font-medium">
                          Link học trực tuyến:
                        </span>
                        <a
                          href={record?.link_room}
                          className="tw-capitalize tw-text-blue-500 hover:tw-text-blue-700 hover:!tw-underline "
                        >
                          {record?.link_room}
                        </a>
                      </li>
                      <li className="tw-py-2">
                        <span className="tw-min-w-[130px] tw-inline-block tw-font-medium">
                          Buổi học:
                        </span>
                        <span>{record?.course_planes?.name}</span>
                      </li>
                      <li className="tw-py-2">
                        <span className="tw-min-w-[130px] tw-inline-block tw-font-medium">
                          Giai đoạn:
                        </span>
                        <span>{record?.course_planes?.stage?.name}</span>
                      </li>
                      <li className="tw-block lg:tw-hidden tw-py-2">
                        <span className="tw-min-w-[130px] tw-inline-block tw-font-medium">
                          Thời gian:
                        </span>
                        <span>
                          {moment(record?.start).format("HH:mm")} -{" "}
                          {moment(record?.end).format("HH:mm")}
                        </span>
                      </li>
                      <li className="tw-py-2">
                        <span className=" tw-min-w-[130px] tw-inline-block tw-font-medium">
                          Email học viên:
                        </span>
                        <span>{record?.course_student?.users?.email}</span>
                      </li>
                      <li className="tw-py-2">
                        <span className=" tw-min-w-[130px] tw-inline-block tw-font-medium">
                          SĐT học viên:
                        </span>
                        <span>{record?.course_student?.users?.phone}</span>
                      </li>
                    </ul>
                  );
                },
                onExpandedRowsChange: (expandedRows) => {
                  if (expandedRows.length > 1) {
                    expandedRows.shift();
                  }
                },
              }}
            />
          </Card>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Hôm nay" key="2">
          <Card
            title={`Lịch Học Hôm nay - ${moment().format("dddd, YYYY-MM-DD")}`}
          >
            <Table
              locale={{
                emptyText: (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                      <span>Không có lịch dạy nào trong hôm nay</span>
                    }
                  />
                ),
              }}
              loading={loading}
              columns={columns}
              dataSource={!loading && events}
              rowKey={(record) => record.id}
              expandable={{
                expandedRowRender: (record) => {
                  return (
                    <ul className="tw-text-xs">
                      <li className="tw-py-2">
                        <span className=" tw-min-w-[130px] tw-inline-block tw-font-medium">
                          Link học trực tuyến:
                        </span>
                        <a
                          href={record?.link_room}
                          className="tw-capitalize tw-text-blue-500 hover:tw-text-blue-700 hover:!tw-underline "
                        >
                          {record?.link_room}
                        </a>
                      </li>
                      <li className="tw-py-2">
                        <span className="tw-min-w-[130px] tw-inline-block tw-font-medium">
                          Buổi học:
                        </span>
                        <span>{record?.course_planes?.name}</span>
                      </li>
                      <li className="tw-py-2">
                        <span className="tw-min-w-[130px] tw-inline-block tw-font-medium">
                          Giai đoạn:
                        </span>
                        <span>{record?.course_planes?.stage?.name}</span>
                      </li>
                      <li className="tw-block lg:tw-hidden tw-py-2">
                        <span className="tw-min-w-[130px] tw-inline-block tw-font-medium">
                          Thời gian:
                        </span>
                        <span>
                          {moment(record?.start).format("HH:mm")} -{" "}
                          {moment(record?.end).format("HH:mm")}
                        </span>
                      </li>
                      <li className="tw-py-2">
                        <span className=" tw-min-w-[130px] tw-inline-block tw-font-medium">
                          Email học viên:
                        </span>
                        <span>{record?.course_student?.users?.email}</span>
                      </li>
                      <li className="tw-py-2">
                        <span className=" tw-min-w-[130px] tw-inline-block tw-font-medium">
                          SĐT học viên:
                        </span>
                        <span>{record?.course_student?.users?.phone}</span>
                      </li>
                    </ul>
                  );
                },
                onExpandedRowsChange: (expandedRows) => {
                  if (expandedRows.length > 1) {
                    expandedRows.shift();
                  }
                },
              }}
            />
          </Card>
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default ListScheduleDay;
