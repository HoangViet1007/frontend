import React from "react";
import ImgAbout from "../../../../assets/images/clinet/about-1.png";
import ImgAward from "../../../../assets/images/clinet/award.png";
const About = () => {
  return (
    <section className="about-section tw-pt-[80px] md:tw-pt-[126px]">
      <div className="container tw-flex tw-items-center tw-flex-col lg:tw-flex-row sm:tw-px-0">
        <div className="content-about tw-flex-1">
          <div className="tw-text-[#555555] tw-text-[18px] tw-font-medium font-roboto">
            HUẤN LUYỆN VIÊN ONLINE LÀ GÌ ?
          </div>
          <h2 className="tw-text-black tw-text-2xl md:tw-text-4xl tw-font-bold tw-my-6">
            TÁC DỤNG CỦA TẬP LUYỆN ONLINE
          </h2>
          <div className="tw-text-[#ff0000] tw-font-bold tw-text-[18px] tw-mb-6">
            HLV online là một Huấn luyện viên truyền thống ,thiết kế chế độ dinh
            dưỡng bài tập cho khách hàng đều thông qua website YM.
          </div>
          <div className="tw-text-black tw-mb-10">
            <p className="tw-text-[#777777]">
              Khi bạn tập luyện trên website của chúng tôi sẽ giúp bạn: Chủ động
              được thời gian, chi phí ưu đãi,tiếp cận được các huấn luyện viên
              chuyên nghiệp, nhiệt tình
            </p>
          </div>
          <div className="md:tw-pr-14">
            <div className="featured-block tw-flex tw-items-center tw-mb-9">
              <span className="icon flaticon-people tw-text-[60px] tw-text-black tw-transition tw-duration-500"></span>
              <div className="tw-pl-7">
                <p className="tw-text-black tw-font-bold tw-text-lg">
                  Tập Gym Chuyên Nghiệp
                </p>
                <p>Được dạy với những PT giỏi nhất trong lĩnh vực thể hình.</p>
              </div>
            </div>
            <div className="featured-block tw-flex tw-items-center tw-mb-9">
              <span className="icon flaticon-stationary-bike tw-text-[60px] tw-text-black tw-transition tw-duration-500 "></span>
              <div className="tw-pl-7">
                <p className="tw-text-black tw-font-bold tw-text-lg">
                  Tập Gym Chuyên Nghiệp
                </p>
                <p>
                  Huấn luyện viên cá nhân của chúng tôi sẽ giúp bạn tìm thấy một
                  buổi tập luyện hoàn hảo.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="img-about tw-flex-1 tw-relative">
          <img
            className="tw-object-cover tw-w-full tw-h-full"
            src={ImgAbout}
            alt="Hình ảnh không tồn tại"
          />
          <img
            className="tw-absolute tw-left-0 tw-bottom-32 float_up_down tw-hidden sm:tw-block"
            src={ImgAward}
            alt="Hình ảnh không tồn tại"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
