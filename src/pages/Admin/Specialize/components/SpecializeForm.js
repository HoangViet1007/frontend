import { unwrapResult } from "@reduxjs/toolkit";
import { Col, Form, Input, notification, Row, Switch } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import FormModal from "../../../../components/componentsAdmin/Modal/FormModal";
import { addSpecialize, updateSpecialize } from "../SpecializeSlice";

const SpecializeForm = (props) => {
  const { handleCancel, openModal, dataEdit, type } = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    if (dataEdit !== null) {
      form.setFieldsValue({
        name: dataEdit?.name,
        status: dataEdit?.status === "Active" ? true : false,
        description: dataEdit?.description,
      });
    } else {
      form.resetFields();
    }
  }, [dataEdit, form]);
  const onFinish = async (value) => {
    const payload = {
      name: value?.name,
      status: value?.status === true ? "Active" : "Inactive",
      description: value?.description,
    };
    if (type === "update" && dataEdit?.id) {
      try {
        const id = dataEdit?.id;
        const resulDispatch = await dispatch(updateSpecialize({ id, payload }));
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
                  name: "description",
                  errors: [resulDispatch.payload.description],
                }
              : "",
          ]);
        }
        unwrapResult(resulDispatch);
        notification.success({ message: `Sửa chuyên môn thành công !!!` });
        handleCancel();
        form.resetFields();
      } catch (error) {
        return notification.error({ message: `Sửa chuyên môn thất bại ! ` });
      }
    } else {
      try {
        const resulDispatch = await dispatch(addSpecialize(payload));
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
                  name: "description",
                  errors: [resulDispatch.payload.description],
                }
              : "",
          ]);
        }
        unwrapResult(resulDispatch);
        notification.success({ message: `Thêm chuyên môn thành công !` });
        handleCancel();
        form.resetFields();
      } catch (error) {
        return notification.error({ message: `Thêm chuyên môn thất bại ! ` });
      }
    }
  };
  return (
    <>
      <FormModal
        titleModal={type === "create" ? "Thêm mới" : `Cập nhật`}
        titleForm={"specialize"}
        visible={openModal}
        handleCancel={() => {
          handleCancel();
          form.resetFields();
        }}
      >
        <Form layout="vertical" form={form} id="specialize" onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={24}>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="Tên chuyên môn"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập tên chuyên môn",
                      },
                    ]}
                  >
                    <Input placeholder="Hãy nhập tên chuyên môn..." />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Trạng thái" name="status">
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập mô tả",
                      },
                    ]}
                  >
                    <Input.TextArea />
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

export default SpecializeForm;
