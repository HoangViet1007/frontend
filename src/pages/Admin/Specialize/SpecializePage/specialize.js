import { PlusCircleTwoTone, SearchOutlined } from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Card, Col, Form, Input, Row, Select, Space, notification } from "antd";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowForPermission } from "../../../../components/componentsAdmin/ShowPermission/ShowForPermissionComponent";
import ROUTER from "../../../../router/router";
import SpecializeForm from "../components/SpecializeForm";
import SpecializeList from "../components/SpecializeList";
import { deleteSpecialize, getSpecialize } from "../SpecializeSlice";
const { Option } = Select;
const Specialize = (props) => {
  const specialize = useSelector((state) => state.specialize.items);
  const meta = useSelector((state) => state.specialize.meta);
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
      dispatch(getSpecialize(JSON.parse(params)));
    } else {
      dispatch(getSpecialize(null));
    }
  }, [dispatch, props.history.location]);

  const onDelete = async (e) => {
    try {
      const resultAction = await dispatch(deleteSpecialize(e?.id));
      unwrapResult(resultAction);
      notification.success({ message: `Xoá thành công !` });
    } catch (error) {
      notification.error({ message: `${error}` });
    }
  };
  const onChangePage = (value) => {
    if (value) {
      props.history.push(ROUTER.ADMIN.SPECIALIZE.concat(`?page=${value}`));
    } else {
      props.history.push(ROUTER.ADMIN.SPECIALIZE);
      dispatch(getSpecialize(null));
    }
  };
  const handleCancel = async () => {
    await setDataModal({
      openModal: false,
      type: "",
      dataEdit: null,
    });
    dispatch(getSpecialize(null));
  };

  const fecthSearch = (value) => {
    if (value) {
      props.history.push(ROUTER.ADMIN.SPECIALIZE.concat(`?name__~=${value}`));
    } else {
      props.history.push(ROUTER.ADMIN.SPECIALIZE);
      dispatch(getSpecialize(null));
    }
  };
  const debounceSearch = useCallback(debounce(fecthSearch, 1000), []);
  const onSearch = (e) => {
    debounceSearch(e.target.value);
  };
  const onSearchStatus = (value) => {
    if (value) {
      props.history.push(ROUTER.ADMIN.SPECIALIZE.concat(`?status__eq=${value}`));
    } else {
      props.history.push(ROUTER.ADMIN.SPECIALIZE);
      dispatch(getSpecialize(null));
    }
  };
  return (
    <>
      <Card
        style={{ backgroundColor: "#ffffff", borderRadius: "8px" }}
        title="Danh sách chuyên môn website"
      >
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
              <Form.Item className="tw-px-2">
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
              </Form.Item>
            </div>
            <div className="sm:tw-mr-10">
              <ShowForPermission permission="specialize:add">
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

          <SpecializeForm
            openModal={dataModal.openModal}
            type={dataModal.type}
            dataEdit={dataModal.dataEdit}
            handleCancel={handleCancel}
          />
        </Row>
        <Row>
          <Col span={24}>
            <SpecializeList
              onEdit={showModal}
              meta={meta}
              dataTable={specialize}
              onDelete={onDelete}
              onChangePage={onChangePage}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Specialize;
