import { Avatar, Drawer, Dropdown, Menu } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import logoNavMobile from "../../../assets/images/clinet/logo-2.png";
import logo from "../../../assets/images/clinet/logo.png";
import { getSettingClient } from "../../../pages/Admin/Setting/SettingSlice";
import { getInfoUser, LogOutUser } from "../../../pages/UserSlice";
import ROUTER from "../../../router/router";
import { getUserInfo } from "../../../utils/localStorage/GetUserInfo";
import { Api } from "./../../../utils/Api";
import { convertCurrency } from "./../../../utils/index";
import NavBar from "./NavBar";
const HeaderLayout = () => {
  const { SubMenu } = Menu;
  const [toggleMenu, setToggleMenu] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [scrollpos, setScrollpos] = useState(0);
  const [showHeaderToUp, setShowHeaderToUp] = useState(false);
  const scrollposBefore = useRef(0);
  const specialize = useSelector(
    (state) => state.coursesClient.specializations
  );
  const { infoUser, loading } = useSelector((state) => state.InfoUser);
  const listSetting = useSelector((state) => state.setting.listSettingClient);
  useEffect(() => {
    const isUser = getUserInfo("infoUser");
    isUser && dispatch(getInfoUser());
  }, [dispatch]);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setScrollpos(window.scrollY);
      } else {
        setShowHeaderToUp(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    setShowHeaderToUp(scrollposBefore.current > scrollpos);
    return () => {
      scrollposBefore.current = scrollpos;
    };
  }, [scrollpos]);
  const linkKhachHang = infoUser?.roles?.filter((item) => item?.id === 2);
  const linkPT = infoUser?.roles?.filter((item) => item?.id === 3);
  const Logo = listSetting?.filter((item) => item?.config_key === "Logo");
  const Address = listSetting?.filter((item) => item?.config_key === "Địa chỉ");
  const numberPhone = listSetting?.filter((item) => item?.config_key === "SĐT");
  const email = listSetting?.filter((item) => item?.config_key === "Email");
  return (
    <header
      className="lg:tw-absolute lg:tw-top-0 tw-left-0 tw-right-0 tw-z-[5]"
      // id="main-header"
    >
      <div>
        <div className="header-top tw-hidden lg:tw-block lg:tw-px-10">
          <div className="tw-flex tw-items-center tw-justify-between tw-py-3">
            <div className="info-list">
              <div className="tw-flex tw-justify-between">
                <div className="tw-pr-5 tw-text-white tw-border-r tw-border-white">
                  <i className="fas fa-location-arrow tw-text-[#ff0000] tw-text-sm tw-pr-3"></i>
                  {Address && Address[0]?.status === "Active"
                    ? Address[0]?.config_value
                    : "Nam Hải - Nam Trực - Nam Định"}
                </div>
                <div className="tw-px-5 tw-text-white tw-border-r tw-border-white">
                  <i className="fas fa-phone tw-text-[#ff0000] tw-text-sm tw-pr-3"></i>
                  {numberPhone && numberPhone[0]?.status === "Active"
                    ? numberPhone[0]?.config_value
                    : "085.985.0000"}
                </div>
                <div className="tw-pl-5 tw-text-white">
                  <i className="far fa-envelope tw-text-[#ff0000] tw-text-sm tw-pr-3"></i>
                  {email && email[0]?.status === "Active"
                    ? email[0]?.config_value
                    : "gymremote@gmail.com"}
                </div>
              </div>
            </div>
            <div className="header-top-right tw-flex tw-items-center">
              {!infoUser ? (
                <>
                  <Link to={ROUTER.CLIENT.TYPEREGISTER}>
                    <div className="tw-bg-balck tw-border tw-border-[#ff0000] hover:tw-bg-[#ff0000] hover:tw-text-white tw-px-3 tw-py-2 tw-rounded tw-text-[#ff0000] tw-font-normal tw-mr-2 tw-transition tw-duration-300">
                      Đăng ký
                    </div>
                  </Link>
                  <Link to={ROUTER.CLIENT.TYPELOGIN}>
                    <div className="tw-bg-[#ff0000]  tw-px-3 tw-py-2 tw-rounded tw-text-white tw-font-normal hover:tw-bg-red-600 tw-transition tw-duration-300">
                      Đăng nhập
                    </div>
                  </Link>
                </>
              ) : (
                <div className="currentUser">
                  <div className=" tw-cursor-pointer">
                    <Dropdown
                      placement="bottomRight"
                      overlay={
                        <Menu className="tw-p-3">
                          <div className="tw-border-b-2 tw-border-solid pb-1 tw-px-[12px] !tw-pb-[10px]">
                            <div className="tw-flex tw-items-center">
                              <Avatar size={50} src={infoUser.image} />
                              <div className="tw-pl-4">
                                <p className="tw-font-medium">
                                  {infoUser.name}
                                </p>
                                <div className="tw-text-[#666]">
                                  <span>Số dư:</span>
                                  <span className="tw-text-[#ff0000] tw-font-medium tw-text-xs">
                                    {convertCurrency(infoUser.money)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Menu.Item
                            onClick={() =>
                              linkKhachHang && linkKhachHang.length > 0
                                ? history.push("/khach-hang")
                                : linkPT && linkPT.length > 0
                                ? history.push("/pt")
                                : window.location.replace("/admin")
                            }
                            key="0"
                            className="hover:tw-text-[#ff0000] tw-py-2 tw-mt-2"
                          >
                            <i className="fas fa-user-shield tw-pr-2 tw-w-7"></i>
                            {/* <Link
                              to={
                                linkKhachHang && linkKhachHang.length > 0
                                  ? "/khach-hang"
                                  : linkPT && linkPT.length > 0
                                  ? "/pt"
                                  : "/admin"
                              }
                            > */}
                            Quản trị
                            {/* </Link> */}
                          </Menu.Item>
                          <Menu.Item
                            className="hover:tw-text-[#ff0000] tw-py-2"
                            key="2"
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
                        </Menu>
                      }
                      trigger={["click"]}
                    >
                      <a
                        className="ant-dropdown-link tw-h-full tw-w-full tw-flex tw-items-center"
                        onClick={(e) => e.preventDefault()}
                      >
                        <div>
                          <span className="tw-text-white ">Xin chào:</span>
                          <span className="tw-capitalize tw-text-[#ff0000] tw-pl-1 tw-font-medium">
                            {infoUser.name}
                          </span>
                        </div>
                      </a>
                    </Dropdown>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="header-bottom tw-bg-[#222222] md:tw-bg-transparent tw-flex md:tw-flex-col lg:tw-flex-row tw-items-center tw-justify-between tw-p-3 md:tw-p-0">
          <div className="logo-main lg:tw-border-r-2 tw-border-[#ff0000] tw-pr-3 tw-bg-[#222222] sm:tw-w-full lg:tw-w-auto lg:tw-bg-white lg:tw-bg-opacity-20 md:tw-flex tw-justify-center lg:tw-pl-10">
            <Link to="/">
              <img
                className="tw-w-40 md:tw-w-auto"
                src={
                  Logo && Logo[0]?.status === "Active"
                    ? Logo[0]?.config_value
                    : logo
                }
                alt="Hình ảnh không tồn tại"
              />
            </Link>
          </div>
          <div className="mobile-nav-toggler md:tw-hidden">
            <span
              className="icon flaticon-menu tw-text-white tw-text-[36px] tw-cursor-pointer"
              onClick={() => {
                setToggleMenu(true);
              }}
            ></span>
          </div>
          <NavBar infoUser={infoUser} />
        </div>
      </div>
      <Drawer
        placement="right"
        onClose={() => setToggleMenu(false)}
        visible={toggleMenu}
        className="tw-block lg:tw-hidden"
        width="60%"
      >
        <div className="nav-mobile">
          {infoUser ? (
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
          ) : (
            <div className="logo-nav-mobile tw-mb-6 tw-border-b">
              <Link to="/">
                <img src={logoNavMobile} alt="Hình ảnh không tồn tại" />
              </Link>
            </div>
          )}

          <Menu style={{ width: "100%" }} mode="inline">
            <Menu.Item
              key="1"
              className="tw-capitalize tw-font-medium "
              onClick={() => setToggleMenu(false)}
            >
              <Link to="/">Trang chủ</Link>
            </Menu.Item>
            <Menu.Item
              key="2"
              className="tw-capitalize tw-font-medium "
              onClick={() => setToggleMenu(false)}
            >
              <Link to="/danh-sach-khoa-hoc">khóa học</Link>
            </Menu.Item>
            <SubMenu
              key="sub2"
              className="tw-capitalize tw-font-medium"
              title="chuyên môn"
            >
              {specialize?.map((item, index) => {
                if (item?.length > 0) {
                  return (
                    <Menu.Item
                      key={item?.id}
                      onClick={() => setToggleMenu(false)}
                    >
                      <Link to={`/danh-sach-khoa-hoc?specializes=${item?.id}`}>
                        {item?.name}
                      </Link>
                    </Menu.Item>
                  );
                }
              })}
            </SubMenu>
            <Menu.Item
              key="8"
              className="tw-capitalize tw-font-medium"
              onClick={() => setToggleMenu(false)}
            >
              <Link to="/danh-sach-pt"> danh sách pt</Link>
            </Menu.Item>
            <Menu.Item
              key="9"
              className="tw-capitalize tw-font-medium"
              onClick={() => setToggleMenu(false)}
            >
              <Link to={ROUTER.CLIENT.CONTACT}>liên hệ</Link>
            </Menu.Item>
            <Menu.Item
              key="10"
              className="tw-capitalize tw-font-medium"
              onClick={() => setToggleMenu(false)}
            >
              giới thiệu
            </Menu.Item>
            {infoUser ? (
              <>
                <Menu.Item
                  key="15"
                  className="tw-capitalize tw-font-medium"
                  onClick={() => setToggleMenu(false)}
                >
                  <Link
                    to={
                      linkKhachHang && linkKhachHang.length > 0
                        ? "/khach-hang"
                        : linkPT && linkPT.length > 0
                        ? "/pt"
                        : "/admin"
                    }
                  >
                    Quản trị
                  </Link>
                </Menu.Item>
                <Menu.Item
                  className="tw-capitalize tw-font-medium"
                  key="16"
                  onClick={() => {
                    try {
                      dispatch(LogOutUser());
                      history.push("/");
                      setToggleMenu(false);
                    } catch (error) {
                      return error;
                    }
                  }}
                >
                  <span>Đăng xuất</span>
                </Menu.Item>
              </>
            ) : (
              <>
                <SubMenu
                  key="sub3"
                  className="tw-capitalize tw-font-medium"
                  title="Đăng ký"
                >
                  <Menu.Item key="11" onClick={() => setToggleMenu(false)}>
                    <Link to={ROUTER.CLIENT.REGISTERCUSTUMER}>khách hàng</Link>
                  </Menu.Item>
                  <Menu.Item key="12" onClick={() => setToggleMenu(false)}>
                    <Link to={ROUTER.CLIENT.REGISTERPT}>PT</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub4"
                  className="tw-capitalize tw-font-medium"
                  title="Đăng nhập"
                >
                  <Menu.Item key="13" onClick={() => setToggleMenu(false)}>
                    <Link to={ROUTER.CLIENT.LOGINCUSTOMER}>khách hàng</Link>
                  </Menu.Item>
                  <Menu.Item key="14" onClick={() => setToggleMenu(false)}>
                    <Link to={ROUTER.CLIENT.LOGINPT}>PT</Link>
                  </Menu.Item>
                </SubMenu>
              </>
            )}
          </Menu>
        </div>
      </Drawer>
      <div
        className="sticky-header tw-bg-white tw-fixed  tw-left-0 tw-w-full transition-nav-mobile tw-px-3 md:tw-px-10 tw-border-[e8f1f7] tw-border tw-z-[15]"
        style={showHeaderToUp ? { top: "0px" } : { top: "-100px" }}
      >
        <div className="tw-flex tw-items-center tw-justify-between tw-h-full">
          <div>
            <Link to="/">
              <img
                className="tw-w-full tw-h-[55px]"
                src={logoNavMobile}
                alt="Hình ảnh không tồn tại"
              />
            </Link>
          </div>
          <div className="mobile-nav-toggler lg:tw-hidden">
            <span
              className="icon flaticon-menu tw-text-black tw-text-[36px] tw-cursor-pointer"
              onClick={() => {
                setToggleMenu(true);
              }}
            ></span>
          </div>
          <nav className="navbar-main tw-hidden lg:tw-block">
            <ul className="tw-flex tw-pl-4 main-menu">
              <li className="nav-item">
                <NavLink
                  exact
                  to="/"
                  className="tw-uppercase tw-text-black tw-font-medium tw-block nav-link-main tw-text-[15px] tw-py-[19px] tw-pr-[19px]"
                  activeClassName="active"
                >
                  Trang chủ
                </NavLink>
              </li>

              <li className="tw-relative tw-h-full nav-item">
                <NavLink
                  exact
                  to="/danh-sach-khoa-hoc"
                  className="tw-uppercase tw-text-black tw-font-medium tw-block nav-link-main tw-text-[15px] tw-py-[19px] tw-pr-[19px]"
                  activeClassName="active"
                >
                  khóa học
                </NavLink>
                <ul className="tw-absolute tw-button-0 tw-left-0 tw-bg-white tw-p-4 tw-rounded-lg tw-w-52 sub-menu tw-shadow-md">
                  {specialize?.map((item, index) => {
                    if (
                      item?.specialize_detail[0]?.courses_client?.length > 0
                    ) {
                      return (
                        <li className="sub-menu-item" key={index}>
                          <Link
                            to={`danh-sach-khoa-hoc?specializes=${item?.id}`}
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
              <li className="nav-item">
                <NavLink
                  exact
                  to="/danh-sach-pt"
                  className="tw-uppercase tw-text-black tw-font-medium tw-block nav-link-main tw-text-[15px] tw-py-[19px] tw-pr-[19px]"
                  activeClassName="active"
                >
                  danh sách pt
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/lien-he"
                  className="tw-uppercase tw-text-black tw-font-medium tw-block nav-link-main tw-text-[15px] tw-py-[19px] tw-pr-[19px]"
                  activeClassName="active"
                >
                  liên hệ
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/about"
                  className="tw-uppercase tw-text-black tw-font-medium tw-block nav-link-main tw-text-[15px] tw-py-[19px]"
                  activeClassName="active"
                >
                  giới thiệu
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeaderLayout;
