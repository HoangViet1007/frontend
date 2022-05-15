 
 
 
import { Input, Select, Form } from "antd";
import React, { useCallback, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../BillCustomerSlice";
const FilterBill = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { filters } = useSelector((state) => state.BillCustomer);

  useEffect(() => {
    form.setFieldsValue({
      search: filters["code_bill__~"],
      status: filters["bills__status__eq"],
    });
  }, [filters]);
  const fetchSearch = (value) => {
    if (value) {
      dispatch(setFilters({ "code_bill__~": value, page: "" }));
    } else {
      dispatch(setFilters({ "code_bill__~": "", page: "" }));
    }
  };

  const debounceSearch = useCallback(debounce(fetchSearch, 1000), []);
  const onSearch = (e) => {
    debounceSearch(e.target.value);
  };
  const filterStatus = (e) => {
    dispatch(setFilters({ bills__status__eq: e, page: "" }));
  };
  return (
    <Form form={form}>
      <div className="tw-flex">
        <Form.Item name="search">
          <Input
            placeholder="Tìm theo mã hóa đơn"
            style={{ width: 200 }}
            type="search"
            suffix={
              <SearchOutlined className="tw-text-gray-400 tw-text-md tw-font-medium" />
            }
            onChange={onSearch}
          />
        </Form.Item>
        <div className="tw-pl-2">
          <Form.Item name="status">
            <Select
              style={{ width: 170 }}
              onChange={filterStatus}
              defaultValue=""
            >
              <Select.Option value="">Tất cả thanh toán</Select.Option>
              <Select.Option value="Wallet">Bằng ví</Select.Option>
              <Select.Option value="Direct">Trực tiếp</Select.Option>
            </Select>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default FilterBill;
