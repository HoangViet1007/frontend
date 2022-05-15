 
 
 
import { Card } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import {
  getBillCustomer,
  removeFilters,
  setFilters,
} from "../BillCustomerSlice";
import FilterBill from "../components/FilterBill";
import ListBill from "../components/ListBill";
import queryString from "query-string";
import ROUTER from "../../../../router/router";
const BillCustomerPage = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.BillCustomer);
  const search = useLocation().search;
  const history = useHistory();
  useEffect(() => {
    search && dispatch(setFilters(queryString.parse(search)));
    return () => {
      dispatch(removeFilters());
    };
  }, []);
  useEffect(() => {
    dispatch(getBillCustomer(search));
  }, [search]);
  useEffect(() => {
    history.push(
      `${ROUTER.CLIENT.BILL_CUSTOMER}?${queryString.stringify(filters, {
        skipEmptyString: true,
      })}`
    );
  }, [filters]);
  return (
    <Card title="Hóa Đơn">
      <div className="tw-flex tw-justify-end">
        <FilterBill />
      </div>
      <ListBill />
    </Card>
  );
};

export default BillCustomerPage;
