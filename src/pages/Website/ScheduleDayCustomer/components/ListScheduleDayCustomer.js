import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/vi";
import { useDispatch, useSelector } from "react-redux";
import {
  ChangeJoin,
  ChangeNoJoin,
  getEventsCustomer,
  setComplanin,
} from "../../AllScheduleCustomer/AllScheduleCustomerSlice";
import {
  Button,
  Empty,
  notification,
  Table,
  Modal,
  Form,
  Input,
  Tabs,
  Card,
  Popconfirm,
  Tag,
} from "antd";
import { unwrapResult } from "@reduxjs/toolkit";
const ListScheduleDayCustomer = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idComplain, setIdComplain] = useState("");
  const { events, loading, loadingJoin, loadingNoJoin, loadingComplanin } =
    useSelector((state) => state.AllscheduleCustomer);
  const [form] = Form.useForm();
  const [idChoice, setIdChoice] = useState("");
  const handleJoin = async (id) => {
    setIdChoice(id);
    try {
      const resulDispatch = await dispatch(ChangeJoin(id));
      unwrapResult(resulDispatch);
      notification.success({
        message: "Xác nhận thành công",
      });
    } catch (error) {
      if (typeof error !== "object") {
        notification.error({
          message: error,
        });
      } else {
        notification.error({
          message: "Xác nhận thất bại",
        });
      }
    }
  };
  const handleNoJoin = async (id) => {
    setIdChoice(id);
    try {
      const resulDispatch = await dispatch(ChangeNoJoin(id));
      unwrapResult(resulDispatch);
      notification.success({
        message: "Xác nhận thành công",
      });
    } catch (error) {
      if (typeof error !== "object") {
        notification.error({
          message: error,
        });
      } else {
        notification.error({
          message: "Xác nhận thất bại",
        });
      }
    }
  };
  const viewComplain = (data) => {
    setIsModalVisible(true);
    setIdComplain(data.id);
    form.setFieldsValue({ reason_complain: data?.reason_complain });
  };
  const handleComplain = (id) => {
    setIsModalVisible(true);
    setIdComplain(id);
  };
  const columns = [
    {
      title: "STT",
      key: "STT",
      render: (t, r, i) => i + 1,
      width: 10,
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
      title: "PT",
      dataIndex: "course_student",
      key: "NamePT",
      render: (course_student) => course_student?.courses?.teacher?.name,
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
      key: "participation",
      dataIndex: "participation",
      width: "15%",
      render: (participation, record) => {
        if (!record.participation) {
          return (
            <div className="tw-flex">
              <Button
                loading={idChoice === record.id && loadingJoin}
                onClick={() => handleJoin(record.id)}
                type="primary"
              >
                Tham Gia
              </Button>
              <Popconfirm
                title="Bạn có chắc chắn không tham gia, bạn sẽ bị hủy buổi học này"
                placement="topRight"
                onConfirm={() => handleNoJoin(record.id)}
                // onCancel={cancel}
                okText="Xác nhận"
                cancelText="Hủy"
              >
                <Button
                  loading={idChoice === record.id && loadingNoJoin}
                  type="danger"
                  className="tw-ml-2"
                >
                  Không tham Gia
                </Button>
              </Popconfirm>
            </div>
          );
        }
        if (
          record.participation === "Join" &&
          record.complain === "NoComplaints"
        ) {
          return (
            <Button onClick={() => handleComplain(record.id)} type="danger">
              Khiếu nại
            </Button>
          );
        }
        if (record.complain === "Complain") {
          return (
            <>
              <Tag color="cyan">Đã Khiếu nại</Tag>
              <span
                className="tw-text-xs tw-cursor-pointer tw-text-blue-400"
                onClick={() => viewComplain(record)}
              >
                (chi tiết)
              </span>
            </>
          );
        }
        if (participation === "NoJoin") {
          return <Tag color="red">Không tham gia</Tag>;
        }
        //
      },
    },
  ];
  const onFinish = async (data) => {
    try {
      const resulDispatch = await dispatch(
        setComplanin({ id: idComplain, data })
      );
      unwrapResult(resulDispatch);
      setIsModalVisible(false);
      form.resetFields();
      notification.success({
        message: "Đã gửi khiếu nại",
        description: "Chúng tôi sẽ xem xét khiếu nại của bạn",
      });
    } catch (error) {
      if (typeof error !== "object") {
        notification.error({
          message: error,
        });
      } else {
        notification.error({
          message: "Gửi khiếu nại thất bại",
        });
      }
    }
  };
  const onChangeTabs = (key) => {
    if (key === "1") {
      const yesterday = moment().add(-1, "d").format("YYYY-MM-DD");
      dispatch(getEventsCustomer(yesterday));
    }
    if (key === "2") {
      const presentTime = moment().format("YYYY-MM-DD");
      dispatch(getEventsCustomer(presentTime));
    }
  };
  useEffect(() => {
    const presentTime = moment().format("YYYY-MM-DD");
    dispatch(getEventsCustomer(presentTime));
  }, [dispatch]);

  return (
    <>
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
                      <span>Không có lịch học nào trong hôm qua</span>
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
                        <span className="tw-min-w-[130px] tw-inline-block tw-font-medium">
                          Email PT:
                        </span>
                        <span>
                          {record?.course_student?.courses?.teacher?.email}
                        </span>
                      </li>
                      <li className="tw-py-2">
                        <span className="tw-min-w-[130px] tw-inline-block tw-font-medium">
                          SĐT PT:
                        </span>
                        <span>
                          {record?.course_student?.courses?.teacher?.phone}
                        </span>
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
            title={`Lịch Học Hôm Nay - ${moment().format("dddd, YYYY-MM-DD")}`}
          >
            <Table
              locale={{
                emptyText: (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                      <span>Không có lịch học nào trong hôm nay</span>
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
                        <span className="tw-min-w-[130px] tw-inline-block tw-font-medium">
                          Email PT:
                        </span>
                        <span>
                          {record?.course_student?.courses?.teacher?.email}
                        </span>
                      </li>
                      <li className="tw-py-2">
                        <span className="tw-min-w-[130px] tw-inline-block tw-font-medium">
                          SĐT PT:
                        </span>
                        <span>
                          {record?.course_student?.courses?.teacher?.phone}
                        </span>
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
      <Modal
        title="Khiếu nại buổi học"
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        confirmLoading={loadingComplanin}
        okText="Gửi"
        cancelText="Hủy"
        okButtonProps={{ form: "form-handleComplain", htmlType: "submit" }}
        // footer={false}
        width={"50%"}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          id="form-handleComplain"
        >
          <Form.Item
            label="Nội dung khiếu nại"
            name="reason_complain"
            rules={[
              {
                required: true,
                message: "Nội dung khiếu nại không được để trống",
              },
            ]}
          >
            <Input.TextArea rows={6} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ListScheduleDayCustomer;
