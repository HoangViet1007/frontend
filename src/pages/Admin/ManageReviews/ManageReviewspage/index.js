import { Card } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import TableComment from "../components/TableComment";
import { getManageComments, setFilters } from "../ManageReviewsSlice";
import ROUTER from "../../../../router/router";
import queryString from "query-string";
const ManageReviewsPage = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.ManageComment);
  const search = useLocation().search;
  const history = useHistory();
  useEffect(() => {
    search && dispatch(setFilters(queryString.parse(search)));
    return () => {
      dispatch(setFilters({}));
    };
  }, []);
  useEffect(() => {
    dispatch(getManageComments(search));
  }, [search]);
  useEffect(() => {
    history.push(
      `${ROUTER.ADMIN.MANAGE_REVIEWS}?${queryString.stringify(filters, {
        skipEmptyString: true,
      })}`
    );
  }, [filters]);
  return (
    <Card title="Quản Lý Đánh giá khóa Học">
      <TableComment />
    </Card>
  );
};

export default ManageReviewsPage;
