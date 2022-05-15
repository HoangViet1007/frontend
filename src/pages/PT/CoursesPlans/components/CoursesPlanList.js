import {
  DeleteTwoTone,
  HighlightTwoTone,
  PoweroffOutlined,
} from "@ant-design/icons";
import { DefaultUi, Player, Video } from "@vime/react";
import { Button, Modal, Popconfirm, Popover, Space, Tooltip } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import TableAdmin from "../../../../components/componentsPT/table/TableAdmin";

const CoursesPlanList = ({ dataTable, onDelete, onChangePage, meta }) => {
  const { id } = useParams();
  const { idStage } = useParams();

  const onEdit = (record) => {
    history.push(
      `/pt/khoa-hoc/${id}/giai-doan/${idStage}/sua-buoi-hoc/${record.id}`
    );
  };

  // const dispatch = useDispatch();
  let history = useHistory();
  // const onChange = async (value) => {
  //   const id = value.id;
  //   const payload = {
  //     name: value?.name,
  //     display: value?.display === "Active" ? "Inactive" : "Active",
  //     description: value?.description,
  //     price: value?.price,
  //     image: value?.image,
  //     content: value?.content,
  //     customer_level_id: value?.customer_level_id,
  //     lessons: value?.lessons,
  //     time_a_lessons: value?.time_a_lessons,
  //     specialize_detail_id: value?.specialize_detail_id,
  //   };
  //   try {
  //     const resulDispatch = await dispatch(updateCourses({ id, payload }));
  //     unwrapResult(resulDispatch);
  //     notification.success({ message: `Thay đổi trạng thái thành công !!!` });
  //     history.push(ROUTER.PT.COURSES);
  //   } catch (error) {
  //     return notification.error({ message: `Đã có lỗi xảy ra ` });
  //   }
  // };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [videoToPlay, setVideoToPlay] = useState("");

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
  const columns = (onDelete, onEdit) => [
    {
      title: "STT",
      width: 20,
      render: (t, r, i) => i + 1,
    },
    {
      title: "Tên buổi học",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => (a?.name > b?.name ? 1 : -1),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      render: (value) =>
        value.length >= 25 ? (
          <Popover content={value}>{value.substring(0, 25) + " ..."}</Popover>
        ) : (
          value
        ),
    },
    {
      title: "Mô tả",
      dataIndex: "descreption",
      key: "descreption",
      // sorter: (a, b) => (a?.time_a_lessons > b?.time_a_lessons ? 1 : -1),
      // sortDirections: ["descend", "ascend"],
      render: (value) =>
        value.length >= 25 ? (
          <Popover content={value}>{value.substring(0, 25) + " ..."}</Popover>
        ) : (
          value
        ),
    },
    {
      title: "Video",
      dataIndex: "video_link",
      key: "video_link",
      render: (video_link) => (
        <>
          <Button
            type="primary"
            icon={<PoweroffOutlined />}
            onClick={() => showModal(video_link)}
          >
            <Popover content={video_link}>Xem video</Popover>
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
      key: "status",
      render: (value) => (
        <span
          style={{
            background: value === "Active" ? "#e0f9f4" : "#fff1e6",
            borderRadius: 5,
            fontSize: "12px",
            color: value === "Active" ? "#4adabb" : "#feaa54",
            padding: 7,
            border:
              value === "Active" ? "1px solid #c6f4eb" : " 1px solid #ffe5d1",
          }}
        >
          {value === "Active" ? "Active" : "Inactive"}
        </span>
      ),
    },

    {
      title: "Chức năng",
      key: "action",
      width: 150,
      render: (record) => (
        <div className="text-center">
          <Space>
            <Tooltip title="Chỉnh sửa">
              <HighlightTwoTone onClick={() => onEdit(record)} />
            </Tooltip>

            <Popconfirm
              title="Bạn có chắc chắn muốn xóa không ?"
              onConfirm={() => onDelete(record)}
            >
              <Tooltip title="Xóa">
                <DeleteTwoTone />
              </Tooltip>
            </Popconfirm>
          </Space>
        </div>
      ),
    },
  ];
  return (
    <>
      <TableAdmin
        columns={columns(onDelete, onEdit)}
        dataTable={dataTable}
        onChangePage={onChangePage}
        meta={meta}
      />
    </>
  );
};

export default CoursesPlanList;
