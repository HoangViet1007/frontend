import { Checkbox, Slider } from "antd";
import queryString from "query-string";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { querySearch } from "../../../../utils";
const SideBarFilter = () => {
  const dispatch = useDispatch();
  let location = useLocation();
  let history = useHistory();

  const specialize = useSelector(
    (state) => state.coursesClient.specializations
  );

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

  return (
    <>
      <div style={{ transition: "all 1s" }} className="lg:tw-w-[17rem]">
        <div className="tw-text-[#ff0000]">
          <div className="filter-specialize tw-border-t tw-py-3">
            <div className="tw-text-black tw-uppercase tw-text-md tw-font-bold ">
              chuyên môn
            </div>
            <div className="specialize-item tw-pl-2">
              <Checkbox.Group
                style={{ width: "100%" }}
                onChange={specializeFilter}
              >
                {specialize?.map((item, index) => {
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
