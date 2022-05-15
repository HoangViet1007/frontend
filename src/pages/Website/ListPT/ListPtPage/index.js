import React, { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Drawer, Input, Select, Pagination } from "antd";
import ListPT from "../../../../components/componentsWebsite/ShowListPT/ListPT";
import SideBarFilter from "../components/Sidebar";
import TitlePage from "../../../../components/componentsWebsite/TitlePage";
import { useHistory } from "react-router-dom";
import { querySearch } from "../../../../utils";
import { useSelector, useDispatch } from "react-redux";
import { getListPT } from "../PTSlice";

const ListPtPage = () => {
  const [toggleFilter, setToggleFilter] = useState(false);
  const [visibleSidebar, setVisibleSidebar] = useState(false);
  const { Option } = Select;
  const dispatch = useDispatch();
  let history = useHistory();
  const onSearch = (value) => {
    querySearch(value.target.value, "users__name__~", history);
  };
  const { search } = history.location;

  const filterByGender = (value) => {
    querySearch(value, "users__sex__eq", history);
  };
  const meta = useSelector((state) => state.ptList.meta);
  const data = useSelector((state) => state.ptList.items);

  useEffect(() => {
    let params;
    const filterOptions = search.split("?")[1];
    if (filterOptions !== undefined) {
      params = `{"${decodeURI(filterOptions)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')}"}`;
      dispatch(getListPT(JSON.parse(params)));
    } else {
      dispatch(getListPT(null));
    }
  }, [dispatch, history.location]);

  const onChangePage = (value) => {
    querySearch(value, "page", history);
  };
  return (
    <>
      <Drawer
        title="Lọc PT"
        placement="right"
        onClose={() => setVisibleSidebar(false)}
        visible={visibleSidebar}
        className="tw-block lg:tw-hidden"
      >
        <SideBarFilter />
      </Drawer>

      <TitlePage namePage="Danh sách PT" />
      <section className="list-pt tw-my-10">
        <div className="container tw-overflow-hidden sm:tw-px-0">
          <div className="tw-flex tw-justify-end tw-mb-5 t">
            <Input
              className="tw-mr-2"
              placeholder="Tìm tên PT"
              style={{ width: 200 }}
              allowClear
              type="search"
              suffix={
                <SearchOutlined className="text-gray-400 text-md font-medium" />
              }
              onChange={onSearch}
            />

            <Select
              style={{ width: 170 }}
              placeholder="Chọn giới tính"
              allowClear
              optionFilterProp="children"
              onChange={filterByGender}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Male">Nam</Option>
              <Option value="Female">Nữ</Option>
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
                : " tw-flex tw-flex-col lg:tw-flex-row transition-to-left "
            }
          >
            <div className="tw-hidden lg:tw-block">
              <SideBarFilter />
            </div>
            <section className="list-pt-box tw-flex-1">
              {/* <section className="list-pt-box tw-flex-1 tw-ml-2"> */}
              <div
                className={
                  toggleFilter
                    ? "tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4 tw-gap-5"
                    : "tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-3 tw-gap-5"
                }
              >
                <ListPT listPt={data} />
              </div>
            </section>
          </div>
          <div className="tw-flex tw-justify-end tw-mt-10">
            <Pagination onChange={onChangePage}  />
          </div>
        </div>
      </section>
    </>
  );
};

export default ListPtPage;
