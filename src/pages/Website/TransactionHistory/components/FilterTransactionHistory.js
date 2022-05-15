 
 

import { SearchOutlined } from "@ant-design/icons";
import { Form, Input, Select } from "antd";
import { debounce } from "lodash";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../TransactionHistorySlice";
const FilterTransactionHistory = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { filters } = useSelector((state) => state.TransactionHistory);
  useEffect(() => {
    form.setFieldsValue({
      search: filters["code_vnp__~"],
      note: filters.note,
    });
  }, [filters]);
  const fetchSearch = (value) => {
    if (value) {
      dispatch(setFilters({ "code_vnp__~": value }));
    } else {
      dispatch(setFilters({ "code_vnp__~": "", page: "" }));
    }
  };

  const debounceSearch = useCallback(debounce(fetchSearch, 1000), []);
  const onSearch = (e) => {
    debounceSearch(e.target.value);
  };
  const filterStatus = (e) => {
    dispatch(setFilters({ note: e, page: "" }));
  };
  return (
    <Form form={form}>
      <div className="tw-flex">
        <Form.Item name="search">
          <Input
            placeholder="Tìm theo mã VNP"
            style={{ width: 200 }}
            type="search"
            suffix={<SearchOutlined className="tw-text-gray-400 tw-text-md tw-font-medium" />}
            onChange={onSearch}
          />
        </Form.Item>
        <div className="tw-pl-2">
          <Form.Item name="note">
            <Select style={{ width: 170 }} onChange={filterStatus} defaultValue="">
              <Select.Option value="">Tất dịch vụ</Select.Option>
              <Select.Option value="Rechage">Nạp tiền</Select.Option>
              <Select.Option value="CoursePayment">Thanh toán</Select.Option>
            </Select>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default FilterTransactionHistory;
