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
  Modal,
} from "antd";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ROUTER from "../../../../router/router";
import { deletePermission, getAllPermission, importPermission } from "./../PermissionSlice";
import PermissionList from "./../component/PermissionList";
import PermissionFrom from "./../component/PermissionFrom";
import { Api, ApiFormData } from "./../../../../utils/Api";
import { ApiExport } from "./../../../../utils/Api";
import { API_URL } from "../../../../utils/Config";
import { getUserInfo } from "../../../../utils/localStorage/GetUserInfo";
import { unwrapResult } from "@reduxjs/toolkit";
import { ShowForPermission } from "../../../../components/componentsAdmin/ShowPermission/ShowForPermissionComponent";

const { Option } = Select;
const Permission = (props) => {
  const accessToken = getUserInfo("infoUser").access_token;
  const setting = useSelector((state) => state.Permission.items);
  const meta = useSelector((state) => state.Permission.meta);
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
      dispatch(getAllPermission(JSON.parse(params)));
    } else {
      dispatch(getAllPermission(null));
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
    try {
      const resultAction = await dispatch(deletePermission(e?.id));
      unwrapResult(resultAction);
      notification.success({ message: `Xoá thành công !` });
    } catch (error) {
      notification.error({ message: `${error}` });
    }
  };
  const handleCancel = async () => {
    await setDataModal({
      openModal: false,
      type: "",
      dataEdit: null,
    });

    dispatch(getAllPermission(null));
  };
  const onChangePage = (value) => {
    if (value) {
      props.history.push(ROUTER.ADMIN.PERMISSION.concat(`?page=${value}`));
    } else {
      props.history.push(ROUTER.ADMIN.PERMISSION);
      dispatch(getAllPermission(null));
    }
  };

  const ExportFile = async () => {
    const result = await ApiExport.get("permission-export");
    const url = window.URL.createObjectURL(new Blob([result.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Template-Export.xlsx`);
    document.body.appendChild(link);
    link.click();
  };

  const ImportFile = {
    async onChange(info) {
      if (
        info?.file?.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        Modal.confirm({
          title: `Bạn chắc chắn muốn tải file này lên không ? `,
          okText: "Tải lên",
          cancelText: "Hủy bỏ",
          onOk: async () => {
            try {
              const formData = new FormData();
              formData.append("file", info.file);
              const resulDispatch = await dispatch(importPermission(formData));
              unwrapResult(resulDispatch);
              if (resulDispatch.payload === 1) {
                notification.success({ message: `Import thành công!` });
                dispatch(getAllPermission(null));
              }
            } catch (error) {
              notification.error({ message: `${error}` });
            }
          },
          onCancel: () => {
            dispatch(getAllPermission(null));
          },
        });
      } else {
        message.error("Vui lòng chọn file excel !!!");
      }
    },
  };
  const fecthSearch = (value) => {
    if (value) {
      props.history.push(ROUTER.ADMIN.PERMISSION.concat(`?display_name__~=${value}`));
    } else {
      props.history.push(ROUTER.ADMIN.PERMISSION);
      dispatch(getAllPermission(null));
    }
  };
  const debounceSearch = useCallback(debounce(fecthSearch, 1000), []);
  const onSearch = (e) => {
    debounceSearch(e.target.value);
  };
  return (
    <>
      <Card style={{ backgroundColor: "#ffffff", borderRadius: "8px" }} title="Danh sách quyền">
        <Row gutter={24} style={{ marginBottom: "20px" }}>
          <div className="sm:tw-flex tw-justify-between tw-w-full">
            <div className="sm:tw-flex">
              <Space direction="vertical" className="tw-px-2">
                <Input
                  placeholder="Nhập để tìm kiếm mô tả"
                  style={{ width: 250 }}
                  type="search"
                  suffix={<SearchOutlined className="text-gray-400 text-md font-medium" />}
                  onChange={onSearch}
                />
              </Space>
            </div>
            <div className="sm:tw-mr-10">
              <Upload beforeUpload="false" showUploadList={false} {...ImportFile}>
                <ShowForPermission permission="permission:import">
                  <Button
                    style={{
                      borderRadius: ".42rem",
                      marginRight: "10px",
                    }}
                    type="file"
                  >
                    <div className="tw-flex tw-items-center">
                      <ExportOutlined className="tw-pr-2" /> Import File
                    </div>
                  </Button>
                </ShowForPermission>
              </Upload>
              <ShowForPermission permission="permission:export">
                <Button
                  style={{
                    borderRadius: ".42rem",
                    marginRight: "10px",
                  }}
                  type=""
                  onClick={() => ExportFile()}
                >
                  <div className="tw-flex tw-items-center">
                    <DownloadOutlined className="tw-pr-2" /> Export Template
                  </div>
                </Button>
              </ShowForPermission>

              <ShowForPermission permission="permission:add">
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
          <PermissionFrom
            openModal={dataModal.openModal}
            type={dataModal.type}
            dataEdit={dataModal.dataEdit}
            handleCancel={handleCancel}
          />
        </Row>
        <Row>
          <Col span={24}>
            <PermissionList
              onEdit={showModal}
              meta={meta}
              dataTable={setting}
              onDelete={onDelete}
              onChangePage={onChangePage}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Permission;
