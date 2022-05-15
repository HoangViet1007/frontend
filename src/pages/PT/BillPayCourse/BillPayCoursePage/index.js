import React, { useEffect } from "react";
import queryString from "query-string";
import { Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import TableList from "../components/TableList";
import {
  getBillPayCoursePt,
  removeFilters,
  setFilters,
} from "../BillPayCourseSlice";
import ROUTER from "../../../../router/router";
import FilterBill from "../components/FilterBill";
const BillPayCoursePage = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.BillPayCoursePt);
  const search = useLocation().search;
  const history = useHistory();
  useEffect(() => {
    search && dispatch(setFilters(queryString.parse(search)));
    return () => {
      dispatch(removeFilters());
    };
  }, []);
  useEffect(() => {
    dispatch(getBillPayCoursePt(search));
  }, [search]);
  useEffect(() => {
    history.push(
      `${ROUTER.PT.BILL_COURSES}?${queryString.stringify(filters, {
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

export default BillPayCoursePage;
