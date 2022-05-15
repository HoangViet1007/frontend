import React from "react";
import CIcon from "@coreui/icons-react";
import ROUTER from "../../../router/router";
import { HistoryOutlined, ReadOutlined } from "@ant-design/icons";
const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Tổng quan",
    to: ROUTER.CLIENT.PROFILE,
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
    },
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Khóa học"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Quản lý khóa học",
    to: ROUTER.CLIENT.COURSES_MANAGER,
    icon: <ReadOutlined className="c-sidebar-nav-icon" />,
  },

  {
    _tag: "CSidebarNavTitle",
    _children: ["Lịch học "],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Xác nhận lịch học",
    to: ROUTER.CLIENT.CONFIRM_COURSES,
    icon: "cilCheck",
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Lịch học",
    icon: "cil-calendar",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Tất cả lịch học",
        to: ROUTER.CLIENT.SCHEDULES,
      },
      {
        _tag: "CSidebarNavItem",
        name: "Lịch học hôm nay",
        to: ROUTER.CLIENT.SCHEDULEDAY,
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Danh sách khiếu nại",
    to: ROUTER.CLIENT.LIST_COMPLAIN,
    icon: "cilFrown",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Hóa đơn"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Hóa đơn",
    to: ROUTER.CLIENT.BILL_CUSTOMER,
    icon: "cil-credit-card",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Lịch sử giao dịch",
    to: ROUTER.CLIENT.TRANSACTION_HISTORY,
    icon: <HistoryOutlined className="c-sidebar-nav-icon" />,
  },
];

export default _nav;
