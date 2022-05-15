import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bgFooter from "../../../assets/images/clinet/2.jpg";
import logo from "../../../assets/images/clinet/footer-logo.png";
import { Api } from "./../../../utils/Api";
import { useSelector } from "react-redux";
const FooterLayout = () => {
  const listSetting = useSelector((state) => state.setting.listSettingClient);
  const Logo = listSetting?.filter((item) => item?.config_key === "Logo");
  const Address = listSetting?.filter((item) => item?.config_key === "Địa chỉ");
  const numberPhone = listSetting?.filter((item) => item?.config_key === "SĐT");
  const email = listSetting?.filter((item) => item?.config_key === "Email");
  const SloganFooter = listSetting?.filter((item) => item?.config_key === "Slogan Footer");
  const nameCompany = listSetting?.filter((item) => item?.config_key === "Tên công ty");
  const backgroundFooter = listSetting?.filter((item) => item?.config_key === "Background Footer");

  return (
    <footer
      className="main-footer"
      style={{
        backgroundImage: `url(${
          backgroundFooter && backgroundFooter[0]?.status === "Active"
            ? backgroundFooter[0]?.config_value
            : bgFooter
        })`,
      }}
    >
      <div className="container sm:tw-px-0">
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-5 tw-pt-[95px] tw-pb-[60px]">
          <div className="tw-mb-10 md:tw-mb-0 tw-pb-2 md:tw-p-0 tw-border-b md:tw-border-b-0 ">
            <div className="logo-footer tw-h-[80px] tw-max-w-[200px]">
              <Link to="/">
                <img
                  className="tw-h-full"
                  src={
                    Logo && Logo[0]?.status === "Active"
                      ? Logo[0]?.config_value
                      : logo
                  }
                  alt="Hình ảnh không tồn tại"
                />
              </Link>
            </div>
            <div className="tw-text-white tw-mb-[25px] tw-pr-5">
              {SloganFooter && SloganFooter[0]?.status === "Active"
                ? SloganFooter[0]?.config_value
                : "Webite thuê huấn luyện thể hình chúng tôi cam kết cung cấp PT đều dày dặn kinh nghiệm và có tâm huyết trong nghề. Chúc bạn nhanh chóng có một thân hình mơ ước"}
            </div>
          </div>
          <div className="footer-item mb-10 md:tw-mb-0 tw-pb-2 md:tw-p-0 tw-border-b md:tw-border-b-0">
            <div className="tw-min-h-[80px]">
              <h4 className="footer-item-title tw-font-semibold tw-text-[22px] tw-text-white  tw-pb-5 tw-relative">
                Về chúng tôi
              </h4>
            </div>
            <p className="tw-text-white tw-text-[16px] tw-font-semibold tw-mb-3">
              {nameCompany && nameCompany[0]?.status === "Active"
                ? nameCompany[0]?.config_value
                : "Công ty TNHH GYM"}
            </p>
            <div className="tw-mb-3">
              <span className="tw-text-white tw-text-[16px] tw-font-semibold">Địa chỉ: </span>
              <span className="tw-text-white">
                {Address && Address[0]?.status === "Active"
                  ? Address[0]?.config_value
                  : "Nam Hải - Nam Trực - Nam Địnhh"}
              </span>
            </div>
            <div className="tw-mb-3">
              <span className="tw-text-white tw-text-[16px] tw-font-semibold">Số điện thoại: </span>
              <span className="tw-text-white">
                {numberPhone && numberPhone[0]?.status === "Active"
                  ? numberPhone[0]?.config_value
                  : "085.985.0000"}
              </span>
            </div>
            <div className="tw-b-3">
              <span className="tw-text-white tw-text-[16px] tw-font-semibold">Email: </span>
              <span className="tw-text-white ">
                {email && email[0]?.status === "Active"
                  ? email[0]?.config_value
                  : "gymremote@gmail.com"}
              </span>
            </div>
          </div>
          <div className="footer-item tw-mb-10 md:tw-mb-0 tw-pb-2 md:tw-p-0 tw-border-b md:tw-border-b-0">
            <div className="tw-min-h-[80px]">
              <h4 className="footer-item-title tw-font-semibold tw-text-[22px] tw-text-white  tw-pb-5 tw-relative">
                Tác dụng của luyện tập online
              </h4>
            </div>
            <div className="list-course">
              <ul>
                <li className="tw-text-white tw-mb-3">
                  <p className=" tw-transition tw-duration-300">Linh hoạt về thời gian</p>
                </li>
                <li className="tw-text-white tw-mb-3">
                  <p className=" tw-transition tw-duration-300">Tập mọi lúc mọi nơi</p>
                </li>
                <li className="tw-text-white tw-mb-3">
                  <p className=" tw-transition tw-duration-300">
                    Tập luyện theo lịch trình của riêng bạn
                  </p>
                </li>
                <li className="tw-text-white tw-mb-3">
                  <p className=" tw-transition tw-duration-300">
                    Tiếp cận những PT giỏi trên toàn quốc
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-item tw-mb-10 md:tw-mb-0 tw-pb-2 md:tw-p-0 ">
            <div className="tw-min-h-[80px]">
              <h4 className="footer-item-title tw-font-semibold tw-text-[22px] tw-text-white  tw-pb-5 tw-relative">
                Fanpage của chúng tôi
              </h4>
            </div>
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FDATN73%2F&width=300&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
              // width={340}
              // height={350}
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder={0}
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            />
          </div>
        </div>
        <div className="footer-bottom tw-border-t tw-border-[rgba(255,255,255,0.15)] tw-text-center tw-py-5 tw-text-white">
          Copyright © 2021
        </div>
      </div>
    </footer>
  );
};

export default FooterLayout;
