import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import success from "../../../../assets/success.png";
import PageTitle from "./../../../../components/componentsWebsite/TitlePage/index";
const PaymentInvoiceRegister = (props) => {
  const data = props.location.state;
  return (
    <>
      <PageTitle namePage="hoá đơn website" />
      <div className="tw-py-5">
        <div className="tw-py-6 tw-w-100 ">
          <div
            className="tw-shadow tw-max-w-4xl tw-mx-auto"
            style={{ maxWidth: "900px", borderRadius: "10px" }}
          >
            <Card style={{ borderRadius: "10px" }}>
              <div className="tw-border-b-2 tw-border-dashed">
                <div className=" tw-flex tw-justify-center">
                  <img className="tw-w-12" src={success} alt="Hình ảnh không tồn tại" />
                </div>
                <h1 className="tw-pt-5 tw-flex tw-justify-center tw-font-semibold tw-text-[25px]">
                  Thanh toán khoá học thành công
                </h1>
                <h1 className="tw-py-4 tw-pt-5 tw-flex tw-justify-center tw-font-semibold tw-text-blue-600 tw-text-4xl">
                  {data?.money} <span className="ml-2 tw-mt-[5px] tw-text-[15px]">VNĐ</span>
                </h1>
              </div>
              <div className="tw-py-3">
                <div className="tw-grid tw-grid-cols-2 tw-gap-x-40 tw-my-3">
                  <span className="tw-pl-5 ">Tài khoản giao dịch</span>
                  <span className="tw-text-blue-600 tw-font-semibold tw-text-[17px] tw-flex tw-justify-end">
                    {data?.user?.name}
                  </span>
                </div>
                <div className="tw-grid tw-grid-cols-2 tw-gap-x-40 tw-my-3">
                  <span className="tw-pl-5 ">Tên khoá học</span>
                  <span className="tw-font-semibold tw-text-[17px] tw-flex tw-justify-end">
                    {data?.course?.name}
                  </span>
                </div>
                <div className="tw-grid tw-grid-cols-2 tw-gap-x-40 tw-my-3">
                  <span className="tw-pl-5 ">Thời gian giao dịch</span>
                  <span className="tw-font-semibold tw-text-[17px] tw-flex tw-justify-end">
                    {data?.time}
                  </span>
                </div>
                <div className="tw-grid tw-grid-cols-2 tw-gap-x-40 tw-my-3">
                  <span className="tw-pl-5 ">Số tiền giao dịch(VND)</span>
                  <span className="tw-font-semibold tw-text-[17px] tw-flex tw-justify-end">
                    {data?.money}
                  </span>
                </div>
                <div className="tw-grid tw-grid-cols-2 tw-gap-x-40 tw-my-3">
                  <span className="tw-pl-5 ">Phí giao dịch(VND)</span>
                  <span className="tw-font-semibold tw-text-[17px] tw-flex tw-justify-end">0</span>
                </div>
                <div className="tw-grid tw-grid-cols-2 tw-gap-x-40 tw-my-3">
                  <span className="tw-pl-5 "> Mã hoá đơn</span>
                  <span className="tw-font-semibold tw-text-[17px] tw-flex tw-justify-end">
                    {data?.code_bill}
                  </span>
                </div>
              </div>
              <div className="tw-flex tw-justify-center">
                <button className=" tw-bg-red-700 hover:tw-bg-blue-600 tw-text-white tw-border-collapse tw-rounded-xl tw-w-1/3 tw-h-10 tw-p-1">
                  <Link to="/khach-hang/quan-ly-khoa-hoc">Khoá học của bạn</Link>
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentInvoiceRegister;
