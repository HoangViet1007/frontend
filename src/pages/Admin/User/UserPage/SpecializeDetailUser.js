 
 
import { RollbackOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Select, Space, Spin, Table } from "antd";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ROUTER from "../../../../router/router";
import ShowModaKhoaHoc from "./../componenst/ShowModaKhoaHoc";
import ShowModalChungChi from "./../componenst/ShowModalChungChi";
import { getUserId } from "./../UserAdminSlice";
const { Option } = Select;
const SpecializeDetailUser = (props) => {
  const userId = useSelector((state) => state.UserAdmin.item);
  const loading = useSelector((state) => state.UserAdmin.loading);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getUserId(id));
  }, []);
  const handleCancel = async () => {
    await setShowModalKhoaHoc({
      name: "",
      modalShow: false,
      dataTable: [],
    });
    await setShowModalChungChi({
      name: "",
      modalShow: false,
      dataTable: [],
    });
  };
  const [showModalKhoaHoc, setShowModalKhoaHoc] = useState({
    name: "",
    modalShow: false,
    dataTable: {},
  });
  const [showModalChungChi, setShowModalChungChi] = useState({
    name: "",
    modalShow: false,
    dataTable: {},
  });
  const showKhoahoc = (data) => {
    setShowModalKhoaHoc({
      name: data.specialize.name,
      modalShow: true,
      dataTable: data.courses,
    });
  };
  const showChungChi = (data) => {
    setShowModalChungChi({
      name: data.specialize.name,
      modalShow: true,
      dataTable: data.certificates,
    });
  };
  const columnss = (showChungChi, showKhoahoc) => [
    {
      title: "STT",
      width: 20,
      render: (t, r, i) => i + 1,
    },

    {
      title: "Tên chuyên môn",
      dataIndex: "specialize",
      key: "specialize",
      render: (value) => `${value.name}`,
    },
    {
      title: "Năm kinh nghiệm (Năm)",
      dataIndex: "experience",
      key: "experience",
    },
    {
      title: "Khoá học",
      dataIndex: "courses",
      key: "courses",
      render: (value, record) => (
        <Space>
          <span> {value?.length} </span>
          <span>
            <a style={{ color: "#0000FF", fontSize: "11px" }} onClick={() => showKhoahoc(record)}>
              {value?.length > 0 ? "( Chi tiết )" : ""}
            </a>
          </span>
        </Space>
      ),
    },
    {
      title: "Chứng chỉ",
      dataIndex: "certificates",
      key: "certificates",
      render: (value, record) => (
        <Space>
          <span> {value?.length} </span>
          <span>
            <a style={{ color: "#0000FF", fontSize: "11px" }} onClick={() => showChungChi(record)}>
              {value?.length > 0 ? "( Chi tiết )" : ""}
            </a>
          </span>
        </Space>
      ),
    },
  ];
  const fecthSearch = (value) => {
    if (value) {
      props.history.push(ROUTER.ADMIN.USER.concat(`?name__~=${value}`));
    } else {
      props.history.push(ROUTER.ADMIN.USER);
      dispatch(getUserId(null));
    }
  };
  const debounceSearch = useCallback(debounce(fecthSearch, 1000), []);
  const onSearch = (e) => {
    debounceSearch(e.target.value);
  };
  const onSearchStatus = (value) => {
    if (value) {
      props.history.push(ROUTER.ADMIN.USER.concat(`?order_by=experience ${value}`));
    } else {
      props.history.push(ROUTER.ADMIN.USER);
      dispatch(getUserId(null));
    }
  };

  const onSearchFilter = (value) => {
    if (value) {
      props.history.push(ROUTER.ADMIN.USER.concat(`${value}`));
    } else {
      props.history.push(ROUTER.ADMIN.USER);
      dispatch(getUserId(null));
    }
  };
  return (
    <>
      <Card
        style={{ backgroundColor: "#ffffff", borderRadius: "8px" }}
        title={`Danh sách chuyên môn : ${userId.name}`}
      >
        <Spin spinning={loading}>
          <Row gutter={24} style={{ marginBottom: "20px" }}>
            <div className="sm:tw-flex tw-justify-between tw-w-full">
              <div className="sm:tw-flex">
                <Space direction="vertical" className="tw-px-2">
                  <Input
                    placeholder="Nhập để tìm kiếm"
                    style={{ width: 200 }}
                    type="search"
                    suffix={<SearchOutlined className="text-gray-400 text-md font-medium" />}
                    onChange={onSearch}
                  />
                </Space>
                <Form.Item className="tw-px-2">
                  <Select
                    style={{ width: 150 }}
                    showSearch
                    className="select-custom"
                    placeholder="Sắp xếp"
                    optionFilterProp="children"
                    onChange={onSearchStatus}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="desc"> Tăng dần </Option>
                    <Option value="asc"> Giảm dần </Option>
                  </Select>
                </Form.Item>
                <Form.Item className="tw-px-2">
                  <Select
                    style={{ width: 150 }}
                    showSearch
                    className="select-custom"
                    placeholder="Kinh nghiệm"
                    optionFilterProp="children"
                    onChange={onSearchFilter}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="?experience__le=2"> Dưới 2 năm </Option>
                    <Option value="?experience__ge=2&experience__le=5"> Từ 2 - 5 năm </Option>
                    <Option value="?experience__ge=5"> Trên 5 năm </Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="sm:tw-mr-10">
                <Button
                  style={{
                    borderRadius: ".42rem",
                    border: "#00d084",
                    backgroundColor: "#ff4d4f",
                    color: "#fff",
                  }}
                  onClick={() => props.history.push(ROUTER.ADMIN.USER)}
                >
                  <div className="tw-flex tw-items-center">
                    <RollbackOutlined className="tw-pr-2" /> Quay lại
                  </div>
                </Button>
              </div>
            </div>
          </Row>
          <ShowModaKhoaHoc
            openModal={showModalKhoaHoc.modalShow}
            handleCancel={handleCancel}
            dataTable={showModalKhoaHoc.dataTable.length > 0 ? showModalKhoaHoc.dataTable : []}
            name={showModalKhoaHoc.name}
          />
          <ShowModalChungChi
            openModal={showModalChungChi.modalShow}
            handleCancel={handleCancel}
            dataTable={showModalChungChi.dataTable.length > 0 ? showModalChungChi.dataTable : []}
            name={showModalChungChi.name}
          />
          <Row>
            <Col span={24}>
              <Table
                columns={columnss(showChungChi, showKhoahoc)}
                dataSource={userId.specialize_details}
                pagination={false}
              />
            </Col>
          </Row>
        </Spin>
      </Card>
    </>
  );
};

export default SpecializeDetailUser;
