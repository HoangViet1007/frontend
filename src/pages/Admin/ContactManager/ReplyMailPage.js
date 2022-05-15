import { CKEditor } from "@ckeditor/ckeditor5-react";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Card, Form, Input, Select } from "antd";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import React, { notification, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { EDITORCONFIGURATION } from "../../../utils/Config";
import { sendMail } from "./ContactSlice";
import { useHistory } from "react-router-dom";
import ROUTER from "../../../router/router";
const ReplyMailPage = (props) => {
  const history = useHistory();
  const { Option } = Select;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [description, setDescription] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      email: props.location.state.email,
      phone: props.location.state.phone,
      name: props.location.state.name,
      title: props.location.state.title,
      created_at: props.location.state.created_at,
    });
  }, []);
  const onFinish = (values) => {
    values.description = description;
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
    }, 3500);
    try {
      dispatch(sendMail(values));
      setTimeout(() => {
        history.push(ROUTER.ADMIN.CONTACT);
      }, 3500);
    } catch (error) {
      notification.error({ message: error });
    }
  };

  return (
    <>
      <Card
        title={
          <>
            <span className="tw-text-lg">Trả lời email</span>
          </>
        }
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div className="tw-">
            <Form.Item name="name" label="Tên">
              <Input readOnly />
            </Form.Item>
            <Form.Item name="email" label="Địa chỉ email">
              <Input readOnly />
            </Form.Item>
            <Form.Item name="phone" label="Số điện thoại">
              <Input readOnly />
            </Form.Item>
          </div>
          <Form.Item name="title" label="Tiêu đề">
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: "Mời nhập nội dung",
              },
            ]}
            label="Nội dung"
          >
            <CKEditor
              editor={Editor}
              config={EDITORCONFIGURATION}
              data=""
              onChange={(event, editor) => {
                const data = editor.getData();
                setDescription(data);
              }}
            />
          </Form.Item>

          <Form.Item>
            <div className="tw-flex">
              <div>
                <Button
                  loading={confirmLoading}
                  type="primary"
                  htmlType="submit"
                >
                  Gửi mail
                </Button>
              </div>
              <div className="tw-px-1">
                <Button type="primary" danger onClick={() => history.goBack()}>
                  Hủy
                </Button>
              </div>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default ReplyMailPage;
