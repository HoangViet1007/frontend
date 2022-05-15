 
 
 
import { Input, Select, Form } from "antd";
import React, { useCallback, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../BillPayPtSlice";
const FilterBill = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { filters } = useSelector((state) => state.BillPayPt);

  useEffect(() => {
    form.setFieldsValue({
      search: filters["courses__name__~"],
      namePt: filters["users__name__~"],
    });
  }, [filters]);
  const fetchSearchNameCourse = (value) => {
    if (value) {
      dispatch(setFilters({ "courses__name__~": value, page: "" }));
    } else {
      dispatch(setFilters({ "courses__name__~": "", page: "" }));
    }
  };
  const fetchSearchNamePt = (value) => {
    if (value) {
      dispatch(setFilters({ "users__name__~": value, page: "" }));
    } else {
      dispatch(setFilters({ "users__name__~": "", page: "" }));
    }
  };

  const debounceSearch = useCallback(debounce(fetchSearchNameCourse, 1000), []);
  const debounceSearchNamePt = useCallback(
    debounce(fetchSearchNamePt, 1000),
    []
  );
  const onSearch = (e) => {
    debounceSearch(e.target.value);
  };
  const onSearchNamePt = (e) => {
    debounceSearchNamePt(e.target.value);
  };

  return (
    <Form form={form}>
      <div className="tw-flex">
        <Form.Item name="search">
          <Input
            placeholder="Tìm theo tên khóa học"
            style={{ width: 200 }}
            type="search"
            suffix={
              <SearchOutlined className="tw-text-gray-400 tw-text-md tw-font-medium" />
            }
            onChange={onSearch}
          />
        </Form.Item>
        <div className="tw-pl-2">
          <Form.Item name="namePt">
            <Input
              placeholder="Tìm theo tên PT"
              style={{ width: 200 }}
              type="search"
              suffix={
                <SearchOutlined className="tw-text-gray-400 tw-text-md tw-font-medium" />
              }
              onChange={onSearchNamePt}
            />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default FilterBill;
