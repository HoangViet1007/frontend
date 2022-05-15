import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";
import { useLocation, useHistory } from "react-router-dom";
import { getBillPayPt, removeFilters, setFilters } from "../BillPayPtSlice";
import ROUTER from "../../../../router/router";
import { Card } from "antd";
import ListBillPayPt from "../components/ListBillPayPt";
import FilterBill from "../components/FilterBill";
const BillPayPtPage = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.BillPayPt);
  const search = useLocation().search;
  const history = useHistory();
  useEffect(() => {
    search && dispatch(setFilters(queryString.parse(search)));
    return () => {
      dispatch(removeFilters());
    };
  }, []);
  useEffect(() => {
    dispatch(getBillPayPt(search));
  }, [search]);
  useEffect(() => {
    history.push(
      `${ROUTER.ADMIN.BILL_PAY_FOR_PT}?${queryString.stringify(filters, {
        skipEmptyString: true,
      })}`
    );
  }, [filters]);
  return (
    <Card title="Yêu cầu Thanh Toán PT">
      <div className="tw-flex tw-justify-end">
        <FilterBill />
      </div>
      <ListBillPayPt />
    </Card>
  );
};

export default BillPayPtPage;
