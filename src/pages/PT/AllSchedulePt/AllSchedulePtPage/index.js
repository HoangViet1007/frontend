import { Card } from "antd";
import React from "react";
import CalenderPt from "../components/CalenderPt";

const AllSchedulePtPage = () => {
  return (
    <Card title="Danh sách lịch dạy">
      <CalenderPt />
      <div className="tw-mt-5 tw-flex tw-items-center tw-justify-center">
        <div className="tw-flex tw-items-center tw-pr-2">
          <div className="tw-p-1.5 tw-bg-[#ffa500]"></div>
          <div className="tw-font-medium tw-pl-1 tw-text-gray-500">
            Hoàn thành
          </div>
        </div>
        <div className="tw-flex tw-items-center tw-pl-2">
          <div className="tw-p-1.5 tw-bg-[#008000]"></div>
          <div className="tw-font-medium tw-pl-1 tw-text-gray-500">
            Chưa hoàn thành
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AllSchedulePtPage;
