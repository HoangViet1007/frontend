import {
  DeleteOutlined,
  DeleteTwoTone,
  HighlightTwoTone,
  PlusCircleTwoTone,
  SearchOutlined,
  SendOutlined,
  UpCircleTwoTone,
  DownCircleTwoTone,
} from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import qs from "query-string";
import {
  Button,
  Card,
  Col,
  Input,
  notification,
  Popconfirm,
  Row,
  Space,
  Switch,
  Table,
  Tabs,
  Tooltip,
  Form,
  Select,
  Slider,
} from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { showPhoto } from "../../../../components/componentsPT/ShowPhoto/showPhoto";
import ROUTER from "../../../../router/router";
import { convertCurrency, querySearch } from "../../../../utils";
import CoursesList from "../components/CoursesList";
import {
  deleteCourses,
  getCourses,
  sendRequest,
  updateCourses,
  cancelRequest,
} from "../CoursesSlice";
import { getListCustomerLevels } from "../../../../pages/Website/ListCourse/ListCoursesSlice";
const Courses = () => {
  const { Option } = Select;
  let history = useHistory();
  const { TabPane } = Tabs;
  const courses = useSelector((state) => state.courses.items);
  const location = useLocation();
  const queryParams = qs.parse(location.search);
  const cancelRequestHandle = async (id) => {
    try {
      dispatch(cancelRequest(id));
      notification.success({ message: `Hủy yêu cầu thành công` });
      dispatch(getCourses());
    } catch (error) {
      return notification.error({ message: `${error} ` });
    }
  };

  const onChange = async (value) => {
    const id = value.id;
    const payload = {
      ...value,
      display: value?.display === "Active" ? "Inactive" : "Active",
    };
    try {
      const resulDispatch = await dispatch(updateCourses({ id, payload }));
      unwrapResult(resulDispatch);
      notification.success({
        message: `Thay đổi trạng thái hiển thị thành công !`,
      });
      history.push(ROUTER.PT.COURSES + location.search);
    } catch (error) {
      return notification.error({ message: `${error} ` });
    }
  };

  const Pending = courses?.filter((item) => item.status === "Pending");
  const Happening = courses?.filter((item) => item.status === "Happening");
  const Pause = courses?.filter((item) => item.status === "Pause");
  const RequestList = courses?.filter((item) => item.status === "Request");
  const dispatch = useDispatch();

  useEffect(() => {
    const { search } = history.location;
    let params;
    const filterOptions = search.split("?")[1];
    if (filterOptions !== undefined) {
      params = `{"${decodeURI(filterOptions)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')}"}`;
      dispatch(getCourses(JSON.parse(params)));
    } else {
      dispatch(getCourses(null));
    }
  }, [dispatch, history.location]);

  const onDelete = async (e) => {
    try {
      const id = e.id;
      const resultAction = await dispatch(deleteCourses(id));
      unwrapResult(resultAction);
      notification.success({ message: `Xoá khoá học thành công !` });
    } catch (error) {
      notification.error({ message: `${error}` });
    }
  };
  const onSearch = (value) => {
    querySearch(value.target.value, "courses__name__~", history);
  };

  const onSearchByPriceStart = (value) => {
    querySearch(value.target.value, "courses__price__ge", history);
  };
  const requestColumns = [
    {
      title: "STT",
      render: (t, r, i) => i + 1,
      width: 5,
      responsive: ["xxl"],
    },
    {
      title: "Tên khóa học",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => (a?.name > b?.name ? 1 : -1),
      sortDirections: ["descend", "ascend"],
      width: 250,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (value) => showPhoto(value),
      width: 10,
    },

    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (value) => convertCurrency(value),
    },
    {
      title: "Cấp độ",
      dataIndex: "customer_level",
      key: "customer_level",
      render: (value) => value.name,
    },
    {
      title: "Giai đoạn",
      width: 150,
      dataIndex: "",
      render: (value) => (
        <>
          <span>{value.total_stages}</span>

          <Link to={`${ROUTER.PT.STAGE}/${value.id}/giai-doan`}>
            <span style={{ color: "#0000FF", fontSize: "14px" }}> (Chi tiết)</span>
          </Link>
        </>
      ),
    },
    {
      title: "Hiển thị",
      key: "display",
      render: (value) => (
        <Switch
          {...(value.display === "Active" ? { checked: true } : { checked: false })}
          onChange={() => onChange(value)}
        />
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 180,
      render: (value) => (
        <>
          <span
            style={{
              background:
                value === "Happening" ? "#e0f9f4" : value === "Pause" ? "#ff5252" : "#fff1e6",
              borderRadius: 5,
              fontSize: "13px",
              color: value === "Happening" ? "#4adabb" : value === "Pause" ? "#ff5252" : "#feaa54",
              padding: 7,
              border: value === "Happening" ? "1px solid #c6f4eb" : " 1px solid #ffe5d1",
            }}
          >
            {value === "Pending"
              ? "Đang chờ"
              : value === "Happening"
              ? "Đã duyệt"
              : value === "Pause"
              ? "Đã dừng"
              : value === "Request"
              ? "Yêu cầu"
              : ""}
          </span>
        </>
      ),
    },
    {
      title: "Chức năng",
      key: "action",
      width: 150,
      render: (record) => (
        <div className="text-center">
          {record.status === "Request" ? (
            <>
              <Space>
                <Tooltip title="Hủy yêu cầu">
                  <Popconfirm
                    title="Bạn có chắc chắn muốn hủy yêu cầu duyệt khóa học?"
                    onConfirm={() => cancelRequestHandle(record.id)}
                    okText="Hủy yêu cầu"
                    cancelText="Thoát"
                  >
                    <DownCircleTwoTone />
                  </Popconfirm>
                </Tooltip>
              </Space>{" "}
            </>
          ) : (
            ""
          )}
          <Space>
            <Tooltip title="Chỉnh sửa">
              <HighlightTwoTone
                onClick={() => history.push(`${ROUTER.PT.COURSESEDIT}/${record.id}`)}
              />
            </Tooltip>
            {record.total_stages === 0 ? (
              <Popconfirm
                title="Bạn có chắc chắn muốn xóa không ?"
                onConfirm={() => onDelete(record)}
              >
                <Tooltip title="Xóa">
                  <DeleteTwoTone />
                </Tooltip>
              </Popconfirm>
            ) : (
              <Tooltip title="Không thể xóa vì chứa các giai đoạn">
                <DeleteOutlined />
              </Tooltip>
            )}
          </Space>
        </div>
      ),
    },
  ];
  const onSearchByPriceEnd = (value) => {
    querySearch(value.target.value, "courses__price__le", history);
  };

  const onSearchStatus = (value) => {
    querySearch(value, "display", history);
  };

  useEffect(() => {
    dispatch(getListCustomerLevels());
  }, []);

  const levelList = useSelector((state) => state.coursesClient.customerlevels);
  const onSearchLevel = (value) => {
    querySearch(value, "customer_levels__name__~", history);
  };

  return (
    <>
      <Card title="Danh sách khóa học" style={{ backgroundColor: "#ffffff", borderRadius: "8px" }}>
        <Row gutter={24} style={{ marginBottom: "20px" }}>
          <div className="sm:tw-flex tw-justify-between tw-w-full">
            <div className="sm:tw-flex tw-flex-wrap tw-w-full">
              <Space direction="vertical" className="tw-px-2">
                <Input
                  placeholder="Tìm tên khóa học"
                  style={{ width: 200 }}
                  type="search"
                  allowClear
                  suffix={<SearchOutlined className="text-gray-400 text-md font-medium" />}
                  onChange={onSearch}
                />
              </Space>

              <Space>
                <Form.Item className="tw-px-2">
                  <Select
                    style={{ width: 200 }}
                    placeholder="Tìm trạng thái hiển thị"
                    onChange={onSearchStatus}
                    allowClear
                  >
                    <Option value="Active"> Hiển thị </Option>
                    <Option value="Inactive"> Không hiển thị </Option>
                  </Select>
                </Form.Item>
              </Space>

              <Space direction="vertical" className="tw-px-2">
                <Input
                  placeholder="Nhập giá nhỏ nhất"
                  style={{ width: 180 }}
                  type="search"
                  allowClear
                  onChange={onSearchByPriceStart}
                />
              </Space>

              <Space direction="vertical" className="tw-px-2">
                <Input
                  placeholder="Nhập giá lớn nhất"
                  style={{ width: 180 }}
                  type="search"
                  allowClear
                  onChange={onSearchByPriceEnd}
                />
              </Space>

              <Space className="tw-mt-2 lg:tw-mt-0">
                <Form.Item className="tw-px-2">
                  <Select
                    style={{ width: 200 }}
                    placeholder="Tìm cấp độ"
                    allowClear
                    onChange={onSearchLevel}
                  >
                    {levelList?.map((item) => (
                      <>
                        {item.courses_client.length > 0 ? (
                          <Option value={item?.name}>{item?.name}</Option>
                        ) : (
                          ""
                        )}
                      </>
                    ))}
                  </Select>
                </Form.Item>
              </Space>
            </div>
            <div className="tw-flex tw-mr-4 tw-justify-end">
              <Link to={ROUTER.PT.COURSESADD}>
                <Button
                  style={{
                    borderRadius: ".42rem",
                    border: "#00d084",
                    opacity: 1,
                  }}
                  type="primary"
                >
                  <PlusCircleTwoTone />
                  Thêm mới
                </Button>
              </Link>
            </div>
          </div>
        </Row>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Đang chờ" key="1">
            <Col span={24}>
              <CoursesList dataTable={Pending} onDelete={onDelete} />
            </Col>
          </TabPane>
          <TabPane tab="Đã duyệt" key="2">
            <Col span={24}>
              <CoursesList dataTable={Happening} onDelete={onDelete} />
            </Col>
          </TabPane>
          <TabPane tab="Tạm dừng" key="3">
            <Col span={24}>
              <CoursesList dataTable={Pause} onDelete={onDelete} />
            </Col>
          </TabPane>
          <TabPane tab="Yêu cầu" key="4">
            <Col span={24}>
              <Table dataSource={RequestList} columns={requestColumns} />
            </Col>
          </TabPane>
        </Tabs>
      </Card>
    </>
  );
};

export default Courses;
