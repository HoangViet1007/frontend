import { Card, Row, Space, Input, Select, Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { getTransactions } from "../TransactionSlices";
import TransactionList from "../components/TransactionList";
import { debounce } from "lodash";
import { useHistory } from "react-router";
import ROUTER from "../../../../router/router";
import { querySearch } from "../../../../utils";

const TransactionManagerPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { Option } = Select;

  useEffect(() => {
    const { search } = history.location;
    let params;
    const filterOptions = search.split("?")[1];
    if (filterOptions !== undefined) {
      params = `{"${decodeURI(filterOptions)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')}"}`;
      dispatch(getTransactions(JSON.parse(params)));
    } else {
      dispatch(getTransactions(null));
    }
  }, [dispatch, history.location]);

  const fetchName = (value) => {
    querySearch(value, "users__name__~", history);
  };
  const debounceSearchName = useCallback(debounce(fetchName, 500), []);
  const onSearchName = (e) => {
    debounceSearchName(e.target.value);
  };

  const onSearchStatus = (value) => {
    querySearch(value, "note", history);
  };

  const fetchVNPay = (value) => {
    querySearch(value, "code_vnp__~", history);
  };
  const debounceSearchVNPay = useCallback(debounce(fetchVNPay, 500), []);
  const onSearchVNPay = (e) => {
    debounceSearchVNPay(e.target.value);
  };

  return (
    <Card title="Quản lý giao dịch">
      <Row gutter={24} style={{ marginBottom: "20px" }}>
        <div className="sm:tw-flex tw-justify-between tw-w-full">
          <div className="sm:tw-flex tw-flex-wrap tw-w-full">
            <Space direction="vertical" className="tw-px-2">
              <Input
                placeholder="Nhập mã VNPay"
                allowClear
                style={{ width: 200 }}
                type="search"
                suffix={<SearchOutlined className="text-gray-400 text-md font-medium" />}
                onChange={onSearchVNPay}
              />
            </Space>

            <Space direction="vertical" className="tw-px-2">
              <Input
                placeholder="Nhập tên học viên"
                allowClear
                style={{ width: 200 }}
                type="search"
                suffix={<SearchOutlined className="text-gray-400 text-md font-medium" />}
                onChange={onSearchName}
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
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="Rechage">Nạp tiền</Option>
                  <Option value="CoursePayment">Thanh toán khóa học</Option>
                </Select>
              </Form.Item>
            </Space>
          </div>
        </div>
      </Row>
      <TransactionList />
    </Card>
  );
};

export default TransactionManagerPage;
