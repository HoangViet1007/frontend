import Editor from "ckeditor5-custom-build/build/ckeditor";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  notification,
  Row,
  Select,
} from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ROUTER from "../../../../router/router";
import { addStage } from "../StageSlice";
import { EDITORCONFIGURATION } from "../../../../utils/Config";
const Stages = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.Stages);
  const style = { padding: "0 8px" };
  const { id } = useParams();
  const [dataCKEditor, setDataCKEditor] = useState("");
  const [form] = Form.useForm();

  const handleChangeCKEditor = (event, editor) => {
    const data = editor.getData();
    setDataCKEditor(data);
  };

  const { Option } = Select;
  const onFinish = async ({ content, ...data }) => {
    const newData = {
      ...data,
      content: dataCKEditor,
      course_id: id,
    };

    try {
      const resulDispatch = await dispatch(addStage(newData));
      if (resulDispatch.error) {
        form.setFields([
          resulDispatch.payload.name
            ? {
                name: "name",
                errors: [resulDispatch.payload.name],
              }
            : "",
          resulDispatch.payload.status
            ? {
                name: "status",
                errors: [resulDispatch.payload.status],
              }
            : "",
          resulDispatch.payload.short_content
            ? {
                name: "short_content",
                errors: [resulDispatch.payload.short_content],
              }
            : "",
          resulDispatch.payload.content
            ? {
                name: "content",
                errors: [resulDispatch.payload.content],
              }
            : "",
        ]);
      }
      unwrapResult(resulDispatch);
      notification.success({ message: `Thêm giai đoạn thành công` });

      history.push(`${ROUTER.PT.STAGE}/${id}/giai-doan`);
    } catch (error) {
      notification.error({ message: `Thêm giai đoạn thất bại` });
    }
  };

  return (
    <Card style={{ width: "100%", height: "100%" }}>
      <Row>
        <Col span={24}>
          <h3 className="uppercase font-medium pb-5 text-lg px-2">
            Thêm mới giai đoạn
          </h3>
        </Col>
      </Row>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row>
          <Col span={12} style={style}>
            <Form.Item
              label="Tên giai đoạn"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập tên giai đoạn",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col span={12} style={style}>
            <Form.Item
              label="Trạng thái "
              name="status"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập trạng thái",
                },
              ]}
            >
              <Select defaultValue="Lựa chọn trạng thái" size="large">
                <Option value="Inactive">Chưa kích hoạt</Option>
                <Option value="Active">Kích hoạt</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={style}>
            <Form.Item
              label="Tiêu đề"
              name="short_content"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập tiêu đề",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={style}>
            <Form.Item
              label="Nội dung"
              name="content"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập nội dung",
                },
              ]}
            >
              <CKEditor
                editor={Editor}
                config={EDITORCONFIGURATION}
                onChange={handleChangeCKEditor}
              ></CKEditor>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span="24" style={style}>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              disabled={loading}
              loading={loading}
            >
              Thêm giai đoạn
            </Button>
            <Button
              size="large"
              className="ml-4"
              type="primary"
              danger
              onClick={() => history.goBack()}
            >
              Thoát
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default Stages;
