import React, { useEffect, useState } from "react";
import { List, Avatar, Card, Button, Statistic, Row, Select } from "antd";
import { RightOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getHome } from "./HomeAdminSlice";
import logo from "../../../assets/images/clinet/logo-2.png";
import {
  ReadOutlined,
  DollarCircleOutlined,
  DollarOutlined,
  ExclamationCircleOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";
import napTienChart from "./components/napTienChart";
import doanhThuChart from "./components/doanhThuChart";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import ROUTER from "../../../router/router";
import { getStudentRegistered } from "./../StudentRegistered/StudentRegisteredSlice";
import { querySearch } from "../../../utils";
import { convertCurrency } from "./../../../utils/index";
import { ShowForPermission } from "../../../components/componentsAdmin/ShowPermission/ShowForPermissionComponent";

const Home = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const dataHome = useSelector((state) => state.homeAdmin.items);
  const listHocVienDK = useSelector((state) => state.studentRegistered.data);
  const doanhThu = dataHome?.sum_revenue_website;
  const napTien = dataHome?.sum_total_in_month;
  const filterStudent = listHocVienDK.filter(
    (student) =>
      student.status !== "Canceled" &&
      student.status !== "CanceledByPt" &&
      student.status !== "RequestAdmin"
  );

  const { infoUser: user } = useSelector((state) => state.InfoUser);
  const history = useHistory();
  useEffect(() => {
    dispatch(getStudentRegistered(null));
  }, []);

  useEffect(() => {
    const { search } = history.location;
    let params;
    const filterOptions = search.split("?")[1];
    if (filterOptions !== undefined) {
      params = `{"${decodeURI(filterOptions)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')}"}`;
      dispatch(getHome(JSON.parse(params)));
    } else {
      dispatch(getHome(null));
    }
  }, [dispatch, history.location]);

  function queryDoanhThu(value) {
    querySearch(value, "year_profit", history);
  }

  function queryChiTieu(value) {
    querySearch(value, "year_turnover", history);
  }

  return (
    <>
      <div className="tw-flex tw-flex-col lg:tw-flex-row tw-items-stretch">
        <div className="tw-flex-1 lg:tw-pr-2">
          <Card style={{ borderRadius: "0.5rem" }}>
            <div className="tw-flex tw-mb-6">
              <div className="tw-w-2/3 tw-font-bold tw-m-4 tw-text-blue-500">
                <div className="tw-text-3xl tw-font-black tw-my-2">Xin ch??o, {user?.name}</div>
                <p className="tw-text-lg tw-font-sans tw-mt-2">
                  B???n ph???i ki??n tr??. K???t qu??? s??? kh??ng xu???t hi???n ch??? sau m???t ????m, nh??ng c?? th??? b???n s???
                  lu??n lu??n h???nh ph??c. T???p th??? h??nh, ??n u???ng ??i???u ?????, ki??n tr??. C?? th??? s??? ?????n ????p
                  b???n x???ng ????ng.
                </p>
                <p className="tw-text-lg tw-font-sans tw-mt-2">Ch??c b???n m???t ng??y t???t l??nh !</p>
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
          <ShowForPermission permission="dashboard:statistical">
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-4 tw-gap-4 tw-my-4">
              <div className="tw-bg-white tw-shadow-md tw-rounded-lg tw-px-3 tw-py-5 tw-flex tw-items-center tw-justify-between">
                <div className="tw-bg-blue-500 tw-bg-opacity-20 tw-text-white tw-rounded-lg tw-w-[50px] tw-h-[50px] tw-flex tw-items-center tw-justify-center">
                  <DollarCircleOutlined className="tw-text-2xl tw-leading-[0] tw-text-blue-500" />
                </div>
                <div>
                  <div className="tw-text-gray-400 tw-mb-1 tw-text-right">L???i nhu???n</div>
                  <div className="tw-font-semibold tw-text-base tw-text-right">
                    {convertCurrency(dataHome?.sum_revenue_website_year)}
                  </div>
                </div>
              </div>
              <div className="tw-bg-white tw-shadow-md tw-rounded-lg tw-px-3 tw-py-5 tw-flex tw-items-center tw-justify-between">
                <div className="tw-bg-green-500 tw-bg-opacity-20 tw-text-white tw-rounded-lg tw-w-[50px] tw-h-[50px] tw-flex tw-items-center tw-justify-center">
                  <DollarCircleOutlined className="tw-text-2xl tw-leading-[0] tw-text-green-500" />
                </div>
                <div>
                  <div className="tw-text-gray-400 tw-mb-1 tw-text-right ">Doanh thu</div>
                  <div className="tw-font-semibold tw-text-base tw-text-right">
                    {convertCurrency(dataHome?.sum_total_year)}
                  </div>
                </div>
              </div>
              <div className="tw-bg-white tw-shadow-md tw-rounded-lg tw-px-3 tw-py-5 tw-flex tw-items-center tw-justify-between">
                <div className="tw-bg-yellow-500 tw-bg-opacity-20 tw-text-white tw-rounded-lg tw-w-[50px] tw-h-[50px] tw-flex tw-items-center tw-justify-center">
                  <ExclamationCircleOutlined className="tw-text-2xl tw-leading-[0] tw-text-yellow-500" />
                </div>
                <div>
                  <div className="tw-text-gray-400 tw-mb-1 tw-text-right">Khi???u n???i</div>
                  <div className="tw-font-semibold tw-text-base tw-text-right">
                    {dataHome?.count_complain}
                  </div>
                </div>
              </div>
              <div className="tw-bg-white tw-shadow-md tw-rounded-lg tw-px-3 tw-py-5 tw-flex tw-items-center tw-justify-between">
                <div className="tw-bg-blue-800 tw-bg-opacity-20 tw-text-white tw-rounded-lg tw-w-[50px] tw-h-[50px] tw-flex tw-items-center tw-justify-center">
                  <BellOutlined className="tw-text-2xl tw-leading-[0] tw-text-blue-800" />
                </div>
                <div>
                  <div className="tw-text-gray-400 tw-mb-1 tw-text-right">Y??u c???u thanh to??n</div>
                  <div className="tw-font-semibold tw-text-base tw-text-right">
                    {dataHome?.count_payment_pt}
                  </div>
                </div>
              </div>
              <div className="tw-bg-white tw-shadow-md tw-rounded-lg tw-px-3 tw-py-5 tw-flex tw-items-center tw-justify-between">
                <div className="tw-bg-blue-400 tw-bg-opacity-20 tw-text-white tw-rounded-lg tw-w-[50px] tw-h-[50px] tw-flex tw-items-center tw-justify-center">
                  <UserOutlined className="tw-text-2xl tw-leading-[0] tw-text-blue-400" />
                </div>
                <div>
                  <div className="tw-text-gray-400 tw-mb-1">Nh??n vi??n</div>
                  <div className="tw-font-semibold tw-text-base tw-text-right">
                    {dataHome?.count_staff}
                  </div>
                </div>
              </div>
              <div className="tw-bg-white tw-shadow-md tw-rounded-lg tw-px-3 tw-py-5 tw-flex tw-items-center tw-justify-between">
                <div className="tw-bg-blue-400 tw-bg-opacity-20 tw-text-white tw-rounded-lg tw-w-[50px] tw-h-[50px] tw-flex tw-items-center tw-justify-center">
                  <UserOutlined className="tw-text-2xl tw-leading-[0] tw-text-blue-400" />
                </div>
                <div>
                  <div className="tw-text-gray-400 tw-mb-1 tw-text-right">Hu???n luy???n vi??n</div>
                  <div className="tw-font-semibold tw-text-base tw-text-right">
                    {dataHome?.count_pt}
                  </div>
                </div>
              </div>
              <div className="tw-bg-white tw-shadow-md tw-rounded-lg tw-px-3 tw-py-5 tw-flex tw-items-center tw-justify-between">
                <div className="tw-bg-blue-400 tw-bg-opacity-20 tw-text-white tw-rounded-lg tw-w-[50px] tw-h-[50px] tw-flex tw-items-center tw-justify-center">
                  <UserOutlined className="tw-text-2xl tw-leading-[0] tw-text-blue-400" />
                </div>
                <div>
                  <div className="tw-text-gray-400 tw-mb-1 tw-text-right">H???c vi??n</div>
                  <div className="tw-font-semibold tw-text-base tw-text-right">
                    {dataHome?.count_customer}
                  </div>
                </div>
              </div>
              <div className="tw-bg-white tw-shadow-md tw-rounded-lg tw-px-3 tw-py-5 tw-flex tw-items-center tw-justify-between">
                <div className="tw-bg-blue-500 tw-bg-opacity-20 tw-text-white tw-rounded-lg tw-w-[50px] tw-h-[50px] tw-flex tw-items-center tw-justify-center">
                  <ReadOutlined className="tw-text-2xl tw-leading-[0] tw-text-blue-500" />
                </div>
                <div>
                  <div className="tw-text-gray-400 tw-mb-1 tw-text-right">Kho?? h???c</div>
                  <div className="tw-font-semibold tw-text-base tw-text-right">
                    {dataHome?.count_course}
                  </div>
                </div>
              </div>
            </div>
          </ShowForPermission>
        </div>
        <ShowForPermission permission="dashboard:statistical">
          <div className="tw-w-full lg:tw-w-[30%] tw-self-auto lg:tw-pl-2 tw-mb-4">
            <Card
              title={
                <span className="tw-font-black tw-text-lg tw-text-[#3b82f6]">
                  H???c vi??n ???? ????ng k??
                </span>
              }
              style={{ height: "100%", borderRadius: "0.5rem" }}
            >
              <List
                itemLayout="horizontal"
                dataSource={listHocVienDK.slice(0, 4)}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <div className="tw-tracking-tight tw-w-12 tw-h-12 tw-p-3 tw-text-center tw-bg-gradient-to-l tw-from-red-400 tw-to-blue-700 tw-rounded-full tw-text-white tw-font-bold ">
                          {moment(item?.created_at).format("dd")}
                        </div>
                      }
                      title={<span className="tw-subpixel-antialiased">{item?.users?.name}</span>}
                      description={
                        <div>
                          <p className="tw-text-xs tw-antialiased tw-tracking-tight">
                            {moment(item?.created_at).format("HH:mm - DD/MM/YYYY")}
                          </p>
                          <span className="tw-text-xs">{item?.courses?.name}</span>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
              <div className="tw-pt-6 tw-text-center">
                <Link to={ROUTER.ADMIN.STUDENT_REGISTERED}>
                  <span className="tw-text-blue-400 hover:tw-text-blue-700">
                    Xem t???t c??? <RightOutlined />
                  </span>
                </Link>
              </div>
            </Card>
          </div>
        </ShowForPermission>
      </div>
      <ShowForPermission permission="dashboard:statistical">
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-4">
          <Card
            title="Th???ng k?? doanh thu"
            style={{ borderRadius: "0.5rem" }}
            extra={
              <Select
                defaultValue={moment().year()}
                bordered={false}
                className="tw-border-b-2 hover:tw-border-blue-500"
                onChange={queryChiTieu}
              >
                <Select.Option value={moment().year()}>{moment().year()}</Select.Option>
                <Select.Option value={moment().year() - 1}>{moment().year() - 1}</Select.Option>
              </Select>
            }
          >
            {napTienChart(napTien)}
          </Card>
          <Card
            title="Th???ng k?? l???i nhu???n"
            style={{ borderRadius: "0.5rem" }}
            extra={
              <Select
                defaultValue={moment().year()}
                bordered={false}
                className="tw-border-b-2 hover:tw-border-blue-500"
                onChange={queryDoanhThu}
              >
                <Select.Option value={moment().year()}>{moment().year()}</Select.Option>
                <Select.Option value={moment().year() - 1}>{moment().year() - 1}</Select.Option>
              </Select>
            }
          >
            {doanhThuChart(doanhThu)}
          </Card>
        </div>
      </ShowForPermission>
    </>
  );
};

export default Home;
