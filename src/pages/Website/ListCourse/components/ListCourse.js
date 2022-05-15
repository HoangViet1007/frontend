import { TagsOutlined, UserOutlined } from "@ant-design/icons";
import { Pagination, Rate } from "antd";
import React, { useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  querySearch,
  convertCurrency,
  convertToUnicode,
} from "../../../../utils";
import { getListCourses } from "../ListCoursesSlice";
const ListCourse = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const { search } = history.location;
  useEffect(() => {
    dispatch(getListCourses());
  }, []);
  const coursesClients = useSelector((state) => state.coursesClient.items);
  const meta = useSelector((state) => state.coursesClient.meta);

  useEffect(() => {
    let params;
    const filterOptions = search.split("?")[1];
    if (filterOptions !== undefined) {
      params = `{"${decodeURI(filterOptions)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')}"}`;
      dispatch(getListCourses(JSON.parse(params)));
    } else {
      dispatch(getListCourses(null));
    }
  }, [dispatch, history.location]);

  const onChangePage = (value) => {
    querySearch(value, "page", history);
  };

  const avg_start = (courseDetail) => {
    if (courseDetail?.comments?.length > 0) {
      let totalAvgStart = 0;
      courseDetail.comments.map((x) => (totalAvgStart += x.number_stars));
      const IntAvg = parseInt(totalAvgStart / courseDetail?.comments.length);
      const Avg = (totalAvgStart / courseDetail?.comments.length).toFixed(1);
      if (IntAvg < +Avg && +Avg < IntAvg + 0.5) {
        return {
          defaultValueRate: IntAvg + 0.5,
          avg_start: Avg,
        };
      } else {
        return {
          defaultValueRate: Avg,
          avg_start: Avg,
        };
      }
    } else {
      return {
        defaultValueRate: 0,
        avg_start: "0.0",
      };
    }
  };

  return (
    <>
      <div className="content-side tw-flex-1">
        <div className="course-box tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-1 tw-gap-5">
          {coursesClients?.length === 0 ? (
            <>
              <div className="tw-flex tw-text-center tw-justify-center tw-font-bold">
                Không tồn tại khóa học nào, xin vui lòng thử lại !
              </div>
            </>
          ) : (
            coursesClients?.map((course, index) => {
              return (
                <>
                  <div
                    key={index}
                    className="course-item tw-flex tw-flex-col md:tw-flex-row  tw-border-b md:tw-pb-4 "
                  >
                    <div className="img-course tw-w-full tw-h-52 sm:tw-h-44 md:tw-w-[260px]">
                      <Link
                        to={`/khoa-hoc/${convertToUnicode(course?.name)}/${
                          course?.id
                        }`}
                      >
                        <img
                          className=" tw-object-cover tw-h-full tw-w-full"
                          src={course?.image}
                          alt={course?.name}
                        />
                      </Link>
                    </div>
                    <div className="md:tw-pl-5 tw-flex-1">
                      <div className="tw-flex tw-flex-col md:tw-flex-row tw-p-2 md:tw-p-0">
                        <div className="course-content tw-flex-1 md:tw-py-2 tw-order-2 md:tw-order-1">
                          <Link
                            to={`/khoa-hoc/${convertToUnicode(course?.name)}/${
                              course?.id
                            }`}
                          >
                            <h3 className="course-title tw-font-medium tw-text-xl hover:tw-text-[#ff0000] tw-transition tw-duration-300">
                              {course?.name}
                            </h3>
                          </Link>
                          <div className="course-featured-desc tw-max-h-5">
                            {ReactHtmlParser(
                              course?.description?.substring(0, 60)
                            )}
                          </div>
                          <div className="course-rating tw-flex tw-items-center">
                            <span className="tw-text-yellow-500 tw-text-md tw-pr-1 tw-font-normal">
                              {avg_start(course)?.avg_start}
                            </span>
                            <Rate
                              className="tw-text-sm"
                              allowHalf
                              disabled
                              defaultValue={parseFloat(
                                avg_start(course)?.defaultValueRate
                              )}
                            />
                            <span className="tw-text-[9px] tw-pl-2">
                              ({course?.comments.length} đánh giá)
                            </span>
                          </div>
                          <span className=" tw-text-xs tw-flex tw-items-center tw-pt-1">
                            <TagsOutlined />{" "}
                            {course?.specialize_details?.specialize?.name}
                          </span>

                          <div className="tw-font-medium tw-py-1 tw-flex tw-items-center">
                            <UserOutlined />{" "}
                            {course?.specialize_details?.user?.name}
                          </div>

                          <div className="tw-text-black tw-text-xs">
                            <div className="udlite-badge udlite-heading-xs">
                              {course?.customer_level?.name}
                            </div>
                          </div>
                        </div>
                        <div className="tw-text-lg tw-font-semibold md:tw-pt-2 md:tw-pl-3 tw-order-1 md:tw-order-2">
                          <span className="">
                            {convertCurrency(course?.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          )}
          <div className="tw-flex tw-justify-end">
            <Pagination
              onChange={onChangePage}
              defaultCurrent={1}
              total={meta?.total}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListCourse;
