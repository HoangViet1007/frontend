import React from "react";
import { Card } from "antd";
import "moment/locale/vi";
import ComplainList from './../components/ComplainList';
const ComplainPage = () => {
  return (
    <Card title={`Danh sách khiếu nại`}>
      <ComplainList />
    </Card>
  );
};

export default ComplainPage;
