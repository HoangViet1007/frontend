 

import { unwrapResult } from "@reduxjs/toolkit";
import { notification, Spin } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { addCustomer } from "../RegisterCustomerSlice";
import ROUTER from "../../../../router/router";
import ImgForm from "../../../../assets/images/clinet/imgForm.jpg";
import PasswordToggle from "../../../../components/componentsWebsite/passwordToggle";
const FormResgisterCustomer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.registerCustomer);
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShown1, setPasswordShown1] = useState(false);
  const onSubmit = async (data) => {
    const { image, ...newdata } = data;
    const info = {
      ...newdata,
      image: image[0],
      status: "Inactive",
    };
    try {
      const resulDispatch = await dispatch(addCustomer(info));
      unwrapResult(resulDispatch);
      notification.success({ message: `Đăng ký thành công` });
      history.push(`${ROUTER.CLIENT.LOGINCUSTOMER}`);
    } catch (error) {
      if (error?.email) {
        setError("email", {
          type: "errorApi",
          message: error.email[0],
        });
      }
      if (error?.password) {
        setError("password", {
          type: "errorApi",
          message: error.password[0],
        });
      }
      if (error?.name) {
        setError("name", {
          type: "errorApi",
          message: error.name[0],
        });
      }
      if (error?.phone) {
        setError("phone", {
          type: "errorApi",
          message: error.phone[0],
        });
      }
      if (error?.sex) {
        setError("sex", {
          type: "errorApi",
          message: error.sex[0],
        });
      }
      if (error?.address) {
        setError("address", {
          type: "errorApi",
          message: error.address[0],
        });
      }
      if (error?.cf_password) {
        setError("cf_password", {
          type: "errorApi",
          message: error.cf_password[0],
        });
      }
      notification.error({ message: `Đăng ký khách hàng thất bại` });
    }
  };
  return (
    <Spin spinning={loading}>
      <div className="tw-py-6">
        <div className="tw-flex tw-bg-white tw-rounded-lg tw-shadow-lg tw-overflow-hidden tw-mx-auto tw-max-w-sm md:tw-max-w-5xl">
          <div
            className="tw-hidden lg:tw-block lg:tw-w-1/3 tw-bg-cover"
            style={{
              backgroundImage: `url(${ImgForm})`,
            }}
          />
          <div className="tw-w-full tw-p-8 lg:tw-flex-1">
            <h2 className="tw-text-2xl tw-font-semibold tw-text-gray-700 tw-text-center">
              YM
            </h2>
            <p className="tw-text-xl tw-text-gray-600 tw-text-center">
              Welcome back!
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="tw-flex tw-justify-between tw-flex-col md:tw-flex-row">
                <div className="tw-mt-4 tw-flex-1 md:tw-mr-3">
                  <label className="tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2">
                    Họ và tên
                  </label>
                  <input
                    className="tw-bg-gray-200 tw-text-gray-700 focus:tw-outline-none focus:tw-shadow-outline tw-border tw-border-gray-300 tw-rounded tw-py-2 tw-px-4 tw-block tw-w-full tw-appearance-none"
                    type="text"
                    {...register("name", { required: true })}
                  />
                  <span className="tw-text-red-500">
                    {errors.name &&
                      errors.name?.type === "required" &&
                      "Hãy nhập tên của bạn"}
                    {errors?.name &&
                      errors.name?.type === "errorApi" &&
                      errors.name?.message}
                  </span>
                </div>
                <div className="tw-mt-4 tw-flex-1 md:tw-ml-3">
                  <label className="tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2">
                    SĐT
                  </label>

                  <input
                    className="tw-bg-gray-200 tw-text-gray-700 focus:tw-outline-none focus:tw-shadow-outline tw-border tw-border-gray-300 tw-rounded tw-py-2 tw-px-4 tw-block tw-w-full tw-appearance-none"
                    type="text"
                    {...register("phone", { required: true })}
                  />
                  <span className="tw-text-red-500">
                    {errors.phone &&
                      errors.phone?.type === "required" &&
                      "Hãy nhập số điện thoại"}
                    {errors?.phone &&
                      errors.phone?.type === "errorApi" &&
                      errors.phone?.message}
                  </span>
                </div>
              </div>

              <div className="tw-flex tw-justify-between tw-flex-col md:tw-flex-row">
                <div className="tw-mt-4 tw-flex-1  md:tw-mr-3">
                  <label className="tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2">
                    Mật khẩu
                  </label>
                  <PasswordToggle
                    onTogglePass={(status) => setPasswordShown(status)}
                  >
                    <input
                      className="tw-bg-gray-200 tw-text-gray-700 focus:tw-outline-none focus:tw-shadow-outline tw-border tw-border-gray-300 tw-rounded tw-py-2 tw-px-4 tw-block tw-w-full tw-appearance-none"
                      type={passwordShown ? "text" : "password"}
                      {...register("password", {
                        required: true,
                        minLength: 6,
                      })}
                    />
                  </PasswordToggle>
                  <span className="tw-text-red-500">
                    {errors.password &&
                      errors.password.type === "required" &&
                      "Hãy nhập mật khẩu"}
                    {errors.password &&
                      errors.password.type === "minLength" &&
                      "Mật khẩu phải trên 6 ký tự"}
                    {errors.password &&
                      errors.password.type === "errorApi" &&
                      errors.password.message}
                  </span>
                </div>
                <div className="tw-mt-4 tw-flex-1 md:tw-ml-3">
                  <label className="tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2">
                    Nhập lại mật khẩu
                  </label>
                  <PasswordToggle
                    onTogglePass={(status) => setPasswordShown1(status)}
                  >
                    <input
                      className="tw-bg-gray-200 tw-text-gray-700 focus:tw-outline-none focus:tw-shadow-outline tw-border tw-border-gray-300 tw-rounded tw-py-2 tw-px-4 tw-block tw-w-full tw-appearance-none"
                      type={passwordShown1 ? "text" : "password"}
                      {...register("cf_password", { required: true })}
                    />
                  </PasswordToggle>
                  <span className="tw-text-red-500">
                    {errors.cf_password &&
                      errors.cf_password?.type === "required" &&
                      "Hãy nhập lại mật khẩu"}
                    {errors?.cf_password &&
                      errors.cf_password?.type === "errorApi" &&
                      errors.cf_password?.message}
                  </span>
                </div>
              </div>

              <div className="tw-flex tw-justify-between tw-flex-col md:tw-flex-row">
                <div className="tw-mt-4 tw-flex-1 md:tw-mr-3">
                  <label className="tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2">
                    Email
                  </label>
                  <input
                    className="tw-bg-gray-200 tw-text-gray-700 focus:tw-outline-none focus:tw-shadow-outline tw-border tw-border-gray-300 tw-rounded tw-py-2 tw-px-4 tw-block tw-w-full tw-appearance-none"
                    type="email"
                    {...register("email", {
                      required: true,
                      pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/i,
                    })}
                  />
                  <span className="tw-text-red-500">
                    {errors.email &&
                      errors.email.type === "required" &&
                      "Hãy nhập địa email"}
                    {errors.email &&
                      errors.email.type === "pattern" &&
                      "Hãy nhập đúng định dạng email"}
                    {errors?.email &&
                      errors.email.type === "errorApi" &&
                      errors.email.message}
                  </span>
                </div>
                <div className="tw-mt-4 tw-flex-1 md:tw-ml-3">
                  <label className="tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2">
                    Địa chỉ
                  </label>

                  <input
                    className="tw-bg-gray-200 tw-text-gray-700 focus:tw-outline-none focus:tw-shadow-outline tw-border tw-border-gray-300 tw-rounded tw-py-2 tw-px-4 tw-block tw-w-full tw-appearance-none"
                    type="text"
                    {...register("address", { required: true })}
                  />
                  <span className="tw-text-red-500">
                    {errors.address &&
                      errors.address?.type === "required" &&
                      "Hãy nhập địa chỉ"}
                    {errors?.address &&
                      errors.address?.type === "errorApi" &&
                      errors.address?.message}
                  </span>
                </div>
              </div>

              <div className="tw-flex tw-justify-between tw-flex-col md:tw-flex-row">
                <div className="tw-mt-4 tw-flex-1 md:tw-mr-3">
                  <label className="tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2">
                    Giới tính
                  </label>
                  <select
                    className="tw-bg-gray-200 tw-text-gray-700 focus:tw-outline-none focus:tw-shadow-outline tw-border tw-border-gray-300 tw-rounded tw-py-2 tw-px-4  tw-w-full"
                    {...register("sex", { required: true })}
                  >
                    <option value="" hidden defaultValue></option>
                    <option value="Male">Nam</option>
                    <option value="Female">Nữ</option>
                  </select>
                  <span className="tw-text-red-500">
                    {errors.sex &&
                      errors.sex?.type === "required" &&
                      "Hãy nhập giới tính"}
                    {errors?.sex &&
                      errors.sex?.type === "errorApi" &&
                      errors.sex?.message}
                  </span>
                </div>
                <div className="tw-mt-4 tw-flex-1 md:tw-ml-3">
                  <label className="tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2">
                    Hình ảnh
                  </label>
                  <input
                    className="tw-bg-gray-200 tw-text-gray-700 focus:tw-outline-none focus:tw-shadow-outline tw-border tw-border-gray-300 rounded tw-py-1 tw-px-4 tw-block tw-w-full tw-appearance-none tw-cursor-pointer"
                    type="file"
                    accept="image/*"
                    {...register("image", {
                      validate: {
                        required: (files) => files.length > 0 || "Hãy chọn ảnh",
                        lessThan10MB: (files) =>
                          files[0]?.size < 1000000 || "Hãy chọn ảnh dưới 1MB",
                        acceptedFormats: (files) =>
                          ["image/jpeg", "image/png", "image/webp"].includes(
                            files[0]?.type
                          ) || "Hãy chọn ảnh jpg,png,webp",
                      },
                    })}
                  />
                  <span className="tw-text-red-500">
                    {errors?.image?.message && errors.image?.message}
                  </span>
                </div>
              </div>
              <div className="tw-mt-8">
                <button
                  className="tw-bg-gray-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-w-full tw-rounded hover:tw-bg-gray-600"
                  disabled={loading}
                >
                  {!loading ? "Đăng ký" : "loading..."}
                </button>
              </div>
            </form>
            <div className="tw-mt-4 tw-flex tw-items-center tw-justify-between">
              <span className="tw-border-b tw-w-1/5 md:tw-w-1/4" />
              <Link
                to="/dang-nhap-khach-hang"
                className="tw-text-xs tw-text-gray-500 tw-uppercase"
              >
                Hoặc đăng nhập
              </Link>
              <span className="tw-border-b tw-w-1/5 md:tw-w-1/4" />
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default FormResgisterCustomer;
