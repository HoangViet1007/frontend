import { Column } from "@ant-design/charts";
import {
  DollarCircleOutlined,
  DatabaseOutlined,
  RightOutlined,
  UserOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { Button, Card, List, Select } from "antd";
import moment from "moment";
import "moment/locale/vi";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ROUTER from "../../../router/router";
import { convertCurrency, querySearch } from "../../../utils";
import { getEventsPt } from "../AllSchedulePt/AllSchedulePtSlice";
import { getChart } from "./chartSlice";

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { infoUser: user } = useSelector((state) => state.InfoUser);
  const presentTime = moment().format("YYYY-MM-DD");
  const { events: data } = useSelector((state) => state.AllschedulePt);
  const { item: chartData } = useSelector((state) => state.ptChart);

  async function getCharts() {
    dispatch(getChart());
  }
  function handleChangeDoanhThu(value) {
    querySearch(value, "year_sum_money", history);
  }
  function handleChangeHocVien(value) {
    querySearch(value, "year_count_student", history);
  }

  useEffect(() => {
    const { search } = history.location;
    let params;
    const filterOptions = search.split("?")[1];
    if (filterOptions !== undefined) {
      params = `{"${decodeURI(filterOptions)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')}"}`;
      dispatch(getChart(JSON.parse(params)));
    } else {
      dispatch(getChart(null));
    }
  }, [dispatch, history.location]);

  useEffect(() => {
    getCharts();
    dispatch(getEventsPt(presentTime));
  }, []);

  let profitData = chartData?.sum_total_in_month;
  let studentData = chartData?.count_student_month_in_year;
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

  const studentChart = () => {
    let data = [];
    if (studentData) {
      data.push(
        {
          type: "Tháng 1",
          sales: Math.abs(studentData?.January),
        },
        {
          type: "Tháng 2",
          sales: Math.abs(studentData?.February),
        },
        {
          type: "Tháng 3",
          sales: Math.abs(studentData?.March),
        },
        {
          type: "Tháng 4",
          sales: Math.abs(studentData?.April),
        },
        {
          type: "Tháng 5",
          sales: Math.abs(studentData?.May),
        },
        {
          type: "Tháng 6",
          sales: Math.abs(studentData?.June),
        },
        {
          type: "Tháng 7",
          sales: Math.abs(studentData?.July),
        },
        {
          type: "Tháng 8",
          sales: Math.abs(studentData?.August),
        },
        {
          type: "Tháng 9",
          sales: Math.abs(studentData?.September),
        },
        {
          type: "Tháng 10",
          sales: Math.abs(studentData?.October),
        },
        {
          type: "Tháng 11",
          sales: Math.abs(studentData?.November),
        },
        {
          type: "Tháng 12",
          sales: Math.abs(studentData?.December),
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
          alias: "Tổng số",
        },
      },
    };
    return <Column {...config} />;
  };

  return (
    <>
      <div className="tw-flex tw-flex-col lg:tw-flex-row tw-items-stretch">
        <div className="tw-flex-1 lg:tw-pr-2">
          <Card style={{ borderRadius: "0.5rem" }}>
            <div className="tw-flex tw-mb-6">
              <div className="tw-w-2/3 tw-font-bold tw-m-4 tw-text-blue-500">
                <div className="tw-text-3xl tw-font-black tw-my-2">
                  Xin chào, {user?.name}
                </div>
                <p className="tw-text-lg tw-font-sans">
                  Bạn đang nắm giữ cấp độ{" "}
                  <span className="tw-text-green-500">
                    {user?.account_levels?.name}
                  </span>
                  , giới hạn khóa học bạn có thể thêm là{" "}
                  <span className="tw-text-green-500">
                    {user?.account_levels?.course_number}
                  </span>
                  . Hãy tích cực dạy tốt để đạt được những cấp độ cao hơn nhé !
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
          <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-4 tw-my-4">
            <div className="tw-bg-white tw-shadow-md tw-rounded-lg tw-px-3 tw-py-5 tw-flex tw-items-center tw-justify-between">
              <div className="tw-bg-blue-400 tw-bg-opacity-20 tw-text-white tw-rounded-lg tw-w-[50px] tw-h-[50px] tw-flex tw-items-center tw-justify-center">
                <DollarCircleOutlined className="tw-text-2xl tw-leading-[0] tw-text-blue-400" />
              </div>
              <div>
                <div className="tw-text-gray-400 tw-mb-1 tw-text-right">
                  Tổng thu nhập
                </div>
                <div className="tw-font-semibold tw-text-base tw-text-right">
                  {convertCurrency(chartData?.sum_money)}
                </div>
              </div>
            </div>

            <div className="tw-bg-white tw-shadow-md tw-rounded-lg tw-px-3 tw-py-5 tw-flex tw-items-center tw-justify-between">
              <div className="tw-bg-blue-400 tw-bg-opacity-20 tw-text-white tw-rounded-lg tw-w-[50px] tw-h-[50px] tw-flex tw-items-center tw-justify-center">
                <DollarCircleOutlined className="tw-text-2xl tw-leading-[0] tw-text-blue-400" />
              </div>
              <div>
                <div className="tw-text-gray-400 tw-mb-1">Thu nhập năm nay</div>
                <div className="tw-font-semibold tw-text-base tw-text-right">
                  {convertCurrency(chartData?.sum_total_year)}
                </div>
              </div>
            </div>

            <div className="tw-bg-white tw-shadow-md tw-rounded-lg tw-px-3 tw-py-5 tw-flex tw-items-center tw-justify-between">
              <div className="tw-bg-blue-500 tw-bg-opacity-20 tw-text-white tw-rounded-lg tw-w-[50px] tw-h-[50px] tw-flex tw-items-center tw-justify-center">
                <CopyOutlined className="tw-text-2xl tw-leading-[0] tw-text-blue-500" />
              </div>
              <div>
                <div className="tw-text-gray-400 tw-mb-1 tw-text-right">
                  Tổng số khóa học
                </div>
                <div className="tw-font-semibold tw-text-base tw-text-right">
                  {chartData?.count_course}
                </div>
              </div>
            </div>
            <div className="tw-bg-white tw-shadow-md tw-rounded-lg tw-px-3 tw-py-5 tw-flex tw-items-center tw-justify-between">
              <div className="tw-bg-green-500 tw-bg-opacity-20 tw-text-white tw-rounded-lg tw-w-[50px] tw-h-[50px] tw-flex tw-items-center tw-justify-center">
                <UserOutlined className="tw-text-2xl tw-leading-[0] tw-text-green-500" />
              </div>
              <div>
                <div className="tw-text-gray-400 tw-mb-1 tw-text-right ">
                  Tổng số học viên
                </div>
                <div className="tw-font-semibold tw-text-base tw-text-right">
                  {chartData?.count_student}
                </div>
              </div>
            </div>
            <div className="tw-bg-white tw-shadow-md tw-rounded-lg tw-px-3 tw-py-5 tw-flex tw-items-center tw-justify-between">
              <div className="tw-bg-yellow-500 tw-bg-opacity-20 tw-text-white tw-rounded-lg tw-w-[50px] tw-h-[50px] tw-flex tw-items-center tw-justify-center">
                <DatabaseOutlined className="tw-text-2xl tw-leading-[0] tw-text-yellow-500" />
              </div>
              <div>
                <div className="tw-text-gray-400 tw-mb-1 tw-text-right">
                  Số chuyên môn
                </div>
                <div className="tw-font-semibold tw-text-base tw-text-right">
                  {chartData?.count_specialize}
                </div>
              </div>
            </div>

            <div className="tw-bg-white tw-shadow-md tw-rounded-lg tw-px-3 tw-py-5 tw-flex tw-items-center tw-justify-between">
              <div className="tw-bg-blue-400 tw-bg-opacity-20 tw-text-white tw-rounded-lg tw-w-[50px] tw-h-[50px] tw-flex tw-items-center tw-justify-center">
                <UserOutlined className="tw-text-2xl tw-leading-[0] tw-text-blue-400" />
              </div>
              <div>
                <div className="tw-text-gray-400 tw-mb-1 tw-text-right">
                  Học viên trong năm
                </div>
                <div className="tw-font-semibold tw-text-base tw-text-right">
                  {chartData?.count_student_year}
                </div>
              </div>
            </div>

            <div className="tw-bg-white tw-shadow-md tw-rounded-lg tw-px-3 tw-py-5 tw-flex tw-items-center tw-justify-between">
              <div className="tw-bg-blue-400 tw-bg-opacity-20 tw-text-white tw-rounded-lg tw-w-[50px] tw-h-[50px] tw-flex tw-items-center tw-justify-center">
                <UserOutlined className="tw-text-2xl tw-leading-[0] tw-text-blue-400" />
              </div>
              <div>
                <div className="tw-text-gray-400 tw-mb-1 tw-text-right">
                  Khóa học yêu cầu thanh toán
                </div>
                <div className="tw-font-semibold tw-text-base tw-text-right">
                  {chartData?.count_request_admin}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tw-w-full lg:tw-w-[30%] tw-self-auto lg:tw-pl-2 tw-mb-4">
          <Card
            title={
              <span className="tw-font-black tw-text-lg tw-text-[#3b82f6]">
                Lịch làm việc hôm nay
              </span>
            }
            extra={
              <Link to={ROUTER.PT.SCHEDULEDAY}>
                <Button
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 5px 5px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                    borderRadius: "15px",
                  }}
                >
                  <RightOutlined />
                </Button>
              </Link>
            }
            style={{ borderRadius: "15px" }}
          >
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Link to={ROUTER.PT.SCHEDULEDAY}>
                        <div className="tw-tracking-tight  tw-cursor-pointer tw-w-12 tw-h-12 tw-p-3 tw-text-center tw-bg-gradient-to-l tw-from-red-400 tw-to-blue-700 tw-rounded-full tw-text-white tw-font-bold ">
                          {moment(item?.start).format("dd")}
                        </div>
                      </Link>
                    }
                    title={
                      <>
                        <Link to={ROUTER.PT.SCHEDULEDAY}>
                          {item.title.length >= 30 ? (
                            <span className="tw-text-blue-600">
                              {item.title.substring(0, 30)}...
                            </span>
                          ) : (
                            <span className="tw-text-blue-600">
                              {item.title}
                            </span>
                          )}
                        </Link>
                      </>
                    }
                    description={
                      <>
                        <p className="tw-text-blue-500">
                          {moment(item?.start).format("HH:mm")} -{" "}
                          {moment(item?.end).format("HH:mm")}
                        </p>
                        <span className="tw-text-xs tw-text-blue-400">
                          {item?.course_student?.users?.name}
                        </span>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </div>
      <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-4">
        <Card
          title="Thống kê doanh thu"
          style={{ borderRadius: "0.5rem", paddingBottom: "1.5rem" }}
          extra={
            <Select
              defaultValue="Năm 2021"
              bordered={false}
              className="tw-border-b-2 hover:tw-border-blue-500"
              onChange={handleChangeDoanhThu}
            >
              <Select.Option value="2021">2021</Select.Option>
              <Select.Option value="2020">2020</Select.Option>
            </Select>
          }
        >
          {profitChart(profitData)}
        </Card>

        <Card
          title="Thông kê học viên"
          style={{ borderRadius: "0.5rem" }}
          extra={
            <Select
              defaultValue="Năm 2021"
              bordered={false}
              className="tw-border-b-2 hover:tw-border-blue-500"
              onChange={handleChangeHocVien}
            >
              <Select.Option value="2021">2021</Select.Option>
              <Select.Option value="2020">2020</Select.Option>
            </Select>
          }
        >
          {studentChart(studentData)}
        </Card>
      </div>
    </>
  );
}

export default Home;
