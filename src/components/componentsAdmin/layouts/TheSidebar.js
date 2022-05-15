import CIcon from "@coreui/icons-react";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarMinimizer,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CSidebarNavTitle,
} from "@coreui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import logo2 from "../../../assets/favicon.png";
import logo from "../../../assets/images/clinet/logo-2.png";
// sidebar nav config
import navigation from "./_nav";
import ROUTER from "../../../router/router";

const TheSidebar = () => {
  const permissionUser = useSelector(
    (state) => state?.InfoUser?.infoUser?.array_permissions
  );
  if (permissionUser) {
    const TaiKhoan = permissionUser?.includes("user:list");
    const Quyen = permissionUser?.includes("permission:list");
    const ChucVu = permissionUser?.includes("role:list");
    const DSKhoahoc = permissionUser?.includes("course:list");
    const HocVienDK = permissionUser?.includes("student:list");
    const yeuCauThanhToan = permissionUser?.includes("payment:list");
    const cauhinhWeb = permissionUser?.includes("setting:list");
    const chuyenMon = permissionUser?.includes("specialize:list");
    const capDoPT = permissionUser?.includes("account-level:list");
    const hoaDonKH = permissionUser?.includes("bill:customer");
    const hoaDonPT = permissionUser?.includes("bill:payment");
    const hoaDonGD = permissionUser?.includes("bill:vnp");
    const lienHe = permissionUser?.includes("contact:list");
    const khieuNai = permissionUser?.includes("complain:list");
    const danhGiaKhoaHoc = permissionUser?.includes("comment:list");
    //
    if (TaiKhoan || Quyen || ChucVu) {
      navigation.push({
        _tag: "CSidebarNavTitle",
        _children: ["Tài khoản"],
      });
    }
    if (TaiKhoan) {
      navigation.push({
        _tag: "CSidebarNavItem",
        name: "Quản lý tài khoản",
        to: ROUTER.ADMIN.USER,
        icon: "cil-user",
      });
    }
    if (Quyen) {
      navigation.push({
        _tag: "CSidebarNavItem",
        name: "Quản lý quyền",
        to: ROUTER.ADMIN.PERMISSION,
        icon: "cil-fork",
      });
    }
    if (ChucVu) {
      navigation.push({
        _tag: "CSidebarNavItem",
        name: "Quản lý chức vụ",
        to: ROUTER.ADMIN.ROLE,
        icon: "cil-braille",
      });
    }

    //
    if (DSKhoahoc || HocVienDK || yeuCauThanhToan) {
      navigation.push({
        _tag: "CSidebarNavTitle",
        _children: ["Khoá học"],
      });
    }
    if (DSKhoahoc) {
      navigation.push({
        _tag: "CSidebarNavItem",
        name: "Danh sách khoá học",
        to: ROUTER.ADMIN.COURSE_REQUEST,
        icon: "cil-pencil",
      });
    }
    if (HocVienDK) {
      navigation.push({
        _tag: "CSidebarNavItem",
        name: "Học viên đã đăng ký",
        to: ROUTER.ADMIN.STUDENT_REGISTERED,
        icon: "cil-user",
      });
    }
    if (yeuCauThanhToan) {
      navigation.push({
        _tag: "CSidebarNavItem",
        name: "Yêu cầu thanh toán PT",
        to: ROUTER.ADMIN.BILL_PAY_FOR_PT,
        icon: "cil-basket",
      });
    }

    //
    if (cauhinhWeb) {
      navigation.push({
        _tag: "CSidebarNavTitle",
        _children: ["Cấu hình Website"],
      });
    }
    if (cauhinhWeb) {
      navigation.push({
        _tag: "CSidebarNavItem",
        name: "Quản lý cấu hình",
        icon: "cil-settings",
        to: ROUTER.ADMIN.SETTING,
      });
    }

    //
    if (chuyenMon) {
      navigation.push({
        _tag: "CSidebarNavTitle",
        _children: ["Chuyên môn"],
      });
    }
    if (chuyenMon) {
      navigation.push({
        _tag: "CSidebarNavItem",
        name: "Quản lý chuyên môn",
        icon: "cil-star",
        to: ROUTER.ADMIN.SPECIALIZE,
      });
    }

    //
    if (capDoPT) {
      navigation.push({
        _tag: "CSidebarNavTitle",
        _children: ["Cấp độ"],
      });
    }
    if (capDoPT) {
      navigation.push({
        _tag: "CSidebarNavItem",
        name: "Quản lý cấp độ PT",
        to: ROUTER.ADMIN.ACCOUNTLEVEL,
        icon: "cil-shield-alt",
      });
    }

    //
    if (hoaDonKH || hoaDonPT || hoaDonGD) {
      navigation.push({
        _tag: "CSidebarNavTitle",
        _children: ["Hóa đơn"],
      });
    }
    if (hoaDonKH) {
      navigation.push({
        _tag: "CSidebarNavItem",
        name: "Hóa đơn khách hàng",
        to: ROUTER.ADMIN.BILLINGS,
        icon: "cil-credit-card",
      });
    }
    if (hoaDonPT) {
      navigation.push({
        _tag: "CSidebarNavItem",
        name: "Hóa đơn thanh toán PT",
        to: ROUTER.ADMIN.BILL_COURSES_PT,
        icon: "cil-credit-card",
      });
    }
    if (hoaDonGD) {
      navigation.push({
        _tag: "CSidebarNavItem",
        name: "Quản lý giao dịch",
        to: ROUTER.ADMIN.TRANSACTIONS,
        icon: "cil-basket",
      });
    }

    //
    if (khieuNai || danhGiaKhoaHoc) {
      navigation.push({
        _tag: "CSidebarNavTitle",
        _children: ["Khiếu nại"],
      });
    }
    if (khieuNai) {
      navigation.push({
        _tag: "CSidebarNavItem",
        name: "Quản lý khiếu nại",
        to: ROUTER.ADMIN.COMPLAIN,
        icon: "cilFrown",
      });
    }
    if (danhGiaKhoaHoc) {
      navigation.push({
        _tag: "CSidebarNavItem",
        name: "Quản lý đánh giá khóa học",
        to: ROUTER.ADMIN.MANAGE_REVIEWS,
        icon: "cilCommentSquare",
      });
    }

    //
    if (lienHe) {
      navigation.push({
        _tag: "CSidebarNavTitle",
        _children: ["Liên hệ"],
      });
    }
    if (lienHe) {
      navigation.push({
        _tag: "CSidebarNavItem",
        name: "Liên hệ",
        to: ROUTER.ADMIN.CONTACT,
        icon: "cilCommentSquare",
      });
    }
  }

  const dispatch = useDispatch();
  const show = useSelector((state) => state.changeState.sidebarShow);
  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          src={logo}
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        />
        <CIcon
          src={logo2}
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
