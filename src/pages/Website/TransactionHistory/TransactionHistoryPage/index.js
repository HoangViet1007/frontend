 
 
import { Card } from "antd";
import queryString from "query-string";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ROUTER from "../../../../router/router";
import FilterTransactionHistory from "../components/FilterTransactionHistory";
import ListTransactionHistory from "../components/listTransactionHistory";
import { getTransactionHistory, removeFilters, setFilters } from "../TransactionHistorySlice";
const TransactionHistoryPage = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.TransactionHistory);

  const history = useHistory();
  const search = useLocation().search;
  useEffect(() => {
    search && dispatch(setFilters(queryString.parse(search)));
    return () => {
      dispatch(removeFilters());
    };
  }, []);
  useEffect(() => {
    dispatch(getTransactionHistory(search));
  }, [search]);
  useEffect(() => {
    history.push(
      `${ROUTER.CLIENT.TRANSACTION_HISTORY}?${queryString.stringify(filters, {
        skipEmptyString: true,
      })}`
    );
  }, [filters]);
  return (
    <Card title="Lịch Sử Giao Dịch">
      <div className="tw-flex tw-justify-end">
        <FilterTransactionHistory />
      </div>
      <ListTransactionHistory />
    </Card>
  );
};

export default TransactionHistoryPage;
