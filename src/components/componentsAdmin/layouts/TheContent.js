import { CContainer } from "@coreui/react";
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AccountLevel from "../../../pages/Admin/AccountLevel/AccountLevelPage/AccountLevel";
import Certificates from "../../../pages/Admin/Certificates/CertificatesPage/Certificates";
import CourseRequest from "../../../pages/Admin/CourseRequest/CourseRequestPage/CourseRequest";
import Home from "../../../pages/Admin/Home/Home";
import Setting from "../../../pages/Admin/Setting/SettingPage/Setting";
import SettingAdd from "../../../pages/Admin/Setting/SettingPage/SettingAdd";
import Specialize from "../../../pages/Admin/Specialize/SpecializePage/specialize";
import ROUTER from "../../../router/router";
import SpecializeDetailUser from "./../../../pages/Admin/User/UserPage/SpecializeDetailUser";
import BillManagerPage from "../../../pages/Admin/BillManager/BillManagerPage";
import User from "./../../../pages/Admin/User/UserPage/User";
import CourseRequestStage from "./../../../pages/Admin/CourseRequest/CourseRequestPage/CourseRequestStage";

import TransactionPage from "../../../pages/Admin/TransactionManager/TransactionPage";
import ComplainPage from "./../../../pages/Admin/Complain/ComplainPage/index";
import BillPayPtPage from "../../../pages/Admin/BillPayPt/BillPayPtPage";
import BillPayCoursePtPage from "../../../pages/Admin/BillPayCoursePt/BillPayCoursePtPage";
import ManageReviewsPage from "../../../pages/Admin/ManageReviews/ManageReviewspage";
import Permission from "./../../../pages/Admin/Permission/PermissionPage/Permission";
import Role from "./../../../pages/Admin/Role/RolePage/Role";
import RoleAdd from "./../../../pages/Admin/Role/RolePage/RoleAdd";
import RoleEdit from "./../../../pages/Admin/Role/RolePage/RoleEdit";
import StudentRegistered from "../../../pages/Admin/StudentRegistered";
import ContactManagerPage from "../../../pages/Admin/ContactManager";
import ReplyMailPage from "../../../pages/Admin/ContactManager/ReplyMailPage";
import ProfileDetailPage from './../../../pages/Admin/ProfileDetail/ProfileDetailPage/index';
import ChangePasswordPage from './../../../pages/Admin/ChangePassword/ChangePasswordPage/index';
const TheContent = () => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Switch>
          <Route path={ROUTER.ADMIN.HOME} component={Home} exact />
          <Route path={ROUTER.ADMIN.SETTING} component={Setting} />
          <Route path={ROUTER.ADMIN.SETTINGADD} component={SettingAdd} />
          <Route path={ROUTER.ADMIN.SPECIALIZE} component={Specialize} />
          {/* <Route path={ROUTER.ADMIN.CERTIFICATES} component={Certificates} /> */}
          <Route path={ROUTER.ADMIN.ACCOUNTLEVEL} exact component={AccountLevel} />
          <Route path={ROUTER.ADMIN.USER} exact component={User} />
          <Route path={ROUTER.ADMIN.COURSE_REQUEST} exact component={CourseRequest} />
          <Route path={ROUTER.ADMIN.COURSE_REQUEST_STAGE} exact component={CourseRequestStage} />
          <Route
            path={`${ROUTER.ADMIN.USER_SPECIALIZEDETAILPT}/:id`}
            component={SpecializeDetailUser}
          />

          <Route path={ROUTER.ADMIN.BILLINGS} component={BillManagerPage} />
          <Route path={ROUTER.ADMIN.TRANSACTIONS} component={TransactionPage} />
          <Route path={ROUTER.ADMIN.COMPLAIN} component={ComplainPage} />

          <Route path={ROUTER.ADMIN.MANAGE_REVIEWS} component={ManageReviewsPage} />
          <Route path={ROUTER.ADMIN.BILL_PAY_FOR_PT} component={BillPayPtPage} />
          <Route path={ROUTER.ADMIN.BILL_COURSES_PT} component={BillPayCoursePtPage} />
          <Route path={ROUTER.ADMIN.PERMISSION} component={Permission} />
          <Route path={ROUTER.ADMIN.ROLE} component={Role} />
          <Route path={ROUTER.ADMIN.ROLEADD} component={RoleAdd} />
          <Route path={`${ROUTER.ADMIN.ROLEEDIT}/:id`} component={RoleEdit} />
          <Route path={`${ROUTER.ADMIN.STUDENT_REGISTERED}`} component={StudentRegistered} />

          <Route path={`${ROUTER.ADMIN.CONTACT}`} component={ContactManagerPage} />

          <Route path={`${ROUTER.ADMIN.REPLY_CONTACT}`} component={ReplyMailPage} />
          <Route path={`${ROUTER.ADMIN.CHANGEPASSWORD}`} component={ChangePasswordPage} />
          <Route path={`${ROUTER.ADMIN.PROFILE}`} component={ProfileDetailPage} />

          {/* <Route path={ROUTER.ADMIN.LOGIN} exact component={LoginAdmin} /> */}
          <Redirect from="*" to={ROUTER.PT.HOME} />
        </Switch>
      </CContainer>
    </main>
  );
};

export default React.memo(TheContent);
