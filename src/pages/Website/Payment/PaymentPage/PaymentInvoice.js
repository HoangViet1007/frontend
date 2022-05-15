import React from "react";
import PageTitle from "../../../../components/componentsWebsite/TitlePage";
import Invoice from "./../components/Invoice";
const PaymentInvoice = () => {
  return (
    <>
      <PageTitle namePage="hoá đơn website" />
      <div className="tw-py-5">
        <Invoice />
      </div>
    </>
  );
};

export default PaymentInvoice;
