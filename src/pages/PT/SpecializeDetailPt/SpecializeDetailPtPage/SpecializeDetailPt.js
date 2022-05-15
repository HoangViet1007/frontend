import { PlusCircleTwoTone, SearchOutlined } from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Card, Col, Form, Input, notification, Row, Select, Space } from "antd";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ROUTER from "../../../../router/router";
import ShowCoursesModal from "../components/ShowCoursesModal";
import SpecializeDetailPtForm from "../components/SpecializeDetailPtForm";
import SpecializeDetailPtList from "../components/SpecializeDetailPtList";
import {
  deleteSpecializeDetailPt,
  getSpecializeDetailPt,
  removeFiltersSpecialize,
  setFiltersSpecialize,
} from "../SpecializeDetailPtSilce";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";

const { Search } = Input;
const { Option } = Select;
const SpecializeDetailPt = (props) => {
  const history = useHistory();
  const SpecializeDetailPt = useSelector((state) => state.SpecializeDetailPt.items);
  const meta = useSelector((state) => state.SpecializeDetailPt.meta);
  const filters = useSelector((state) => state.SpecializeDetailPt.filtersSpecialize);
  const dispatch = useDispatch();
  const search = useLocation().search;
  const [showModalKhoaHoc, setShowModalKhoaHoc] = useState({
    modalShow: false,
    dataTable: {},
  });
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
  // useEffect(() => {
  //   const { search } = props.history.location;
  //   let params;
  //   const filterOptions = search.split("?")[1];
  //   if (filterOptions !== undefined) {
  //     params = `{"${decodeURI(filterOptions)
  //       .replace(/"/g, '\\"')
  //       .replace(/&/g, '","')
  //       .replace(/=/g, '":"')}"}`;
  //     dispatch(getSpecializeDetailPt(JSON.parse(params)));
  //   } else {
  //     dispatch(getSpecializeDetailPt(null));
  //   }
  // }, [dispatch, props.history.location]);
  useEffect(() => {
    if (search) {
      dispatch(setFiltersSpecialize(queryString.parse(search)));
    } else {
      dispatch(removeFiltersSpecialize());
    }
  }, []);

  useEffect(() => {
    dispatch(getSpecializeDetailPt(queryString.parse(search)));
  }, [search]);
  useEffect(() => {
    history.push(
      `${ROUTER.PT.SPECIALIZEDETAILPT}?${queryString.stringify(filters, {
        skipEmptyString: true,
      })}`
    );
  }, [filters]);

  const onDelete = async (e) => {
    try {
      const resultAction = await dispatch(deleteSpecializeDetailPt(e?.id));
      unwrapResult(resultAction);
      notification.success({ message: `Xoá thành công !` });
    } catch (error) {
      notification.error({ message: `${error}` });
    }
  };
  const onChangePage = (value) => {
    if (value) {
      dispatch(setFiltersSpecialize({ page: value }));
    } else {
      dispatch(setFiltersSpecialize({ page: "" }));
    }
  };
  const handleCancel = async () => {
    await setDataModal({
      openModal: false,
      type: "",
      dataEdit: null,
    });
    await setShowModalKhoaHoc({
      modalShow: false,
      dataTable: [],
    });
    dispatch(getSpecializeDetailPt(null));
  };
  //search
  const fecthSearch = (value) => {
    // if (value) {
    //   props.history.push(ROUTER.PT.SPECIALIZEDETAILPT.concat(`?name__~=${value}`));
    // } else {
    //   props.history.push(ROUTER.PT.SPECIALIZEDETAILPT);
    //   dispatch(getSpecializeDetailPt(null));
    // }
    if (value) {
      dispatch(setFiltersSpecialize({ "name__~": value }));
    } else {
      dispatch(setFiltersSpecialize({ "name__~": "" }));
    }
  };
  const debounceSearch = useCallback(debounce(fecthSearch, 1000), []);
  const onSearch = (e) => {
    debounceSearch(e.target.value);
  };
  // const onSearchStatus = (value) => {
  //   if (value) {
  //     props.history.push(ROUTER.PT.SPECIALIZEDETAILPT.concat(`?order_by=experience ${value}`));
  //   } else {
  //     props.history.push(ROUTER.PT.SPECIALIZEDETAILPT);
  //     dispatch(getSpecializeDetailPt(null));
  //   }
  // };

  const onSearchFilter = (value) => {
    // if (value) {
    //   props.history.push(ROUTER.PT.SPECIALIZEDETAILPT.concat(`${value}`));
    // } else {
    //   props.history.push(ROUTER.PT.SPECIALIZEDETAILPT);
    //   dispatch(getSpecializeDetailPt(null));
    // }
    if (value === "1") {
      dispatch(setFiltersSpecialize({ experience__le: 2, experience__ge: "" }));
    } else if (value === "2") {
      dispatch(setFiltersSpecialize({ experience__ge: 2, experience__le: 5 }));
    } else if (value === "3") {
      dispatch(setFiltersSpecialize({ experience__ge: 5, experience__le: "" }));
    } else {
      dispatch(setFiltersSpecialize({ experience__ge: "", experience__le: "" }));
    }
  };
  const showKhoahoc = (data) => {
    setShowModalKhoaHoc({
      modalShow: true,
      dataTable: data,
    });
  };

  const onNextPage = (id) => {
    props.history.push(ROUTER.PT.CERTIFICATES_OF_SPECIALIZEDETAIL.concat(`/${id}`));
  };
  return (
    <>
      <Card
        style={{ backgroundColor: "#ffffff", borderRadius: "8px" }}
        title="Danh sách chuyên môn"
      >
        <Row gutter={24} style={{ marginBottom: "20px" }}>
          <div className="sm:tw-flex tw-justify-between tw-w-full">
            <div className="sm:tw-flex">
              <Space direction="vertical" className="tw-px-2">
                <Input
                  placeholder="Tìm kiếm theo tên"
                  style={{ width: 200 }}
                  type="search"
                  suffix={<SearchOutlined className="text-gray-400 text-md font-medium" />}
                  onChange={onSearch}
                />
              </Space>
              {/* <Form.Item className="tw-px-2">
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
              </Form.Item> */}
              <Form.Item className="tw-px-2">
                <Select
                  style={{ width: 150 }}
                  showSearch
                  allowClear
                  className="select-custom"
                  placeholder="Kinh nghiệm"
                  optionFilterProp="children"
                  onChange={onSearchFilter}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="1"> Dưới 2 năm </Option>
                  <Option value="2"> Từ 2 - 5 năm </Option>
                  <Option value="3"> Trên 5 năm </Option>
                </Select>
              </Form.Item>
            </div>
            <div className="sm:tw-mr-10">
              <Button
                style={{
                  borderRadius: ".42rem",
                  border: "#00d084",
                }}
                type="primary"
                onClick={() => showModal("create", null)}
              >
                <div className="tw-flex tw-items-center">
                  <PlusCircleTwoTone className="tw-pr-2" /> Thêm mới
                </div>
              </Button>
            </div>
          </div>

          <SpecializeDetailPtForm
            openModal={dataModal.openModal}
            type={dataModal.type}
            dataEdit={dataModal.dataEdit}
            handleCancel={handleCancel}
          />
          <ShowCoursesModal
            openModal={showModalKhoaHoc.modalShow}
            handleCancel={handleCancel}
            dataTable={showModalKhoaHoc.dataTable.length > 0 ? showModalKhoaHoc.dataTable : []}
          />
        </Row>
        <Row>
          <Col span={24}>
            <SpecializeDetailPtList
              onEdit={showModal}
              meta={meta}
              dataTable={SpecializeDetailPt}
              onDelete={onDelete}
              onChangePage={onChangePage}
              onNextPage={onNextPage}
              showKhoahoc={showKhoahoc}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default SpecializeDetailPt;
