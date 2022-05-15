 

import { UploadOutlined } from "@ant-design/icons";
import Editor from "ckeditor5-custom-build/build/ckeditor";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  Button,
  Card,
  Col,
  Form, Input,
  notification,
  Row,
  Select,
  Upload
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { addPlan } from "../CoursesPlanSlice";
const CoursesPlanAdd = () => {
  const { Option } = Select;

  const { idStage } = useParams();

  const [description, setDescription] = useState("");
  const [stageId, setStageId] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();
  useEffect(() => {
    setStageId(idStage);
  }, idStage);

  const render = () => {
    const tailLayout = {
      wrapperCol: {
        offset: 11,
        span: 6,
      },
    };

    const onFinish = async (value) => {
      try {
        const data = new FormData();
        data.append("name", value.name);
        data.append("descreption", description);
        data.append("content", content);
        data.append("video_link", value.video_link.file.originFileObj);
        data.append("status", value.status);
        data.append("stage_id", stageId);
        const resulDispatch = await dispatch(addPlan(data));
        unwrapResult(resulDispatch);
        history.goBack();
        notification.success({ message: `Thêm thành công !!!` });
      } catch (error) {
        return notification.error({ message: `Đã có lỗi xảy ra ` });
      }
    };

    return (
      <>
        <Form layout="vertical" id="courses_plan" onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={24}>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="Tên buổi học"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập tên buổi học",
                      },
                    ]}
                  >
                    <Input placeholder="Tên buổi học" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="video_link"
                    label="video_link"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Mời tải lên video",
                    //   },
                    // ]}
                  >
                    <Upload>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="stage_id" name="stage_id">
                    <Input defaultValue={idStage} disabled />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="status"
                    name="status"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập status",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      className="select-custom"
                      placeholder="Mời nhập status"
                    >
                      <Option value="Active">Active</Option>
                      <Option value="Inactive">Inactive</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Mô tả"
                    name="descreption" // Chờ backend sửa chính tả
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập mô tả",
                      },
                    ]}
                  >
                    <CKEditor
                      editor={Editor}
                      data=""
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setDescription(data);
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Nội dung"
                    name="content"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập nội dung",
                      },
                    ]}
                  >
                    <CKEditor
                      editor={Editor}
                      data=""
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setContent(data);
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                      Thêm mới
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </>
    );
  };

  return (
    <>
      {/* <Button type="primary" className="mb-6 rounded"> */}
      {/* <Link to={() =>}>Quay lại</Link> */}
      <Button type="primary" className="mb-5" onClick={() => history.goBack()}>
        Quay lại
      </Button>
      {/* </Button> */}
      <Card style={{ backgroundColor: "#ffffff", borderRadius: "8px" }}>
        <Row>
          <Col span={24}></Col>
          <Row style={{ marginLeft: "1%", marginTop: "25px" }}>{render()}</Row>
        </Row>
      </Card>
    </>
  );
};

export default CoursesPlanAdd;
