import { Card } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getComplains } from "../ComplainsSlice";
import TableComplain from "../components/TableComplain";
const ComplainsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComplains());
  }, []);
  return (
    <Card title="Danh Sách khiếu Nại">
      <TableComplain />
    </Card>
  );
};

export default ComplainsPage;
