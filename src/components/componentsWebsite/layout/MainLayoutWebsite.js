import React, { lazy, Suspense, useEffect } from "react";
import HeaderLayout from "../../componentsWebsite/layout/HeaderLayout";
import "../../../assets/css/flaticon.css";
import "../../../assets/css/all.min.css";
import "../../../assets/css/fontawesome.min.css";
import "../../../assets/css/style-website.css";
import { Route, Switch } from "react-router-dom";
import ROUTER from "../../../router/router";
import FooterLayout from "./FooterLayout";
import ScrollToTop from "./ScrollToTop";
import ListCoursePage from "../../../pages/Website/ListCourse/ListCoursePage";
import LoginPtPage from "../../../pages/Website/LoginPt/LoginPtPage";
import RegisterPtPage from "../../../pages/Website/RegisterPt/RegisterPtPage";
import ListPtPage from "../../../pages/Website/ListPT/ListPtPage";
import PTDetailPage from "../../../pages/Website/PTDetailPage";
import Preloader from "../../../assets/images/clinet/preloader.svg";
import TypeRegisterPage from "../../../pages/Website/TypeRegister/TypeRegisterPage";
import RegisterCustomerPage from "../../../pages/Website/RegisterCustumer/RegisterCustomerPage";
import TypeLoginPage from "../../../pages/Website/TypeLogin/TypeLoginPage";
import LoginCustomerPage from "../../../pages/Website/LoginCustomer/LoginCustomerPage";
import NotFoundPage from "../../../pages/Website/NotFound/NotFoundPage";
import CourseDetailPage from "../../../pages/Website/CourseDetail/CourseDetailPage";
import PaymentInvoice from "../../../pages/Website/Payment/PaymentPage/PaymentInvoice";

import CoursesManagerPage from "../../../pages/Website/CoursesManager/CoursesManagerPage";
import ScheduleCustomer from "../../../pages/Website/ScheduleCustomer/ScheduleCustomerPage";
import PaymentInvoiceRegister from "../../../pages/Website/Payment/PaymentPage/PaymentInvoiceRegister";
// const HomePage = lazy(() => import("../../../pages/Website/Home/HomePage"));
import ResetPassPage from "../../../pages/Website/ResetPass/ResetPassPage";
import ForbiddenPage from "../../../pages/Website/ForbiddenPage";
import ContactPage from "../../../pages/Website/Contact/ContactPage";
import { getSettingClient } from "../../../pages/Admin/Setting/SettingSlice";
import { useDispatch } from "react-redux";
import Page401 from "./../../../pages/Website/Loi400/index";
const HomePage = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("../../../pages/Website/Home/HomePage")), 1000);
  });
});
const MainLayoutWebsite = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSettingClient());
  }, [dispatch]);
  return (
    <>
      <Suspense
        fallback={
          <div className="tw-h-screen tw-w-screen tw-bg-white tw-flex tw-items-center tw-justify-center">
            <img className="tw-object-cover tw-h-28" src={Preloader} alt="Hình ảnh không tồn tại" />
          </div>
        }
      >
        <HeaderLayout />
        <Switch>
          <Route exact path={ROUTER.CLIENT.HOME} component={HomePage} />
          <Route path={ROUTER.CLIENT.LISTPT} component={ListPtPage} />
          <Route path={ROUTER.CLIENT.PT_DETAIL} component={PTDetailPage} />
          <Route path={ROUTER.CLIENT.LISTCOURSE} component={ListCoursePage} />
          <Route path={ROUTER.CLIENT.LOGINPT} component={LoginPtPage} />
          <Route path={ROUTER.CLIENT.LOGINCUSTOMER} component={LoginCustomerPage} />
          <Route path={ROUTER.CLIENT.TYPELOGIN} component={TypeLoginPage} />
          <Route path={ROUTER.CLIENT.REGISTERPT} component={RegisterPtPage} />
          <Route path={ROUTER.CLIENT.REGISTERCUSTUMER} component={RegisterCustomerPage} />
          <Route path={ROUTER.CLIENT.TYPEREGISTER} component={TypeRegisterPage} />
          <Route path={ROUTER.CLIENT.RESET_PASS} component={ResetPassPage} />

          <Route path={ROUTER.CLIENT.PAYMENT_INVOICE} component={PaymentInvoice} />
          <Route path={ROUTER.CLIENT.PAYMENT_INVOICE_REGISTER} component={PaymentInvoiceRegister} />
          <Route path={ROUTER.CLIENT.REGISTERCUSTUMER} component={RegisterCustomerPage} />
          <Route path={ROUTER.CLIENT.TYPEREGISTER} component={TypeRegisterPage} />
          <Route path={ROUTER.CLIENT.COURSEDETAIL} component={CourseDetailPage} />
          <Route path={ROUTER.CLIENT.COURSES_MANAGER} component={CoursesManagerPage} />
          <Route path={ROUTER.CLIENT.SCHEDULES} component={ScheduleCustomer} />
          <Route path={ROUTER.CLIENT.FORBIDDEN_PAGE} component={ForbiddenPage} />
          <Route path={ROUTER.CLIENT.PAGE_401} component={Page401} />
          <Route path={ROUTER.CLIENT.CONTACT} component={ContactPage} />

          <Route path="/404" component={NotFoundPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
        <ScrollToTop />
        <FooterLayout />
      </Suspense>
    </>
  );
};

export default MainLayoutWebsite;
