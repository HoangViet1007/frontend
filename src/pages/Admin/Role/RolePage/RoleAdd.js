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
  Checkbox,
  Tooltip,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ROUTER from "../../../../router/router";
import { unwrapResult } from "@reduxjs/toolkit";
import { Link, useHistory } from "react-router-dom";
import { Api } from "./../../../../utils/Api";
import _ from "lodash";
import { addRole } from "./../RoleSlice";
const RoleAdd = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const [form] = Form.useForm();
  const [listPermission, setListPermission] = useState({});
  useEffect(() => {
    const getData = async () => {
      const result = await Api.get("/permission");
      if (result.status === 200) {
        setListPermission(result.data);
      }
    };
    getData();
  }, []);
  const newListPermission = [];
  Object.keys(listPermission).map((key) => {
    let chiuNhe = { name: key, list: listPermission[key] };
    if (listPermission[key]) {
      newListPermission.push(chiuNhe);
    }
  });
  const onFinish = async ({ ...data }) => {
    const a = { ...data };
    const b = [];
    Object.keys(a.permission_ids).map((key) => {
      let c = a.permission_ids[key];
      if (a.permission_ids[key]) {
        b.push(c);
      }
    });
    a.permission_ids = b;
    var arr2 = [];
    for (const element of a.permission_ids) {
      element.forEach((element2) => {
        arr2.push(element2);
      });
    }
    var arr3 = [];
    for (let i = 0; i < arr2.length; i++) {
      if (!arr3.includes(arr2[i])) {
        arr3.push(arr2[i]);
      }
    }
    a.permission_ids = arr3;
    try {
      const resulDispatch = await dispatch(addRole(a));
      if (resulDispatch.error) {
        form.setFields([
          resulDispatch.payload.name
            ? {
                name: "name",
                errors: [resulDispatch.payload.name],
              }
            : "",
          resulDispatch.payload.display_name
            ? {
                name: "display_name",
                errors: [resulDispatch.payload.display_name],
              }
            : "",
        ]);
      }
      unwrapResult(resulDispatch);
      window.location.replace(ROUTER.ADMIN.ROLE);
      notification.success({ message: `Th??m ch???c v??? th??nh c??ng !` });
    } catch (error) {
      notification.error({ message: `Th??m ch???c v??? th???t b???i !` });
    }
  };
  let checkAllFull = {};
  Object.keys(listPermission).map((key) => {
    checkAllFull[key] = listPermission[key].map((item) => item?.id);
  });

  let checkAllFullOff = {};
  Object.keys(listPermission).map((key) => {
    checkAllFullOff[key] = [];
  });
  const onchaneCheckAllFull = (e) => {
    if (e?.target?.checked) {
      form.setFieldsValue({
        permission_ids: e?.target?.value,
      });
    } else {
      form.setFieldsValue({
        permission_ids: checkAllFullOff,
      });
    }
  };
  const onchaneCheckAllColums = (e) => {
    if (e?.target?.checked) {
      let aaa = [];
      e?.target?.value?.list.map((item) => aaa.push(item?.id));
      let abc = {};
      abc[e?.target?.value?.name] = aaa;
      form.setFieldsValue({
        permission_ids: abc,
      });
    } else {
      let acc = {};
      acc[e.target.value.name] = [];
      form.setFieldsValue({
        permission_ids: acc,
      });
    }
  };
  return (
    <>
      <Card
        style={{ backgroundColor: "#ffffff", borderRadius: "8px", marginBottom: "20px" }}
        title="Th??m m???i ch???c v???"
      >
        <Form layout="vertical" form={form} id="addRole" onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={24}>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item
                    className="tw-w-1/3"
                    label="T??n ch???c v???"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "M???i nh???p t??n ch???c v???",
                      },
                    ]}
                  >
                    <Input placeholder="T??n ch???c v???" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    className="tw-w-1/3"
                    label="M?? t???"
                    name="display_name"
                    rules={[
                      {
                        required: true,
                        message: "M???i nh???p m?? t???",
                      },
                    ]}
                  >
                    <Input.TextArea rows="4" />
                  </Form.Item>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col span={4} className="tw-flex tw-justify-center">
                  <h1 className="tw-text-center tw-font-medium tw-text-xl">Ch???c n??ng</h1>
                  <Tooltip title="Ch???n t???t c??? c??c quy???n">
                    <Checkbox
                      className="tw-mt-1 tw-ml-2"
                      value={checkAllFull}
                      onChange={onchaneCheckAllFull}
                    ></Checkbox>
                  </Tooltip>
                </Col>
                <Col span={20}>
                  <h1 className="tw-text-center tw-font-medium tw-text-xl">Danh s??ch quy???n</h1>
                </Col>
              </Row>
              {newListPermission.map((item) => {
                return (
                  <>
                    <Row gutter={24} className="tw-border-2">
                      <Col span={4} className="tw-border-r-2">
                        <h1 className="tw-capitalize tw-pt-5 tw-pl-3">{item.name}</h1>
                        <Checkbox value={item} onChange={onchaneCheckAllColums}>
                          Ch???n t???t c???
                        </Checkbox>
                      </Col>
                      <Col span={20}>
                        <Form.Item
                          name={["permission_ids", `${item.name}`]}
                          className="tw-capitalize tw-pt-5 tw-pl-3"
                        >
                          <Checkbox.Group>
                            <Row>
                              {item.list.map((data) => {
                                return (
                                  <>
                                    <Col span={4}>
                                      <Checkbox value={data?.id}>
                                        {data?.name.split(":")[1]}
                                      </Checkbox>
                                    </Col>
                                  </>
                                );
                              })}
                            </Row>
                          </Checkbox.Group>
                        </Form.Item>
                      </Col>
                    </Row>
                  </>
                );
              })}
            </Col>
            <div className="tw-text-center tw-flex-auto tw-mt-8">
              <Form.Item>
                <Button type="primary" className="" htmlType="submit">
                  Th??m m???i
                </Button>
                <Button
                  className="ml-4"
                  type="primary"
                  danger
                  onClick={() => history.push(ROUTER.ADMIN.ROLE)}
                >
                  Tho??t
                </Button>
              </Form.Item>
            </div>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default RoleAdd;
