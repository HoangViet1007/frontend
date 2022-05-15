import React from "react";
import PageTitle from "../../../../components/componentsWebsite/TitlePage";
import FormLogin from "../components/FormLogin";
const LoginCustomerPage = () => {
  return (
    <>
      <PageTitle namePage="đăng nhập khách hàng" />
      <div className="tw-py-5">
        <FormLogin />
      </div>
    </>
  );
};

export default LoginCustomerPage;
