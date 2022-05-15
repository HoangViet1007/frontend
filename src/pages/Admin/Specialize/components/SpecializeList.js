import React from "react";
import { Popconfirm, Space, Tooltip, Switch, notification } from "antd";
import { DeleteTwoTone, HighlightTwoTone } from "@ant-design/icons";
import TableAdmin from "../../../../components/componentsAdmin/table/TableAdmin";
import { updateSpecialize } from "../SpecializeSlice";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import ROUTER from "../../../../router/router";
import { ShowForPermission } from "../../../../components/componentsAdmin/ShowPermission/ShowForPermissionComponent";

const SpecializeList = ({ dataTable, onDelete, onEdit, onChangePage, meta }) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const onChange = async (value) => {
    const id = value.id;
    const payload = {
      name: value?.name,
      status: value?.status === "Active" ? "Inactive" : "Active",
      description: value?.description,
    };
    try {
      const resulDispatch = await dispatch(updateSpecialize({ id, payload }));
      unwrapResult(resulDispatch);
      notification.success({ message: `Thay đổi trạng thái thành công !!!` });
      history.push(ROUTER.ADMIN.SPECIALIZE);
    } catch (error) {
      return notification.error({ message: `Đã có lỗi xảy ra ` });
    }
  };
  const columns = (onDelete, onEdit) => [
    {
      title: "STT",
      width: 20,
      render: (t, r, i) => i + 1,
    },

    {
      title: "Chuyên môn",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => (a?.name > b?.name ? 1 : -1),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => (a?.description > b?.description ? 1 : -1),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (value) => (
        <Switch
          {...(value.status === "Active" ? { checked: true } : { checked: false })}
          onChange={() => onChange(value)}
        />
      ),
    },
    {
      title: "Chức năng",
      key: "action",
      render: (record) => (
        <Space>
          <ShowForPermission permission="specialize:edit">
            <Tooltip title="Chỉnh sửa">
              <HighlightTwoTone onClick={() => onEdit("update", record)} />
            </Tooltip>
          </ShowForPermission>
          <ShowForPermission permission="specialize:delete">
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa không ?"
              onConfirm={() => onDelete(record)}
            >
              <Tooltip title="Xóa">
                <DeleteTwoTone />
              </Tooltip>
            </Popconfirm>
          </ShowForPermission>
        </Space>
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

export default SpecializeList;
