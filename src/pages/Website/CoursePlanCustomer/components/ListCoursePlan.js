import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table, Tabs } from "antd";
import { showPhoto } from "../../../../components/componentsWebsite/ShowPhoto/showPhoto";
import { DefaultUi, Player, Video } from "@vime/react";
import moment from "moment";
import HtmlParser from "react-html-parser";
const ListCoursePlan = () => {
  const { lessons, loading } = useSelector((state) => state.CoursePlanCustomer);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const lessonsOn = lessons.filter((lesson) => lesson.type === 1);
  const lessonsOff = lessons.filter((lesson) => lesson.type === 0);
  const columnLearnOn = [
    {
      title: "STT",
      key: "STT",
      render: (t, r, i) => i + 1,
      width: "1%",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => showPhoto(image),
      width: "3%",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: "15%",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      width: "15%",
      render: (text, r) => HtmlParser(text),
    },
    {
      title: "Kiểu",
      dataIndex: "type",
      key: "type",
      width: "5%",
      render: (type) =>
        type === 0 ? "Trực tuyến" : type === 1 ? "Học video" : type,
    },
    {
      title: "Video",
      dataIndex: "video_link",
      key: "video_link",
      width: "5%",
      render: (video_link) => {
        return (
          <>
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
              Xem video
            </Button>
            <Modal
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              okButtonProps={{ hidden: true }}
              cancelButtonProps={{ hidden: false }}
              cancelText="Thoát"
              width={1000}
              centered
              closable={false}
              destroyOnClose={true}
            >
              <Player>
                <Video poster="https://i.ytimg.com/vi/lcQvkhNXoNU/maxresdefault.jpg">
                  <source data-src={video_link} type="video/mp4" />
                </Video>
                <DefaultUi></DefaultUi>
              </Player>
            </Modal>
          </>
        );
      },
    },
  ];
  const columnLearnOff = [
    {
      title: "STT",
      key: "STT",
      render: (t, r, i) => i + 1,
      width: "1%",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => showPhoto(image),
      width: "3%",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: "15%",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      width: "15%",
      render: (text, r) => HtmlParser(text),
    },
    {
      title: "Kiểu",
      dataIndex: "type",
      key: "type",
      width: "5%",
      render: (type) =>
        type === 0 ? "Trực tuyến" : type === 1 ? "Học video" : type,
    },
    {
      title: "Thời gian",
      dataIndex: "schedules",
      key: "schedules",
      width: "9%",
      render: (schedules, record) => (
        <div>
          {moment(
            `${schedules[0]?.date}T${record?.schedules[0]?.time_start}`
          ).format("HH:mm")}{" "}
          -{" "}
          {moment(
            `${schedules[0]?.date}T${record?.schedules[0]?.time_end}`
          ).format("HH:mm")}
          <br />
          {schedules[0]?.date}
        </div>
      ),
    },
  ];
  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Học video" key="1">
        <Table
          loading={loading}
          columns={columnLearnOn}
          dataSource={lessonsOn}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Học trực tuyến" key="2">
        <Table
          loading={loading}
          columns={columnLearnOff}
          dataSource={lessonsOff}
        />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default ListCoursePlan;
