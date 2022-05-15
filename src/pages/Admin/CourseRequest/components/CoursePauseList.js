import { EditTwoTone } from "@ant-design/icons";
import { Space, Table, Tooltip } from "antd";
import React from "react";
import { useHistory } from "react-router";
import { ShowForPermission } from "../../../../components/componentsAdmin/ShowPermission/ShowForPermissionComponent";
import ROUTER from "../../../../router/router";
import { showPhoto } from "./../../../../components/componentsAdmin/ShowPhoto/showPhoto";
import { convertCurrency } from "./../../../../utils/index";

const CoursePauseList = ({ dataTable, onChangePage, meta, onEdit }) => {
  let history = useHistory();
  const columns = () => [
    {
      title: "STT",
      width: 20,
      render: (t, r, i) => i + 1,
    },

    {
      title: "Khoá học",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => (a?.name > b?.name ? 1 : -1),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (value) => showPhoto(value),
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
      title: "Chuyên môn",
      dataIndex: "specialize_details",
      key: "specialize_details",
      render: (value) => value?.specialize?.name,
    },

    {
      title: "Giai đoạn",
      width: 140,
      render: (value) => (
        <>
          <span>{value?.stages_client?.length}</span>
          <span>
            <a
              style={{ color: "#0000FF", fontSize: "11px" }}
              onClick={() => history.push(ROUTER.ADMIN.COURSE_REQUEST_STAGE, value)}
            >
              ( Chi tiết )
            </a>
          </span>
        </>
      ),
    },
    {
      title: "Hiển thị",
      dataIndex: "display",
      key: "display",
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
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (value) => (
        <span
          style={{
            background:
              value === "Request" ? "#99CCFF" : value === "Happening" ? "#e0f9f4" : "#dd716a",
            borderRadius: 5,
            fontSize: "13px",
            color: value === "Request" ? "#fff" : value === "Happening" ? "#4adabb" : "#fff",
            padding: 7,
          }}
        >
          {value === "Request" ? "Yêu cầu" : value === "Happening" ? "Đã duyệt" : "Tạm dừng"}
        </span>
      ),
    },
    {
      title: "Chức năng",
      key: "action",
      width: 150,
      render: (record) => (
        <div className="tw-flex tw-justify-center">
          <ShowForPermission permission="course:edit">
            <Space>
              <Tooltip title="Chỉnh sửa">
                <EditTwoTone onClick={() => onEdit("update", record)} />
              </Tooltip>
            </Space>
          </ShowForPermission>
        </div>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns(onEdit)}
        dataSource={dataTable}
        pagination={{ pageSize: 10 }}
        rowKey={(record) => record.id}
        expandable={{
          expandedRowRender: (record) => {
            return (
              <ul className="tw-text-xs">
                <li className="tw-py-2">
                  <span className=" tw-min-w-[130px] tw-inline-block tw-font-medium">Tên PT:</span>
                  <span>{record?.teacher?.name}</span>
                </li>
                <li className="tw-py-2">
                  <span className="tw-min-w-[130px] tw-inline-block tw-font-medium">Địa chỉ:</span>
                  <span>{record?.teacher?.address}</span>
                </li>
                <li className="tw-py-2">
                  <span className="tw-min-w-[130px] tw-inline-block tw-font-medium">Email:</span>
                  <span>{record?.teacher?.email}</span>
                </li>

                <li className="tw-py-2">
                  <span className="tw-min-w-[130px] tw-inline-block tw-font-medium">Số ĐT:</span>
                  <span>{record?.teacher?.phone}</span>
                </li>
                <li className="tw-py-2">
                  <span className="tw-min-w-[130px] tw-inline-block tw-font-medium">Số dư:</span>
                  <span>{convertCurrency(record?.teacher?.money)}</span>
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
    </>
  );
};

export default CoursePauseList;
