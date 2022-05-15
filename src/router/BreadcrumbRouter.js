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
  { path: ROUTER.PT.HOME, exact: true, name: "Tổng quan" },
  { path: ROUTER.PT.COURSES, name: "Khoá học", component: Courses },
  { path: ROUTER.PT.COURSESADD, name: "Thêm khoá học", component: CoursesAdd },
  {
    path: ROUTER.PT.COURSESEDITID,
    name: "Sửa khóa học",
    component: CoursesEdit,
  },
  {
    path: ROUTER.PT.SPECIALIZEDETAILPT,
    exact: true,
    name: "Chuyên môn",
    component: SpecializeDetailPt,
  },
  {
    path: "/pt/specializedetailpt/certificatesOfspecializedetail/:id",
    name: "Danh sách Chứng chỉ",
    exact: true,
    component: CertificatesBySpecializeDetail,
  },
  { path: ROUTER.PT.STAGEADD, name: "Thêm giai đoạn", component: StagesAdd },
  { path: ROUTER.PT.STAGES, name: "Giai đoạn", component: Stages },
  { path: ROUTER.PT.STAGEEDIT, name: "Sửa giai đoạn", component: StageEdit },
  { path: ROUTER.PT.COURSES_PLAN, name: "Buổi học", component: CoursesPlan },
  {
    path: ROUTER.PT.STUDENT_MANAGER,
    name: "Danh sách học viên",
    component: StudentManager,
  },
  {
    path: ROUTER.PT.PAYMENT_REQUEST,
    name: "Yêu cầu thanh toán",
    component: RequestPaymentPage,
  },
  {
    path: ROUTER.PT.COURSES_PLAN_ADD,
    name: "Thêm buổi học",
    component: CoursesPlanAdd,
  },
  {
    path: ROUTER.PT.COURSES_PLAN_EDIT,
    name: "Sửa buổi học",
    component: CoursesPlanEdit,
  },
  {
    path: ROUTER.PT.SCHEDULES,
    name: "Danh sách lịch dạy",
    component: AllSchedulePtPage,
  },
  {
    path: ROUTER.PT.SCHEDULEDAY,
    name: "Lịch dạy theo ngày",
    component: ScheduleDayPtPage,
  },
  {
    path: ROUTER.PT.BILL_COURSES,
    name: "Hóa đơn thanh toán khóa học",
    component: BillPayCoursePage,
  },

  //admin
  { path: ROUTER.ADMIN.HOME, exact: true, name: "Tổng quan" },
  { path: ROUTER.ADMIN.SETTING, name: "Cấu hình", component: Setting },
  {
    path: ROUTER.ADMIN.SPECIALIZE,
    name: "Chuyên môn website",
    component: Specialize,
  },
  {
    path: ROUTER.ADMIN.ACCOUNTLEVEL,
    name: "Cấp độ PT",
    component: AccountLevel,
  },
  {
    path: ROUTER.ADMIN.USER,
    exact: true,
    name: "Tài khoản",
    component: User,
  },
  {
    path: ROUTER.ADMIN.COURSE_REQUEST,
    exact: true,
    name: "Khoá học",
    component: CourseRequest,
  },
  {
    path: ROUTER.ADMIN.COURSE_REQUEST_STAGE,
    name: "Giai đoạn khoá học",
    component: CourseRequestStage,
  },
  {
    path: `${ROUTER.ADMIN.USER_SPECIALIZEDETAILPT}/:id`,
    name: "Chuyên môn PT",
    component: SpecializeDetailUser,
  },
  {
    path: ROUTER.ADMIN.BILLINGS,
    name: "Hoá đơn khách hàng",
    component: BillManagerPage,
  },
  {
    path: ROUTER.ADMIN.TRANSACTIONS,
    name: "Giao dịch",
    component: TransactionPage,
  },
  {
    path: ROUTER.ADMIN.COMPLAIN,
    name: "Khiếu nại",
    component: ComplainPage,
  },
  {
    path: ROUTER.ADMIN.MANAGE_REVIEWS,
    name: "Quản lý",
    component: ManageReviewsPage,
  },
  {
    path: ROUTER.ADMIN.BILL_PAY_FOR_PT,
    name: "Hoá đơn PT",
    component: BillPayPtPage,
  },
  {
    path: ROUTER.ADMIN.BILL_COURSES_PT,
    name: "Hoá đơn Khoá học",
    component: BillPayCoursePtPage,
  },
  {
    path: ROUTER.ADMIN.PERMISSION,
    name: "Quản lý quyền",
    component: Permission,
  },
  {
    path: ROUTER.ADMIN.ROLE,
    exact: true,
    name: "Quản lý chức vụ",
    component: Role,
  },
  {
    path: ROUTER.ADMIN.BILL_COURSES_PT,
    name: "Thêm mới chức vụ",
    component: RoleAdd,
  },
  {
    path: `${ROUTER.ADMIN.ROLEEDIT}/:id`,
    name: "Sửa chức vụ",
    component: RoleEdit,
  },
  {
    path: ROUTER.ADMIN.STUDENT_REGISTERED,
    name: "Học viên đăng kí",
    component: StudentRegistered,
  },
  {
    path: ROUTER.ADMIN.STUDENT_REGISTERED,
    name: "Học viên đăng kí",
    component: StudentRegistered,
  },
  {
    path: ROUTER.ADMIN.CHANGEPASSWORD,
    name: "Đổi mật khẩu",
    component: ChangePasswordPage,
  },
  {
    path: ROUTER.ADMIN.PROFILE,
    name: "Cập nhật tài khoản",
    component: ProfileDetailPage,
  },
  // custommer
  { path: ROUTER.CLIENT.PROFILE, exact: true, name: "Tổng quan" },
  {
    path: ROUTER.CLIENT.COURSES_MANAGER,
    name: "Khóa học",
    component: ProfileDetailPage,
  },
  {
    path: ROUTER.CLIENT.CONFIRM_COURSES,
    name: "Xác nhận lịch học ",
    component: ProfileDetailPage,
  },
  {
    path: ROUTER.CLIENT.SCHEDULES,
    name: "Tất cả lịch học",
    component: ProfileDetailPage,
  },
  {
    path: ROUTER.CLIENT.SCHEDULEDAY,
    name: "Lịch học hôm nay",
    component: ProfileDetailPage,
  },
  {
    path: ROUTER.CLIENT.LIST_COMPLAIN,
    name: "Danh sách khiếu nại",
    component: ProfileDetailPage,
  },
  {
    path: ROUTER.CLIENT.BILL_CUSTOMER,
    name: "Hóa đơn",
    component: ProfileDetailPage,
  },
  {
    path: ROUTER.CLIENT.TRANSACTION_HISTORY,
    name: "Lịch sử giao dịch",
    component: ProfileDetailPage,
  },
];

export default BreadcrumbRouter;
