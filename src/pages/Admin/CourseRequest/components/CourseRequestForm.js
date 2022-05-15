import { unwrapResult } from "@reduxjs/toolkit";
import { Col, Form, notification, Row, Select } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateSTTCourseRequest } from "../CourseRequestSlice";
import FormModal from "./../../../../components/componentsAdmin/Modal/FormModal";

const { Option } = Select;
const CourseRequestForm = (props) => {
  const dispatch = useDispatch();
  const { handleCancel, openModal, dataEdit, type } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    if (dataEdit !== null) {
      form.setFieldsValue({
        status: dataEdit?.status,
      });
    } else {
      form.resetFields();
    }
  }, [dataEdit, form]);
  const onFinish = async (value) => {
    if (type === "update" && dataEdit?.id) {
      try {
        const id = dataEdit?.id;
        const resultAction = await dispatch(updateSTTCourseRequest({ id, value }));
        unwrapResult(resultAction);
        notification.success({ message: `Thay đổi trạng thái thành công` });
        handleCancel();
        form.resetFields();
      } catch (error) {
        notification.error({ message: `${error}` });
      }
    }
  };
  return (
    <>
      <FormModal
        titleModal="Cập nhật trạng thái"
        titleForm={"courserequest"}
        visible={openModal}
        handleCancel={() => {
          handleCancel();
          form.resetFields();
        }}
      >
        <Form layout="vertical" form={form} id="courserequest" onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="Trạng thái"
                name="status"
                rules={[
                  {
                    required: true,
                    message: "Mời nhập giới tính",
                  },
                ]}
              >
                <Select showSearch className="select-custom">
                  <Option key="Request" value="Request">
                    Yêu cầu
                  </Option>
                  <Option key="Happening" value="Happening">
                    Duyệt
                  </Option>
                  <Option key="Pause" value="Pause">
                    Tạm dừng
                  </Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </FormModal>
    </>
  );
};

export default CourseRequestForm;
