import React, { useState, useEffect } from "react";
import ImgMap from "../../../../assets/images/clinet/info-map.jpg";
import { Api } from "./../../../../utils/Api";
import { useSelector } from "react-redux";
const ContactMap = () => {
  const listSetting = useSelector((state) => state.setting.listSettingClient);
  const Logo = listSetting?.filter((item) => item?.config_key === "Logo");
  const Address = listSetting?.filter((item) => item?.config_key === "Địa chỉ");
  const numberPhone = listSetting?.filter((item) => item?.config_key === "SĐT");
  const email = listSetting?.filter((item) => item?.config_key === "Email");
  const ImageMap = listSetting?.filter((item) => item?.config_key === "Image Map");

  return (
    <section className="contact-map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3723.863855881391!2d105.7445984141576!3d21.038132792835867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1632988338496!5m2!1svi!2s"
        width="100%"
        height={550}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      />
      <div className="map-info tw-flex tw-flex-col md:tw-flex-row tw-max-w-[800px] tw-relative tw-mt-[-230px] tw-w-full tw-mx-auto tw-px-3 md:tw-px-0">
        <div className="map-img">
          <img
            className="tw-w-full tw-h-full tw-object-cover"
            src={ImageMap && ImageMap[0]?.status === "Active" ? ImageMap[0]?.config_value : ImgMap}
            alt="Hình ảnh không tồn tại"
          />
        </div>
        <div className="info-col tw-px-[30px] tw-py-[25px] md:tw-px-[50px] md:tw-py-[38px] tw-bg-white tw-shadow-md">
          <div className="tw-flex tw-items-center tw-border-b tw-mb-5 tw-pb-3">
            <span className="icon flaticon-location-2 tw-text-[54px] tw-text-black"></span>
            <div className="location tw-pl-10 ">
              <div className=" tw-text-[#ff0000] tw-font-semibold tw-text-[18px] tw-pb-3">
                Địa Chỉ
              </div>
              <div>
                {Address && Address[0]?.status === "Active"
                  ? Address[0]?.config_value
                  : "Nam Hải - Nam Trực - Nam Địnhh"}
              </div>
            </div>
          </div>
          <div className="tw-flex tw-items-center tw-border-b tw-mb-5 tw-pb-3">
            <span className="icon flaticon-call-2 tw-text-[54px] tw-text-black"></span>
            <div className="phone-number tw-pl-10 ">
              <div className=" tw-text-[#ff0000] tw-font-semibold tw-text-[18px] tw-pb-3">
                Số điện thoại
              </div>
              <div>
                {numberPhone && numberPhone[0]?.status === "Active"
                  ? numberPhone[0]?.config_value
                  : "085.985.0000"}
              </div>
            </div>
          </div>
          <div className="tw-flex tw-items-center tw-pb-3">
            <span className="icon flaticon-email-1 tw-text-[54px] ttw-ext-black"></span>
            <div className="contact-email tw-pl-10 ">
              <div className=" tw-text-[#ff0000] tw-font-semibold tw-text-[18px] tw-pb-3">
                Email
              </div>
              <div>
                {email && email[0]?.status === "Active"
                  ? email[0]?.config_value
                  : "gymremote@gmail.com"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMap;
