 
 
 
 
import { SearchOutlined } from "@ant-design/icons";
import { Card, Input, Row, Table, Tag, Space, Form, Select } from "antd";
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { debounce } from "lodash";
import {
   querySearch,
  convertToUnicode,
  convertCurrency,
} from "../../../../utils";
import { getBills } from "../BillManagerSlice";
import { Link } from "react-router-dom";
const BillManagerPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, data } = useSelector((state) => state.billings);
  const Option = Select;
  useEffect(() => {
    const { search } = history.location;
    let params;
    const filterOptions = search.split("?")[1];
    if (filterOptions !== undefined) {
      params = `{"${decodeURI(filterOptions)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')}"}`;
      dispatch(getBills(JSON.parse(params)));
    } else {
      dispatch(getBills(null));
    }
  }, [dispatch, history.location]);

  const fetchName = (value) => {
     querySearch(value, "users__name__~", history);
  };
  const debounceSearchName = useCallback(debounce(fetchName, 500), []);
  const onSearchName = (e) => {
    debounceSearchName(e.target.value);
  };

  const fetchCodeBill = (value) => {
     querySearch(value, "code_bill__~", history);
  };
  const debounceSearchCodeBill = useCallback(debounce(fetchCodeBill, 500), []);
  const onSearchCodeBill = (e) => {
    debounceSearchCodeBill(e.target.value);
  };

  const fetchCourse = (value) => {
     querySearch(value, "courses__name__~", history);
  };
  const debounceSearchCourse = useCallback(debounce(fetchCourse, 500), []);
  const onSearchCourse = (e) => {
    debounceSearchCourse(e.target.value);
  };

  const columns = [
    {
      title: "Mã hóa đơn",
      dataIndex: "code_bill",
      key: "code_bill",
      render: (code_bill) => code_bill,
    },
    {
      title: "Tên học viên",
      dataIndex: "user.name",
      key: "user.name",
      render: (t, r, i) => r.user.name,
    },
    {
      title: "Khóa học",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <>
          <Link
            className="tw-text-blue-600"
            to={`/khoa-hoc/${convertToUnicode(name)}/${record.course_id}`}
          >
            {name}
          </Link>
        </>
      ),
    },
    {
      title: "Giá",
      dataIndex: "money",
      key: "money",
      render: (money) => convertCurrency(money),
    },
    {
      title: "Thanh toán",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          style={{
            background:
              status === "Wallet" ? "rgb(224, 249, 244)" : "rgb(255, 51, 51)",
            borderRadius: " 5px",
            fontSize: "13px",
            color: status === "Wallet" ? "rgb(74, 218, 187)" : "white",
            padding: "3px",
            border: "1px solid rgb(198, 244, 235)",
          }}
        >
          {status === "Wallet" ? "Bằng ví" : "Trực tiếp"}
        </Tag>
      ),
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
      width: 150,
      render: (time) => time,
    },
  ];

  const onSearchStatus = (value) => {
     querySearch(value, "bills__status", history);
  };

  return (
    <Card title="Quản lý hóa đơn">
      <Row gutter={24} style={{ marginBottom: "20px" }}>
        <div className="sm:tw-flex tw-justify-between tw-w-full">
          <div className="sm:tw-flex tw-flex-wrap tw-w-full">
            <Space direction="vertical" className="tw-px-2">
              <Input
                placeholder="Tìm mã hóa đơn"
                allowClear
                style={{ width: 200 }}
                type="search"
                suffix={
                  <SearchOutlined className="text-gray-400 text-md font-medium" />
                }
                onChange={onSearchCodeBill}
              />
            </Space>

            <Space direction="vertical" className="tw-px-2">
              <Input
                placeholder="Tìm tên học viên"
                allowClear
                style={{ width: 200 }}
                type="search"
                suffix={
                  <SearchOutlined className="text-gray-400 text-md font-medium" />
                }
                onChange={onSearchName}
              />
            </Space>

            <Space direction="vertical" className="tw-px-2">
              <Input
                placeholder="Tìm tên khóa học"
                style={{ width: 200 }}
                type="search"
                allowClear
                suffix={
                  <SearchOutlined className="text-gray-400 text-md font-medium" />
                }
                onChange={onSearchCourse}
              />
            </Space>
            <Space>
              <Form.Item className="tw-px-2">
                <Select
                  style={{ width: 200 }}
                  placeholder="Tìm nội dung"
                  optionFilterProp="children"
                  onChange={onSearchStatus}
                  allowClear
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Select.Option value="Wallet">Bằng ví</Select.Option>
                  <Select.Option value="Direct">Trực tiếp</Select.Option>
                </Select>
              </Form.Item>
            </Space>
          </div>
        </div>
      </Row>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        scroll={{ x: 768 }}
      ></Table>
    </Card>
  );
};

export default BillManagerPage;
