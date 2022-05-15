import { DeleteTwoTone, HighlightTwoTone } from "@ant-design/icons";
import { Popconfirm, Space, Tooltip } from "antd";
import React from "react";
import { showPhoto } from "../../../../components/componentsAdmin/ShowPhoto/showPhoto";
import TableAdmin from "../../../../components/componentsAdmin/table/TableAdmin";
const columns = (onDelete, onEdit) => [
  {
    title: "STT",
    width: 20,
    render: (t, r, i) => i + 1,
  },

  {
    title: "Chứng chỉ",
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
    title: "Chuyên môn",
    dataIndex: "specializes",
    key: "specializes",
    render: (value) => value?.name,
    sorter: (a, b) => (a?.specializes > b?.specializes ? 1 : -1),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (value) => (
      <span
        style={{
          background: value === "Inactive" ? "#e0f9f4" : "#fff1e6",
          borderRadius: 5,
          fontSize: "13px",
          color: value === "Inactive" ? "#4adabb" : "#feaa54",
          padding: 7,
          border:
            value === "Inactive" ? "1px solid #c6f4eb" : " 1px solid #ffe5d1",
        }}
      >
        {value === "Active" ? "Kích hoạt" : "Chưa kích hoạt"}
      </span>
    ),
  },
  {
    title: "Chức năng",
    key: "action",
    width: 150,
    render: (record) => (
      <Space>
        <Tooltip title="Chỉnh sửa">
          <HighlightTwoTone onClick={() => onEdit("update", record)} />
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
    ),
  },
];

const CertificatesList = ({
  dataTable,
  onDelete,
  onEdit,
  onChangePage,
  meta,
}) => {
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

export default CertificatesList;
