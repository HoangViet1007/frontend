import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";

import ImgSlider1 from "../../../../assets/images/main-slider/image-1.jpg";
import ImgSlider2 from "../../../../assets/images/main-slider/image-2.png";
import { Api } from "./../../../../utils/Api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Slider = () => {
  SwiperCore.use([Autoplay, Pagination, Navigation]);
  const listSetting = useSelector((state) => state.setting.listSettingClient);
  const Slide1 = listSetting?.filter(
    (item) => item?.config_key === "Image Slide 1"
  );
  const Slide2 = listSetting?.filter(
    (item) => item?.config_key === "Image Slide 2"
  );

  return (
    <>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        // style={{
        //   "--swiper-navigation-color": "#ff0000",
        //   "--swiper-pagination-color": "#ff0000",
        // }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        className="tw-h-[300px] sm:tw-h-[400px] lg:tw-h-[600px] xl:tw-h-[850px] tw-w-full tw-relative tw-bg-black"
      >
        <SwiperSlide>
          <img
            className="tw-w-full tw-h-full tw-object-cover fade-main"
            src={
              Slide1 && Slide1[0]?.status === "Active"
                ? Slide1[0]?.config_value
                : ImgSlider1
            }
            alt="Hình ảnh không tồn tại"
          />
          <div className="crs-caption tw-absolute tw-top-1/2 tw-right-[40px] md:tw-right-1/2 tw-max-w-4xl md:tw-translate-x-full tw--translate-y-1/2 md:tw--translate-y-1/4">
            <div className="caption-content">
              <div className="crs-title tw-text-white tw-uppercase tw-text-[16px] lg:tw-text-[18px] xl:tw-text-[24px] tw-font-normal tw-transform tw-translate-x-20 tw-opacity-0 tw-visibility md:tw-mb-2 font-roboto">
                thể dục thể thao
              </div>
              <div className="tw-overflow-hidden">
                <h1 className=" tw-text-white tw-font-bold tw-text-[35px] md:tw-text-[50px] lg:tw-text-[64px] xl:tw-text-[80px] tw-leading-[1.2em] tw-transform tw--translate-y-20 tw-opacity-0 tw-visibility">
                  YM
                </h1>
              </div>
              <div className="tw-overflow-hidden">
                <div className="crs-text tw-text-white tw-text-[18px] lg:tw-text-[20px] xl:tw-text-[30px] tw-font-normal tw-leading-[1.8em] tw-transform tw-translate-y-20 tw-opacity-0 tw-visibility font-roboto">
                  Chọn chúng tôi, chọn sức khỏe
                </div>
              </div>
              <div className="tw-overflow-hidden">
                <Link to="/danh-sach-khoa-hoc">
                  <div className="crs-btn tw-transform tw-translate-y-20 tw-opacity-0 tw-visibility">
                    <div className="btn-three-outer tw-mt-5">
                      <button
                        className="btn-style-three tw-bg-transparent tw-px-3 tw-py-2"
                        name="submit-form"
                      >
                        <span className="txt tw-text-white sm:tw-px-5">
                          Đăng ký ngay
                        </span>
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="tw-w-full tw-h-full tw-object-contain"
            src={
              Slide2 && Slide2[0]?.status === "Active"
                ? Slide2[0]?.config_value
                : ImgSlider2
            }
            alt="Hình ảnh không tồn tại"
          />
          <div className="crs-caption tw-absolute tw-top-1/2 tw-right-[40px] md:tw-right-1/2 tw-max-w-4xl md:tw-translate-x-full tw--translate-y-1/2 md:tw--translate-y-1/4">
            <div className="caption-content">
              <div className="crs-title tw-text-white tw-uppercase tw-text-[16px] lg:tw-text-[18px] xl:tw-text-[24px] tw-font-normal tw-transform tw-translate-x-20 tw-opacity-0 tw-visibility md:tw-mb-2 font-roboto">
                Luyện tập hàng ngày
              </div>
              <div className="tw-overflow-hidden">
                <h1 className=" tw-text-white tw-font-bold tw-text-[35px] md:tw-text-[50px] lg:tw-text-[64px] xl:tw-text-[80px] tw-leading-[1.2em] tw-transform tw--translate-y-20 tw-opacity-0 tw-visibility">
                  YM
                </h1>
              </div>
              <div className="tw-overflow-hidden">
                <div className="crs-text tw-text-white tw-text-[18px] lg:tw-text-[20px] xl:tw-text-[30px] tw-font-normal tw-leading-[1.8em] tw-transform tw-translate-y-20 tw-opacity-0 tw-visibility font-roboto">
                  Thay đổi cơ thể, thay đổi cuộc sống
                </div>
              </div>
              <div className="tw-overflow-hidden">
                <Link to="/danh-sach-khoa-hoc">
                  <div className="crs-btn tw-transform tw-translate-y-20 tw-opacity-0 tw-visibility">
                    <div className="btn-three-outer tw-mt-5">
                      <button
                        className="btn-style-three tw-bg-transparent tw-px-3 tw-py-2"
                        name="submit-form"
                      >
                        <span className="txt tw-text-white sm:tw-px-5">
                          Đăng ký ngay
                        </span>
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
