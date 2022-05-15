import React from 'react'
import { Popconfirm, Space, Tooltip } from "antd";
import { DeleteTwoTone, HighlightTwoTone } from "@ant-design/icons";
import TableAdmin from '../../../../components/componentsAdmin/table/TableAdmin';

const columns = (onDelete, onEdit) => [
  {
    title: "STT",
    width: 20,
    render: (t, r, i) => i + 1,
  },

  {
    title: "Tiêu đề",
    dataIndex: "config_key",
    key: "config_key",
    sorter: (a, b) => (a?.config_key > b?.config_key ? 1 : -1),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Nội dung",
    dataIndex: "config_value",
    key: "address",
    sorter: (a, b) => (a?.config_value > b?.config_value ? 1 : -1),
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
          border: value === "Inactive" ? "1px solid #c6f4eb" : " 1px solid #ffe5d1",
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
          <HighlightTwoTone />
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

const CustomerLevelList = ({ dataTable, onDelete, onEdit }) => {
  return (
    <>
      <TableAdmin
        columns={columns(onDelete, onEdit)}
        dataTable={dataTable}
      />
    </>
  )
}

export default SettingList
