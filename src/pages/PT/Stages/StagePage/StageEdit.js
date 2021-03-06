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
      notification.success({ message: `C???p nh???t giai ??o???n th??nh c??ng` });
      history.push(`${ROUTER.PT.STAGE}/${id}/giai-doan`);
    } catch (error) {
      notification.error({ message: `C???p nh???t giai ??o???n th???t b???i` });
    }
  };
  return (
    <Card style={{ width: "100%", height: "100%" }}>
      <Spin spinning={loading}>
        <Row>
          <Col span={24}>
            <h3 className="uppercase font-medium pb-5 text-lg px-2">
              C???p nh???t giai ??o???n :{" "}
              <span className="text-blue-400">{stage.name}</span>
            </h3>
          </Col>
        </Row>
        {stage && (
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Row>
              <Col span={12} style={style}>
                <Form.Item
                  label="T??n giai ??o???n"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "H??y nh???p t??n giai ??o???n",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12} style={style}>
                <Form.Item
                  label="Tr???ng th??i "
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: "H??y nh???p tr???ng th??i",
                    },
                  ]}
                >
                  <Select size="large">
                    <Select.Option value="Inactive">
                      Ch??a k??ch ho???t
                    </Select.Option>
                    <Select.Option value="Active">K??ch ho???t</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={style}>
                <Form.Item
                  label="Ti??u ?????"
                  name="short_content"
                  rules={[
                    {
                      required: true,
                      message: "H??y nh???p ti??u ?????",
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
                  label="N???i dung"
                  name="content"
                  rules={[
                    {
                      required: true,
                      message: "H??y nh???p n???i dung",
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
                  C???p nh???t
                </Button>
                <Button
                  size="large"
                  className="ml-4"
                  type="primary"
                  danger
                  onClick={() => history.goBack()}
                >
                  Tho??t
                </Button>
              </Col>
            </Row>
          </Form>
        )}
        {stage?.course?.status === "Happening" ? (
          <p className="tw-text-red-400 tw-my-4">
            L??u ??: ????? kh??a h???c ???????c ho???t ?????ng, sau khi ch???nh s???a giai ??o???n h??y
            g???i y??u c???u x??t duy???t kh??a h???c cho qu???n tr??? vi??n.
          </p>
        ) : (
          ""
        )}
      </Spin>
    </Card>
  );
};

export default StageEdit;
