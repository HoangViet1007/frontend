// eslint-disable-next-line
import {
  DeleteOutlined,
  DeleteTwoTone,
  HighlightTwoTone,
  UpCircleTwoTone,
} from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import { notification, Popconfirm, Space, Switch, Tooltip, Table } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link, useLocation } from "react-router-dom";
import { showPhoto } from "../../../../components/componentsPT/ShowPhoto/showPhoto";
import ROUTER from "../../../../router/router";
import { convertCurrency } from "../../../../utils";
import { updateCourses, sendRequest, getCourses } from "../CoursesSlice";

const CoursesList = ({ dataTable, onDelete, onChangePage, meta }) => {
  const onEdit = (record) => {
    history.push(`${ROUTER.PT.COURSESEDIT}/${record.id}`);
  };
  const location = useLocation();
  const sendRequestHandle = async (id) => {
    try {
      dispatch(sendRequest(id))
        .then((result) => {
          result.payload === true
            ? notification.success({
                message: `Gửi yêu cầu thành công `,
              })
            : notification.error({
                message: `${result.payload}`,
              });

          dispatch(getCourses());
        })
        .catch((err) => {
          notification.error({ message: `${err}` });
        });
    } catch (error) {
      return notification.error({ message: `${error} ` });
    }
  };
  const dispatch = useDispatch();
  let history = useHistory();
  const onChange = async (value) => {
    const id = value.id;
    const payload = {
      ...value,
      display: value?.display === "Active" ? "Inactive" : "Active",
    };
    try {
      const resulDispatch = await dispatch(updateCourses({ id, payload }));
      unwrapResult(resulDispatch);
      notification.success({
        message: `Thay đổi trạng thái hiển thị thành công!`,
      });
      history.push(ROUTER.PT.COURSES + location.search);
    } catch (error) {
      return notification.error({ message: `${error} ` });
    }
  };
  const columns = (onDelete, onEdit) => [
    {
      title: "STT",
      render: (t, r, i) => i + 1,
      width: 5,
      responsive: ["xxl"],
    },
    {
      title: "Tên khóa học",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => (a?.name > b?.name ? 1 : -1),
      sortDirections: ["descend", "ascend"],
      width: 250,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (value) => showPhoto(value),
      width: 10,
    },

    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (value) => convertCurrency(value),
    },
    {
      title: "Cấp độ",
      dataIndex: "customer_level",
      key: "customer_level",
      render: (value) => value.name,
    },
    {
      title: "Giai đoạn",
      width: 150,
      dataIndex: "",
      render: (value) => (
        <>
          <span>{value?.stages_client?.length}</span>

          <Link to={`${ROUTER.PT.STAGE}/${value?.id}/giai-doan`}>
            <span style={{ color: "#0000FF", fontSize: "14px" }}> (Chi tiết)</span>
          </Link>
        </>
      ),
    },
    {
      title: "Hiển thị",
      key: "display",
      render: (value) => (
        <Switch
          {...(value.display === "Active" ? { checked: true } : { checked: false })}
          onChange={() => onChange(value)}
        />
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 180,
      render: (value) => (
        <>
          <span
            style={{
              background:
                value === "Happening" ? "#e0f9f4" : value === "Pause" ? "#ff5252" : "#fff1e6",
              borderRadius: 5,
              fontSize: "13px",
              color: value === "Happening" ? "#4adabb" : value === "Pause" ? "#ffffff" : "#feaa54",
              padding: 7,
              border: value === "Happening" ? "1px solid #c6f4eb" : " 1px solid #ffe5d1",
            }}
          >
            {value === "Pending"
              ? "Đang chờ"
              : value === "Happening"
              ? "Đã duyệt"
              : value === "Pause"
              ? "Đã dừng"
              : value === "Request"
              ? "Yêu cầu"
              : ""}
          </span>
        </>
      ),
    },
    {
      title: "Chức năng",
      key: "action",
      width: 150,
      render: (record) => (
        <div className="text-center">
          {record.status === "Pending" ? (
            <>
              <Space>
                <Tooltip title="Gửi yêu cầu">
                  <Popconfirm
                    title="Bạn có chắc chắn muốn gửi yêu cầu duyệt khóa học?"
                    onConfirm={() => sendRequestHandle(record.id)}
                    okText="Gửi yêu cầu"
                    cancelText="Thoát"
                  >
                    <UpCircleTwoTone />
                  </Popconfirm>
                </Tooltip>
              </Space>{" "}
            </>
          ) : (
            ""
          )}
          <Space>
            <Tooltip title="Chỉnh sửa">
              <HighlightTwoTone onClick={() => onEdit(record)} />
            </Tooltip>
            {record.stages_client.length === 0 ? (
              <Popconfirm
                title="Bạn có chắc chắn muốn xóa không ?"
                onConfirm={() => onDelete(record)}
              >
                <Tooltip title="Xóa">
                  <DeleteTwoTone />
                </Tooltip>
              </Popconfirm>
            ) : (
              <Tooltip title="Không thể xóa vì chứa các giai đoạn">
                <DeleteOutlined />
              </Tooltip>
            )}
          </Space>
        </div>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns(onDelete, onEdit)}
        dataSource={dataTable}
        pagination={{ pageSize: 10 }}
        // onChangePage={onChangePage}
        // meta={meta}
      />
    </>
  );
};

export default CoursesList;
