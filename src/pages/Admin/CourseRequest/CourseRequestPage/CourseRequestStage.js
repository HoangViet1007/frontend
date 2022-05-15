import { PoweroffOutlined, RollbackOutlined } from "@ant-design/icons";
import { DefaultUi, Player, Video } from "@vime/react";
import { Button, Card, Col, Modal, Row, Table } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TableAdmin from "../../../../components/componentsPT/table/TableAdmin";
import ROUTER from "../../../../router/router";
const CourseRequestStage = (props) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [videoToPlay, setVideoToPlay] = useState("");
  const data = props?.location.state?.stages_client;
  const columns = [
    { title: "STT", width: 20, render: (t, r, i) => i + 1 },
    {
      title: "Tên giai đoạn",
      width: 400,
      dataIndex: "name",
      key: "name",
      render: (text) => <div className="w-64">{text}</div>,
    },
    {
      title: "Tiêu đề",
      dataIndex: "short_content",
      key: "short_content",
      render: (text) => text,
    },
    {
      title: "Trạng thái",
      width: 180,
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Kích hoạt", value: "Active" },
        { text: "Chưa kích hoạt", value: "Inactive" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (value) => (
        <span
          style={{
            background: value === "Active" ? "#e0f9f4" : "#fff1e6",
            borderRadius: 5,
            fontSize: "13px",
            color: value === "Active" ? "#4adabb" : "#feaa54",
            padding: 7,
            border: value === "Active" ? "1px solid #c6f4eb" : " 1px solid #ffe5d1",
          }}
        >
          {value === "Active" ? "Kích hoạt" : "Chưa kích hoạt"}
        </span>
      ),
    },
  ];
  const showModal = (e) => {
    setIsModalVisible(true);
    setVideoToPlay(e);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const columnsBuoihoc = [
    { title: "STT", width: 20, render: (t, r, i) => i + 1 },
    {
      title: "Tên buổi học",
      width: 900,
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Video",
      dataIndex: "",
      key: "",
      render: (t, r, i) => (
        <>
          {r.type === 0 ? (
            ""
          ) : (
            <Button
              type="primary"
              icon={<PoweroffOutlined />}
              onClick={() => showModal(r.video_link)}
            >
              Xem video
            </Button>
          )}

          <Modal
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={() => handleCancel()}
            okButtonProps={{ hidden: true }}
            cancelButtonProps={{ hidden: false }}
            width={1000}
            centered
            destroyOnClose={true}
          >
            <Player>
              <Video poster="https://i.ytimg.com/vi/lcQvkhNXoNU/maxresdefault.jpg">
                <source data-src={videoToPlay} type="video/mp4" />
              </Video>
              <DefaultUi></DefaultUi>
            </Player>
          </Modal>
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: 180,
      key: "status",
      render: (value) => (
        <span
          style={{
            background: value === "Active" ? "#e0f9f4" : "#fff1e6",
            borderRadius: 5,
            fontSize: "12px",
            color: value === "Active" ? "#4adabb" : "#feaa54",
            padding: 7,
            border: value === "Active" ? "1px solid #c6f4eb" : " 1px solid #ffe5d1",
          }}
        >
          {value === "Active" ? "Kích hoạt" : "Chưa kích hoạt"}
        </span>
      ),
    },
    {
      title: "Loại buổi học",
      dataIndex: "type",
      width: 150,
      key: "type",
      render: (value) => (
        <span
          style={{
            background: value === 0 ? "#e0f9f4" : "#fff1e6",
            borderRadius: 5,
            fontSize: "12px",
            color: value === 0 ? "#4adabb" : "#feaa54",
            padding: 7,
            border: value === 0 ? "1px solid #c6f4eb" : " 1px solid #ffe5d1",
          }}
        >
          {value === 0 ? "Offline" : "Trực tuyến"}
        </span>
      ),
    },
  ];

  return (
    <>
      <Card
        style={{ backgroundColor: "#ffffff", borderRadius: "8px" }}
        title={"Danh sách giai đoạn: " + props.location.state.name}
      >
        <Row gutter={24} style={{ marginBottom: "20px" }}>
          <div className="tw-flex tw-justify-end tw-w-full tw-py-3">
            <div className="sm:tw-mr-10">
              <Button
                style={{
                  borderRadius: ".42rem",
                  border: "#00d084",
                  backgroundColor: "#ff4d4f",
                  color: "#fff",
                }}
                onClick={() => props.history.push(ROUTER.ADMIN.COURSE_REQUEST)}
              >
                <div className="tw-flex tw-items-center">
                  <RollbackOutlined className="tw-pr-2" /> Quay lại
                </div>
              </Button>
            </div>
          </div>
        </Row>
        <Row>
          <Col span={24}>
            <TableAdmin
              columns={columns}
              dataTable={data}
              expandable={{
                expandedRowRender: (record, index, indent, expandedRow) => {
                  return (
                    <Table
                      columns={columnsBuoihoc}
                      dataSource={record.course_planes_client}
                      pagination={false}
                    />
                  );
                },
                rowExpandable: (record) => record.course_planes_client.length > 0,
              }}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default CourseRequestStage;
