 
 

import { unwrapResult } from "@reduxjs/toolkit";
import { Alert, notification, Spin } from "antd";
import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ROUTER from "../../../../router/router";
import { setUserInfo } from "../../../../utils/localStorage/SetUserInfo";
import { addCustomerGoogle, loginCustomer } from "../LoginCustomrSlice";
import ImgForm from "../../../../assets/images/clinet/imgForm.jpg";
import { getInfoUser } from "../../../UserSlice";
import PasswordToggle from "../../../../components/componentsWebsite/passwordToggle";
const LoginPt = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const { loading } = useSelector((state) => state.LoginCustomer);
  const [passwordShown, setPasswordShown] = useState(false);
  const responseGoogle = async (response) => {
    if (response) {
      try {
        const resulDispatch = await dispatch(
          addCustomerGoogle(response?.accessToken)
        );
        if (resulDispatch.payload) {
          const { access_token } = resulDispatch.payload;
          setUserInfo("infoUser", { access_token });
        }
        unwrapResult(resulDispatch);
        await dispatch(getInfoUser());
        history.push(`${ROUTER.CLIENT.PROFILE}`);
        notification.success({ message: `Đăng nhập khách hàng thành công` });
      } catch (error) {
        notification.error({ message: `Đăng nhập khách hàng thất bại` });
      }
    }
  };
  const onSubmit = async (data) => {
    try {
      const resulDispatch = await dispatch(loginCustomer(data));
      if (resulDispatch.payload) {
        const { access_token } = resulDispatch.payload;
        setUserInfo("infoUser", { access_token });
      }
      unwrapResult(resulDispatch);
      notification.success({
        message: "Đăng nhập khách hàng thành công",
      });
      history.push(`${ROUTER.CLIENT.PROFILE}`);
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
          message: "Đăng nhập PT thất bại",
        });
      }
    }
  };
  return (
    <Spin spinning={loading}>
      <div className="tw-py-6">
        <div className="tw-flex tw-bg-white tw-rounded-lg tw-shadow-lg tw-overflow-hidden tw-mx-auto tw-max-w-sm lg:tw-max-w-4xl">
          <div
            className="tw-hidden lg:tw-block lg:tw-w-1/2 tw-bg-cover"
            style={{
              backgroundImage: `url(${ImgForm})`,
            }}
          />
          <div className="tw-w-full tw-p-8 lg:tw-w-1/2">
            <h2 className="tw-text-2xl tw-font-semibold tw-text-gray-700 tw-text-center">
              YM
            </h2>
            <p className="tw-text-xl tw-text-gray-600 tw-text-center">
              Welcome back!
            </p>
            <div className=" tw-mt-4">
              <GoogleLogin
                clientId="43629890670-7n7ffgffaiqlvs3fs8dqie2jph6mb5pl.apps.googleusercontent.com"
                buttonText="Đăng nhập bằng Google"
                onSuccess={responseGoogle}
                // onFailure={responseGoogle}
                className="tw-w-full tw-flex tw-justify-center"
                cookiePolicy={"single_host_origin"}
              />
            </div>
            <div className="tw-mt-4 tw-flex tw-items-center tw-justify-between">
              <span className="tw-border-b tw-w-1/5 lg:tw-w-1/4" />
              <div className="tw-text-xs tw-text-center tw-text-gray-500 tw-uppercase">
                hoặc đăng nhập với
              </div>
              <span className="tw-border-b tw-w-1/5 lg:tw-w-1/4" />
            </div>
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-4">
                <label className="tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/i,
                  })}
                  className="tw-bg-gray-200 tw-text-gray-700 focus:tw-outline-none focus:tw-shadow-outline tw-border tw-border-gray-300 tw-rounded tw-py-2 tw-px-4 tw-block tw-w-full tw-appearance-none"
                  type="email"
                />
                {errors.email && errors.email.type === "required" && (
                  <span className="tw-text-red-500">
                    Email không được để trống
                  </span>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <span className="tw-text-red-500">
                    Hãy nhập đúng định dạng email
                  </span>
                )}
                {errors.email && errors.email.type === "errorApi" && (
                  <span className="tw-text-red-500">
                    {errors?.email?.message}
                  </span>
                )}
              </div>
              <div className="tw-mt-4">
                <div className="tw-flex tw-justify-between">
                  <label className="tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2">
                    Mật khẩu
                  </label>
                  <Link
                    to={ROUTER.CLIENT.RESET_PASS}
                    className="tw-text-xs tw-text-gray-500"
                  >
                    Quên Mật Khẩu?
                  </Link>
                </div>
                <PasswordToggle
                  onTogglePass={(status) => setPasswordShown(status)}
                >
                  <input
                    {...register("password", { required: true, minLength: 6 })}
                    className="tw-bg-gray-200 tw-text-gray-700 focus:tw-outline-none focus:tw-shadow-outline tw-border tw-border-gray-300 tw-rounded tw-py-2 tw-px-4 tw-block tw-w-full tw-appearance-none"
                    type={passwordShown ? "text" : "password"}
                  />
                </PasswordToggle>
                {errors.password && errors.password.type === "required" && (
                  <span className="tw-text-red-500">
                    Mật khẩu không được để trống
                  </span>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <span className="tw-text-red-500">
                    Mật khẩu phải trên 6 ký tự
                  </span>
                )}
                {errors.password && errors.password.type === "errorApi" && (
                  <span className="tw-text-red-500">
                    {errors?.password?.message}
                  </span>
                )}
              </div>
              <div className="tw-mt-8">
                <button className="tw-bg-gray-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-w-full tw-rounded hover:tw-bg-gray-600">
                  Đăng nhập
                </button>
              </div>
            </form>
            <div className="tw-mt-4 tw-flex tw-items-center tw-justify-between">
              <span className="tw-border-b tw-w-1/5 md:tw-w-1/4" />
              <Link
                to={ROUTER.CLIENT.REGISTERCUSTUMER}
                className="tw-text-xs tw-text-gray-500 tw-uppercase"
              >
                hoặc đăng ký
              </Link>
              <span className="tw-border-b tw-w-1/5 md:tw-w-1/4" />
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default LoginPt;
