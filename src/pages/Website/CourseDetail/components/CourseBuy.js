import { unwrapResult } from "@reduxjs/toolkit";
import { Modal, notification } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ROUTER from "../../../../router/router";
import { convertCurrency } from "../../../../utils";
import { getUserInfo } from "../../../../utils/localStorage/GetUserInfo";
import { PaymentRegister, PaymentUrl } from "../../Payment/PaymentSlice";
const CourseBuy = ({ courseDetail }) => {
  const inforUser = getUserInfo("infoUser");
  const dispatch = useDispatch();
  const history = useHistory();
  const onFinish = async () => {
    if (inforUser) {
      const payload = {
        money: courseDetail?.price,
        note: "thanh-toan",
        course_id: courseDetail?.id,
      };
      try {
        const resulDispatch = await dispatch(PaymentUrl(payload));
        unwrapResult(resulDispatch);
        window.location.href = resulDispatch.payload;
      } catch (error) {
        const getErr = (obj, index) => {
          var i = 0;
          for (var attr in obj) {
            if (index === i) {
              return obj[attr];
            }
            i++;
          }
          return null;
        };
        const messageErr = getErr(error, 0);
        return notification.error({
          message: ` ${messageErr} `,
        });
      }
    } else {
      notification.error({ message: `Vui lòng đăng nhập để thanh toán khoá học !` });
      history.push("/dang-nhap");
    }
  };

  const thanhToan = async () => {
    if (inforUser) {
      const payload = {
        money: courseDetail?.price,
        course_id: courseDetail?.id,
      };
      try {
        const resulDispatch = await dispatch(PaymentRegister(payload));
        unwrapResult(resulDispatch);
        notification.success({ message: `Đăng kí khoá học thành công !` });
        history.push(ROUTER.CLIENT.PAYMENT_INVOICE_REGISTER, resulDispatch.payload);
      } catch (error) {
        const getErr = (obj, index) => {
          var i = 0;
          for (var attr in obj) {
            if (index === i) {
              return obj[attr];
            }
            i++;
          }
          return null;
        };
        const messageErr = getErr(error, 0);
        return notification.error({
          message: ` ${messageErr} `,
        });
      }
    } else {
      notification.error({ message: `Vui lòng đăng nhập để thanh toán khoá học` });
      history.push("/dang-nhap");
    }
  };
  const onFinishThanhtoan = async () => {
    Modal.confirm({
      title: `Bạn chắc chắn muốn đăng kí khoá học: ${courseDetail?.name}. Tài khoản bạn sẽ bị trừ ${courseDetail?.price} vnđ  ? `,
      okText: "Đăng kí ngay",
      cancelText: "Hủy bỏ",
      onOk: () => {
        thanhToan();
      },
      onCancel() {},
    });
  };
  return (
    <div className="tw-bg-white tw-p-5 tw-rounded lg:tw-sticky tw-top-[20px] tw-h-1/4 tw-shadow">
      {/* <div className="tw-bg-white tw-p-5 tw-rounded lg:tw-sticky tw-top-0 tw-h-1/4 tw-shadow lg:tw-mt-[-150px]"> */}
      <div className="tw-text-xl tw-pb-3 tw-font-medium">
        <span className="tw-text-[#ff0000]">Giá: </span>
        <span className="tw-text-black">
          {courseDetail?.price && convertCurrency(courseDetail?.price)}
        </span>
      </div>
      <div className="">
        <button className="theme-btn btn-style-three tw-border-0 tw-bg-black tw-w-full tw-p-2">
          <div className="tw-relative tw-z-[1] " onClick={onFinishThanhtoan}>
            <span className=" tw-pl-5 tw-font-medium tw-uppercase tw-text-white">
              Thanh toán bằng ví
            </span>
          </div>
        </button>
        <button className="theme-btn btn-style-three tw-border-0 tw-bg-[#f3f3f3] tw-w-full tw-p-2 tw-mt-[20px]">
          <div onClick={onFinish} className="tw-relative tw-z-[1] ">
            <span className=" tw-pl-5 tw-font-medium tw-uppercase ">Thanh toán VNPAY</span>
          </div>
        </button>
      </div>

      <div className="tw-pt-5 ">
        <div className=" tw-font-medium tw-pb-2">Khóa học này bao gồm:</div>
        <ul>
          <li className="tw-py-1">
            <i className="far fa-play-circle"></i>
            <span className="tw-pl-2">Giai đoạn: </span>
            <span className="tw-font-medium">{courseDetail?.stages_client?.length}</span>
          </li>
          <li className="tw-py-1">
            <i className="far fa-clone"></i>
            <span className="tw-pl-2">Cấp độ: </span>
            <span className="tw-font-medium tw-lowercase">
              {courseDetail?.customer_level?.name}
            </span>
          </li>
          <li className="tw-py-1">
            <i className="fab fa-superpowers"></i>
            <span className="tw-pl-2">Chuyên môn: </span>
            <span className="tw-font-medium tw-lowercase">
              {courseDetail?.specialize_details?.specialize?.name}
              {console.log(courseDetail?.specialize_details)}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CourseBuy;
