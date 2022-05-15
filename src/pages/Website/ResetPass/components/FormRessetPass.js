 
import { unwrapResult } from "@reduxjs/toolkit";
import { Alert, notification, Spin } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ImgForm from "../../../../assets/images/clinet/imgForm.jpg";
import { getPass } from "../ResetSlice";
const FormRessetPass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const { loading } = useSelector((state) => state.resetPass);
  const dispatch = useDispatch();
  const [isEmailSuccess, setIsEmailSuccess] = useState("");
  const onSubmit = async (data) => {
    try {
      setIsEmailSuccess("");
      const result = await dispatch(getPass(data));
      unwrapResult(result);
      setIsEmailSuccess(data.email);
    } catch (error) {
      if (typeof error !== "object") {
        setError("email", {
          type: "errorTkMk",
          message: error,
        });
      } else {
        notification.error({
          message: "Lấy lại mật khẩu thất bại",
        });
      }
    }
  };
  return (
    <Spin spinning={loading}>
      <div className="tw-py-10">
        <div className="tw-flex tw-bg-white tw-rounded-lg tw-shadow-lg tw-overflow-hidden tw-mx-auto tw-max-w-sm lg:tw-max-w-4xl">
          <div
            className="tw-hidden lg:tw-block lg:tw-w-1/2 tw-bg-cover"
            style={{
              backgroundImage: `url(${ImgForm})`,
            }}
          ></div>
          <div className="tw-w-full tw-px-8 tw-py-16 lg:tw-w-1/2">
            <h2 className="tw-text-2xl tw-font-semibold tw-text-gray-700 text-center">
              Brand
            </h2>
            <p className="tw-text-xl tw-text-gray-600 tw-text-center">
              Welcome back!
            </p>
            <div className="tw-text-center mt-4">
              Nhập địa chỉ email bạn đã đăng ký, chúng tôi sẽ giúp bạn lấy lại
              mật khẩu
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {isEmailSuccess && (
                <Alert
                  className="tw-mt-2"
                  message={`Chúng tôi sẽ gửi thông tin lấy lại mật khẩu mới vào email: ${isEmailSuccess} trong 1-2 phút tới. Bạn vui lòng mở email và làm theo hướng dẫn!`}
                  type="success"
                />
              )}
              {errors?.email && errors.email.type === "errorTkMk" && (
                <Alert
                  message={errors.email.message}
                  className="tw-mt-2"
                  type="error"
                  showIcon
                />
              )}

              <div className="tw-mt-4">
                <label className="tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2">
                  Email
                </label>
                <input
                  className="tw-bg-gray-200 tw-text-gray-700 focus:tw-outline-none focus:tw-shadow-outline tw-border border-gray-300 rounded py-2 px-4 block tw-w-full tw-appearance-none"
                  type="text"
                  {...register("email", {
                    required: true,
                    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/i,
                  })}
                />
                {errors.email && errors.email.type === "required" && (
                  <span className="tw-text-red-500 tw-text-xs">
                    Email không được để trống
                  </span>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <span className="tw-text-red-500 tw-text-xs">
                    Hãy nhập đúng định dạng email
                  </span>
                )}
              </div>
              <div className="tw-mt-8">
                <button className="tw-bg-gray-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-w-full tw-rounded hover:tw-bg-gray-600">
                  Gửi mật khẩu cho tôi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default FormRessetPass;
