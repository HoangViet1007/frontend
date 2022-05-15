import { SearchOutlined } from "@ant-design/icons";
import { Card, Col, Form, Input, Row, Select, Space, Tabs } from "antd";
import { debounce } from "lodash";
import queryString from "query-string";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ROUTER from "../../../../router/router";
import { Api } from "./../../../../utils/Api";
import { getAllSpecialize } from "./../../Specialize/SpecializeSlice";
import CourseHappeningList from "./../components/CourseHappeningList";
import CoursePauseList from "./../components/CoursePauseList";
import CourseRequestForm from "./../components/CourseRequestForm";
import CourseRequestList from "./../components/CourseRequestList";
import { getCourseRequest, removeFilters, setFilters } from "./../CourseRequestSlice";

const { Option } = Select;
const { TabPane } = Tabs;
const CourseRequest = (props) => {
  const [listCustomerLevel, setListCustomerLevel] = useState([]);
  const listAllSpecialize = useSelector((state) => state.specialize.items);
  const listCourseRequest = useSelector((state) => state.CourseRequest.items);
  // const meta = useSelector((state) => state.CourseRequest.meta);
  const filters = useSelector((state) => state.CourseRequest.filters);
  const listRequest =
    listCourseRequest.length > 0 && listCourseRequest?.filter((item) => item.status === "Request");
  const listHappening =
    listCourseRequest.length > 0 &&
    listCourseRequest?.filter((item) => item.status === "Happening");
  const listPause =
    listCourseRequest.length > 0 && listCourseRequest?.filter((item) => item.status === "Pause");
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const search = useLocation().search;

  useEffect(() => {
    const getData = async () => {
      const { data: getLevel } = await Api.get("/customer_level");
      setListCustomerLevel(getLevel.data);
    };

    getData();
  }, []);
  useEffect(() => {
    dispatch(getAllSpecialize());
  }, [dispatch]);

  useEffect(() => {
    search && dispatch(setFilters(queryString.parse(search)));
    return () => {
      dispatch(removeFilters());
    };
  }, []);
  useEffect(() => {
    dispatch(getCourseRequest(queryString.parse(search)));
  }, [search, dispatch]);
  useEffect(() => {
    history.push(
      `${ROUTER.ADMIN.COURSE_REQUEST}?${queryString.stringify(filters, {
        skipEmptyString: true,
      })}`
    );
  }, [filters]);
  useEffect(() => {
    form.setFieldsValue({
      searchCourse: filters["courses__name__~"],
      searchUser: filters["users__name__~"],
      locChuyenMon: filters["specializes__name__~"],
    });
  }, [filters]);

  const [dataModal, setDataModal] = useState({
    openModal: false,
    type: "",
    dataEdit: {},
  });
  const showModal = async (type, item) => {
    if (type === "update") {
      setDataModal({
        openModal: true,
        type: type,
        dataEdit: type === "update" ? item : {},
      });
    } else {
      setDataModal({
        openModal: true,
        type: type,
        dataEdit: null,
      });
    }
  };
  const handleCancel = async () => {
    await setDataModal({
      openModal: false,
      type: "",
      dataEdit: null,
    });
    dispatch(getCourseRequest(null));
  };

  const fecthSearchCource = (value) => {
    if (value) {
      dispatch(setFilters({ "courses__name__~": value }));
    } else {
      dispatch(setFilters({ "courses__name__~": "" }));
    }
  };
  const debounceSearchCource = useCallback(debounce(fecthSearchCource, 1000), []);
  const onSearchNameCource = (e) => {
    debounceSearchCource(e.target.value);
  };

  const fecthSearchUser = (value) => {
    if (value) {
      dispatch(setFilters({ "users__name__~": value }));
    } else {
      dispatch(setFilters({ "users__name__~": "" }));
    }
  };
  const debounceSearchUser = useCallback(debounce(fecthSearchUser, 1000), []);
  const onSearchNameUser = (e) => {
    debounceSearchUser(e.target.value);
  };

  const fecthPriceMin = (value) => {
    if (value) {
      dispatch(setFilters({ courses__price__ge: value }));
    } else {
      dispatch(setFilters({ courses__price__ge: "" }));
    }
  };
  const debouncePriceMin = useCallback(debounce(fecthPriceMin, 1000), []);
  const onSearchPriceMin = (e) => {
    debouncePriceMin(e.target.value);
  };

  const fecthPriceMax = (value) => {
    if (value) {
      dispatch(setFilters({ courses__price__le: value }));
    } else {
      dispatch(setFilters({ courses__price__le: "" }));
    }
  };
  const debouncePriceMax = useCallback(debounce(fecthPriceMax, 1000), []);
  const onSearchPriceMax = (e) => {
    debouncePriceMax(e.target.value);
  };

  const onSearchSpecialize = (value) => {
    dispatch(setFilters({ "specializes__name__~": value }));
  };
  const onSearchCustomerLevel = (value) => {
    dispatch(setFilters({ "customer_levels__name__~": value }));
  };
  return (
    <>
      <Card style={{ backgroundColor: "#ffffff", borderRadius: "8px" }} title="Quản lý khoá học">
        <Row gutter={24} style={{ marginBottom: "45px" }}>
          <div className="sm:tw-flex tw-justify-between tw-w-full">
            <Form form={form}>
              <div className="sm:tw-flex tw-flex-wrap tw-w-full">
                <Space direction="vertical" className="tw-px-2">
                  <Form.Item name="searchCourse">
                    <Input
                      placeholder="Tìm kiếm khoá học"
                      style={{ width: 200 }}
                      type="search"
                      suffix={<SearchOutlined className="text-gray-400 text-md font-medium" />}
                      onChange={onSearchNameCource}
                    />
                  </Form.Item>
                </Space>
                <Space direction="vertical" className="tw-px-2">
                  <Form.Item name="searchUser">
                    <Input
                      placeholder="Tìm kiếm PT"
                      style={{ width: 200 }}
                      type="search"
                      suffix={<SearchOutlined className="text-gray-400 text-md font-medium" />}
                      onChange={onSearchNameUser}
                    />
                  </Form.Item>
                </Space>
                <Form.Item className="tw-px-2" name="locChuyenMon">
                  <Select
                    style={{ width: 200 }}
                    showSearch
                    allowClear
                    className="select-custom"
                    placeholder="Lọc theo chuyên môn"
                    optionFilterProp="children"
                    onChange={onSearchSpecialize}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {listAllSpecialize &&
                      listAllSpecialize.map((item) => {
                        return (
                          <>
                            <Option value={item?.name}>{item?.name}</Option>
                          </>
                        );
                      })}
                  </Select>
                </Form.Item>
                <Form.Item className="tw-px-2" name="locChuyenMon">
                  <Select
                    style={{ width: 200 }}
                    showSearch
                    allowClear
                    className="select-custom"
                    placeholder="Lọc theo cấp độ"
                    optionFilterProp="children"
                    onChange={onSearchCustomerLevel}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {listCustomerLevel &&
                      listCustomerLevel.map((item) => {
                        return (
                          <>
                            <Option value={item?.name}>{item?.name}</Option>
                          </>
                        );
                      })}
                  </Select>
                </Form.Item>
                <Space direction="vertical" className="tw-px-2">
                  <Form.Item name="priceMin">
                    <Input
                      placeholder="Nhập giá nhỏ nhất"
                      style={{ width: 180 }}
                      type="search"
                      suffix={<SearchOutlined className="text-gray-400 text-md font-medium" />}
                      onChange={onSearchPriceMin}
                    />
                  </Form.Item>
                </Space>
                <Space direction="vertical" className="tw-px-2">
                  <Form.Item name="priceMax">
                    <Input
                      placeholder="Nhập giá lớn nhất"
                      style={{ width: 180 }}
                      type="search"
                      suffix={<SearchOutlined className="text-gray-400 text-md font-medium" />}
                      onChange={onSearchPriceMax}
                    />
                  </Form.Item>
                </Space>
              </div>
            </Form>
            {/* <div className="sm:tw-mr-10">
              <Button
                style={{
                  borderRadius: ".42rem",
                  border: "#00d084",
                  opacity: 0.7,
                }}
                type="primary"
                onClick={() => showModal("create", null)}
              >
                <div className="tw-flex tw-items-center">
                  <PlusCircleTwoTone className="tw-pr-2" /> Thêm mới
                </div>
              </Button>
            </div> */}
          </div>
          <CourseRequestForm
            openModal={dataModal.openModal}
            type={dataModal.type}
            dataEdit={dataModal.dataEdit}
            handleCancel={handleCancel}
          />
        </Row>
        <Row>
          <Col span={24}>
            {/* <CourseRequestList
              onEdit={showModal}
              meta={meta}
              dataTable={listCourseRequest}
              // onDelete={onDelete}
              onChangePage={onChangePage}
            /> */}
            <Tabs defaultActiveKey="1" centered>
              <TabPane tab="Yêu cầu" key="1">
                <CourseRequestList
                  onEdit={showModal}
                  dataTable={listRequest}
                  pagination={{ pageSize: 10 }}
                />
              </TabPane>
              <TabPane tab="Đã duyệt" key="2">
                <CourseHappeningList
                  onEdit={showModal}
                  dataTable={listHappening}
                  pagination={{ pageSize: 10 }}
                />
              </TabPane>
              <TabPane tab="Tạm dừng" key="3">
                <CoursePauseList
                  onEdit={showModal}
                  dataTable={listPause}
                  pagination={{ pageSize: 10 }}
                />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default CourseRequest;
