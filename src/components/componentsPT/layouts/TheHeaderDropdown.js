import CIcon from "@coreui/icons-react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import { unwrapResult } from "@reduxjs/toolkit";
import { notification } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getInfoUser, LogOutUser } from "../../../pages/UserSlice";
import ROUTER from "../../../router/router";
const TheHeaderDropdown = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const infoUser = useSelector((state) => state.InfoUser.infoUser);
  useEffect(() => {
    dispatch(getInfoUser());
  }, []);

  const LogOut = async () => {
    try {
      const resultApi = await dispatch(LogOutUser());
      unwrapResult(resultApi);
      history.push("/");
      notification.success({ message: resultApi.payload });
    } catch (error) {}
  };
  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={infoUser?.image}
            className="c-avatar-img tw-h-full tw-w-full tw-object-cover"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Cài đặt</strong>
        </CDropdownItem>
        <CDropdownItem className="tw-p-0">
          <Link
            to={ROUTER.PT.PROFILE}
            className="tw-w-full hover:tw-text-[#4f5d73] focus:tw-text-white tw-py-[8px] tw-px-[20px]"
          >
            <div>
              <CIcon name="cil-user" className="mfe-2" />
              Trang cá nhân
            </div>
          </Link>
        </CDropdownItem>

        <CDropdownItem className="tw-p-0">
          <Link
            to={ROUTER.PT.CHANGEPASSWORD}
            className="tw-w-full hover:tw-text-[#4f5d73] focus:tw-text-white tw-py-[8px] tw-px-[20px]"
          >
            <div>
              <CIcon name="cil-user" className="mfe-2" />
              Đổi mật khẩu
            </div>
          </Link>
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={LogOut}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Đăng xuất
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
