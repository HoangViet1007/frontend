import { Card, Drawer, Rate, Tag } from "antd";
import React, { useEffect, useState } from "react";
import HtmlParser from "react-html-parser";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import PageTitle from "../../../components/componentsWebsite/TitlePage";
import { convertCurrency, convertToUnicode } from "../../../utils";
import { getInfoPT } from "./PTDetailSlice";
const PTDetailPage = () => {
  const [visibleSidebar, setVisibleSidebar] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getInfoPT(id));
  }, [id]);

  const { data } = useSelector((state) => state.ptDetail);
  return (
    <>
      {data === undefined ? (window.location.href = "/404") : ""}
      <PageTitle namePage="Thông tin PT" />
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={() => setVisibleSidebar(false)}
        visible={visibleSidebar}
        className="tw-block lg:tw-hidden"
      ></Drawer>
      <div>
        <Card bordered={false}>
          <div className="tw-profile-page ">
            <div className="tw-relative tw-block" style={{ height: "500px" }}>
              <div
                className="tw-absolute tw-top-0 tw-w-full tw-h-full tw-rounded-t-xl tw-bg-center tw-bg-cover"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
                }}
              >
                <span
                  id="blackOverlay"
                  className="tw-w-full tw-h-full tw-absolute tw-rounded-t-xl tw-opacity-50 tw-bg-black"
                ></span>
              </div>
              <div
                className="tw-top-auto tw-bottom-0 tw-left-0 tw-right-0 tw-w-full tw-absolute tw-pointer-events-none tw-overflow-hidden"
                style={{ height: "70px" }}
              ></div>
            </div>
            <section className="tw-relative tw-py-16 tw-bg-gray-300 tw-w-full tw-h-full tw-rounded-b-xl ">
              <div className="tw-container tw-mx-auto tw-px-4">
                <div className="tw-relative tw-flex tw-flex-col tw-min-w-0 tw-break-words tw-bg-white tw-w-full tw-mb-6 tw-shadow-xl tw-rounded-lg tw--mt-64">
                  <div className="px-6">
                    <div className="tw-flex tw-flex-wrap tw-justify-center">
                      <div className="tw-w-full lg:tw-w-3/12 tw-px-4 lg:tw-order-2 tw-flex tw-justify-center">
                        <div className="tw-relative">
                          <img
                            className="tw-cursor-pointer tw-shadow-xl tw-w-40 tw-h-40 tw-ring-4 tw-ring-white tw-object-cover tw-max-w-none tw-rounded-full tw-align-middle tw-border-none tw-absolute tw--m-16 tw--ml-20 lg:tw--ml-16"
                            src={`${data?.image}`}
                          />
                        </div>
                      </div>
                      <div className="tw-w-full lg:tw-w-4/12 tw-px-4 lg:tw-order-3 lg:tw-text-right lg:tw-self-center">
                        <div className="tw-py-6 tw-px-3 tw-mt-32 sm:tw-mt-0">
                          {data?.socials.map((item) => {
                            return item.name === "Facebook" ? (
                              <button
                                className="tw-bg-blue-500 active:tw-bg-blue-600 tw-uppercase tw-text-white tw-font-bold hover:tw-shadow-md tw-shadow tw-text-xs tw-px-4 tw-py-2 tw-rounded tw-outline-none focus:tw-outline-none sm:tw-mr-2 tw-mb-1"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                onClick={() =>
                                  window.open(
                                    item.user_socials[0]?.link,
                                    "_blank"
                                  )
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-facebook"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                </svg>
                              </button>
                            ) : item.name === "Instagram" ? (
                              <button
                                className="tw-bg-red-500 active:tw-bg-red-600 tw-uppercase tw-text-white tw-font-bold hover:tw-shadow-md tw-shadow tw-text-xs tw-px-4 tw-py-2 tw-rounded tw-outline-none focus:tw-outline-none sm:tw-mr-2 tw-mb-1"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                onClick={() =>
                                  window.open(
                                    item.user_socials[0]?.link,
                                    "_blank"
                                  )
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-instagram"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                                </svg>
                              </button>
                            ) : item.name === "Youtube" ? (
                              <button
                                className="tw-bg-red-500 active:tw-bg-red-600 tw-uppercase tw-text-white tw-font-bold hover:tw-shadow-md tw-shadow tw-text-xs tw-px-4 tw-py-2 tw-rounded tw-outline-none focus:tw-outline-none sm:tw-mr-2 tw-mb-1"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                onClick={() =>
                                  window.open(
                                    item.user_socials[0]?.link,
                                    "_blank"
                                  )
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-youtube"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                                </svg>
                              </button>
                            ) : item.name === "Tiktok" ? (
                              <button
                                className="tw-bg-purple-500 active:tw-bg-purple-600 tw-uppercase tw-text-white tw-font-bold hover:tw-shadow-md tw-shadow tw-text-xs tw-px-4 tw-py-2 tw-rounded tw-outline-none focus:tw-outline-none sm:tw-mr-2 tw-mb-1"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                onClick={() =>
                                  window.open(
                                    item.user_socials[0]?.link,
                                    "_blank"
                                  )
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-tiktok"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z" />
                                </svg>
                              </button>
                            ) : item.name === "Zalo" ? (
                              <button
                                className="tw-bg-white active:tw-bg-white tw-uppercase tw-text-white tw-font-bold hover:tw-shadow-md tw-shadow tw-text-xs tw-px-4 tw-py-2 tw-rounded tw-outline-none focus:tw-outline-none sm:tw-mr-2 tw-mb-1"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                onClick={() =>
                                  window.open(
                                    item.user_socials[0]?.link,
                                    "_blank"
                                  )
                                }
                              >
                                <img
                                  width="20px"
                                  src="https://seeklogo.com/images/Z/zalo-logo-B0A0B2B326-seeklogo.com.png"
                                />
                              </button>
                            ) : (
                              ""
                            );
                          })}
                        </div>
                      </div>
                      <div className="tw-w-full lg:tw-w-4/12 tw-px-4 lg:tw-order-1">
                        <div className="tw-flex tw-justify-center tw-py-4 lg:tw-pt-4 tw-pt-8">
                          <div className="tw-mr-4 tw-p-3 tw-text-center">
                            <span className="tw-text-xl tw-font-bold tw-block tw-uppercase tw-tracking-wide tw-text-gray-700">
                              {data?.count_student}
                            </span>
                            <span className="tw-text-sm tw-text-gray-500">
                              Học viên
                            </span>
                          </div>
                          <div className="tw-mr-4 tw-p-3 tw-text-center">
                            <span className="tw-text-xl tw-font-bold tw-block tw-uppercase tw-tracking-wide tw-text-gray-700">
                              {data?.count_course}
                            </span>
                            <span className="tw-text-sm tw-text-gray-500">
                              Khóa học
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tw-text-center tw-mt-12">
                      <h3 className="tw-text-4xl tw-font-semibold tw-leading-normal tw-text-gray-800 tw-mb-2">
                        {data?.name}
                      </h3>
                      <div className="tw-text-sm tw-leading-normal tw-mt-0 tw-mb-2 tw-text-gray-500 tw-font-bold tw-uppercase">
                        <i className="fas fa-map-marker-alt tw-mr-2 tw-text-lg tw-text-gray-500"></i>{" "}
                        {data?.address}
                      </div>
                      {/* <div className="tw-mb-2 tw-text-gray-700 tw-mt-10">
                        <i className="fas fa-briefcase mr-2 tw-text-lg tw-text-gray-500"></i>
                        3 năm kinh nghiệm làm Bi ti lại DATN 73 Fitness
                      </div>
                      <div className="tw-mb-2 tw-text-gray-700">
                        <i className="fas fa-university tw-mr-2 tw-text-lg tw-text-gray-500"></i>
                        TOP 1 Đẳng cấp Gymer tại giải đấu DATN73 Pro max
                      </div> */}
                    </div>
                    <div className="tw-mt-10 tw-py-10 tw-border-t tw-border-gray-300 tw-text-center">
                      <div className="tw-flex tw-flex-wrap tw-justify-center">
                        <div className="tw-w-full lg:tw-w-9/12 tw-px-4">
                          <p className="tw-mb-4 tw-text-lg tw-leading-relaxed tw-text-gray-800">
                            {HtmlParser(data?.description)}
                          </p>
                          {/* <span className="tw-cursor-pointer tw-font-normal tw-text-blue-500">
                            Xem thêm
                          </span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Card>

        {data?.course_related.length === 0 ? (
          ""
        ) : (
          <span className="tw-px-6 tw-text-xl tw-font-bold tw-flex tw-justify-center">
            Các khóa học nổi bật
          </span>
        )}

        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-5 tw-px-24 tw-py-12">
          {data?.course_related?.length !== 0 &&
            data?.course_related?.slice(0, 4).map((course) => {
              return (
                <>
                  <div
                    className="course-item bg-white tw-shadow"
                    key={course?.id}
                  >
                    <div className="course-img-wrapper tw-h-40 sm:tw-h-52 lg:tw-h-44">
                      <Link
                        to={`/khoa-hoc/${convertToUnicode(course?.name)}/${
                          course?.id
                        }`}
                      >
                        <img
                          className="tw-h-full tw-w-full tw-object-cover course-img"
                          src={course?.image}
                          alt={course?.name}
                          onError={(e) => {
                            e.target.src = "";
                          }}
                        />
                      </Link>
                    </div>
                    <div className="course-content tw-p-3">
                      {/* <div className="learned tw-text-xs tw-font-medium tw-text-black tw-pb-2">
              30 người học
            </div> */}
                      <div className="featured-course-title tw-text-black tw-font-semibold tw-text-lg">
                        <Link
                          to={`/khoa-hoc/${convertToUnicode(course?.name)}/${
                            course?.id
                          }`}
                          className="hover:tw-text-[#ff0000] tw-block"
                        >
                          {course?.name}
                        </Link>
                      </div>
                      {/* <div className="course-desc tw-text-sm tw-mb-3">
            {ReactHtmlParser(course?.description)}
            </div> */}
                      <div className="name-PT tw-font-semibold tw-capitalize">
                        PT: {course?.teacher?.name}
                      </div>
                      <div className="course-rating tw-flex tw-items-center tw-mt-1">
                        <span className="tw-text-yellow-500 tw-text-md tw-pr-1 tw-font-normal">
                          {course?.avg_start === null
                            ? "0.0"
                            : parseFloat(course?.avg_start).toFixed(1)}
                        </span>
                        <Rate
                          className="tw-text-sm"
                          disabled
                          defaultValue={course?.avg_start}
                        />
                        <span className="tw-text-[10px] tw-pl-2">
                          ({course?.count_comment})
                        </span>
                      </div>
                      <div className="tw-text-black tw-font-medium tw-py-2">
                        {convertCurrency(course?.price)}
                      </div>
                      <Tag color="#f50">
                        <div className="tw-text-xs tw-py-1">
                          {course?.customer_level?.name}
                        </div>
                      </Tag>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default PTDetailPage;
