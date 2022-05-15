import { configureStore } from "@reduxjs/toolkit";
import CertificatesSlice from "../pages/Admin/Certificates/CertificatesSlice";
import SettingSlice from "../pages/Admin/Setting/SettingSlice";
import specializeSlice from "../pages/Admin/Specialize/SpecializeSlice";
import coursesSlice from "../pages/PT/Courses/CoursesSlice";
import RegisterPtSlice from "../pages/Website/RegisterPt/RegisterSlice";
import StagesSlice from "../pages/PT/Stages/StageSlice";
import SpecializeDetailPtSilce from "../pages/PT/SpecializeDetailPt/SpecializeDetailPtSilce";
import LoginPtSlice from "../pages/Website/LoginPt/LoginPtSlice";
import LoginCustomerSlice from "../pages/Website/LoginCustomer/LoginCustomrSlice";
import ChangeState from "./changeState";
import RegisterCustomerSlice from "../pages/Website/RegisterCustumer/RegisterCustomerSlice";
import PlansSlice from "../pages/PT/CoursesPlans/CoursesPlanSlice";
import LoginAdminSlice from "../pages/Admin/Login/LoginAdminSlice";
import AccountLevelSilce from "../pages/Admin/AccountLevel/AccountLevelSlice";
import ProfileDetailSlice from "../pages/PT/ProfileDetail/ProfileDetailSlice";
import UserSlice from "./../pages/UserSlice";
import UserAdminSilce from "../pages/Admin/User/UserAdminSlice";
import ListCoursesSlice from "../pages/Website/ListCourse/ListCoursesSlice";
import CourseDetailSlice from "../pages/Website/CourseDetail/CourseDetailSlice";
import courseStudentSlice from "../pages/Website/CoursesManager/CoursesManagerSlice";
import studentsSlice from "../pages/PT/StudentManager/StudentManagerSlice";
import SchedulePtSlice from "../pages/PT/Schedule/ScheduleSlice";
import ScheduleCustomerSlice from "../pages/Website/ScheduleCustomer/ScheduleCustomerSlice";
import AllScheduleCustomerSlice from "../pages/Website/AllScheduleCustomer/AllScheduleCustomerSlice";
import AllSchedulePtSlice from "../pages/PT/AllSchedulePt/AllSchedulePtSlice";
import PaymentSilce from "./../pages/Website/Payment/PaymentSlice";
import CoursePlanCustomerSlice from "../pages/Website/CoursePlanCustomer/CoursePlanCustomerSlice";
import CourseRequestSilce from "../pages/Admin/CourseRequest/CourseRequestSlice";
import BillCustomerSlice from "../pages/Website/BillCustomer/BillCustomerSlice";
import BillManagerSlices from "../pages/Admin/BillManager/BillManagerSlice";
import TransactionHistorySlice from "../pages/Website/TransactionHistory/TransactionHistorySlice";
import TransactionSlices from "../pages/Admin/TransactionManager/TransactionSlices";
import ComplainSilce from "./../pages/Admin/Complain/ComplainSlice";
import resetPassSlice from "../pages/Website/ResetPass/ResetSlice";
import BillPayPtSlice from "../pages/Admin/BillPayPt/BillPayPtSlice";
import RequestPaymentSlice from "../pages/PT/RequestPayment/RequestPaymentSlice";
import BillPayCoursePtSlice from "../pages/PT/BillPayCourse/BillPayCourseSlice";
import BillPayCourseAdminSlice from "../pages/Admin/BillPayCoursePt/BillPayCoursePtSlice";
import PermissionSilce from "../pages/Admin/Permission/PermissionSlice";
import RoleSilce from "../pages/Admin/Role/RoleSlice";
import PreviewImageSlice from "../pages/PreviewImageSlice";
import HomeSlice from "../pages/Website/Home/HomeSlice";
import PTSlice from "../pages/Website/ListPT/PTSlice";
import PTDetailSlice from "../pages/Website/PTDetailPage/PTDetailSlice";
import StudentRegisteredSlice from "../pages/Admin/StudentRegistered/StudentRegisteredSlice";
import HomeAdminSlice from "../pages/Admin/Home/HomeAdminSlice";
import chartSlice from "../pages/PT/Home/chartSlice";
import ManageCommentSlice from "../pages/Admin/ManageReviews/ManageReviewsSlice";
import ContactSlice from "../pages/Admin/ContactManager/ContactSlice";
import OverviewCustomerSlice from "../pages/Website/OverviewCustomer/OverviewCustomerSlice";
import ComplainsSlice from "../pages/Website/Complains/ComplainsSlice";
import RescheduleCourseSlice from "../pages/PT/RescheduleCourse/RescheduleCourseSlice";
const store = configureStore({
  reducer: {
    changeState: ChangeState,
    setting: SettingSlice,
    specialize: specializeSlice,
    certificates: CertificatesSlice,
    courses: coursesSlice,
    registerPt: RegisterPtSlice,
    registerCustomer: RegisterCustomerSlice,
    Stages: StagesSlice,
    SpecializeDetailPt: SpecializeDetailPtSilce,
    loginPt: LoginPtSlice,
    LoginCustomer: LoginCustomerSlice,
    LoginAdmin: LoginAdminSlice,
    plans: PlansSlice,
    InfoUser: UserSlice,
    AccountLevel: AccountLevelSilce,
    profile: ProfileDetailSlice,
    UserAdmin: UserAdminSilce,
    coursesClient: ListCoursesSlice,
    CourseDetail: CourseDetailSlice,
    coursesStudent: courseStudentSlice,
    students: studentsSlice,
    SchedulePt: SchedulePtSlice,
    ScheduleCustom: ScheduleCustomerSlice,
    AllscheduleCustomer: AllScheduleCustomerSlice,
    AllschedulePt: AllSchedulePtSlice,
    Payment: PaymentSilce,
    CoursePlanCustomer: CoursePlanCustomerSlice,
    CourseRequest: CourseRequestSilce,
    BillCustomer: BillCustomerSlice,
    billings: BillManagerSlices,
    TransactionHistory: TransactionHistorySlice,
    transactions: TransactionSlices,
    complain: ComplainSilce,
    resetPass: resetPassSlice,
    BillPayPt: BillPayPtSlice,
    RequestPayment: RequestPaymentSlice,
    BillPayCoursePt: BillPayCoursePtSlice,
    BillPayCourseAdmin: BillPayCourseAdminSlice,
    previewImage: PreviewImageSlice,
    HomeClinent: HomeSlice,
    Permission: PermissionSilce,
    Role: RoleSilce,
    ptList: PTSlice,
    ptDetail: PTDetailSlice,
    studentRegistered: StudentRegisteredSlice,
    homeAdmin: HomeAdminSlice,
    ptChart: chartSlice,
    ManageComment: ManageCommentSlice,
    contact: ContactSlice,
    OverviewCustomer: OverviewCustomerSlice,
    Complains: ComplainsSlice,
    RescheduleCourse: RescheduleCourseSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
