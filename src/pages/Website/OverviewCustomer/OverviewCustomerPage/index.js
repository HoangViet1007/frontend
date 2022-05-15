import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOverviews } from "../OverviewCustomerSlice";
import { ReadOutlined, DollarCircleOutlined } from "@ant-design/icons";
import { convertCurrency } from "../../../../utils";
import { Column } from "@ant-design/charts";
import { Card, Select } from "antd";
import moment from "moment";
import "moment/locale/vi";
import queryString from "query-string";
import ScheduleDay from "../components/ScheduleDay";
const OverviewCustomer = () => {
  const dispatch = useDispatch();
  const { listOverview } = useSelector((state) => state.OverviewCustomer);
  const { infoUser: user } = useSelector((state) => state.InfoUser);
  const currentYear = moment().year();
  const [selectYear, setSelectYear] = useState({
    year_loaded_money: currentYear,
    year_money_spent: currentYear,
  });
  useEffect(() => {
    dispatch(getOverviews(queryString.stringify(selectYear)));
  }, [selectYear]);

  const onchangeYearMoneySpent = (value) => {
    setSelectYear({ ...selectYear, year_money_spent: value });
  };
  const onchangeYearMoneyloaded = (value) => {
    setSelectYear({ ...selectYear, year_loaded_money: value });
  };
  let profitData = listOverview?.sum_money_loaded_money_month_in_year;
  const profitChart = () => {
    let data = [];
    if (profitData) {
      data.push(
        {
          type: "Tháng 1",
          sales: Math.abs(profitData?.January),
        },
        {
          type: "Tháng 2",
          sales: Math.abs(profitData?.February),
        },
        {
          type: "Tháng 3",
          sales: Math.abs(profitData?.March),
        },
        {
          type: "Tháng 4",
          sales: Math.abs(profitData?.April),
        },
        {
          type: "Tháng 5",
          sales: Math.abs(profitData?.May),
        },
        {
          type: "Tháng 6",
          sales: Math.abs(profitData?.June),
        },
        {
          type: "Tháng 7",
          sales: Math.abs(profitData?.July),
        },
        {
          type: "Tháng 8",
          sales: Math.abs(profitData?.August),
        },
        {
          type: "Tháng 9",
          sales: Math.abs(profitData?.September),
        },
        {
          type: "Tháng 10",
          sales: Math.abs(profitData?.October),
        },
        {
          type: "Tháng 11",
          sales: Math.abs(profitData?.November),
        },
        {
          type: "Tháng 12",
          sales: Math.abs(profitData?.December),
        }
      );
    }

    const config = {
      data,
      xField: "type",
      yField: "sales",
      label: {
        style: {
          fill: "#FFFFFF",
          opacity: 0.6,
        },
      },
      xAxis: {
        label: {
          autoHide: false,
          autoRotate: true,
        },
      },
      meta: {
        type: {
          alias: "Tháng",
        },
        sales: {
          alias: "Tổng tiền",
        },
      },
    };
    return <Column {...config} />;
  };
  let sumMoneySpent = listOverview?.sum_money_spent_month_in_year;
  const sumMoneySpentChart = () => {
    let dataSumMoneySpent = [];
    if (sumMoneySpent) {
      dataSumMoneySpent.push(
        {
          month: "Tháng 1",
          totalMoney: Math.abs(sumMoneySpent?.January),
        },
        {
          month: "Tháng 2",
          totalMoney: Math.abs(sumMoneySpent?.February),
        },
        {
          month: "Tháng 3",
          totalMoney: Math.abs(sumMoneySpent?.March),
        },
        {
          month: "Tháng 4",
          totalMoney: Math.abs(sumMoneySpent?.April),
        },
        {
          month: "Tháng 5",
          totalMoney: Math.abs(sumMoneySpent?.May),
        },
        {
          month: "Tháng 6",
          totalMoney: Math.abs(sumMoneySpent?.June),
        },
        {
          month: "Tháng 7",
          totalMoney: Math.abs(sumMoneySpent?.July),
        },
        {
          month: "Tháng 8",
          totalMoney: Math.abs(sumMoneySpent?.August),
        },
        {
          month: "Tháng 9",
          totalMoney: Math.abs(sumMoneySpent?.September),
        },
        {
          month: "Tháng 10",
          totalMoney: Math.abs(sumMoneySpent?.October),
        },
        {
          month: "Tháng 11",
          totalMoney: Math.abs(sumMoneySpent?.November),
        },
        {
          month: "Tháng 12",
          totalMoney: Math.abs(sumMoneySpent?.December),
        }
      );
    }
    const configSpent = {
      data: dataSumMoneySpent,
      xField: "month",
      yField: "totalMoney",
      label: {
        style: {
          fill: "#FFFFFF",
          opacity: 0.6,
        },
      },
      xAxis: {
        label: {
          autoHide: false,
          autoRotate: true,
        },
      },
      meta: {
        month: {
          alias: "Tháng",
        },
        totalMoney: {
          alias: "Tổng tiền",
        },
      },
    };
    return <Column {...configSpent} />;
  };
  return (
    <>
      <div className="tw-flex tw-flex-col lg:tw-flex-row tw-items-stretch">
        <div className="tw-flex-1 lg:tw-pr-2">
          <Card style={{ borderRadius: "0.5rem" }}>
            <div className="tw-flex tw-flex-col md:tw-flex-row tw-text-blue-500">
              <div className="tw-w-2/3 tw-font-bold tw-m-4 ">
                <div className="tw-text-3xl tw-font-black tw-my-2 ">
                  Hello, {user?.name}
                </div>
                <p className="tw-text-lg tw-font-sans">
                  Chúng ta không thể bắt đầu lại. Nhưng chúng ta có thể bắt đầu
                  ngay bây giờ và tạo ra một kết thúc mới. Hãy tập luyện chăm
                  chỉ nhé.
                </p>
              </div>
              <div>
                <span className="tw-w-2/3 tw-text-green-500 tw-font-semibold tw-text-lg">
                  <img
                    src="https://i.pinimg.com/originals/51/02/19/5102191ca922fa1e8756a346d0fce2eb.gif"
                    width={200}
                  />
                </span>
              </div>
            </div>
          </Card>
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4 tw-my-4">
            <div className="tw-bg-white tw-shadow-md tw-rounded-lg tw-px-3 tw-py-5 tw-flex tw-items-center tw-justify-between">
              <div className="tw-bg-yellow-500 tw-bg-opacity-20 tw-text-white tw-rounded-lg tw-w-[50px] tw-h-[50px] tw-flex tw-items-center tw-justify-center">
                <ReadOutlined className="tw-text-2xl tw-leading-[0] tw-text-yellow-500" />
              </div>
              <div className="tw-text-right">
                <div className="tw-text-gray-400 tw-mb-1">Khóa học</div>
                <div className="tw-font-semibold tw-text-xl ">
                  {listOverview?.count_course}
                </div>
              </div>
            </div>
            <div className="tw-bg-white tw-shadow-md tw-rounded-lg tw-px-3 tw-py-5 tw-flex tw-items-center tw-justify-between">
              <div className="tw-bg-green-500 tw-bg-opacity-20 tw-text-white tw-rounded-lg tw-w-[50px] tw-h-[50px] tw-flex tw-items-center tw-justify-center">
                <DollarCircleOutlined className="tw-text-2xl tw-leading-[0] tw-text-green-500" />
              </div>
              <div className="tw-text-right">
                <div className="tw-text-gray-400 tw-mb-1">Tổng Tiền đã nạp</div>
                <div className="tw-font-semibold tw-text-xl tw-text-right">
                  {convertCurrency(listOverview?.money_loaded_years)}
                </div>
              </div>
            </div>
            <div className="tw-bg-white tw-shadow-md tw-rounded-lg tw-px-3 tw-py-5 tw-flex tw-items-center tw-justify-between">
              <div className="tw-bg-blue-500 tw-bg-opacity-20 tw-text-white tw-rounded-lg tw-w-[50px] tw-h-[50px] tw-flex tw-items-center tw-justify-center">
                <DollarCircleOutlined className="tw-text-2xl tw-leading-[0] tw-text-blue-500" />
              </div>
              <div className="tw-text-right">
                <div className="tw-text-gray-400 tw-mb-1">
                  Tổng Tiền đã dùng
                </div>
                <div className="tw-font-semibold tw-text-xl tw-text-right">
                  {convertCurrency(listOverview?.money_spent_years)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tw-w-[30%] tw-self-auto lg:tw-pl-2 tw-mb-4">
          <ScheduleDay />
        </div>
      </div>
      <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-4">
        <Card
          title="Thống kê tiền đã nạp"
          style={{ borderRadius: "0.5rem" }}
          extra={
            <Select
              defaultValue={currentYear}
              bordered={false}
              className="tw-border-b-2 hover:tw-border-blue-500"
              onChange={onchangeYearMoneyloaded}
            >
              <Select.Option value={currentYear - 1}>
                {currentYear - 1}
              </Select.Option>
              <Select.Option value={currentYear}>{currentYear}</Select.Option>
            </Select>
          }
        >
          {profitChart()}
        </Card>

        <Card
          title="Thống kê tiền đã sử dụng"
          style={{ borderRadius: "0.5rem" }}
          extra={
            <Select
              defaultValue={currentYear}
              bordered={false}
              className="tw-border-b-2 hover:tw-border-blue-500"
              onChange={onchangeYearMoneySpent}
            >
              <Select.Option value={currentYear - 1}>
                {currentYear - 1}
              </Select.Option>
              <Select.Option value={currentYear}>{currentYear}</Select.Option>
            </Select>
          }
        >
          {sumMoneySpentChart()}
        </Card>
      </div>
    </>
  );
};

export default OverviewCustomer;
