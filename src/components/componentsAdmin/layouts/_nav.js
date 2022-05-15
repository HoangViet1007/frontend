import React from "react";
import CIcon from "@coreui/icons-react";
import ROUTER from "../../../router/router";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Home",
    to: ROUTER.ADMIN.HOME,
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
    },
  },
];

export default _nav;
