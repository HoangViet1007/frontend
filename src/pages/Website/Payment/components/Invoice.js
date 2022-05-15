import { Card } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import success from "../../../../assets/success.png";
import failure from "../../../../assets/thatbai.png";
import { Api } from "../../../../utils/Api";

const Invoice = () => {
  const location = useLocation();
  const query = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  const [result, setResult] = useState("");
  useEffect(() => {
    const payload = {
      money: query.get("vnp_Amount"),
      code_vnp_response: query.get("vnp_ResponseCode"),
      code_bank: query.get("vnp_BankCode"),
      code_vnp: query.get("vnp_TransactionNo"),
      course_id: query.get("course_id"),
      code_bill: query.get("vnp_TxnRef"),
    };
    if (query.get("vnp_ResponseCode") === "00") {
      Api.post("thanh-toan/thong-bao", payload).then((result) =>
        result.status === 200 ? setResult(result.data) : setResult("")
      );
    }
  }, [query]);
  return (
    <>
      {query.get("vnp_ResponseCode") === "00" ? (
        <>
          <div className="tw-py-6 tw-bg-white tw-w-100 ">
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
                    {result?.money}{" "}
                    <span className="ml-2 tw-mt-[5px] tw-text-[15px]">VNĐ</span>
                  </h1>
                </div>
                <div className="tw-py-3">
                  <div className="tw-grid tw-grid-cols-2 tw-gap-x-40 tw-my-3">
                    <span className="tw-pl-5 ">Tài khoản giao dịch</span>
                    <span className="tw-text-blue-600 tw-font-semibold tw-text-[17px] tw-flex tw-justify-end">
                      {result?.user?.name}
                    </span>
                  </div>
                  <div className="tw-grid tw-grid-cols-2 tw-gap-x-40 tw-my-3">
                    <span className="tw-pl-5 ">Tên khoá học</span>
                    <span className="tw-font-semibold tw-text-[17px] tw-flex tw-justify-end">
                      {result?.bill?.course?.name}
                    </span>
                  </div>
                  <div className="tw-grid tw-grid-cols-2 tw-gap-x-40 tw-my-3">
                    <span className="tw-pl-5 ">Thời gian giao dịch</span>
                    <span className="tw-font-semibold tw-text-[17px] tw-flex tw-justify-end">
                      {result?.time}
                    </span>
                  </div>
                  <div className="tw-grid tw-grid-cols-2 tw-gap-x-40 tw-my-3">
                    <span className="tw-pl-5 ">Ngân hàng liên kết</span>
                    <span className="tw-font-semibold tw-text-[17px] tw-flex tw-justify-end">
                      {query.get("vnp_BankCode")}
                    </span>
                  </div>
                  <div className="tw-grid tw-grid-cols-2 tw-gap-x-40 tw-my-3">
                    <span className="tw-pl-5 ">Số tiền giao dịch(VND)</span>
                    <span className="tw-font-semibold tw-text-[17px] tw-flex tw-justify-end">
                      {result?.money}
                    </span>
                  </div>
                  <div className="tw-grid tw-grid-cols-2 tw-gap-x-40 tw-my-3">
                    <span className="tw-pl-5 ">Phí giao dịch(VND)</span>
                    <span className="tw-font-semibold tw-text-[17px] tw-flex tw-justify-end">
                      0
                    </span>
                  </div>
                  <div className="tw-grid tw-grid-cols-2 tw-gap-x-40 tw-my-3">
                    <span className="tw-pl-5 "> Mã giao dịch</span>
                    <span className="tw-font-semibold tw-text-[17px] tw-flex tw-justify-end">
                      {result?.code_vnp}
                    </span>
                  </div>
                </div>
                <div className="tw-flex tw-justify-center">
                  <button className=" tw-bg-red-700 hover:tw-bg-blue-600 tw-text-white tw-border-collapse tw-rounded-xl tw-w-1/3 tw-h-10 tw-p-1">
                    <Link to="/khach-hang/quan-ly-khoa-hoc">
                      Khoá học của bạn
                    </Link>
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <div className="tw-py-6 tw-bg-white tw-w-100 ">
          <div
            className="tw-shadow tw-max-w-4xl tw-mx-auto"
            style={{ maxWidth: "600px", borderRadius: "10px" }}
          >
            <Card style={{ borderRadius: "10px" }}>
              <div className="">
                <div className=" tw-flex tw-justify-center">
                  <img className="tw-w-12" src={failure} alt="Hình ảnh không tồn tại" />
                </div>
                <h1 className="tw-pt-5 tw-flex tw-justify-center tw-font-semibold tw-text-[25px]">
                  Giao dịch thất bại
                </h1>
              </div>
              <div className="tw-flex tw-justify-center">
                <button className=" tw-bg-red-700 hover:tw-bg-blue-600 tw-text-white tw-border-collapse tw-rounded-xl tw-w-1/3 tw-h-10 tw-p-1">
                  <Link to="/">Quay lại</Link>
                </button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default Invoice;
