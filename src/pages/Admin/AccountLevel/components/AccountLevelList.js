import { DeleteTwoTone, HighlightTwoTone } from "@ant-design/icons";
import { Popconfirm, Space, Tooltip } from "antd";
import React from "react";
import { ShowForPermission } from "../../../../components/componentsAdmin/ShowPermission/ShowForPermissionComponent";
import { showPhoto } from "../../../../components/componentsAdmin/ShowPhoto/showPhoto";
import TableAdmin from "../../../../components/componentsAdmin/table/TableAdmin";
const columns = (onDelete, onEdit) => [
  {
    title: "STT",
    width: 20,
    render: (t, r, i) => i + 1,
  },

  {
    title: "Cấp độ",
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
    title: "Tên hiển thị",
    dataIndex: "display_name",
    key: "display_name",
    sorter: (a, b) => (a?.display_name > b?.display_name ? 1 : -1),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Khoá học tối thiểu",
    dataIndex: "course_number",
    key: "course_number",
    sorter: (a, b) => (a?.course_number > b?.course_number ? 1 : -1),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Học viên tối thiếu",
    dataIndex: "user_number",
    key: "user_number",
    sorter: (a, b) => (a?.user_number > b?.user_number ? 1 : -1),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Tổng số PT ",
    dataIndex: "users",
    key: "users",
    render: (value) => value?.length,
  },
  {
    title: "Quyền xoá",
    dataIndex: "is_mutable",
    key: "is_mutable",
    render: (value) => (
      <span
        style={{
          background: value === 1 ? "#0000FF" : "#FF0000",
          borderRadius: 5,
          fontSize: "13px",
          color: "#fff",
          padding: 7,
        }}
      >
        {value === 1 ? "True" : "False"}
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
        <ShowForPermission permission="account-level:edit">
          <Tooltip title="Chỉnh sửa">
            <HighlightTwoTone onClick={() => onEdit("update", record)} />
          </Tooltip>
        </ShowForPermission>
        <ShowForPermission permission="account-level:delete">
          <Popconfirm title="Bạn có chắc chắn muốn xóa không ?" onConfirm={() => onDelete(record)}>
            <Tooltip title="Xóa">
              <DeleteTwoTone />
            </Tooltip>
          </Popconfirm>
        </ShowForPermission>
      </Space>
    ),
  },
];

const AccountLevelList = ({ dataTable, onDelete, onEdit, onChangePage, meta }) => {
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

export default AccountLevelList;
