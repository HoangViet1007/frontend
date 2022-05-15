import { SearchOutlined } from "@ant-design/icons";
import { Drawer, Input, Select } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PageTitle from "../../../../components/componentsWebsite/TitlePage";
import { querySearch } from "../../../../utils";
import ListCourse from "../components/ListCourse";
import SideBarFilter from "../components/SideBar";

const ListCoursePage = () => {
  const { Option } = Select;
  let history = useHistory();
  const [toggleFilter, setToggleFilter] = useState(false);
  const [visibleSidebar, setVisibleSidebar] = useState(false);
  const onSearch = (value) => {
    querySearch(value.target.value, "courses__name__~", history);
  };

  const sortOrderBy = (value) => {
    querySearch(value, "order_by", history);
  };

  return (
    <>
      <PageTitle namePage="danh sách khóa học" />
      <Drawer
        title="Lọc khóa học"
        placement="right"
        onClose={() => setVisibleSidebar(false)}
        visible={visibleSidebar}
        className="tw-block lg:tw-hidden"
      >
        <SideBarFilter />
      </Drawer>
      <section className="list-course tw-my-10">
        <div className="container sm:tw-px-0 tw-overflow-hidden">
          <div className="tw-flex  tw-justify-end tw-mb-5">
            <Input
              placeholder="Tìm tên khóa học"
              style={{ width: 250 }}
              type="search"
              suffix={
                <SearchOutlined className="text-gray-400 text-md font-medium" />
              }
              onChange={onSearch}
            />

            <Select
              className="tw-ml-2"
              style={{ width: 180 }}
              placeholder="Sắp xếp theo"
              allowClear
              optionFilterProp="children"
              onChange={sortOrderBy}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="courses.price asc">Giá thấp đến cao</Option>
              <Option value="courses.price desc">Giá cao đến thấp</Option>
            </Select>
          </div>
          <div className="tw-flex tw-items-center tw-justify-between tw-mb-5">
            <button
              className="tw-px-5 tw-py-3 tw-hidden lg:tw-block tw-bg-black hover:tw-bg-[#ff0000] tw-text-white tw-transition tw-duration-300"
              onClick={() => {
                setToggleFilter(!toggleFilter);
              }}
            >
              <i className="fas fa-filter "></i>
              <span className=" tw-font-medium tw-pl-2">Lọc</span>
            </button>
            <button
              className="tw-px-5 tw-py-3 tw-block lg:tw-hidden tw-bg-black hover:tw-bg-[#ff0000] tw-text-white tw-transition tw-duration-300"
              onClick={() => {
                setVisibleSidebar(true);
              }}
            >
              <i className="fas fa-filter "></i>
              <span className=" tw-font-medium tw-pl-2">Lọc</span>
            </button>
          </div>

          <div
            className={
              toggleFilter
                ? " tw-flex tw-flex-col lg:tw-flex-row tw-transform lg:tw-translate-x-[-17rem] lg:tw-w-[calc(100%+17rem)] transition-to-left"
                : " tw-flex tw-flex-col lg:tw-flex-row transition-to-left"
            }
          >
            <div className="tw-hidden lg:tw-block lg:tw-mr-6">
              <SideBarFilter />
            </div>
            <ListCourse />
          </div>
        </div>
      </section>
    </>
  );
};

export default ListCoursePage;
