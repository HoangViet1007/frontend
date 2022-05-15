 
 
 
 
 
import React, { useEffect } from "react";
import queryString from "query-string";
import { Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import {
  getBillPayCourseAdmin,
  removeFilters,
  setFilters,
} from "../BillPayCoursePtSlice";
import ROUTER from "../../../../router/router";
import TableList from "../components/TableList";
import FilterBill from "../components/FilterBill";
const BillPayCoursePtPage = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.BillPayCourseAdmin);
  const search = useLocation().search;
  const history = useHistory();
  useEffect(() => {
    search && dispatch(setFilters(queryString.parse(search)));
    return () => {
      dispatch(removeFilters());
    };
  }, []);
  useEffect(() => {
    dispatch(getBillPayCourseAdmin(search));
  }, [search]);
  useEffect(() => {
    history.push(
      `${ROUTER.ADMIN.BILL_COURSES_PT}?${queryString.stringify(filters, {
        skipEmptyString: true,
      })}`
    );
  }, [filters]);
  return (
    <Card title="Hóa Đơn Thanh Toán Khóa Học">
      <div className="tw-flex tw-justify-end">
        <FilterBill />
      </div>
      <TableList />
    </Card>
  );
};

export default BillPayCoursePtPage;
