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
  Spin,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  editStage,
  getStageById,
} from "../../../../pages/PT/Stages/StageSlice";
import ROUTER from "../../../../router/router";
const StageEdit = () => {
  const dispatch = useDispatch();
  const { loading, item: stage } = useSelector((state) => state.Stages);
  const [form] = Form.useForm();
  const history = useHistory();
  const [dataCKEditor, setDataCKEditor] = useState("");
  const { id, idStage } = useParams();
  const style = { padding: "0 8px" };
  const handleChangeCKEditor = (event, editor) => {
    const data = editor.getData();
    setDataCKEditor(data);
  };

  useEffect(() => {
    dispatch(getStageById(idStage));
  }, []);
  useEffect(() => {
    setDataCKEditor(stage.content);
    form.setFieldsValue({
      name: stage.name,
      short_content: stage.short_content,
      content: stage.content,
      status: stage.status,
    });
  }, [stage, form]);
  const onFinish = async ({ content, ...data }) => {
    const newData = {
      ...data,
      content: dataCKEditor,
      course_id: id,
    };
    try {
      const resulDispatch = await dispatch(editStage({ idStage, newData }));
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
      notification.success({ message: `Cập nhật giai đoạn thành công` });
      history.push(`${ROUTER.PT.STAGE}/${id}/giai-doan`);
    } catch (error) {
      notification.error({ message: `Cập nhật giai đoạn thất bại` });
    }
  };
  return (
    <Card style={{ width: "100%", height: "100%" }}>
      <Spin spinning={loading}>
        <Row>
          <Col span={24}>
            <h3 className="uppercase font-medium pb-5 text-lg px-2">
              Cập nhật giai đoạn :{" "}
              <span className="text-blue-400">{stage.name}</span>
            </h3>
          </Col>
        </Row>
        {stage && (
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
                  <Select size="large">
                    <Select.Option value="Inactive">
                      Chưa kích hoạt
                    </Select.Option>
                    <Select.Option value="Active">Kích hoạt</Select.Option>
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
                    data={stage?.content}
                    editor={Editor}
                    onChange={handleChangeCKEditor}
                  ></CKEditor>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span="24" style={style}>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={loading}
                  loading={loading}
                  size="large"
                >
                  Cập nhật
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
        )}
        {stage?.course?.status === "Happening" ? (
          <p className="tw-text-red-400 tw-my-4">
            Lưu ý: Để khóa học được hoạt động, sau khi chỉnh sửa giai đoạn hãy
            gửi yêu cầu xét duyệt khóa học cho quản trị viên.
          </p>
        ) : (
          ""
        )}
      </Spin>
    </Card>
  );
};

export default StageEdit;
