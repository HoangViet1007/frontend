/*eslint react-hooks/exhaustive-deps: "off"*/
import {
  PlusCircleTwoTone,
  SearchOutlined,
  ExportOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  message,
  Upload,
  notification,
} from "antd";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ROUTER from "../../../../router/router";
import { unwrapResult } from "@reduxjs/toolkit";
import { Link, useHistory } from "react-router-dom";
import { deleteRole, getRole } from "./../RoleSlice";
import RoleList from "./../component/RoleList";
import { ShowForPermission } from "../../../../components/componentsAdmin/ShowPermission/ShowForPermissionComponent";

const { Option } = Select;
const Role = (props) => {
  let history = useHistory();
  const role = useSelector((state) => state.Role.items);
  const meta = useSelector((state) => state.Role.meta);
  const dispatch = useDispatch();
  useEffect(() => {
    const { search } = props.history.location;
    let params;
    const filterOptions = search.split("?")[1];
    if (filterOptions !== undefined) {
      params = `{"${decodeURI(filterOptions)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')}"}`;
      dispatch(getRole(JSON.parse(params)));
    } else {
      dispatch(getRole(null));
    }
  }, [dispatch, props.history.location]);

  const onEdit = async (record) => {
    history.push(`${ROUTER.ADMIN.ROLEEDIT}/${record.id}`);
  };
  const onDelete = async (e) => {
    try {
      const resulDispatch = await dispatch(deleteRole(e?.id));
      unwrapResult(resulDispatch);
      notification.success({ message: `Xoá chức vụ thành công !` });
    } catch (error) {
      notification.error({ message: `Lỗi   ${error}` });
    }
  };

  const onChangePage = (value) => {
    if (value) {
      props.history.push(ROUTER.ADMIN.ROLE.concat(`?page=${value}`));
    } else {
      props.history.push(ROUTER.ADMIN.ROLE);
      dispatch(getRole(null));
    }
  };
  const fecthSearch = (value) => {
    if (value) {
      props.history.push(ROUTER.ADMIN.ROLE.concat(`?name__~=${value}`));
    } else {
      props.history.push(ROUTER.ADMIN.ROLE);
      dispatch(getRole(null));
    }
  };
  const debounceSearch = useCallback(debounce(fecthSearch, 1000), []);
  const onSearch = (e) => {
    debounceSearch(e.target.value);
  };
  // const onSearchStatus = (value) => {
  //   if (value) {
  //     props.history.push(ROUTER.ADMIN.SETTING.concat(`?status__eq=${value}`));
  //   } else {
  //     props.history.push(ROUTER.ADMIN.SETTING);
  //     dispatch(getSetting(null));
  //   }
  // };

  return (
    <>
      <Card style={{ backgroundColor: "#ffffff", borderRadius: "8px" }} title="Danh sách chức vụ">
        <Row gutter={24} style={{ marginBottom: "20px" }}>
          <div className="sm:tw-flex tw-justify-between tw-w-full">
            <div className="sm:tw-flex">
              <Space direction="vertical" className="tw-px-2">
                <Input
                  placeholder="Nhập để tìm kiếm"
                  style={{ width: 200 }}
                  type="search"
                  suffix={<SearchOutlined className="text-gray-400 text-md font-medium" />}
                  onChange={onSearch}
                />
              </Space>
              {/* <Form.Item className="tw-px-2">
                <Select
                  style={{ width: 150 }}
                  showSearch
                  className="select-custom"
                  placeholder="Tìm trạng thái"
                  optionFilterProp="children"
                  onChange={onSearchStatus}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="Inactive">Kích hoạt</Option>
                  <Option value="Active">Chưa kích hoạt</Option>
                </Select>
              </Form.Item> */}
            </div>
            <div className="sm:tw-mr-10">
              <ShowForPermission permission="role:add">
                <Link to={ROUTER.ADMIN.ROLEADD}>
                  <Button
                    style={{
                      borderRadius: ".42rem",
                      border: "#00d084",
                      opacity: 0.7,
                    }}
                    type="primary"
                  >
                    <div className="tw-flex tw-items-center">
                      <PlusCircleTwoTone className="tw-pr-2" /> Thêm mới
                    </div>
                  </Button>
                </Link>
              </ShowForPermission>
            </div>
          </div>
        </Row>
        <Row>
          <Col span={24}>
            <RoleList
              onEdit={onEdit}
              meta={meta}
              dataTable={role}
              onDelete={onDelete}
              onChangePage={onChangePage}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Role;
