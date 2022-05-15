import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import {
  UserOutlined,
  LoginOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import {
  getListCustomerLevels,
  getListSpecializations,
} from "../../../pages/Website/ListCourse/ListCoursesSlice";
import { Avatar, Dropdown, Menu } from "antd";
import { convertCurrency } from "../../../utils";
import { LogOutUser } from "../../../pages/UserSlice";
import ROUTER from "../../../router/router";
const NavBar = ({ infoUser }) => {
  const history = useHistory();
  const specialize = useSelector(
    (state) => state.coursesClient.specializations
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListSpecializations());
    dispatch(getListCustomerLevels());
  }, []);

  return (
    <nav className="navbar-main tw-bg-black lg:tw-bg-white tw-hidden md:tw-flex lg:tw-bg-opacity-20 tw-w-full lg:tw-w-auto lg:tw-pr-10 tw-items-center tw-justify-between">
      <ul className=" lg:tw-border-l-4 tw-border-[#ff0000] tw-flex tw-pl-4 main-menu">
        <li className="tw-mr-4 lg:tw-mr-8 tw-relative tw-h-full nav-item">
          <NavLink
            exact
            to="/"
            className="tw-uppercase tw-text-white tw-font-medium tw-block tw-py-10 nav-link-main tw-text-[15px]"
            activeClassName="active"
          >
            Trang chủ
          </NavLink>
        </li>

        <li className="tw-mr-4 lg:tw-mr-8 tw-relative tw-h-full nav-item">
          <NavLink
            to="/danh-sach-khoa-hoc"
            className="tw-uppercase tw-text-white tw-font-medium tw-block tw-py-10  nav-link-main tw-text-[15px]"
            activeClassName="active"
          >
            khóa học
          </NavLink>
          <ul className="tw-absolute tw-button-0 tw-left-0 tw-bg-white tw-p-4 tw-rounded-lg tw-w-52 sub-menu tw-shadow-md">
            {specialize?.map((item, index) => {
              if (item?.specialize_detail[0]?.courses_client) {
                return (
                  <li className="sub-menu-item" key={index}>
                    <Link
                      to={`/danh-sach-khoa-hoc?specializes=${item?.id}`}
                      className="tw-block tw-py-2 
                      tw-font-medium sub-menu-link tw-relative"
                    >
                      {item?.name}
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </li>
        <li className="tw-mr-4 lg:tw-mr-8 tw-relative tw-h-full nav-item">
          <NavLink
            to="/danh-sach-pt"
            className="tw-uppercase tw-text-white tw-font-medium tw-block tw-py-10  nav-link-main tw-text-[15px]"
            activeClassName="active"
          >
            Danh sách PT
          </NavLink>
        </li>
        <li className="tw-mr-4 lg:tw-mr-8 tw-relative tw-h-full nav-item">
          <NavLink
            to={ROUTER.CLIENT.CONTACT}
            className="tw-uppercase tw-text-white tw-font-medium tw-block tw-py-10  nav-link-main tw-text-[15px]"
            activeClassName="active"
          >
            liên hệ
          </NavLink>
        </li>
        <li className="tw-relative tw-h-full nav-item">
          <a
            href="https://trung.app/term.pdf"
            target="_blank"
            className="tw-uppercase tw-text-white tw-font-medium tw-block tw-py-10  nav-link-main tw-text-[15px]"
          >
            Điều khoản
          </a>
        </li>
      </ul>
      <div className="lg:tw-hidden tw-pr-4">
        <Dropdown
          overlay={
            <Menu className="tw-p-3">
              {infoUser ? (
                <>
                  <div className="tw-border-b-2 tw-border-solid pb-1 tw-px-[12px] !tw-pb-[10px]">
                    <div className="tw-flex tw-items-center">
                      <Avatar size={50} src={infoUser.image} />
                      <div className="tw-pl-4">
                        <p className="tw-font-medium">{infoUser.name}</p>
                        <div className="tw-text-[#666]">
                          <span>Số dư:</span>
                          <span className="tw-text-[#ff0000] tw-font-medium tw-text-xs">
                            {" "}
                            {convertCurrency(infoUser.money)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Menu.Item
                    key="0"
                    className="hover:tw-text-[#ff0000] tw-py-2 tw-mt-2"
                  >
                    <i className="fas fa-user-shield tw-pr-2 tw-w-7"></i>
                    <Link
                      to={
                        infoUser?.roles[0]?.id === 1
                          ? "/admin"
                          : infoUser?.roles[0]?.id === 2
                          ? "/khach-hang"
                          : "/pt"
                      }
                    >
                      Quản trị
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    className="hover:tw-text-[#ff0000] tw-py-2"
                    key="1"
                    onClick={() => {
                      try {
                        dispatch(LogOutUser());
                        history.push("/");
                      } catch (error) {
                        return error;
                      }
                    }}
                  >
                    <i className="fas fa-sign-out-alt tw-pr-2 tw-w-7"></i>
                    <span>Đăng xuất</span>
                  </Menu.Item>
                </>
              ) : (
                <>
                  <Menu.Item key="2">
                    <Link to={ROUTER.CLIENT.TYPEREGISTER}>
                      <SolutionOutlined className="tw-mr-2" /> Đăng ký
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Link to={ROUTER.CLIENT.TYPELOGIN}>
                      <LoginOutlined className="tw-mr-2" /> Đăng nhập
                    </Link>
                  </Menu.Item>
                </>
              )}
            </Menu>
          }
          trigger={["click"]}
        >
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <UserOutlined className="tw-text-lg tw-text-white hover:tw-text-[#ff0000]" />
          </a>
        </Dropdown>
      </div>
    </nav>
  );
};

export default NavBar;
