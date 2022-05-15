import React from "react";
import CIcon from "@coreui/icons-react";
import ROUTER from "../../../router/router";
const _nav = [
  {
    _tag: "CSidebarNavTitle",
    _children: ["Bảng điều khiển"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Tổng quan",
    to: "/pt",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
    },
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Khoá Học"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Danh sách khoá học",
    icon: "cil-list",
    to: ROUTER.PT.COURSES,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Thêm khoá học",
    icon: "cil-comment-square",
    to: ROUTER.PT.COURSESADD,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Yêu cầu thanh toán",
    to: ROUTER.PT.PAYMENT_REQUEST,
    icon: "cil-calculator",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Buổi học cần xếp lại",
    to: ROUTER.PT.RESCHEDULE_COURSE,
    icon: "cil-calculator",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Chuyên môn"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Quản lý chuyên môn",
    to: ROUTER.PT.SPECIALIZEDETAILPT,
    icon: "cil-layers",
  },

  {
    _tag: "CSidebarNavTitle",
    _children: ["Học viên"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Quản lý học viên",
    to: ROUTER.PT.STUDENT_MANAGER,
    icon: "cil-user",
  },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Lịch học",
  //   to: ROUTER.PT.SCHEDULES,
  //   icon: "cil-calendar",
  // },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Lịch dạy "],
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Lịch dạy",
    icon: "cil-calendar",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Tất cả lịch dạy",
        to: ROUTER.PT.SCHEDULES,
      },
      {
        _tag: "CSidebarNavItem",
        name: "Lịch dạy hôm nay",
        to: ROUTER.PT.SCHEDULEDAY,
      },
    ],
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Hóa đơn"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Hóa đơn thanh toán",
    to: ROUTER.PT.BILL_COURSES,
    icon: "cil-calculator",
  },

  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "Icons",
  //   route: "/icons",
  //   icon: "cil-star",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "CoreUI Free",
  //       to: "/icons/coreui-icons",
  //       badge: {
  //         color: "success",
  //         text: "NEW",
  //       },
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "CoreUI Flags",
  //       to: "/icons/flags",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "CoreUI Brands",
  //       to: "/icons/brands",
  //     },
  //   ],
  // },
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "Notifications",
  //   route: "/notifications",
  //   icon: "cil-bell",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Alerts",
  //       to: "/notifications/alerts",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Badges",
  //       to: "/notifications/badges",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Modal",
  //       to: "/notifications/modals",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Toaster",
  //       to: "/notifications/toaster",
  //     },
  //   ],
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Widgets",
  //   to: "/widgets",
  //   icon: "cil-calculator",
  //   badge: {
  //     color: "info",
  //     text: "NEW",
  //   },
  // },
  // {
  //   _tag: "CSidebarNavDivider",
  // },
  // {
  //   _tag: "CSidebarNavTitle",
  //   _children: ["Extras"],
  // },
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "Pages",
  //   route: "/pages",
  //   icon: "cil-star",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Login",
  //       to: "/login",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Register",
  //       to: "/register",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Error 404",
  //       to: "/404",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Error 500",
  //       to: "/500",
  //     },
  //   ],
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Disabled",
  //   icon: "cil-ban",
  //   badge: {
  //     color: "secondary",
  //     text: "NEW",
  //   },
  //   addLinkClass: "c-disabled",
  //   disabled: true,
  // },
  // {
  //   _tag: "CSidebarNavDivider",
  //   className: "m-2",
  // },
  // {
  //   _tag: "CSidebarNavTitle",
  //   _children: ["Labels"],
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Label danger",
  //   to: "",
  //   icon: {
  //     name: "cil-star",
  //     className: "text-danger",
  //   },
  //   label: true,
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Label info",
  //   to: "",
  //   icon: {
  //     name: "cil-star",
  //     className: "text-info",
  //   },
  //   label: true,
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Label warning",
  //   to: "",
  //   icon: {
  //     name: "cil-star",
  //     className: "text-warning",
  //   },
  //   label: true,
  // },
  // {
  //   _tag: "CSidebarNavDivider",
  //   className: "m-2",
  // },
];

export default _nav;
