import { PlusCircleTwoTone, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Select, Space, Tabs } from "antd";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowForPermission } from "../../../../components/componentsAdmin/ShowPermission/ShowForPermissionComponent";
import ROUTER from "../../../../router/router";
import SettingForm from "../component/SettingForm";
import SettingListImg from "../component/SettingListImg";
import { deleteSetting, getSetting } from "../SettingSlice";
import SettingListText from "./../component/SettingListText";

const { Option } = Select;
const { TabPane } = Tabs;
const Setting = (props) => {
  const setting = useSelector((state) => state.setting.items);
  const listDataImg = setting?.filter(
    (item) => item?.config_value?.slice(0, 8) === "https://"
  );
  const listDataText = setting?.filter(
    (item) => item?.config_value?.slice(0, 8) !== "https://"
  );
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
      dispatch(getSetting(JSON.parse(params)));
    } else {
      dispatch(getSetting(null));
    }
  }, [dispatch, props.history.location]);

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
  const onDelete = async (e) => {
    dispatch(deleteSetting(e?.id));
  };
  const handleCancel = async () => {
    await setDataModal({
      openModal: false,
      type: "",
      dataEdit: null,
    });

    dispatch(getSetting(null));
  };
  const onChangePage = (value) => {
    if (value) {
      props.history.push(ROUTER.ADMIN.SETTING.concat(`?page=${value}`));
    } else {
      props.history.push(ROUTER.ADMIN.SETTING);
      dispatch(getSetting(null));
    }
  };
  const fecthSearch = (value) => {
    if (value) {
      props.history.push(
        ROUTER.ADMIN.SETTING.concat(`?config_key__~=${value}`)
      );
    } else {
      props.history.push(ROUTER.ADMIN.SETTING);
      dispatch(getSetting(null));
    }
  };
  const debounceSearch = useCallback(debounce(fecthSearch, 1000), []);
  const onSearch = (e) => {
    debounceSearch(e.target.value);
  };
  const onSearchStatus = (value) => {
    if (value) {
      props.history.push(ROUTER.ADMIN.SETTING.concat(`?status__eq=${value}`));
    } else {
      props.history.push(ROUTER.ADMIN.SETTING);
      dispatch(getSetting(null));
    }
  };
  return (
    <>
      <Card
        style={{ backgroundColor: "#ffffff", borderRadius: "8px" }}
        title="Danh sách cấu hình"
      >
        <Row gutter={24} style={{ marginBottom: "20px" }}>
          <div className="sm:tw-flex tw-justify-between tw-w-full">
            <div className="sm:tw-flex">
              <Space direction="vertical" className="tw-px-2">
                <Input
                  placeholder="Nhập để tìm kiếm"
                  style={{ width: 200 }}
                  type="search"
                  suffix={
                    <SearchOutlined className="text-gray-400 text-md font-medium" />
                  }
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
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="Inactive">Chưa kích hoạt</Option>
                  <Option value="Active">Kích hoạt</Option>
                </Select>
              </Form.Item>
            </div>
            <div className="sm:tw-mr-10">
              <ShowForPermission permission="setting:add">
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
          <SettingForm
            openModal={dataModal.openModal}
            type={dataModal.type}
            dataEdit={dataModal.dataEdit}
            handleCancel={handleCancel}
          />
        </Row>
        <Row>
          <Col span={24}>
            {/* <SettingList
              onEdit={showModal}
              meta={meta}
              dataTable={setting}
              onDelete={onDelete}
              onChangePage={onChangePage}
            /> */}
            <Tabs defaultActiveKey="1" centered>
              <TabPane tab="Thông tin" key="1">
                <SettingListText
                  onEdit={showModal}
                  dataTable={listDataText}
                  pagination={{ pageSize: 10 }}
                  onDelete={onDelete}
                />
              </TabPane>
              <TabPane tab="Ảnh webite" key="2">
                <SettingListImg
                  onEdit={showModal}
                  dataTable={listDataImg}
                  pagination={{ pageSize: 10 }}
                  onDelete={onDelete}
                />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Setting;
