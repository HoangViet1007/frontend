/*eslint jsx-a11y/anchor-is-valid: "off"*/

import { DeleteTwoTone, HighlightTwoTone } from "@ant-design/icons";
import { Popconfirm, Space, Tag, Tooltip } from "antd";
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
    title: "KeyCode",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => (a?.name > b?.name ? 1 : -1),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Mô tả",
    dataIndex: "display_name",
    key: "display_name",
    sorter: (a, b) => (a?.display_name > b?.display_name ? 1 : -1),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Chức năng",
    key: "action",
    width: 150,
    render: (record) => (
      <Space>
        <ShowForPermission permission="permission:edit">
          <Tooltip title="Chỉnh sửa">
            <HighlightTwoTone onClick={() => onEdit("update", record)} />
          </Tooltip>
        </ShowForPermission>
        <ShowForPermission permission="permission:delete">
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

const PermissionList = ({ dataTable, onDelete, onEdit, onChangePage, meta }) => {
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

export default PermissionList;
