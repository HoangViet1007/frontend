import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Card, Form, Input, notification } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ChangePassword } from "../ChangePasswordSlice";

const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = async (data) => {
    try {
      const resultAction = await dispatch(ChangePassword(data));
      unwrapResult(resultAction);
      notification.success({ message: "Cập nhật tài khoản thành công" });
      history.push("/pt");
    } catch (error) {
      notification.error({ message: error });
    }
  };

  return (
    <Card title="Thay đổi mật khẩu" className="tw-bg-gray-100">
      <Form
        labelCol={{
          span: 8,
          className: "tw-text-left",
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="old_password"
          label="Mật khẩu cũ"
          rules={[{ required: true, message: "Nhập mật khẩu cũ" }]}
        >
          <Input.Password size="large" />
        </Form.Item>
        <Form.Item
          name="new_password"
          label="Mật khẩu mới"
          rules={[{ required: true, message: "Hãy nhập mật khẩu mới" }]}
        >
          <Input.Password size="large" />
        </Form.Item>
        <Form.Item
          name="cf_password"
          label="Nhập lại mật khẩu mới"
          rules={[{ required: true, message: "Hãy nhập lại mật khẩu mới" }]}
        >
          <Input.Password size="large" />
        </Form.Item>
        <div className="tw-flex tw-justify-end">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đổi mật khẩu
            </Button>
            <Button
              className="ml-4"
              type="primary"
              danger
              onClick={() => history.goBack()}
            >
              Quay lại
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Card>
  );
};

export default ChangePasswordPage;
