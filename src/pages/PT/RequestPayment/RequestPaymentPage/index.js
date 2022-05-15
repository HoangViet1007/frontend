 
 
 
 
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import ROUTER from "../../../../router/router";
import TableList from "../components/TableList";
import queryString from "query-string";
import {
  getRequestPayment,
  removeFilters,
  setFilters,
} from "../RequestPaymentSlice";
import { Card } from "antd";
import FilterBill from "../components/FilterBill";

const RequestPaymentPage = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.RequestPayment);
  const search = useLocation().search;
  const history = useHistory();
  useEffect(() => {
    search && dispatch(setFilters(queryString.parse(search)));
    return () => {
      dispatch(removeFilters());
    };
  }, []);
  useEffect(() => {
    dispatch(getRequestPayment(search));
  }, [search]);
  useEffect(() => {
    history.push(
      `${ROUTER.PT.PAYMENT_REQUEST}?${queryString.stringify(filters, {
        skipEmptyString: true,
      })}`
    );
  }, [filters]);
  return (
    <Card title="Yêu Cầu Thanh Toán">
      <div className="tw-flex tw-justify-end">
        <FilterBill />
      </div>
      <TableList />
    </Card>
  );
};

export default RequestPaymentPage;
