import { PlusCircleTwoTone } from "@ant-design/icons";
import {
  Button,
  Card, Col, Form, Input, Row, Select
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ROUTER from "../../../../router/router";
import { deleteCertificates, getCertificates } from "../CertificatesSlice";
import CertificatesForm from "../components/CertificatesForm";
import CertificatesList from "../components/CertificatesList";
const { Search } = Input;
const { Option } = Select;
const Certificates = (props) => {
  const certificates = useSelector((state) => state.certificates.items);
  const meta = useSelector((state) => state.certificates.meta);
  const dispatch = useDispatch();
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
  useEffect(() => {
    const { search } = props.history.location;
    let params;
    const filterOptions = search.split("?")[1];
    if (filterOptions !== undefined) {
      params = `{"${decodeURI(filterOptions)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')}"}`;
      dispatch(getCertificates(JSON.parse(params)));
    } else {
      dispatch(getCertificates(null));
    }
  }, [dispatch, props.history.location]);

  const onDelete = async (e) => {
    dispatch(deleteCertificates(e?.id));
  };
  const onChangePage = (value) => {
    if (value) {
      props.history.push(ROUTER.PT.CERTIFICATES.concat(`?page=${value}`));
    } else {
      props.history.push(ROUTER.PT.CERTIFICATES);
      dispatch(getCertificates(null));
    }
  };
  const handleCancel = async () => {
    await setDataModal({
      openModal: false,
      type: "",
      dataEdit: null,
    });
    dispatch(getCertificates(null));
  };
  const onSearch = (value) => {
    if (value) {
      props.history.push(ROUTER.PT.CERTIFICATES.concat(`?name__~=${value}`));
    } else {
      props.history.push(ROUTER.PT.CERTIFICATES);
      dispatch(getCertificates(null));
    }
  };
  const onSearchStatus = (value) => {
    if (value) {
      props.history.push(
        ROUTER.PT.CERTIFICATES.concat(`?status__eq=${value}`)
      );
    } else {
      props.history.push(ROUTER.PT.CERTIFICATES);
      dispatch(getCertificates(null));
    }
  };
  return (
    <>
      <Card style={{ backgroundColor: "#ffffff", borderRadius: "8px" }}>
        <Row gutter={24} style={{ marginBottom: "20px" }}>
          <Col span={6}>
            <Search
              placeholder="Tìm kiếm"
              size="large"
              style={{ width: "100%" }}
              enterButton
              onSearch={onSearch}
            />
          </Col>
          <Col span={6}>
            <Form.Item label="Trạng thái" >
              <Select
                showSearch
                className="select-custom"
                placeholder="Tìm trạng thái"
                optionFilterProp="children"
                onChange={onSearchStatus}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="Inactive"> Kích hoạt </Option>
                <Option value="Active"> Chưa kích hoạt </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Row>
              <Col span={10} />
              <h1
                span={4}
                style={{
                  fontSize: "1.6em",
                  fontWeight: "bold",
                  textAlign: "center",
                  borderBottom: "0.5px solid #feaa54",
                }}
              >
                Quản lý cấu hình{" "}
              </h1>
            </Row>
          </Col>
          <Col span={4}>
            <Button
              style={{
                borderRadius: ".42rem",
                border: "#00d084",
                opacity: 0.7,
                marginLeft: "50px",
              }}
              type="primary"
              onClick={() => showModal("create", null)}
            >
              <PlusCircleTwoTone /> Thêm mới
            </Button>
            <CertificatesForm
              openModal={dataModal.openModal}
              type={dataModal.type}
              dataEdit={dataModal.dataEdit}
              handleCancel={handleCancel}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <CertificatesList
              onEdit={showModal}
              meta={meta}
              dataTable={certificates}
              onDelete={onDelete}
              onChangePage={onChangePage}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Certificates;
