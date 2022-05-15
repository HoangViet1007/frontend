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
import { Link } from "react-router-dom";
import logo2 from "../../../assets/favicon.png";
import logo from "../../../assets/images/clinet/logo-2.png";
// sidebar nav config
import navigation from "./_nav";
const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.changeState.sidebarShow);

  return (
    <CSidebar show={show} onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}>
      <CSidebarBrand className="d-md-down-none" to="/">
        <Link to="/">
          <CIcon src={logo} className="c-sidebar-brand-full" name="logo-negative" height={35} />
          <CIcon src={logo2} className="c-sidebar-brand-minimized" name="sygnet" height={35} />
        </Link>
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
