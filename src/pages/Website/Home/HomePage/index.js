import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContact from "../../../../components/componentsWebsite/FormContact";
import ListCourse from "../../../../components/componentsWebsite/ShowListCourse/ListCourse";
import ListPT from "../../../../components/componentsWebsite/ShowListPT/ListPT";
import About from "../components/About";
import BMI from "../components/BMI";
import ContactMap from "../components/ContactMap";
import Slider from "../components/Slider";
import { getDataHome } from "../HomeSlice";
import bgPt from "../../../../assets/images/background/1.jpg";
const HomePage = () => {
  const dispatch = useDispatch();
  const { listCourse, listPt } = useSelector((state) => state.HomeClinent);
  useEffect(() => {
    dispatch(getDataHome());
  }, []);
  return (
    <>
      <Slider />
      <About />
      <section className="course-box tw-bg-[#222222]">
        <h3 className="tw-text-white tw-py-10 tw-text-center tw-font-medium tw-text-xl">
          KHÓA HỌC NỔI BẬT
        </h3>
        <ListCourse Courses={listCourse} />
      </section>

      <BMI />
      <div className="tw-py-[90px]" style={{ backgroundImage: `url(${bgPt})` }}>
        <div className="container sm:tw-px-0">
          <section className="list-pt-box">
            <h3 className="tw-uppercase tw-font-medium tw-text-white tw-text-center tw-text-xl tw-pb-12">
              huấn luận viên nổi bật
            </h3>
            <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-5">
              <ListPT listPt={listPt} />
            </div>
          </section>
        </div>
      </div>
      <ContactMap />
      <FormContact />
    </>
  );
};

export default HomePage;
