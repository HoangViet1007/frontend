import { Form, Input, Select } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateBMI } from "../HomeSlice";
import { LoadingOutlined } from "@ant-design/icons";
const BMI = () => {
  const dispatch = useDispatch();
  const { resultBMI, loading } = useSelector((state) => state.HomeClinent);
  const { Option } = Select;
  const onFinish = (data) => {
    try {
      dispatch(calculateBMI(data));
    } catch (error) {
      return error;
    }
  };
  return (
    <div className="container sm:tw-px-0">
      <div className="tw-flex tw-flex-col lg:tw-flex-row tw-my-16">
        <div className="form-bmi tw-flex-1 tw-pb-5 lg:tw-pb-0">
          <div className="form-bmi-title tw-text-center tw-text-xl tw-font-medium tw-text-black sm:tw-px-20 tw-mb-5">
            ĐO CHỈ SỐ CÂN NẶNG - CHIỀU CAO (BMI) ONLINE
          </div>
          <div className="tw-flex tw-justify-center">
            <Form onFinish={onFinish}>
              <div className="tw-flex tw-pb-2">
                <Form.Item
                  name="height"
                  className="tw-mr-2"
                  rules={[
                    { required: true, message: "Hãy nhập chiều cao của bạn" },
                  ]}
                >
                  <Input
                    className="tw-bg-white tw-w-full tw-pr-10 focus:tw-outline-none tw-placeholder-gray-500 tw-font-normal tw-text-sm tw-py-3 focus:tw-ring-0  focus:tw-border-black  hover:tw-border-black tw-border-[#dddddd]"
                    placeholder="Chiều cao (cm)"
                    size="large"
                  ></Input>
                </Form.Item>
                <Form.Item
                  name="weight"
                  className="tw-ml-2"
                  rules={[
                    { required: true, message: "Hãy nhập cân nặng của bạn" },
                  ]}
                >
                  <Input
                    className="tw-bg-white tw-w-full tw-pr-10 focus:tw-outline-none tw-placeholder-gray-500 tw-font-normal tw-text-sm tw-py-3 focus:tw-ring-0  focus:tw-border-black  hover:tw-border-black tw-border-[#dddddd]"
                    placeholder="Cân nặng (kg)"
                    size="large"
                  ></Input>
                </Form.Item>
              </div>
              <div className="tw-flex tw-pt-2">
                <Form.Item name="age" className="tw-mr-2 tw-flex-1">
                  <Input
                    autoFocus={false}
                    className="tw-bg-white tw-w-full tw-pr-10 focus:tw-outline-none tw-placeholder-gray-500 tw-font-normal tw-text-sm tw-py-3 focus:tw-ring-0  focus:tw-border-black  hover:tw-border-black tw-border-[#dddddd]"
                    placeholder="Tuổi của bạn"
                    size="large"

                    // bg-white flex-1 h-12 border border-[#dddddd] px-6 focus:outline-none focus:border-current placeholder-gray-500 font-medium focus:ring-0 hover:border-current
                  ></Input>
                </Form.Item>
                <Form.Item name="gender" className="tw-ml-2 tw-flex-1">
                  <Select
                    size="large"
                    placeholder="Giới tính"
                    className=" select-bmi"
                    size="large"
                  >
                    <Option value="nam">Nam</Option>
                    <Option value="nu">Nữ</Option>
                  </Select>
                </Form.Item>
              </div>
              <Form.Item>
                <div className="btn-three-outer tw-mt-5">
                  <button
                    className="theme-btn btn-style-three tw-bg-black "
                    type="submit"
                  >
                    <span className="txt tw-text-white">
                      {loading && <LoadingOutlined className="tw-mr-2" />} Tính
                      toán
                    </span>
                  </button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="result-bmi tw-flex-1 tw-mt-10 lg:tw-mt-[calc(56px+1.25rem)]">
          <div className="tw-max-w-[350px] tw-mx-auto">
            <table className="tw-text-black tw-text-center">
              <thead></thead>
              <tbody>
                <tr>
                  <td className="tw-border-r tw-border-b  tw-w-1/2 tw-p-4 tw-font-semibold">
                    Kết quả
                  </td>
                  <td className="tw-border-b tw-w-1/2 tw-font-semibold">
                    Nhận xét
                  </td>
                </tr>
                <tr>
                  <td className="tw-border-r">{resultBMI?.result}</td>
                  <td className="tw-p-4">
                    <div>
                      {resultBMI?.comment
                        ? resultBMI?.comment
                        : "Hãy nhập thông tin để tính chỉ số BMI của bạn"}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMI;
