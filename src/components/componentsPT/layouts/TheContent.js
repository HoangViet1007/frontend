import { CContainer } from "@coreui/react";
import React from "react";
import { Route, Switch } from "react-router-dom";
import AllSchedulePtPage from "../../../pages/PT/AllSchedulePt/AllSchedulePtPage";
import BillPayCoursePage from "../../../pages/PT/BillPayCourse/BillPayCoursePage";
import ChangePasswordPage from "../../../pages/PT/ChangePassword/ChangePasswordPage/index";
import Courses from "../../../pages/PT/Courses/CoursesPage/Courses";
import CoursesAdd from "../../../pages/PT/Courses/CoursesPage/CoursesAdd";
import CoursesEdit from "../../../pages/PT/Courses/CoursesPage/CoursesEdit";
import CoursesPlan from "../../../pages/PT/CoursesPlans/CoursesPlanPage/CoursesPlan";
import CoursesPlanAdd from "../../../pages/PT/CoursesPlans/CoursesPlanPage/CoursesPlanAdd";
import CoursesPlanEdit from "../../../pages/PT/CoursesPlans/CoursesPlanPage/CoursesPlanEdit";
import Home from "../../../pages/PT/Home/Home";
import ProfileDetailPage from "../../../pages/PT/ProfileDetail/ProfileDetailPage";
import RequestPaymentPage from "../../../pages/PT/RequestPayment/RequestPaymentPage";
import RescheduleCoursePage from "../../../pages/PT/RescheduleCourse/RescheduleCoursePage";
import SchedulePage from "../../../pages/PT/Schedule/SchedulePages";
import ScheduleDayPtPage from "../../../pages/PT/ScheduleDayPt/ScheduleDayPtPage";
import CertificatesBySpecializeDetail from "../../../pages/PT/SpecializeDetailPt/SpecializeDetailPtPage/CertificatesBySpecializeDetail";
import SpecializeDetailPt from "../../../pages/PT/SpecializeDetailPt/SpecializeDetailPtPage/SpecializeDetailPt";
import StageEdit from "../../../pages/PT/Stages/StagePage/StageEdit";
import Stages from "../../../pages/PT/Stages/StagePage/Stages";
import StagesAdd from "../../../pages/PT/Stages/StagePage/StagesAdd";
import StudentManager from "../../../pages/PT/StudentManager/StudentManager";
import ROUTER from "../../../router/router";
const TheContent = () => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Switch>
          <Route path={ROUTER.PT.HOME} component={Home} exact />
          <Route path={ROUTER.PT.COURSES} component={Courses} />
          <Route path={ROUTER.PT.COURSESADD} component={CoursesAdd} />
          <Route
            path={`${ROUTER.PT.CERTIFICATES_OF_SPECIALIZEDETAIL}/:id`}
            component={CertificatesBySpecializeDetail}
          />
          <Route
            path={ROUTER.PT.SPECIALIZEDETAILPT}
            component={SpecializeDetailPt}
          />
          <Route path={ROUTER.PT.COURSESEDITID} component={CoursesEdit} />
          <Route path={ROUTER.PT.STAGEADD} component={StagesAdd} />
          <Route path={ROUTER.PT.STAGES} exact component={Stages} />
          <Route path={ROUTER.PT.STAGEEDIT} component={StageEdit} />
          <Route path={ROUTER.PT.COURSES_PLAN} exact component={CoursesPlan} />
          <Route path={ROUTER.PT.COURSES_PLAN_ADD} component={CoursesPlanAdd} />
          <Route
            path={ROUTER.PT.COURSES_PLAN_EDIT}
            component={CoursesPlanEdit}
          />
          <Route
            path={ROUTER.PT.CHANGEPASSWORD}
            component={ChangePasswordPage}
          />
          <Route path={ROUTER.PT.PROFILE} component={ProfileDetailPage} />
          <Route path={ROUTER.PT.STUDENT_MANAGER} component={StudentManager} />
          <Route path={ROUTER.PT.SCHEDULE} component={SchedulePage} />
          <Route path={ROUTER.PT.SCHEDULES} component={AllSchedulePtPage} />
          <Route path={ROUTER.PT.SCHEDULEDAY} component={ScheduleDayPtPage} />
          <Route path={ROUTER.PT.BILL_COURSES} component={BillPayCoursePage} />
          <Route
            path={ROUTER.PT.PAYMENT_REQUEST}
            component={RequestPaymentPage}
          />
          <Route
            path={ROUTER.PT.RESCHEDULE_COURSE}
            component={RescheduleCoursePage}
          />
          {/* <Redirect from="*" to={ROUTER.PT.HOME} /> */}
        </Switch>
      </CContainer>
    </main>
  );
};

export default React.memo(TheContent);
