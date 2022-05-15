import { unwrapResult } from "@reduxjs/toolkit";
import { Col, Form, Input, notification, Row, Switch } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import FormModal from "../../../../components/componentsAdmin/Modal/FormModal";
import { addPermission, updatePermission } from "./../PermissionSlice";

const PermissionFrom = (props) => {
  const { handleCancel, openModal, dataEdit, type } = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    if (dataEdit !== null) {
      form.setFieldsValue({
        name: dataEdit?.name,
        display_name: dataEdit?.display_name,
      });
    } else {
      form.resetFields();
    }
  }, [dataEdit, form]);
  const onFinish = async (value) => {
    const payload = {
      name: value?.name,
      display_name: value?.display_name,
    };
    if (type === "update" && dataEdit?.id) {
      try {
        const id = dataEdit?.id;
        const resulDispatch = await dispatch(updatePermission({ id, payload }));
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
        notification.success({ message: `Sửa quyền thành công !!!` });
        handleCancel();
      } catch (error) {
        return notification.error({ message: `Sửa quyền thất bại ! ` });
      }
    } else {
      try {
        const resulDispatch = await dispatch(addPermission(payload));
        if (resulDispatch.error) {
          form.setFields([
            resulDispatch.payload.name
              ? {
                  name: "name",
                  errors: [resulDispatch.payload.name],
                }
              : "",
            resulDispatch.payload.description
              ? {
                  name: "display_name",
                  errors: [resulDispatch.payload.display_name],
                }
              : "",
          ]);
        }
        unwrapResult(resulDispatch);
        notification.success({ message: `Thêm quyền thành công !` });
        handleCancel();
      } catch (error) {
        return notification.error({ message: `Thêm quyền thất bại ! ` });
      }
    }
  };
  return (
    <>
      <FormModal
        titleModal={type === "create" ? "Thêm mới" : `Cập nhật`}
        titleForm={"permission"}
        visible={openModal}
        handleCancel={() => {
          handleCancel();
          form.resetFields();
        }}
      >
        <Form layout="vertical" form={form} id="permission" onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={24}>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item
                    label="KeyCode"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập keycode quyền",
                      },
                    ]}
                  >
                    <Input placeholder="Hãy nhập tên keycode" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Mô tả"
                    name="display_name"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập mô tả",
                      },
                    ]}
                  >
                    <Input.TextArea rows="4" />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </FormModal>
    </>
  );
};

export default PermissionFrom;
