import { CContainer } from "@coreui/react";
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import CoursesManagerPage from "../../../pages/Website/CoursesManager/CoursesManagerPage";
import ROUTER from "../../../router/router";
import ScheduleCustomer from "../../../pages/Website/ScheduleCustomer/ScheduleCustomerPage";
import AllScheduleCustomerPage from "../../../pages/Website/AllScheduleCustomer/AllScheduleCustomerPage";
import ScheduleDayCustomerPage from "../../../pages/Website/ScheduleDayCustomer/ScheduleDayCustomerPage";
import CoursePlanCustomerPage from "../../../pages/Website/CoursePlanCustomer/CoursePlanCustomerPage";
import Payment from "./../../../pages/Website/Payment/PaymentPage/Payment";
import PaymentInvoiceCustomer from "./../../../pages/Website/Payment/PaymentPage/PaymentInvoiceCustomer";
import BillCustomerPage from "../../../pages/Website/BillCustomer/BillCustomerPage";
import TransactionHistoryPage from "../../../pages/Website/TransactionHistory/TransactionHistoryPage";
import ConfirmCoursesPage from "../../../pages/Website/ConfirmCourses/CoursesManagerPage";
import OverviewCustomer from "../../../pages/Website/OverviewCustomer/OverviewCustomerPage";
import ComplainsPage from "../../../pages/Website/Complains/ComplainPage";
import ProfileCustomPage from "../../../pages/Website/Profile/ProfilePagePage";
import ChangePasswordPage from "../../../pages/Website/ChangePassword/ChangePasswordPage";
const Content = () => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Switch>
          <Route
            exact
            path={ROUTER.CLIENT.PROFILE}
            component={OverviewCustomer}
          />
          <Route
            path={ROUTER.CLIENT.COURSES_MANAGER}
            component={CoursesManagerPage}
          />
          <Route path={ROUTER.CLIENT.SCHEDULE} component={ScheduleCustomer} />
          <Route
            path={ROUTER.CLIENT.SCHEDULES}
            component={AllScheduleCustomerPage}
          />
          <Route
            path={ROUTER.CLIENT.SCHEDULEDAY}
            component={ScheduleDayCustomerPage}
          />
          <Route exact path={ROUTER.CLIENT.PAYMENT} component={Payment} />
          <Route
            exact
            path={ROUTER.CLIENT.PAYMENT_INVOICE_CUSTOMER}
            component={PaymentInvoiceCustomer}
          />
          <Route
            path={ROUTER.CLIENT.LESSONS}
            component={CoursePlanCustomerPage}
          />
          <Route
            path={ROUTER.CLIENT.BILL_CUSTOMER}
            component={BillCustomerPage}
          />
          <Route
            path={ROUTER.CLIENT.TRANSACTION_HISTORY}
            component={TransactionHistoryPage}
          />
          <Route
            path={ROUTER.CLIENT.PROFILECUSTOM}
            component={ProfileCustomPage}
          />
          <Route
            path={ROUTER.CLIENT.CHANGEPASSWORD}
            component={ChangePasswordPage}
          />

          <Route
            path={ROUTER.CLIENT.CONFIRM_COURSES}
            component={ConfirmCoursesPage}
          />
          <Route path={ROUTER.CLIENT.LIST_COMPLAIN} component={ComplainsPage} />

          <Redirect from="*" to={ROUTER.CLIENT.PROFILE} />
        </Switch>
      </CContainer>
    </main>
  );
};

export default React.memo(Content);
