import React from "react";
import { Popconfirm, Space, Tooltip, Switch, notification, Table } from "antd";
import { DeleteTwoTone, HighlightTwoTone } from "@ant-design/icons";
import TableAdmin from "../../../../components/componentsAdmin/table/TableAdmin";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import ROUTER from "../../../../router/router";
import { updateSetting } from "../SettingSlice";
import { showPhoto } from "../../../../components/componentsPT/ShowPhoto/showPhoto";
import { ShowForPermission } from "../../../../components/componentsAdmin/ShowPermission/ShowForPermissionComponent";
const SettingListText = ({ dataTable, onDelete, onEdit, pagination }) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const onChange = async (value) => {
    const id = value.id;
    const payload = {
      config_key: value?.config_key,
      status: value?.status === "Active" ? "Inactive" : "Active",
      config_value: value?.config_value,
    };
    try {
      const resulDispatch = await dispatch(updateSetting({ id, payload }));
      unwrapResult(resulDispatch);
      notification.success({ message: `Thay đổi trạng thái thành công !!!` });
      history.push(ROUTER.ADMIN.SETTING);
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
      title: "Tiêu đề",
      dataIndex: "config_key",
      key: "config_key",
      width: 200,
      sorter: (a, b) => (a?.config_key > b?.config_key ? 1 : -1),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Nội dung",
      dataIndex: "config_value",
      key: "address",
      width: 900,
      sorter: (a, b) => (a?.config_value > b?.config_value ? 1 : -1),
      sortDirections: ["descend", "ascend"],
      render: (value) => (value.slice(0, 8) === "https://" ? showPhoto(value) : value),
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
      width: 150,
      render: (record) => (
        <Space>
          <ShowForPermission permission="setting:edit">
            <Tooltip title="Chỉnh sửa">
              <HighlightTwoTone onClick={() => onEdit("update", record)} />
            </Tooltip>
          </ShowForPermission>
          <ShowForPermission permission="setting:delete">
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
      <Table
        columns={columns(onDelete, onEdit)}
        rowKey={(record) => record.id}
        dataSource={dataTable}
        pagination={pagination}
      />
    </>
  );
};

export default SettingListText;
