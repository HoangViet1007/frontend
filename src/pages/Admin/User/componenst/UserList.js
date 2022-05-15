import { DeleteTwoTone, HighlightTwoTone } from "@ant-design/icons";
import { Popconfirm, Space, Tag, Tooltip } from "antd";
import React from "react";
import { showPhoto } from "../../../../components/componentsAdmin/ShowPhoto/showPhoto";
import TableAdmin from "../../../../components/componentsAdmin/table/TableAdmin";
import { ShowForPermission } from "./../../../../components/componentsAdmin/ShowPermission/ShowForPermissionComponent";

const columns = (onDelete, onEdit, onNextPage) => [
  {
    title: "STT",
    width: 20,
    render: (t, r, i) => i + 1,
  },
  {
    title: "Họ và tên",
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
    title: "Email",
    dataIndex: "email",
    key: "email",
  },

  {
    title: "Chuyên môn",
    dataIndex: "specialize_details",
    key: "specialize_details",
    render: (value, record) => (
      <Space>
        <span> {value?.length} </span>
        <span>
          <a style={{ color: "#0000FF", fontSize: "11px" }} onClick={() => onNextPage(record.id)}>
            {value?.length > 0 ? "( Chi tiết )" : ""}
          </a>
        </span>
      </Space>
    ),
  },
  {
    title: "Chức năng",
    key: "action",
    width: 150,
    render: (record) => (
      <Space>
        <ShowForPermission permission="user:edit">
          <Tooltip title="Chỉnh sửa">
            <HighlightTwoTone onClick={() => onEdit("update", record)} />
          </Tooltip>
        </ShowForPermission>
        <ShowForPermission permission="user:delete">
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

const UserList = ({ dataTable, onDelete, onEdit, onChangePage, meta, onNextPage }) => {
  return (
    <>
      <TableAdmin
        columns={columns(onDelete, onEdit, onNextPage)}
        dataTable={dataTable}
        onChangePage={onChangePage}
        meta={meta}
        expandable={{
          expandedRowRender: (record) => {
            return (
              <ul className="tw-text-xs">
                <li className="tw-py-2">
                  <span className="tw-min-w-[150px] tw-inline-block tw-font-medium">Số điện thoại:</span>
                  <span>{record?.phone}</span>
                </li>
                <li className="tw-py-2">
                  <span className="tw-min-w-[150px] tw-inline-block tw-font-medium">Địa chỉ:</span>
                  <span>{record?.address}</span>
                </li>
                <li className="tw-py-2">
                  <span className="tw-min-w-[150px] tw-inline-block tw-font-medium">Chức vụ:</span>
                  <span>
                    {record?.roles &&
                      record?.roles?.map((item) => (
                        <Tag
                          color={
                            item.name === "Admin"
                              ? "#108ee9"
                              : item.name === "Customer"
                              ? "#87d068"
                              : "#2db7f5"
                          }
                          key={item.id}
                        >
                          {item.name}
                        </Tag>
                      ))}
                  </span>
                </li>
                <li className="tw-py-2">
                  <span className=" tw-min-w-[150px] tw-inline-block tw-font-medium">
                    Cấp độ tài khoản:
                  </span>
                  <span>
                    {record?.account_levels?.name ? record?.account_levels?.name : "Chưa có cấp độ"}
                  </span>
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

export default UserList;
