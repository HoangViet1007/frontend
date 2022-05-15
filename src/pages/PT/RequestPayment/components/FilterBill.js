import { Input, Form } from "antd";
import React, { useCallback, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../RequestPaymentSlice";
const FilterBill = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { filters } = useSelector((state) => state.RequestPayment);

  useEffect(() => {
    form.setFieldsValue({
      search: filters["courses__name__~"],
    });
  }, [filters]);
  const fetchSearchNameCourse = (value) => {
    if (value) {
      dispatch(setFilters({ "courses__name__~": value, page: "" }));
    } else {
      dispatch(setFilters({ "courses__name__~": "", page: "" }));
    }
  };

  const debounceSearch = useCallback(debounce(fetchSearchNameCourse, 1000), []);
  const onSearch = (e) => {
    debounceSearch(e.target.value);
  };

  return (
    <Form form={form}>
      <div className="tw-flex">
        <Form.Item name="search">
          <Input
            placeholder="Tìm theo tên khóa học"
            style={{ width: 230 }}
            type="search"
            suffix={
              <SearchOutlined className="tw-text-gray-400 tw-text-md tw-font-medium" />
            }
            onChange={onSearch}
          />
        </Form.Item>
      </div>
    </Form>
  );
};

export default FilterBill;
