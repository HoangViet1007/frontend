import { Column } from "@ant-design/charts";
import React from "react";
const doanhThuChart = (doanhThu) => {
  let data = [];
  if (doanhThu) {
    data.push(
      {
        type: "Tháng 1",
        sales: Math.abs(doanhThu?.January),
      },
      {
        type: "Tháng 2",
        sales: Math.abs(doanhThu?.February),
      },
      {
        type: "Tháng 3",
        sales: Math.abs(doanhThu?.March),
      },
      {
        type: "Tháng 4",
        sales: Math.abs(doanhThu?.April),
      },
      {
        type: "Tháng 5",
        sales: Math.abs(doanhThu?.May),
      },
      {
        type: "Tháng 6",
        sales: Math.abs(doanhThu?.June),
      },
      {
        type: "Tháng 7",
        sales: Math.abs(doanhThu?.July),
      },
      {
        type: "Tháng 8",
        sales: Math.abs(doanhThu?.August),
      },
      {
        type: "Tháng 9",
        sales: Math.abs(doanhThu?.September),
      },
      {
        type: "Tháng 10",
        sales: Math.abs(doanhThu?.October),
      },
      {
        type: "Tháng 11",
        sales: Math.abs(doanhThu?.November),
      },
      {
        type: "Tháng 12",
        sales: Math.abs(doanhThu?.December),
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

export default doanhThuChart;
