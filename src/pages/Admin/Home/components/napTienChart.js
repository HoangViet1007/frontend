import { Column } from "@ant-design/charts";
import React from "react";
const napTienChart = (napTien) => {
  let data = [];
  if (napTien) {
    data.push(
      {
        type: "Tháng 1",
        sales: Math.abs(napTien?.January),
      },
      {
        type: "Tháng 2",
        sales: Math.abs(napTien?.February),
      },
      {
        type: "Tháng 3",
        sales: Math.abs(napTien?.March),
      },
      {
        type: "Tháng 4",
        sales: Math.abs(napTien?.April),
      },
      {
        type: "Tháng 5",
        sales: Math.abs(napTien?.May),
      },
      {
        type: "Tháng 6",
        sales: Math.abs(napTien?.June),
      },
      {
        type: "Tháng 7",
        sales: Math.abs(napTien?.July),
      },
      {
        type: "Tháng 8",
        sales: Math.abs(napTien?.August),
      },
      {
        type: "Tháng 9",
        sales: Math.abs(napTien?.September),
      },
      {
        type: "Tháng 10",
        sales: Math.abs(napTien?.October),
      },
      {
        type: "Tháng 11",
        sales: Math.abs(napTien?.November),
      },
      {
        type: "Tháng 12",
        sales: Math.abs(napTien?.December),
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

export default napTienChart;
