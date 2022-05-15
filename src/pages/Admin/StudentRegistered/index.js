import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tabs,
} from "antd";
import moment from "moment";
import "moment/locale/vi";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { convertCurrency, querySearch } from "../../../utils";
import { getStudentRegistered } from "./StudentRegisteredSlice";

const StudentRegistered = () => {
  const dispatch = useDispatch();
  const { TabPane } = Tabs;
  let history = useHistory();
  const [visibleSchedules, setVisibleSchedules] = useState(false);
  const [schedulesList, setSchedulesList] = useState([]);
  const showModalSchedules = (schedules) => {
    setSchedulesList(schedules);
    setVisibleSchedules(true);
  };

  useEffect(() => {
    dispatch(getStudentRegistered());
  }, []);

  const onSearch = (value) => {
    querySearch(value.target.value, "courses__name__~", history);
  };

  const onSearchByPriceStart = (value) => {
    querySearch(value.target.value, "courses__price__ge", history);
  };

  const onSearchByPriceEnd = (value) => {
    querySearch(value.target.value, "courses__price__le", history);
  };

  const onSearchByUserName = (value) => {
    querySearch(value.target.value, "users__name__~", history);
  };
  const onSearchByUserPhone = (value) => {
    querySearch(value.target.value, "users__phone__~", history);
  };
  const onSearchByUserEmail = (value) => {
    querySearch(value.target.value, "users__email__~", history);
  };

  const onSearchStatus = (value) => {
    querySearch(value, "display", history);
  };

  const onSearchLevel = (value) => {
    querySearch(value, "customer_levels__name__~", history);
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
      dispatch(getStudentRegistered(JSON.parse(params)));
    } else {
      dispatch(getStudentRegistered(null));
    }
  }, [dispatch, history.location]);

  const data = useSelector((state) => state.studentRegistered.data);

  const UnscheduledList = data.filter(
    (courses) => courses.status === "Unscheduled"
  );
  const ScheduleList = data.filter((courses) => courses.status === "Schedule");
  const CancelList = data.filter(
    (courses) =>
      courses.status === "Canceled" || courses.status === "CanceledByPt"
  );
  const columns = [
    {
      title: "Tên học viên",
      dataIndex: "",
      key: "",

      render: (text, record, index) => record?.users?.name,
    },

    {
      title: "Email",
      dataIndex: "",
      key: "",
      render: (text, record, index) => record?.users?.email,
    },
    {
      title: "Tên khóa học",
      dataIndex: "",
      key: "",
      render: (text, record, index) => record?.courses?.name,
    },
    {
      title: "Giá khóa học",
      dataIndex: "",
      key: "",
      render: (text, record, index) => convertCurrency(record?.courses?.price),
    },
    {
      title: "Thời gian",
      dataIndex: "",
      key: "",
      render: (text, record, index) =>
        moment(record?.created_at).format("HH:mm - DD/MM/YYYY"),
    },
    {
      title: "Trạng thái",
      dataIndex: "",
      key: "",
      width: 180,
      render: (text, record, index) =>
        record?.status === "Unscheduled" ? (
          <span className="tw-p-2 tw-bg-blue-200 tw-text-blue-700">Chờ duyệt</span>
        ) : record?.status === "Schedule" ? (
          <span className="tw-p-2 tw-bg-green-200 tw-text-green-700">Đang học</span>
        ) : record?.status === "Canceled" ? (
          "Khách hàng hủy"
        ) : record?.status === "CanceledByPt" ? (
          "PT hủy"
        ) : (
          record?.status
        ),
    },
    {
      title: "Lịch học",
      dataIndex: "",
      key: "",
      render: (text, record, index) => (
        <>
          {record?.schedules.length === 0 ? (
            ""
          ) : (
            <Button
              type="primary"
              onClick={() => showModalSchedules(record?.schedules)}
            >
              Xem lịch học
            </Button>
          )}
        </>
      ),
    },
  ];

  const columnsWithoutSchedule = [
    {
      title: "Tên học viên",
      dataIndex: "",
      key: "",
      width: 250,
      render: (text, record, index) => record?.users?.name,
    },

    {
      title: "Email",
      dataIndex: "",
      key: "",
      width: 200,
      render: (text, record, index) => record?.users?.email,
    },
    {
      title: "Tên khóa học",
      dataIndex: "",
      key: "",
      width: 200,
      render: (text, record, index) => record?.courses?.name,
    },
    {
      title: "Giá khóa học",
      dataIndex: "",
      key: "",
      render: (text, record, index) => convertCurrency(record?.courses?.price),
    },
    {
      title: "Thời gian",
      dataIndex: "",
      key: "",
      render: (text, record, index) =>
        moment(record?.created_at).format("HH:mm - DD/MM/YYYY"),
    },
    {
      title: "Trạng thái",
      dataIndex: "",
      key: "",
      width: 180,
      render: (text, record, index) =>
        record?.status === "Unscheduled" ? (
          <span className="tw-px-4 tw-py-3 tw-bg-blue-200 tw-text-blue-700">
            Chờ duyệt
          </span>
        ) : record?.status === "Schedule" ? (
          "Đang học"
        ) : record?.status === "Canceled" ? (
          "Khách hàng hủy"
        ) : record?.status === "CanceledByPt" ? (
          "PT hủy"
        ) : (
          record?.status
        ),
    },
  ];

  const schedulesColumns = [
    {
      title: "Tiêu đề",
      render: (text, record, index) => record?.title,
    },
    {
      title: "Ngày",
      render: (text, record, index) =>
        moment(record?.date).format("DD-MM-YYYY"),
    },

    {
      title: "Thời gian",
      render: (text, record, index) =>
        `${record?.time_start} - ${record?.time_end}`,
    },
    {
      title: "Trạng thái",
      width: 180,
      render: (text, record, index) =>
        record?.status === "unfinished" ? (
          <span className="tw-p-2 tw-bg-orange-200 tw-text-orange-700">
            Chưa học
          </span>
        ) : record?.status === "Complete" ? (
          <span className="tw-p-2 tw-bg-blue-200 tw-text-blue-700">Đã học</span>
        ) : record?.status === "happenning" ? (
          <span className="tw-p-2 tw-bg-green-200 tw-text-green-700">Đang học</span>
        ) : (
          ""
        ),
    },
  ];

  return (
    <>
      <Card
        title="Danh sách học đã đăng ký"
        style={{ backgroundColor: "#ffffff", borderRadius: "8px" }}
      >
        <Row gutter={24} style={{ marginBottom: "20px" }}>
          <div className="sm:tw-flex tw-justify-between tw-w-full">
            <div className="sm:tw-flex tw-flex-wrap tw-w-full">
              <Space className="tw-p-1">
                <Input
                  placeholder="Tìm tên khóa học"
                  style={{ width: 170 }}
                  type="search"
                  allowClear
                  suffix={
                    <SearchOutlined className="text-gray-400 text-md font-medium" />
                  }
                  onChange={onSearch}
                />
              </Space>

              <Space className="tw-p-1">
                <Input
                  placeholder="Tìm tên học viên"
                  style={{ width: 170 }}
                  type="search"
                  allowClear
                  onChange={onSearchByUserName}
                />
              </Space>

              <Space className="tw-p-1">
                <Input
                  placeholder="Tìm số điện thoại"
                  style={{ width: 170 }}
                  type="search"
                  allowClear
                  onChange={onSearchByUserPhone}
                />
              </Space>

              <Space className="tw-p-1">
                <Input
                  placeholder="Tìm theo email"
                  style={{ width: 170 }}
                  type="search"
                  allowClear
                  onChange={onSearchByUserEmail}
                />
              </Space>

              <Space className="tw-p-1">
                <Input
                  placeholder="Nhập giá nhỏ nhất"
                  style={{ width: 180 }}
                  type="search"
                  allowClear
                  onChange={onSearchByPriceStart}
                />
              </Space>

              <Space className="tw-p-1">
                <Input
                  placeholder="Nhập giá lớn nhất"
                  style={{ width: 180 }}
                  type="search"
                  allowClear
                  onChange={onSearchByPriceEnd}
                />
              </Space>
            </div>
          </div>
        </Row>
        <Modal
          title={`Xem lịch học`}
          visible={visibleSchedules}
          onOk={() => setVisibleSchedules(false)}
          width={1000}
          onCancel={() => setVisibleSchedules(false)}
          cancelText="Thoát"
          okButtonProps={{ hidden: true }}
        >
          <Table
            dataSource={schedulesList}
            columns={schedulesColumns}
            pagination={false}
          />
        </Modal>

        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Chờ duyệt" key="1">
            <Table
              dataSource={UnscheduledList}
              columns={columnsWithoutSchedule}
              rowKey={(record) => record.id}
              scroll={{ x: 768 }}
              expandable={{
                expandedRowRender: (record) => (
                  <div className="tw-flex">
                    <div className="tw-w-1/3 ">
                      <p className="tw-font-bold">Thông tin PT</p>
                      <p>Tên: {record?.courses?.teacher?.name}</p>
                      <p>Giới tính: {record?.courses?.teacher?.sex}</p>
                      <p>Địa chỉ: {record?.courses?.teacher?.address}</p>
                      <p>Số điện thoại: {record?.courses?.teacher?.phone}</p>
                      <p>Email: {record?.courses?.teacher?.email}</p>
                    </div>
                    <div className="tw-w-1/3 "></div>
                    <div className="tw-w-1/3 ">
                      <p className="tw-font-bold">Thông tin người dùng</p>
                      <p>Tên: {record?.users?.name}</p>
                      <p>Giới tính: {record?.users?.sex}</p>
                      <p>Địa chỉ: {record?.users?.address}</p>
                      <p>Số điện thoại: {record?.users?.phone}</p>
                      <p>Email: {record?.users?.email}</p>
                    </div>
                  </div>
                ),
                onExpandedRowsChange: (expandedRows) => {
                  if (expandedRows.length > 1) {
                    expandedRows.shift();
                  }
                },
              }}
            />
          </TabPane>
          <TabPane tab="Đang học" key="2">
            <Table
              scroll={{ x: 768 }}
              dataSource={ScheduleList}
              columns={columns}
              rowKey={(record) => record.id}
              expandable={{
                expandedRowRender: (record) => (
                  <>
                    <div className="tw-flex">
                      <div className="tw-w-1/3 ">
                        <p className="tw-font-bold">Thông tin PT</p>
                        <p>Tên: {record?.courses?.teacher?.name}</p>
                        <p>Giới tính: {record?.courses?.teacher?.sex}</p>
                        <p>Địa chỉ: {record?.courses?.teacher?.address}</p>
                        <p>Số điện thoại: {record?.courses?.teacher?.phone}</p>
                        <p>Email: {record?.courses?.teacher?.email}</p>
                      </div>
                      <div className="tw-w-1/3 "></div>
                      <div className="tw-w-1/3 ">
                        <p className="tw-font-bold">Thông tin người dùng</p>
                        <p>Tên: {record?.users?.name}</p>
                        <p>Giới tính: {record?.users?.sex}</p>
                        <p>Địa chỉ: {record?.users?.address}</p>
                        <p>Số điện thoại: {record?.users?.phone}</p>
                        <p>Email: {record?.users?.email}</p>
                      </div>
                    </div>
                  </>
                ),
                onExpandedRowsChange: (expandedRows) => {
                  if (expandedRows.length > 1) {
                    expandedRows.shift();
                  }
                },
              }}
            />
          </TabPane>
          <TabPane tab="Đã hủy" key="3">
            <Table
              scroll={{ x: 768 }}
              dataSource={CancelList}
              columns={columnsWithoutSchedule}
              rowKey={(record) => record.id}
              expandable={{
                expandedRowRender: (record) => (
                  <>
                    <div className="tw-flex">
                      <div className="tw-w-1/3 ">
                        <p className="tw-font-bold">Thông tin PT</p>
                        <p>Tên: {record?.courses?.teacher?.name}</p>
                        <p>Giới tính: {record?.courses?.teacher?.sex}</p>
                        <p>Địa chỉ: {record?.courses?.teacher?.address}</p>
                        <p>Số điện thoại: {record?.courses?.teacher?.phone}</p>
                        <p>Email: {record?.courses?.teacher?.email}</p>
                      </div>
                      <div className="tw-w-1/3 "></div>
                      <div className="tw-w-1/3 ">
                        <p className="tw-font-bold">Thông tin người dùng</p>
                        <p>Tên: {record?.users?.name}</p>
                        <p>Giới tính: {record?.users?.sex}</p>
                        <p>Địa chỉ: {record?.users?.address}</p>
                        <p>Số điện thoại: {record?.users?.phone}</p>
                        <p>Email: {record?.users?.email}</p>
                      </div>
                    </div>
                  </>
                ),
                onExpandedRowsChange: (expandedRows) => {
                  if (expandedRows.length > 1) {
                    expandedRows.shift();
                  }
                },
              }}
            />
          </TabPane>
        </Tabs>
      </Card>
    </>
  );
};

export default StudentRegistered;
