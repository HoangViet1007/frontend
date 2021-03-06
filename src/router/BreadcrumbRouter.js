// eslint-disable-next-line
import React from "react";
import SpecializeDetailPt from "../pages/PT/SpecializeDetailPt/SpecializeDetailPtPage/SpecializeDetailPt";
import ROUTER from "../router/router";
import Courses from "./../pages/PT/Courses/CoursesPage/Courses";
import CoursesAdd from "./../pages/PT/Courses/CoursesPage/CoursesAdd";
import CoursesEdit from "./../pages/PT/Courses/CoursesPage/CoursesEdit";
import StagesAdd from "./../pages/PT/Stages/StagePage/StagesAdd";
import StageEdit from "./../pages/PT/Stages/StagePage/StageEdit";
import CoursesPlan from "./../pages/PT/CoursesPlans/CoursesPlanPage/CoursesPlan";
import CoursesPlanAdd from "./../pages/PT/CoursesPlans/CoursesPlanPage/CoursesPlanAdd";
import CoursesPlanEdit from "./../pages/PT/CoursesPlans/CoursesPlanPage/CoursesPlanEdit";
import StudentManager from "./../pages/PT/StudentManager/StudentManager";
import RequestPaymentPage from "./../pages/PT/RequestPayment/RequestPaymentPage";
import AllSchedulePtPage from "./../pages/PT/AllSchedulePt/AllSchedulePtPage";
import ScheduleDayPtPage from "./../pages/PT/ScheduleDayPt/ScheduleDayPtPage";
import BillPayCoursePage from "./../pages/PT/BillPayCourse/BillPayCoursePage/";
import Stages from "../pages/PT/Stages/StagePage/Stages";
import CertificatesBySpecializeDetail from "./../pages/PT/SpecializeDetailPt/SpecializeDetailPtPage/CertificatesBySpecializeDetail";
import Setting from "./../pages/Admin/Setting/SettingPage/Setting";
import Specialize from "./../pages/Admin/Specialize/SpecializePage/specialize";
import AccountLevel from "../pages/Admin/AccountLevel/AccountLevelPage/AccountLevel";
import User from "./../pages/Admin/User/UserPage/User";
import CourseRequest from "../pages/Admin/CourseRequest/CourseRequestPage/CourseRequest";
import CourseRequestStage from "./../pages/Admin/CourseRequest/CourseRequestPage/CourseRequestStage";
import SpecializeDetailUser from "./../pages/Admin/User/UserPage/SpecializeDetailUser";
import BillManagerPage from "./../pages/Admin/BillManager/BillManagerPage/index";
import ComplainPage from "./../pages/Admin/Complain/ComplainPage/index";
import ManageReviewsPage from "./../pages/Admin/ManageReviews/ManageReviewspage/index";
import BillPayPtPage from "./../pages/Admin/BillPayPt/BillPayPtPage/index";
import BillPayCoursePtPage from "./../pages/Admin/BillPayCoursePt/BillPayCoursePtPage/index";
import Permission from "./../pages/Admin/Permission/PermissionPage/Permission";
import Role from "./../pages/Admin/Role/RolePage/Role";
import RoleEdit from "./../pages/Admin/Role/RolePage/RoleEdit";
import RoleAdd from "./../pages/Admin/Role/RolePage/RoleAdd";
import StudentRegistered from "./../pages/Admin/StudentRegistered/index";
import TransactionPage from "../pages/Admin/TransactionManager/TransactionPage/index";
import ProfileDetailPage from "./../pages/Admin/ProfileDetail/ProfileDetailPage/index";
import ChangePasswordPage from "./../pages/Admin/ChangePassword/ChangePasswordPage/index";
const BreadcrumbRouter = [
  //pt
  { path: ROUTER.PT.HOME, exact: true, name: "T???ng quan" },
  { path: ROUTER.PT.COURSES, name: "Kho?? h???c", component: Courses },
  { path: ROUTER.PT.COURSESADD, name: "Th??m kho?? h???c", component: CoursesAdd },
  {
    path: ROUTER.PT.COURSESEDITID,
    name: "S???a kh??a h???c",
    component: CoursesEdit,
  },
  {
    path: ROUTER.PT.SPECIALIZEDETAILPT,
    exact: true,
    name: "Chuy??n m??n",
    component: SpecializeDetailPt,
  },
  {
    path: "/pt/specializedetailpt/certificatesOfspecializedetail/:id",
    name: "Danh s??ch Ch???ng ch???",
    exact: true,
    component: CertificatesBySpecializeDetail,
  },
  { path: ROUTER.PT.STAGEADD, name: "Th??m giai ??o???n", component: StagesAdd },
  { path: ROUTER.PT.STAGES, name: "Giai ??o???n", component: Stages },
  { path: ROUTER.PT.STAGEEDIT, name: "S???a giai ??o???n", component: StageEdit },
  { path: ROUTER.PT.COURSES_PLAN, name: "Bu???i h???c", component: CoursesPlan },
  {
    path: ROUTER.PT.STUDENT_MANAGER,
    name: "Danh s??ch h???c vi??n",
    component: StudentManager,
  },
  {
    path: ROUTER.PT.PAYMENT_REQUEST,
    name: "Y??u c???u thanh to??n",
    component: RequestPaymentPage,
  },
  {
    path: ROUTER.PT.COURSES_PLAN_ADD,
    name: "Th??m bu???i h???c",
    component: CoursesPlanAdd,
  },
  {
    path: ROUTER.PT.COURSES_PLAN_EDIT,
    name: "S???a bu???i h???c",
    component: CoursesPlanEdit,
  },
  {
    path: ROUTER.PT.SCHEDULES,
    name: "Danh s??ch l???ch d???y",
    component: AllSchedulePtPage,
  },
  {
    path: ROUTER.PT.SCHEDULEDAY,
    name: "L???ch d???y theo ng??y",
    component: ScheduleDayPtPage,
  },
  {
    path: ROUTER.PT.BILL_COURSES,
    name: "H??a ????n thanh to??n kh??a h???c",
    component: BillPayCoursePage,
  },

  //admin
  { path: ROUTER.ADMIN.HOME, exact: true, name: "T???ng quan" },
  { path: ROUTER.ADMIN.SETTING, name: "C???u h??nh", component: Setting },
  {
    path: ROUTER.ADMIN.SPECIALIZE,
    name: "Chuy??n m??n website",
    component: Specialize,
  },
  {
    path: ROUTER.ADMIN.ACCOUNTLEVEL,
    name: "C???p ????? PT",
    component: AccountLevel,
  },
  {
    path: ROUTER.ADMIN.USER,
    exact: true,
    name: "T??i kho???n",
    component: User,
  },
  {
    path: ROUTER.ADMIN.COURSE_REQUEST,
    exact: true,
    name: "Kho?? h???c",
    component: CourseRequest,
  },
  {
    path: ROUTER.ADMIN.COURSE_REQUEST_STAGE,
    name: "Giai ??o???n kho?? h???c",
    component: CourseRequestStage,
  },
  {
    path: `${ROUTER.ADMIN.USER_SPECIALIZEDETAILPT}/:id`,
    name: "Chuy??n m??n PT",
    component: SpecializeDetailUser,
  },
  {
    path: ROUTER.ADMIN.BILLINGS,
    name: "Ho?? ????n kh??ch h??ng",
    component: BillManagerPage,
  },
  {
    path: ROUTER.ADMIN.TRANSACTIONS,
    name: "Giao d???ch",
    component: TransactionPage,
  },
  {
    path: ROUTER.ADMIN.COMPLAIN,
    name: "Khi???u n???i",
    component: ComplainPage,
  },
  {
    path: ROUTER.ADMIN.MANAGE_REVIEWS,
    name: "Qu???n l??",
    component: ManageReviewsPage,
  },
  {
    path: ROUTER.ADMIN.BILL_PAY_FOR_PT,
    name: "Ho?? ????n PT",
    component: BillPayPtPage,
  },
  {
    path: ROUTER.ADMIN.BILL_COURSES_PT,
    name: "Ho?? ????n Kho?? h???c",
    component: BillPayCoursePtPage,
  },
  {
    path: ROUTER.ADMIN.PERMISSION,
    name: "Qu???n l?? quy???n",
    component: Permission,
  },
  {
    path: ROUTER.ADMIN.ROLE,
    exact: true,
    name: "Qu???n l?? ch???c v???",
    component: Role,
  },
  {
    path: ROUTER.ADMIN.BILL_COURSES_PT,
    name: "Th??m m???i ch???c v???",
    component: RoleAdd,
  },
  {
    path: `${ROUTER.ADMIN.ROLEEDIT}/:id`,
    name: "S???a ch???c v???",
    component: RoleEdit,
  },
  {
    path: ROUTER.ADMIN.STUDENT_REGISTERED,
    name: "H???c vi??n ????ng k??",
    component: StudentRegistered,
  },
  {
    path: ROUTER.ADMIN.STUDENT_REGISTERED,
    name: "H???c vi??n ????ng k??",
    component: StudentRegistered,
  },
  {
    path: ROUTER.ADMIN.CHANGEPASSWORD,
    name: "?????i m???t kh???u",
    component: ChangePasswordPage,
  },
  {
    path: ROUTER.ADMIN.PROFILE,
    name: "C???p nh???t t??i kho???n",
    component: ProfileDetailPage,
  },
  // custommer
  { path: ROUTER.CLIENT.PROFILE, exact: true, name: "T???ng quan" },
  {
    path: ROUTER.CLIENT.COURSES_MANAGER,
    name: "Kh??a h???c",
    component: ProfileDetailPage,
  },
  {
    path: ROUTER.CLIENT.CONFIRM_COURSES,
    name: "X??c nh???n l???ch h???c ",
    component: ProfileDetailPage,
  },
  {
    path: ROUTER.CLIENT.SCHEDULES,
    name: "T???t c??? l???ch h???c",
    component: ProfileDetailPage,
  },
  {
    path: ROUTER.CLIENT.SCHEDULEDAY,
    name: "L???ch h???c h??m nay",
    component: ProfileDetailPage,
  },
  {
    path: ROUTER.CLIENT.LIST_COMPLAIN,
    name: "Danh s??ch khi???u n???i",
    component: ProfileDetailPage,
  },
  {
    path: ROUTER.CLIENT.BILL_CUSTOMER,
    name: "H??a ????n",
    component: ProfileDetailPage,
  },
  {
    path: ROUTER.CLIENT.TRANSACTION_HISTORY,
    name: "L???ch s??? giao d???ch",
    component: ProfileDetailPage,
  },
];

export default BreadcrumbRouter;
