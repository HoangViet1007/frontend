 
import { unwrapResult } from "@reduxjs/toolkit";
import { Alert, notification, Spin } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setUserInfo } from "../../../utils/localStorage/SetUserInfo";
import { loginAdmin } from "./LoginAdminSlice";
const LoginAdmin = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.LoginAdmin);
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();
  const onSubmit = async (value) => {
    try {
      const resultApi = await dispatch(loginAdmin(value));
      unwrapResult(resultApi);
      if (resultApi.payload) {
        const { access_token, user } = resultApi.payload;
        setUserInfo("infoUser", { access_token, user });
      }
      notification.success({ message: `Đăng nhập admin thành công` });
      history.push("/admin");
    } catch (error) {
      if (error?.password) {
        setError("password", {
          type: "errorApi",
          message: error.password[0],
        });
      }
      if (typeof error !== "object") {
        setError("password", {
          type: "errorTkMk",
          message: error,
        });
        setError("email", {
          type: "errorTkMk",
          message: error,
        });
      } else {
        notification.error({
          message: "Đăng nhập admin thất bại",
        });
      }
    }
  };
  return (
    <div className="font-sans">
      <div className="tw-relative tw-min-h-screen tw-flex tw-flex-col sm:tw-justify-center tw-items-center tw-bg-gray-100 ">
        <div className="tw-relative sm:tw-max-w-sm tw-w-full">
          <div className="card tw-bg-blue-400 tw-shadow-lg  tw-w-full tw-h-full tw-rounded-3xl tw-absolute  tw-transform tw--rotate-6"></div>
          <div className="card tw-bg-red-400 tw-shadow-lg  tw-w-full tw-h-full tw-rounded-3xl tw-absolute  tw-transform tw-rotate-6"></div>
          <div className="tw-relative tw-w-full tw-rounded-3xl  tw-px-6 tw-py-4 tw-bg-gray-100 tw-shadow-md">
            <label
              for=""
              className="tw-block tw-mt-3 tw-text-sm tw-text-gray-700 tw-text-center tw-font-semibold"
            >
              Đăng nhập Admin
            </label>
            {errors?.password &&
              errors?.email &&
              errors.password.type === "errorTkMk" &&
              errors.email.type === "errorTkMk" && (
                <Alert
                  message={errors.password.message}
                  type="error"
                  showIcon
                />
              )}
            <Spin spinning={loading}>
              <form onSubmit={handleSubmit(onSubmit)} className="tw-mt-10">
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="tw-mt-1 tw-block tw-w-full tw-border-none tw-bg-gray-100 tw-h-11 tw-rounded-xl stw-hadow-lg hover:tw-bg-blue-100 focus:tw-bg-blue-100 focus:tw-ring-0 tw-pl-2"
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

                <div className="tw-mt-7">
                  <input
                    type="password"
                    placeholder="Password"
                    className="tw-mt-1 tw-block tw-w-full tw-border-none tw-bg-gray-100 tw-h-11 tw-rounded-xl tw-shadow-lg hover:tw-bg-blue-100 focus:tw-bg-blue-100 focus:tw-ring-0 tw-pl-2"
                    {...register("password", { required: true, minLength: 6 })}
                  />
                  <span className="tw-text-red-500">
                    {errors.password &&
                      errors.password.type === "required" &&
                      "Hãy nhập mật khẩu"}
                    {errors.password &&
                      errors.password.type === "minLength" && (
                        <span className="tw-text-red-500">
                          Mật khẩu phải trên 6 ký tự
                        </span>
                      )}
                    {errors.password &&
                      errors.password.type === "errorApi" &&
                      errors.password.message}
                  </span>
                </div>

                <div className="tw-mt-7 tw-flex">
                  <label
                    for="remember_me"
                    className="tw-inline-flex tw-items-center tw-w-full tw-cursor-pointer"
                  >
                    <input
                      id="remember_me"
                      type="checkbox"
                      className="tw-rounded tw-border-gray-300 tw-text-indigo-600 tw-shadow-sm focus:tw-border-indigo-300 focus:tw-ring focus:tw-ring-indigo-200 focus:tw-ring-opacity-50"
                      name="remember"
                    />
                    <span className="tw-ml-2 tw-text-sm tw-text-gray-600">
                      Nhớ đến tôi
                    </span>
                  </label>
                </div>

                <div className="tw-mt-7">
                  <button
                    className="tw-bg-blue-500 tw-w-full tw-py-3 tw-rounded-xl tw-text-white tw-shadow-xl hover:tw-shadow-inner focus:tw-outline-none tw-transition tw-duration-500 tw-ease-in-out  tw-transform hover:tw--translate-x hover:tw-scale-105"
                    disabled={loading}
                  >
                    {loading ? "loading..." : "Đăng nhập"}
                  </button>
                </div>
              </form>
            </Spin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
