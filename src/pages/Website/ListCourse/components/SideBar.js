import { Checkbox, Slider } from "antd";
import queryString from "query-string";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  getListCustomerLevels,
  getListSpecializations,
} from "../ListCoursesSlice";

const SideBarFilter = () => {
  const dispatch = useDispatch();
  let location = useLocation();
  let history = useHistory();
  useEffect(() => {
    dispatch(getListSpecializations());
    dispatch(getListCustomerLevels());
  }, []);

  const specialize = useSelector(
    (state) => state.coursesClient.specializations
  );
  const customerLevel = useSelector(
    (state) => state.coursesClient.customerlevels
  );

  function onChangeRange(value) {
    const queryParams = queryString.parse(location.search);
    const newQueries = {
      ...queryParams,
      courses__price__ge: value[0],
      courses__price__le: value[1],
    };
    history.push({
      search: queryString.stringify(newQueries, {
        arrayFormat: "comma",
        skipEmptyString: true,
        encode: false,
      }),
    });
  }

  const clearSlider = () => {
    const queryParams = queryString.parse(location.search);
    const clearQuery = {
      ...queryParams,
      courses__price__ge: "",
      courses__price__le: "",
    };
    history.push({
      search: queryString.stringify(clearQuery, {
        encode: false,
        skipEmptyString: true,
      }),
    });
  };

  function specializeFilter(value) {
    const queryParams = queryString.parse(location.search);
    const clearQuery = {
      ...queryParams,
      specializes: value,
    };
    history.push({
      search: queryString.stringify(clearQuery, {
        arrayFormat: "comma",
        skipEmptyString: true,
        encode: false,
      }),
    });
  }

  function customerLevelFilter(value) {
    const queryParams = queryString.parse(location.search);
    const clearQuery = {
      ...queryParams,
      level: value,
    };
    history.push({
      search: queryString.stringify(clearQuery, {
        arrayFormat: "comma",
        skipEmptyString: true,
        encode: false,
      }),
    });
  }

  return (
    <>
      <div style={{ transition: "all 1s" }} className="lg:tw-w-[17rem]">
        <div className="tw-text-[#ff0000]">
          <div className="filter-specialize tw-border-t tw-py-3">
            <div className="tw-flex tw-justify-end tw-cursor-pointer">
              <span onClick={() => clearSlider()}>Xóa khoảng giá</span>
            </div>
            <div className="tw-text-black tw-uppercase tw-text-md tw-font-medium">
              Khoảng giá
              <span className="tw-text-gray-600 tw-lowercase tw-text-xs tw-font-small">
                {" "}
                (50.000 đ - 1.000.000 đ)
              </span>
            </div>

            <div className="specialize-item tw-pl-2">
              <Slider
                range
                defaultValue={[100000, 500000]}
                step={1000}
                min={50000}
                max={1000000}
                onAfterChange={onChangeRange}
                tooltipPlacement="bottom"
              />
            </div>
          </div>
          <div className="filter-specialize tw-border-t tw-py-3">
            <div className="tw-text-black tw-uppercase tw-text-md tw-font-bold ">
              chuyên môn
            </div>
            <div className="specialize-item tw-pl-2">
              <Checkbox.Group
                style={{ width: "100%" }}
                onChange={specializeFilter}
              >
                {console.log(specialize)}
                {specialize?.map((item, index) => {
                  if (item?.specialize_detail[0]?.courses_client) {
                    return (
                      <>
                        <label
                          key={index}
                          className="tw-flex tw-items-center tw-py-2"
                        >
                          <Checkbox value={item?.id}>{item?.name}</Checkbox>
                        </label>
                      </>
                    );
                  }
                })}
              </Checkbox.Group>
            </div>
          </div>
          <div className="filter-specialize tw-border-t tw-py-3">
            <div className="tw-text-black tw-uppercase tw-text-md tw-font-medium ">
              cấp độ
            </div>
            <div className="specialize-item tw-pl-2">
              <Checkbox.Group
                style={{ width: "100%" }}
                onChange={customerLevelFilter}
              >
                {customerLevel.map((item) => {
                  return (
                    <>
                      <label className="tw-flex tw-items-center tw-py-2">
                        <Checkbox value={item.id}>{item.name}</Checkbox>
                       
                      </label>
                    </>
                  );
                })}
              </Checkbox.Group>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBarFilter;
