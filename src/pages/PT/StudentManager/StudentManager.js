import {
  DownOutlined,
  SearchOutlined,
  ScheduleOutlined,
  CloseOutlined,
  SafetyCertificateOutlined,
  SendOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  notification,
  Popconfirm,
  Row,
  Space,
  Table,
  Tabs,
  Tooltip,
} from "antd";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { showPhoto } from "../../../components/componentsAdmin/ShowPhoto/showPhoto";
import ROUTER from "../../../router/router";
import { Api } from "../../../utils/Api";
import {
  getStudents,
  ptThrough,
  sendAdminThrough,
} from "./StudentManagerSlice.js";
import { querySearch } from "../../../utils";
import { unwrapResult } from "@reduxjs/toolkit";
const StudentManager = () => {
  const { TabPane } = Tabs;
  const history = useHistory();

  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.items);
  const handleThrough = async (id) => {
    try {
      const resulDispatch = await dispatch(ptThrough(id));
      unwrapResult(resulDispatch);
      notification.success({
        message: "Bạn đã duyệt thành công cho học viên ",
      });
      dispatch(getStudents());
    } catch (error) {
      error && notification.error({ message: error });
    }
  };
  const handleSendAdminThrough = async (id) => {
    try {
      const resulDispatch = await dispatch(sendAdminThrough(id));
      unwrapResult(resulDispatch);
      notification.success({
        message: "Đã gửi yêu cầu",
      });
    } catch (error) {
      error && notification.error({ message: error });
    }
  };
  useEffect(() => {
    const { search } = history.location;
    let params;
    const filterOptions = search.split("?")[1];
    if (filterOptions !== undefined) {
      params = `{"${decodeURI(filterOptions)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')}"}`;
      dispatch(getStudents(JSON.parse(params)));
    } else {
      dispatch(getStudents(null));
    }
  }, [dispatch, history.location]);

  const fetchName = (value) => {
    querySearch(value, "users__name__~", history);
  };

  const fetchEmail = (value) => {
    querySearch(value, "users__email__~", history);
  };

  const debounceSearchName = useCallback(debounce(fetchName, 500), []);
  const debounceSearchEmail = useCallback(debounce(fetchEmail, 500), []);

  const onSearch = (e) => {
    debounceSearchName(e.target.value);
  };

  const onSearchEmail = (e) => {
    debounceSearchEmail(e.target.value);
  };

  useEffect(() => {
    dispatch(getStudents());
  }, []);

  const [visible, setVisible] = useState(false);
  const [visibleCancel, setVisibleCancel] = useState(false);
  const [id, setId] = useState("");
  const { TextArea } = Input;

  const handleCancel = (e) => {
    setId(e);
    setVisibleCancel(true);
  };

  const handleSendRequest = async (id) => {
    try {
      await Api.get(`sent-request-customer/${id}`);
      notification.success({ message: `Gửi yêu cầu thành công !!!` });
      dispatch(getStudents());
    } catch (error) {
      return notification.error({ message: `${error.response.data.message}` });
    }
  };

  const Unscheduled = students?.filter((item) => item.status === "Unscheduled");
  const Schedule = students?.filter(
    (item) => item.status === "Schedule" || item.status === "RequestAdmin"
  );
  const CanceledByPt = students?.filter(
    (item) => item.status === "CanceledByPt"
  );
  const Complete = students?.filter((item) => item.status === "Complete");

  const [description, setDescription] = useState("");
  const showModal = (student) => {
    setDescription(student.description);
    setVisible(true);
  };

  const onFinish = async (value) => {
    try {
      await Api.post(`pt-cancel/${id}`, value);
      notification.success({ message: `Hủy thành công !!!` });
      setVisibleCancel(false);
      dispatch(getStudents());
    } catch (error) {
      return notification.error({ message: `${error.response.data.message}` });
    }
  };

  const unscheduledColumns = [
    {
      title: "STT",
      width: 60,
      render: (t, r, i) => i + 1,
    },
    {
      title: "Ảnh",
      width: 50,
      render: (text, record, index) => showPhoto(record.users.image),
    },
    {
      title: "Tên học viên",
      dataIndex: "users",
      width: 250,
      render: (text, record, index) => {
        return record.users.name;
      },
    },
    {
      title: "Email",
      width: 220,
      render: (text, record, index) => {
        return record.users.email;
      },
    },
    {
      title: "Khóa học",
      width: 250,
      render: (text, record, index) => {
        return record.courses?.name;
      },
    },

    {
      title: "Trạng thái",
      width: 150,
      align: "center",
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
      title: "Trạng thái yêu cầu",
      width: 200,
      align: "center",
      render: (text, record, index) => {
        return (
          <>
            <span
              style={{
                background:
                  record.user_consent === "Unsent"
                    ? "#fff1e6"
                    : record.user_consent === "Sent"
                    ? "#e0f9f4"
                    : record.user_consent === "UserAgrees"
                    ? "#e0f9f4"
                    : record.user_consent === "UserDisAgrees"
                    ? "#dd716a"
                    : "#fff1e6",
                borderRadius: 5,
                fontSize: "13px",
                color:
                  record.user_consent === "Unsent"
                    ? "#feaa54"
                    : record.user_consent === "Sent"
                    ? "#4adabb"
                    : record.user_consent === "UserAgrees"
                    ? "#4adabb"
                    : record.user_consent === "UserDisAgrees"
                    ? "#fff"
                    : "#feaa54",
                padding: 7,
                border:
                  record.user_consent === "Unsent"
                    ? "1px solid #ffe5d1"
                    : record.user_consent === "Sent"
                    ? "1px solid #c6f4eb"
                    : record.user_consent === "UserAgrees"
                    ? "1px solid #c6f4eb"
                    : record.user_consent === "UserDisAgrees"
                    ? "1px solid #ffe5d1"
                    : " 1px solid #ffe5d1",
              }}
            >
              {record.user_consent === "Unsent"
                ? "Chưa gửi"
                : record.user_consent === "Sent"
                ? "Đã gửi"
                : record.user_consent === "UserAgrees"
                ? "Đồng ý"
                : record.user_consent === "UserDisAgrees"
                ? "Từ chối"
                : "Mấy thằng backend ảo"}
            </span>
          </>
        );
      },
    },

    {
      title: "Chức năng",
      key: "action",
      width: 150,
      render: (record) => (
        <div>
          <Dropdown
            placement="bottomCenter"
            overlay={
              <Menu>
                <Menu.Item key="2">
                  <Link to={`/pt/xep-lich/${record?.id}`}>
                    <div className="tw-flex tw-items-center">
                      <ScheduleOutlined className="tw-pr-3" /> Xếp lịch
                    </div>
                  </Link>
                </Menu.Item>

                <Menu.Item key="4">
                  <div
                    className="tw-flex tw-items-center"
                    onClick={() => handleThrough(record.id)}
                  >
                    <SafetyCertificateOutlined className="tw-pr-3" /> Duyệt
                  </div>
                </Menu.Item>

                <Menu.Item key="5">
                  <p
                    onClick={() => handleCancel(record.id)}
                    className="tw-flex tw-items-center"
                  >
                    <CloseOutlined className="tw-pr-3" /> Hủy
                  </p>
                </Menu.Item>

                <Menu.Item key="3">
                  {record?.user_consent === "Unsent" ? (
                    <>
                      <Popconfirm
                        title="Bạn có chắc chắn muốn gửi yêu cầu?"
                        onConfirm={() => handleSendRequest(record?.id)}
                        okText="Gửi yêu cầu"
                        cancelText="Thoát"
                      >
                        <div className="tw-flex tw-items-center">
                          <SafetyCertificateOutlined className="tw-pr-3" /> Gửi
                          yêu cầu
                        </div>
                      </Popconfirm>
                    </>
                  ) : record?.user_consent === "Sent" ? (
                    <>
                      <Popconfirm
                        title="Bạn có chắc chắn muốn gửi lại yêu cầu?"
                        onConfirm={() => handleSendRequest(record?.id)}
                        okText="Gửi lại yêu cầu"
                        cancelText="Thoát"
                      >
                        <div className="tw-flex tw-items-center">
                          <SafetyCertificateOutlined className="tw-pr-3" /> Gửi
                          lại yêu cầu
                        </div>
                      </Popconfirm>
                    </>
                  ) : record.user_consent === "UserAgrees" ? (
                    ""
                  ) : record.user_consent === "UserDisAgrees" ? (
                    <>
                      <Popconfirm
                        title="Bạn có chắc chắn muốn gửi lại yêu cầu?"
                        onConfirm={() => handleSendRequest(record?.id)}
                        okText="Gửi lại yêu cầu"
                        cancelText="Thoát"
                      >
                        <div>
                          <SafetyCertificateOutlined className="tw-pr-3" /> Gửi
                          lại yêu cầu
                        </div>
                      </Popconfirm>
                    </>
                  ) : (
                    ""
                  )}
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <Button type="primary">
              Chức năng <DownOutlined />
            </Button>
          </Dropdown>

          <Modal
            title="HỦY HỌC VIÊN"
            centered
            visible={visibleCancel}
            onOk={() => setVisibleCancel(false)}
            onCancel={() => setVisibleCancel(false)}
            width={1000}
            okButtonProps={{ hidden: true }}
            cancelButtonProps={{ hidden: true }}
          >
            <Form layout="vertical" id="courses" onFinish={onFinish}>
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
                    Hủy học viên
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
      width: 60,
      render: (t, r, i) => i + 1,
    },
    {
      title: "Ảnh",
      width: 50,
      render: (text, record, index) => showPhoto(record.users.image),
    },
    {
      title: "Tên học viên",
      dataIndex: "users",
      width: 250,
      render: (text, record, index) => {
        return record.users.name;
      },
    },
    {
      title: "Email",
      width: 220,
      render: (text, record, index) => {
        return record.users.email;
      },
    },
    {
      title: "Khóa học",
      width: 250,
      render: (text, record, index) => {
        return record.courses?.name;
      },
    },

    {
      title: "Trạng thái",
      width: 200,
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
                ? "Đang học"
                : record.status === "RequestAdmin"
                ? "Chờ Admin duyệt"
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
      width: 150,
      render: (record) => (
        <Dropdown
          placement="bottomCenter"
          overlay={
            <Menu>
              <Menu.Item key="7">
                <Link to={`/pt/xep-lich/${record?.id}`}>
                  <div className="tw-flex tw-items-center">
                    <ScheduleOutlined className="tw-pr-3" /> Xem lịch
                  </div>
                </Link>
              </Menu.Item>
              <Menu.Item key="8" disabled={record.status === "RequestAdmin"}>
                <Tooltip title="Gửi yêu cầu cho admin tính tiền">
                  <div
                    className="tw-flex tw-items-center"
                    onClick={() => handleSendAdminThrough(record.id)}
                  >
                    <SendOutlined className="tw-pr-3" />
                    Yêu cầu
                  </div>
                </Tooltip>
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button type="primary">
            Chức năng <DownOutlined />
          </Button>
        </Dropdown>

        // <div className="tw-flex">
        //   <div className="tw-px-1">
        //     <Tooltip title="Gửi yêu cầu cho admin tính tiền">
        //       <Button
        //         disabled={record.status === "RequestAdmin"}
        //         type="primary"
        //         onClick={() => handleSendAdminThrough(record.id)}
        //       >
        //         Yêu cầu
        //       </Button>
        //     </Tooltip>
        //   </div>
        // </div>

        /* <Popconfirm
                title="Bạn có chắc chắn muốn xóa không ?"
                onConfirm={() => onDelete(record)}
              >
                <Tooltip title="Xóa">
                  <DeleteTwoTone />
                </Tooltip>
              </Popconfirm> */
      ),
    },
  ];

  const cancelColumns = [
    {
      title: "STT",
      width: 60,
      render: (t, r, i) => i + 1,
    },
    {
      title: "Ảnh",
      width: 50,
      render: (text, record, index) => showPhoto(record.users.image),
    },
    {
      title: "Tên học viên",
      dataIndex: "users",
      width: 250,
      render: (text, record, index) => {
        return record.users.name;
      },
    },
    {
      title: "Email",
      width: 220,
      render: (text, record, index) => {
        return record.users.email;
      },
    },
    {
      title: "Khóa học",
      width: 250,
      render: (text, record, index) => {
        return record.courses?.name;
      },
    },

    {
      title: "Trạng thái",
      width: 150,
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
      width: 150,
      render: (record) => (
        <div>
          <>
            <Space>
              <Button type="primary" onClick={() => showModal(record)}>
                {" "}
                Lý do hủy
              </Button>
              <Modal
                title={`Lí do hủy`}
                visible={visible}
                forceRender={true}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                cancelText="Thoát"
                closable={false}
                okButtonProps={{ hidden: true }}
                // cancelButtonProps={{ hidden: true }}
              >
                <p>{description}</p>
              </Modal>
            </Space>
          </>
        </div>
      ),
    },
  ];

  const noActionColumns = [
    {
      title: "STT",
      width: 60,
      render: (t, r, i) => i + 1,
    },
    {
      title: "Ảnh",
      width: 50,
      render: (text, record, index) => showPhoto(record.users.image),
    },
    {
      title: "Tên học viên",
      dataIndex: "users",
      width: 250,
      render: (text, record, index) => {
        return record.users.name;
      },
    },
    {
      title: "Email",
      width: 220,
      render: (text, record, index) => {
        return record.users.email;
      },
    },
    {
      title: "Khóa học",
      width: 250,
      render: (text, record, index) => {
        return record.courses?.name;
      },
    },

    {
      title: "Trạng thái",
      width: 150,
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
  ];

  return (
    <>
      <Card
        title="Danh sách học viên"
        style={{ backgroundColor: "#ffffff", borderRadius: "8px" }}
      >
        <Row gutter={24} style={{ marginBottom: "20px" }}>
          <div className="sm:tw-flex tw-justify-between tw-w-full">
            <div className="sm:tw-flex tw-flex-wrap tw-w-full">
              <Space direction="vertical" className="tw-px-2">
                <Input
                  placeholder="Tìm theo tên học viên"
                  style={{ width: 200 }}
                  type="search"
                  suffix={
                    <SearchOutlined className="text-gray-400 text-md font-medium" />
                  }
                  onChange={onSearch}
                />
              </Space>

              <Space direction="vertical" className="tw-px-2">
                <Input
                  placeholder="Tìm theo email"
                  style={{ width: 200 }}
                  type="search"
                  suffix={
                    <SearchOutlined className="text-gray-400 text-md font-medium" />
                  }
                  onChange={onSearchEmail}
                />
              </Space>
            </div>
          </div>
        </Row>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Chưa xếp lịch" key="1">
            <Table
              columns={unscheduledColumns}
              dataSource={Unscheduled}
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane tab="Đã xếp lịch" key="2">
            <Table
              columns={scheduleColumns}
              dataSource={Schedule}
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane tab="Đã hủy" key="3">
            <Table
              columns={cancelColumns}
              dataSource={CanceledByPt}
              pagination={{ pageSize: 10 }}
            />
          </TabPane>

          <TabPane tab="Hoàn thành" key="4">
            <Table
              columns={noActionColumns}
              dataSource={Complete}
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
        </Tabs>
      </Card>
    </>
  );
};

export default StudentManager;
