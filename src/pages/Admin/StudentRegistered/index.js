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
      title: "T??n h???c vi??n",
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
      title: "T??n kh??a h???c",
      dataIndex: "",
      key: "",
      render: (text, record, index) => record?.courses?.name,
    },
    {
      title: "Gi?? kh??a h???c",
      dataIndex: "",
      key: "",
      render: (text, record, index) => convertCurrency(record?.courses?.price),
    },
    {
      title: "Th???i gian",
      dataIndex: "",
      key: "",
      render: (text, record, index) =>
        moment(record?.created_at).format("HH:mm - DD/MM/YYYY"),
    },
    {
      title: "Tr???ng th??i",
      dataIndex: "",
      key: "",
      width: 180,
      render: (text, record, index) =>
        record?.status === "Unscheduled" ? (
          <span className="tw-p-2 tw-bg-blue-200 tw-text-blue-700">Ch??? duy???t</span>
        ) : record?.status === "Schedule" ? (
          <span className="tw-p-2 tw-bg-green-200 tw-text-green-700">??ang h???c</span>
        ) : record?.status === "Canceled" ? (
          "Kh??ch h??ng h???y"
        ) : record?.status === "CanceledByPt" ? (
          "PT h???y"
        ) : (
          record?.status
        ),
    },
    {
      title: "L???ch h???c",
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
              Xem l???ch h???c
            </Button>
          )}
        </>
      ),
    },
  ];

  const columnsWithoutSchedule = [
    {
      title: "T??n h???c vi??n",
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
      title: "T??n kh??a h???c",
      dataIndex: "",
      key: "",
      width: 200,
      render: (text, record, index) => record?.courses?.name,
    },
    {
      title: "Gi?? kh??a h???c",
      dataIndex: "",
      key: "",
      render: (text, record, index) => convertCurrency(record?.courses?.price),
    },
    {
      title: "Th???i gian",
      dataIndex: "",
      key: "",
      render: (text, record, index) =>
        moment(record?.created_at).format("HH:mm - DD/MM/YYYY"),
    },
    {
      title: "Tr???ng th??i",
      dataIndex: "",
      key: "",
      width: 180,
      render: (text, record, index) =>
        record?.status === "Unscheduled" ? (
          <span className="tw-px-4 tw-py-3 tw-bg-blue-200 tw-text-blue-700">
            Ch??? duy???t
          </span>
        ) : record?.status === "Schedule" ? (
          "??ang h???c"
        ) : record?.status === "Canceled" ? (
          "Kh??ch h??ng h???y"
        ) : record?.status === "CanceledByPt" ? (
          "PT h???y"
        ) : (
          record?.status
        ),
    },
  ];

  const schedulesColumns = [
    {
      title: "Ti??u ?????",
      render: (text, record, index) => record?.title,
    },
    {
      title: "Ng??y",
      render: (text, record, index) =>
        moment(record?.date).format("DD-MM-YYYY"),
    },

    {
      title: "Th???i gian",
      render: (text, record, index) =>
        `${record?.time_start} - ${record?.time_end}`,
    },
    {
      title: "Tr???ng th??i",
      width: 180,
      render: (text, record, index) =>
        record?.status === "unfinished" ? (
          <span className="tw-p-2 tw-bg-orange-200 tw-text-orange-700">
            Ch??a h???c
          </span>
        ) : record?.status === "Complete" ? (
          <span className="tw-p-2 tw-bg-blue-200 tw-text-blue-700">???? h???c</span>
        ) : record?.status === "happenning" ? (
          <span className="tw-p-2 tw-bg-green-200 tw-text-green-700">??ang h???c</span>
        ) : (
          ""
        ),
    },
  ];

  return (
    <>
      <Card
        title="Danh s??ch h???c ???? ????ng k??"
        style={{ backgroundColor: "#ffffff", borderRadius: "8px" }}
      >
        <Row gutter={24} style={{ marginBottom: "20px" }}>
          <div className="sm:tw-flex tw-justify-between tw-w-full">
            <div className="sm:tw-flex tw-flex-wrap tw-w-full">
              <Space className="tw-p-1">
                <Input
                  placeholder="T??m t??n kh??a h???c"
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
                  placeholder="T??m t??n h???c vi??n"
                  style={{ width: 170 }}
                  type="search"
                  allowClear
                  onChange={onSearchByUserName}
                />
              </Space>

              <Space className="tw-p-1">
                <Input
                  placeholder="T??m s??? ??i???n tho???i"
                  style={{ width: 170 }}
                  type="search"
                  allowClear
                  onChange={onSearchByUserPhone}
                />
              </Space>

              <Space className="tw-p-1">
                <Input
                  placeholder="T??m theo email"
                  style={{ width: 170 }}
                  type="search"
                  allowClear
                  onChange={onSearchByUserEmail}
                />
              </Space>

              <Space className="tw-p-1">
                <Input
                  placeholder="Nh???p gi?? nh??? nh???t"
                  style={{ width: 180 }}
                  type="search"
                  allowClear
                  onChange={onSearchByPriceStart}
                />
              </Space>

              <Space className="tw-p-1">
                <Input
                  placeholder="Nh???p gi?? l???n nh???t"
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
          title={`Xem l???ch h???c`}
          visible={visibleSchedules}
          onOk={() => setVisibleSchedules(false)}
          width={1000}
          onCancel={() => setVisibleSchedules(false)}
          cancelText="Tho??t"
          okButtonProps={{ hidden: true }}
        >
          <Table
            dataSource={schedulesList}
            columns={schedulesColumns}
            pagination={false}
          />
        </Modal>

        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Ch??? duy???t" key="1">
            <Table
              dataSource={UnscheduledList}
              columns={columnsWithoutSchedule}
              rowKey={(record) => record.id}
              scroll={{ x: 768 }}
              expandable={{
                expandedRowRender: (record) => (
                  <div className="tw-flex">
                    <div className="tw-w-1/3 ">
                      <p className="tw-font-bold">Th??ng tin PT</p>
                      <p>T??n: {record?.courses?.teacher?.name}</p>
                      <p>Gi???i t??nh: {record?.courses?.teacher?.sex}</p>
                      <p>?????a ch???: {record?.courses?.teacher?.address}</p>
                      <p>S??? ??i???n tho???i: {record?.courses?.teacher?.phone}</p>
                      <p>Email: {record?.courses?.teacher?.email}</p>
                    </div>
                    <div className="tw-w-1/3 "></div>
                    <div className="tw-w-1/3 ">
                      <p className="tw-font-bold">Th??ng tin ng?????i d??ng</p>
                      <p>T??n: {record?.users?.name}</p>
                      <p>Gi???i t??nh: {record?.users?.sex}</p>
                      <p>?????a ch???: {record?.users?.address}</p>
                      <p>S??? ??i???n tho???i: {record?.users?.phone}</p>
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
          <TabPane tab="??ang h???c" key="2">
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
                        <p className="tw-font-bold">Th??ng tin PT</p>
                        <p>T??n: {record?.courses?.teacher?.name}</p>
                        <p>Gi???i t??nh: {record?.courses?.teacher?.sex}</p>
                        <p>?????a ch???: {record?.courses?.teacher?.address}</p>
                        <p>S??? ??i???n tho???i: {record?.courses?.teacher?.phone}</p>
                        <p>Email: {record?.courses?.teacher?.email}</p>
                      </div>
                      <div className="tw-w-1/3 "></div>
                      <div className="tw-w-1/3 ">
                        <p className="tw-font-bold">Th??ng tin ng?????i d??ng</p>
                        <p>T??n: {record?.users?.name}</p>
                        <p>Gi???i t??nh: {record?.users?.sex}</p>
                        <p>?????a ch???: {record?.users?.address}</p>
                        <p>S??? ??i???n tho???i: {record?.users?.phone}</p>
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
          <TabPane tab="???? h???y" key="3">
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
                        <p className="tw-font-bold">Th??ng tin PT</p>
                        <p>T??n: {record?.courses?.teacher?.name}</p>
                        <p>Gi???i t??nh: {record?.courses?.teacher?.sex}</p>
                        <p>?????a ch???: {record?.courses?.teacher?.address}</p>
                        <p>S??? ??i???n tho???i: {record?.courses?.teacher?.phone}</p>
                        <p>Email: {record?.courses?.teacher?.email}</p>
                      </div>
                      <div className="tw-w-1/3 "></div>
                      <div className="tw-w-1/3 ">
                        <p className="tw-font-bold">Th??ng tin ng?????i d??ng</p>
                        <p>T??n: {record?.users?.name}</p>
                        <p>Gi???i t??nh: {record?.users?.sex}</p>
                        <p>?????a ch???: {record?.users?.address}</p>
                        <p>S??? ??i???n tho???i: {record?.users?.phone}</p>
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
