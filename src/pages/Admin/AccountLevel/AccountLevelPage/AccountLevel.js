import { PlusCircleTwoTone, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Select, Space, notification } from "antd";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ROUTER from "../../../../router/router";
import { deleteAccountLevel, getAccountLevel } from "./../AccountLevelSlice";
import AccountLevelList from "./../components/AccountLevelList";
import AccountLevelForm from "./../components/AccountLevelForm";
import { unwrapResult } from "@reduxjs/toolkit";
import { ShowForPermission } from "../../../../components/componentsAdmin/ShowPermission/ShowForPermissionComponent";

const { Option } = Select;
const AccountLevel = (props) => {
  const accountLevel = useSelector((state) => state.AccountLevel.items);
  const meta = useSelector((state) => state.AccountLevel.meta);
  const dispatch = useDispatch();
  const [dataModal, setDataModal] = useState({
    openModal: false,
    type: "",
    dataEdit: {},
  });
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
    const { search } = props.history.location;
    let params;
    const filterOptions = search.split("?")[1];
    if (filterOptions !== undefined) {
      params = `{"${decodeURI(filterOptions)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')}"}`;
      dispatch(getAccountLevel(JSON.parse(params)));
    } else {
      dispatch(getAccountLevel(null));
    }
  }, [dispatch, props.history.location]);

  const onDelete = async (e) => {
    try {
      const resultAction = await dispatch(deleteAccountLevel(e?.id));
      unwrapResult(resultAction);
      notification.success({ message: `Xo?? th??nh c??ng !` });
    } catch (error) {
      notification.error({ message: `${error}` });
    }
  };
  const onChangePage = (value) => {
    if (value) {
      props.history.push(ROUTER.ADMIN.ACCOUNTLEVEL.concat(`?page=${value}`));
    } else {
      props.history.push(ROUTER.ADMIN.ACCOUNTLEVEL);
      dispatch(getAccountLevel(null));
    }
  };
  const handleCancel = async () => {
    await setDataModal({
      openModal: false,
      type: "",
      dataEdit: null,
    });
    dispatch(getAccountLevel(null));
  };
  const fecthSearch = (value) => {
    if (value) {
      props.history.push(ROUTER.ADMIN.ACCOUNTLEVEL.concat(`?name__~=${value}`));
    } else {
      props.history.push(ROUTER.ADMIN.ACCOUNTLEVEL);
      dispatch(getAccountLevel(null));
    }
  };
  const debounceSearch = useCallback(debounce(fecthSearch, 1000), []);
  const onSearch = (e) => {
    debounceSearch(e.target.value);
  };

  const onSearchStatus = (value) => {
    if (value) {
      props.history.push(ROUTER.ADMIN.ACCOUNTLEVEL.concat(`?status__eq=${value}`));
    } else {
      props.history.push(ROUTER.ADMIN.ACCOUNTLEVEL);
      dispatch(getAccountLevel(null));
    }
  };
  return (
    <>
      <Card style={{ backgroundColor: "#ffffff", borderRadius: "8px" }} title="Danh s??ch c???p ?????">
        <Row gutter={24} style={{ marginBottom: "20px" }}>
          <div className="sm:tw-flex tw-justify-between tw-w-full">
            <div className="sm:tw-flex">
              <Space direction="vertical" className="tw-px-2">
                <Input
                  placeholder="Nh???p ????? t??m ki???m"
                  style={{ width: 200 }}
                  type="search"
                  suffix={<SearchOutlined className="text-gray-400 text-md font-medium" />}
                  onChange={onSearch}
                />
              </Space>
              <Form.Item className="tw-px-2">
                <Select
                  style={{ width: 150 }}
                  showSearch
                  className="select-custom"
                  placeholder="T??m tr???ng th??i"
                  optionFilterProp="children"
                  onChange={onSearchStatus}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="Inactive">K??ch ho???t</Option>
                  <Option value="Active">Ch??a k??ch ho???t</Option>
                </Select>
              </Form.Item>
            </div>
            <div className="sm:tw-mr-10">
              <ShowForPermission permission="account-level:add">
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
                    <PlusCircleTwoTone className="tw-pr-2" /> Th??m m???i
                  </div>
                </Button>
              </ShowForPermission>
            </div>
          </div>
          <AccountLevelForm
            openModal={dataModal.openModal}
            type={dataModal.type}
            dataEdit={dataModal.dataEdit}
            handleCancel={handleCancel}
          />
        </Row>
        <Row>
          <Col span={24}>
            <AccountLevelList
              onEdit={showModal}
              meta={meta}
              dataTable={accountLevel}
              onDelete={onDelete}
              onChangePage={onChangePage}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default AccountLevel;
