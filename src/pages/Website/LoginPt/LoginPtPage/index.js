import React from "react";
import PageTitle from "../../../../components/componentsWebsite/TitlePage";
import FormLogin from "../components/FormLogin";
const LoginPtPage = () => {
  return (
    <>
      <PageTitle namePage="đăng nhập PT" />
      <div className="tw-py-5">
        <FormLogin />
      </div>
    </>
  );
};

export default LoginPtPage;
