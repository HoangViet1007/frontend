import { unwrapResult } from "@reduxjs/toolkit";
import { Col, Form, notification, Radio, Row } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import "../../../../assets/css/style.css";
import backgroup from "../../../../assets/thanhtoan.jpg";
import { PaymentUrl } from "../PaymentSlice";
const PaymentForm = () => {
  const dispatch = useDispatch();
  const onFinish = async (value) => {
    const payload = {
      money: value?.money,
      note: "nap-tien",
    };
    try {
      const resulDispatch = await dispatch(PaymentUrl(payload));
      unwrapResult(resulDispatch);
      window.location.href = resulDispatch.payload;
    } catch (error) {
      const getErr = (obj, index) => {
        var i = 0;
        for (var attr in obj) {
          if (index === i) {
            return obj[attr];
          }
          i++;
        }
        return null;
      };
      const messageErr = getErr(error, 0);
      return notification.error({
        message: ` ${messageErr} `,
      });
    }
  };

  return (
    <>
      <div className="tw-mt-[40px] tw-rounded-lg tw-shadow-lg tw-overflow-hidden tw-pt-6 tw-bg-white tw-flex tw-justify-center tw-mx-auto tw-max-w-sm lg:tw-max-w-screen-xl ">
        <div
          className="tw-hidden lg:tw-block lg:tw-w-1/3 tw-bg-cover"
          style={{
            backgroundImage: `url(${backgroup})`,
          }}
        />
        <div className="tw-w-full tw-p-8 lg:tw-w-2/3">
          <Form onFinish={onFinish}>
            <h2 className="tw-font-medium tw-text-[20px]">Số tiền nạp (VNĐ)</h2>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  name="money"
                  rules={[
                    {
                      required: true,
                      message: "Mời nhập số tiền",
                    },
                  ]}
                >
                  <input className=" styleinput tw-w-3/4 tw-font-semibold" placeholder="0đ" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item name="money">
                  <Radio.Group className="tw-w-full">
                    <Row gutter={24}>
                      <Col md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }}>
                        <Radio.Button
                          className="hover:tw-border-blue-700"
                          style={{
                            width: "160px",
                            height: "60px",
                            borderRadius: "7px",
                            fontSize: "20px",
                            textAlign: "center",
                            paddingTop: "13px",
                            marginTop: "20px",
                          }}
                          value="100000"
                        >
                          100.000đ
                        </Radio.Button>
                      </Col>
                      <Col md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }}>
                        <Radio.Button
                          className="hover:tw-border-blue-700"
                          style={{
                            width: "160px",
                            height: "60px",
                            borderRadius: "7px",
                            fontSize: "20px",
                            textAlign: "center",
                            paddingTop: "13px",
                            marginTop: "20px",
                          }}
                          value="200000"
                        >
                          200.000đ
                        </Radio.Button>
                      </Col>
                      <Col md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }}>
                        <Radio.Button
                          className="hover:tw-border-blue-700"
                          style={{
                            width: "160px",
                            height: "60px",
                            borderRadius: "7px",
                            fontSize: "20px",
                            textAlign: "center",
                            paddingTop: "13px",
                            marginTop: "20px",
                          }}
                          value="500000"
                        >
                          500.000đ
                        </Radio.Button>
                      </Col>
                      <Col md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }}>
                        <Radio.Button
                          className="hover:tw-border-blue-700"
                          style={{
                            width: "160px",
                            height: "60px",
                            borderRadius: "7px",
                            fontSize: "20px",
                            textAlign: "center",
                            paddingTop: "13px",
                            marginTop: "20px",
                          }}
                          value="700000"
                        >
                          700.000đ
                        </Radio.Button>
                      </Col>
                      <Col md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }}>
                        <Radio.Button
                          className="hover:tw-border-blue-700"
                          style={{
                            width: "160px",
                            height: "60px",
                            borderRadius: "7px",
                            fontSize: "20px",
                            textAlign: "center",
                            paddingTop: "13px",
                            marginTop: "20px",
                          }}
                          value="1000000"
                        >
                          1.000.000đ
                        </Radio.Button>
                      </Col>
                      <Col md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }}>
                        <Radio.Button
                          className="hover:tw-border-blue-700"
                          style={{
                            width: "160px",
                            height: "60px",
                            borderRadius: "7px",
                            fontSize: "20px",
                            textAlign: "center",
                            paddingTop: "13px",
                            marginTop: "20px",
                          }}
                          value="2000000"
                        >
                          2.000.000đ
                        </Radio.Button>
                      </Col>
                      <Col md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }}>
                        <Radio.Button
                          className="hover:tw-border-blue-700"
                          style={{
                            width: "160px",
                            height: "60px",
                            borderRadius: "7px",
                            fontSize: "20px",
                            textAlign: "center",
                            paddingTop: "13px",
                            marginTop: "20px",
                          }}
                          value="5000000"
                        >
                          5.000.000đ
                        </Radio.Button>
                      </Col>
                      <Col md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }}>
                        <Radio.Button
                          className="hover:tw-border-blue-700"
                          style={{
                            width: "160px",
                            height: "60px",
                            borderRadius: "7px",
                            fontSize: "20px",
                            textAlign: "center",
                            paddingTop: "13px",
                            marginTop: "20px",
                          }}
                          value="10000000"
                        >
                          10.000.000đ
                        </Radio.Button>
                      </Col>
                    </Row>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <div className="tw-flex tw-justify-center tw-mt-8">
                <button
                  className="theme-btn btn-style-three tw-border tw-w-1/2 tw-p-1 "
                  htmlType="submit"
                >
                  <div className="tw-relative tw-z-[1] tw-flex tw-items-center tw-justify-center">
                    <span className="tw-font-medium tw-normal-case ">Tiếp theo</span>
                  </div>
                </button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default PaymentForm;
