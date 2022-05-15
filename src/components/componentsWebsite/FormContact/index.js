import React from "react";
import { Form, Input, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import { sendMessage } from "../../../pages/Website/Home/HomeSlice";
const FormContact = () => {
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { loadingSend } = useSelector((state) => state.HomeClinent);
  const onFinish = async (data) => {
    try {
      const resulDispatch = await dispatch(sendMessage(data));
      unwrapResult(resulDispatch);
      form.resetFields();
      notification.success({
        message: "Gửi liên hệ thành công",
      });
    } catch (error) {
      if (typeof error === "object") {
        form.setFields([
          error.name
            ? {
                name: "name",
                errors: [error.name],
              }
            : "",
          error.content
            ? {
                name: "content",
                errors: [error.content],
              }
            : "",
          error.email
            ? {
                name: "email",
                errors: [error.email],
              }
            : "",
          error.phone
            ? {
                name: "phone",
                errors: [error.phone],
              }
            : "",
          error.title
            ? {
                name: "title",
                errors: [error.title],
              }
            : "",
          error.phone
            ? {
                name: "phone",
                errors: [error.phone],
              }
            : "",
        ]);
      } else {
        notification.error({
          message: "Gửi liên hệ thất bại",
        });
      }
    }
  };
  return (
    <div className="container sm:tw-px-0">
      <div className=" tw-pt-24 tw-pb-12">
        <div className="contact-box tw-flex tw-flex-col lg:tw-flex-row">
          <div className="title-col lg:tw-w-1/3 tw-pb-7 lg:tw-pb-0">
            <div className="title-contact tw-text-[#555555] tw-text-md md:tw-text-lg tw-font-medium md:tw-pb-5 font-roboto">
              LIÊN HỆ VỚI CHÚNG TÔI
            </div>
            <h2 className=" tw-text-2xl lg:tw-text-4xl tw-text-black tw-uppercase tw-font-semibold tw-mt-3 tw-pb-5">
              hỏi chúng <br /> tôi bất kỳ điều gì
            </h2>
            <div className="tw-text-[#555555] font-roboto">
              Hệ thống chúng tôi luôn luôn sẵn sàng giải đáp mọi thắc mắc liên
              quan đến website 24h/24h
            </div>
          </div>
          <div className="contact-form  lg:tw-w-2/3 lg:tw-pl-3">
            <Form onFinish={onFinish} form={form}>
              <div className="tw-flex tw-flex-col sm:tw-flex-row">
                <Form.Item
                  name="name"
                  className="tw-flex-1 tw-pb-0 sm:tw-pb-3 tw-pr-0 sm:tw-pr-3 "
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập họ và tên !",
                    },
                  ]}
                >
                  <Input
                    className="tw-bg-gray-100  tw-w-full tw-h-16 tw-border tw-border-[#dddddd] tw-px-6 focus:tw-outline-none focus:tw-border-current tw-placeholder-gray-500 tw-font-medium focus:tw-ring-0 hover:tw-border-current tw-capitalize font-roboto"
                    placeholder="Họ và tên"
                  ></Input>
                </Form.Item>
                <Form.Item
                  name="email"
                  className="tw-flex-1 tw-pb-0 sm:tw-pb-3 pl-0 sm:tw-pl-3"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập địa chỉ email !",
                    },
                  ]}
                >
                  <Input
                    className="tw-bg-gray-100 tw-w-full tw-h-16 tw-border tw-border-[#dddddd] tw-px-6 focus:tw-outline-none focus:tw-border-current tw-placeholder-gray-500 tw-font-medium focus:tw-ring-0 hover:tw-border-current font-roboto"
                    placeholder="Email"
                  ></Input>
                </Form.Item>
              </div>
              <div className="tw-flex tw-flex-col sm:tw-flex-row">
                <Form.Item
                  name="title"
                  className="tw-flex-1 tw-pb-0 sm:tw-pb-3 tw-pr-0 sm:tw-pr-3 "
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập tiêu đề liên hệ !",
                    },
                  ]}
                >
                  <Input
                    className="tw-bg-gray-100 tw-w-full tw-h-16 tw-border tw-border-[#dddddd] tw-px-6 focus:tw-outline-none focus:tw-border-current tw-placeholder-gray-500 tw-font-medium focus:tw-ring-0 hover:tw-border-current font-roboto"
                    placeholder="Tiêu đề"
                  ></Input>
                </Form.Item>

                <Form.Item
                  name="phone"
                  className="tw-flex-1 tw-pb-0 sm:tw-pb-3 pl-0 sm:tw-pl-3"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập số điện thoại !",
                    },
                  ]}
                >
                  <Input
                    className="tw-bg-gray-100 tw-w-full tw-h-16 tw-border tw-border-[#dddddd] tw-px-6 focus:tw-outline-none focus:tw-border-current tw-placeholder-gray-500 tw-font-medium focus:tw-ring-0 hover:tw-border-current font-roboto"
                    placeholder="SĐT"
                  ></Input>
                </Form.Item>
              </div>

              <Form.Item
                name="content"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập nội dung liên hệ !",
                  },
                ]}
              >
                <TextArea
                  rows={6}
                  className="tw-bg-gray-100  tw-w-full tw-border tw-border-[#dddddd] tw-px-6 focus:tw-outline-none focus:tw-border-current tw-placeholder-gray-500 tw-font-medium focus:tw-ring-0 hover:tw-border-current font-roboto"
                  placeholder="Nội dung"
                />
              </Form.Item>
              <Form.Item>
                <div className="btn-three-outer">
                  <button
                    className="theme-btn btn-style-three"
                    type="submit"
                    name="submit-form"
                  >
                    <span className="txt">
                      {loadingSend && <LoadingOutlined className="tw-mr-2" />}{" "}
                      Gửi
                    </span>
                  </button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormContact;
