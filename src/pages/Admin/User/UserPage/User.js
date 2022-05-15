import { PlusCircleTwoTone, SearchOutlined } from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Card, Col, Form, Input, notification, Row, Select, Space, Spin } from "antd";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ROUTER from "../../../../router/router";
import { deleteUser, getUser, removeFilters, setFilters } from "../UserAdminSlice";
import UserForm from "./../componenst/UserForm";
import UserList from "./../componenst/UserList";
import queryString from "query-string";
import { Api } from "./../../../../utils/Api";
import { ShowForPermission } from "./../../../../components/componentsAdmin/ShowPermission/ShowForPermissionComponent";

const { Option } = Select;
const User = (props) => {
  const history = useHistory();
  const userList = useSelector((state) => state.UserAdmin.items);
  const loading = useSelector((state) => state.UserAdmin.loading);
  const meta = useSelector((state) => state.UserAdmin.meta);
  const filters = useSelector((state) => state.UserAdmin.filters);
  const [roleName, setRoleName] = useState([]);
  const [listAccountLevel, setListAccountLevel] = useState([]);
  const dispatch = useDispatch();
  const search = useLocation().search;
  const [form] = Form.useForm();
  const [dataModal, setDataModal] = useState({
    openModal: false,
    type: "",
    dataEdit: {},
  });
  const getListRole = async () => {
    const { data } = await Api.get("role");
    setRoleName(data.data);
  };
  const getListAccountLevel = async () => {
    const { data } = await Api.get("account-level-select-option");
    setListAccountLevel(data);
  };
  const showModal = async (type, item) => {
    if (type === "update") {
      setDataModal({
        openModal: true,
        type: type,
        dataEdit: type === "update" ? item : {},
      });
    } else {
      setDataModal({
        openModal: true,
        type: type,
        dataEdit: null,
      });
    }
  };
  useEffect(() => {
    if (filters) {
      form.setFieldsValue({
        searchName: filters["users__name__~"],
        searchPhone: filters["phone__eq"],
        locChucVu: filters["roles__id__eq"],
        locCapDo: filters["account_levels__id__eq"],
      });
    }
  }, [filters]);
  useEffect(() => {
    if (search) {
      dispatch(setFilters(queryString.parse(search)));
    } else {
      const aa = dispatch(removeFilters());
    }
    getListRole();
    getListAccountLevel();
  }, []);
  useEffect(() => {
    dispatch(getUser(queryString.parse(search)));
  }, [search]);
  useEffect(() => {
    history.push(
      `${ROUTER.ADMIN.USER}?${queryString.stringify(filters, {
        skipEmptyString: true,
      })}`
    );
  }, [filters]);

  const onDelete = async (e) => {
    try {
      const id = e.id;
      const resultAction = await dispatch(deleteUser(id));
      unwrapResult(resultAction);
      notification.success({ message: `Xoá tài khoản thành công !` });
    } catch (error) {
      notification.error({ message: `${error}` });
    }
  };
  const onChangePage = (value) => {
    if (value) {
      props.history.push(ROUTER.ADMIN.USER.concat(`?page=${value}`));
    } else {
      props.history.push(ROUTER.ADMIN.USER);
      dispatch(getUser(null));
    }
  };
  const handleCancel = async () => {
    await setDataModal({
      openModal: false,
      type: "",
      dataEdit: null,
    });
    dispatch(getUser(null));
  };
  //search
  const fecthSearchName = (value) => {
    if (value) {
      dispatch(setFilters({ "users__name__~": value }));
    } else {
      dispatch(setFilters({ "users__name__~": "" }));
    }
  };
  const debounceSearchName = useCallback(debounce(fecthSearchName, 1000), []);
  const onSearchName = (e) => {
    debounceSearchName(e.target.value);
  };




  const fecthSearchEmail = (value) => {
    if (value) {
      dispatch(setFilters({ "users__email__~": value }));
    } else {
      dispatch(setFilters({ "users__email__~": "" }));
    }
  };
  const debounceSearchEmail = useCallback(debounce(fecthSearchEmail, 1000), []);
  const onSearchEmail = (e) => {
    debounceSearchEmail(e.target.value);
  };

  const fecthSearchPhone = (value) => {
    if (value) {
      dispatch(setFilters({ phone__eq: value }));
    } else {
      dispatch(setFilters({ phone__eq: "" }));
    }
  };
  const debounceSearchPhone = useCallback(debounce(fecthSearchPhone, 1000), []);
  const onSearchPhone = (e) => {
    debounceSearchPhone(e.target.value);
  };

  const onSearchRole = (value) => {
    dispatch(setFilters({ roles__id__eq: value }));
  };
  const onSearchAccountLevel = (value) => {
    dispatch(setFilters({ account_levels__id__eq: value }));
  };
  const onNextPage = (id) => {
    props.history.push(ROUTER.ADMIN.USER_SPECIALIZEDETAILPT.concat(`/${id}`));
  };
  return (
    <>
      <Card style={{ backgroundColor: "#ffffff", borderRadius: "8px" }} title="Danh sách Tài khoản">
        <Spin spinning={loading}>
          <Row gutter={24} style={{ marginBottom: "20px" }}>
            <div className="sm:tw-flex tw-justify-between tw-w-full">
              <Form form={form}>
                <div className="sm:tw-flex tw-flex-wrap">
                  <Space direction="vertical" className="tw-px-2">
                    <Form.Item name="searchName">
                      <Input
                        placeholder="Tìm kiếm họ và tên"
                        style={{ width: 200 }}
                        type="search"
                        allowClear
                        suffix={<SearchOutlined className="text-gray-400 text-md font-medium" />}
                        onChange={onSearchName}
                      />
                    </Form.Item>
                  </Space>
                  <Space direction="vertical" className="tw-px-2">
                    <Form.Item name="searchEmail">
                      <Input
                        placeholder="Tìm kiếm email"
                        style={{ width: 200 }}
                        type="search"
                        allowClear
                        suffix={<SearchOutlined className="text-gray-400 text-md font-medium" />}
                        onChange={onSearchEmail}
                      />
                    </Form.Item>
                  </Space>
                  <Space direction="vertical" className="tw-px-2">
                    <Form.Item name="searchPhone">
                      <Input
                        placeholder="Tìm kiếm theo SĐT"
                        style={{ width: 200 }}
                        type="search"
                        allowClear
                        suffix={<SearchOutlined className="text-gray-400 text-md font-medium" />}
                        onChange={onSearchPhone}
                      />
                    </Form.Item>
                  </Space>
                  <Form.Item className="tw-px-2" name="locChucVu">
                    <Select
                      style={{ width: 200 }}
                      showSearch
                      allowClear
                      className="select-custom"
                      placeholder="Lọc theo chức vụ"
                      optionFilterProp="children"
                      onChange={onSearchRole}
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {roleName &&
                        roleName.map((item) => {
                          return (
                            <>
                              <Option value={item?.id}>{item?.name}</Option>
                            </>
                          );
                        })}
                    </Select>
                  </Form.Item>
                  <Form.Item className="tw-px-2" name="locCapDo">
                    <Select
                      style={{ width: 200 }}
                      showSearch
                      allowClear
                      className="select-custom"
                      placeholder="Lọc theo cấp độ"
                      optionFilterProp="children"
                      onChange={onSearchAccountLevel}
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {listAccountLevel &&
                        listAccountLevel.map((item) => {
                          return (
                            <>
                              <Option value={item?.id}>{item?.name}</Option>
                            </>
                          );
                        })}
                    </Select>
                  </Form.Item>
                </div>
              </Form>

              <div className="sm:tw-mr-10">
                <ShowForPermission permission="user:add">
                  <Button
                    style={{
                      borderRadius: ".42rem",
                      border: "#00d084",
                      opacity: 0.7,
                    }}
                    type="primary"
                    onClick={() => showModal("create", null)}
                  >
                    <div className="tw-flex tw-items-center">
                      <PlusCircleTwoTone className="tw-pr-2" /> Thêm mới
                    </div>
                  </Button>
                </ShowForPermission>
              </div>
            </div>
            <UserForm
              openModal={dataModal.openModal}
              type={dataModal.type}
              dataEdit={dataModal.dataEdit}
              handleCancel={handleCancel}
            />
          </Row>
          <Row>
            <Col span={24}>
              {/* <ShowForPermission permission="user:list"> */}
              <UserList
                onEdit={showModal}
                meta={meta}
                dataTable={userList}
                onDelete={onDelete}
                onChangePage={onChangePage}
                onNextPage={onNextPage}
              />
              {/* </ShowForPermission> */}
            </Col>
          </Row>
        </Spin>
      </Card>
    </>
  );
};

export default User;
