import { unwrapResult } from "@reduxjs/toolkit";
import { Col, Form, Input, notification, Row, Select, Switch } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormModal from "../../../../components/componentsAdmin/Modal/FormModal";
import {
  addCourses,
  getCourses,
  updateCourses
} from "../../Courses/CoursesSlice";
const CoursesForm = (props) => {
  const dispatch = useDispatch();
  const { handleCancel, openModal, dataEdit, type } = props;
  const [form] = Form.useForm();
  const courses = useSelector((state) => state.courses.items);
  useEffect(() => {
    if (dataEdit !== null) {
      form.setFieldsValue({
        name: dataEdit?.name,
        display: dataEdit?.display,
        description: dataEdit?.description,
        price: dataEdit?.price,
        image: dataEdit?.image,
        content: dataEdit?.content,
        customer_level_id: dataEdit?.customer_level_id,
        lessons: dataEdit?.lessons,
        time_a_lessons: dataEdit?.time_a_lessons,
      });
    } else {
      form.resetFields();
    }
    dispatch(getCourses(null));
  }, [dataEdit, form]);
  const onFinish = async (value) => {
    const payload = {
      name: value?.name,
      display: value?.display,
      description: value?.description,
      price: value?.price,
      image: value?.image,
      content: value?.content,
      customer_level_id: value?.customer_level_id,
      lessons: value?.lessons,
      time_a_lessons: value?.time_a_lessons,
    };
    if (type === "update" && dataEdit?.id) {
      try {
        const id = dataEdit?.id;
        const resulDispatch = await dispatch(updateCourses({ id, payload }));
        unwrapResult(resulDispatch);
        notification.success({ message: `Sửa thành công !!!` });
        handleCancel();
      } catch (error) {
        return notification.error({ message: `Đã có lỗi xảy ra ` });
      }
    } else {
      try {
        const resulDispatch = await dispatch(addCourses(payload));
        unwrapResult(resulDispatch);
        notification.success({ message: `Thêm thành công !!!` });
        handleCancel();
      } catch (error) {
        return notification.error({ message: `Đã có lỗi xảy ra ` });
      }
    }
  };
  return (
    <>
      <FormModal
        titleModal={type === "create" ? "Thêm mới" : `Cập nhật`}
        titleForm={"courses"}
        visible={openModal}
        handleCancel={() => {
          handleCancel();
          form.resetFields();
        }}
      >
        <Form layout="vertical" form={form} id="courses" onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={24}>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="Tên khóa học"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập tên khóa học",
                      },
                    ]}
                  >
                    <Input placeholder="Hãy nhập tên khóa học..." />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Hiển thị" name="display">
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="desc"
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập desc",
                      },
                    ]}
                  >
                    <Input placeholder="Hãy nhập desc..." />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="cái giá phải trả"
                    name="price"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập cái giá phải trả",
                      },
                    ]}
                  >
                    <Input placeholder="Hãy nhập cái giá phải trả..." />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="cái image"
                    name="image"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập cái image",
                      },
                    ]}
                  >
                    <Input placeholder="Hãy nhập cái image..." />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="cái content"
                    name="content"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập cái content",
                      },
                    ]}
                  >
                    <Input placeholder="Hãy nhập cái content..." />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="cái time_a_lessons"
                    name="time_a_lessons"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập cái time_a_lessons",
                      },
                    ]}
                  >
                    <Input placeholder="Hãy nhập cái time_a_lessons..." />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="cái lessons"
                    name="lessons"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập cái lessons",
                      },
                    ]}
                  >
                    <Input placeholder="Hãy nhập cái lessons..." />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="cái customer_level_id"
                    name="customer_level_id"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập cái customer_level_id",
                      },
                    ]}
                  >
                    <Input placeholder="Hãy nhập cái customer_level_id..." />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="cái specialize_detail_id"
                    name="specialize_detail_id"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập cái specialize_detail_id",
                      },
                    ]}
                  >
                    <Input placeholder="Hãy nhập cái specialize_detail_id..." />
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

export default CoursesForm;
