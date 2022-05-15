import { PlusCircleTwoTone } from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Card, Col, Input, notification, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ROUTER from "../../../../router/router";
import CertificatesBySpecializeDetailForm from "../components/CertificatesBySpecializeDetailForm";
import CertificatesBySpecializeDetailList from "../components/CertificatesBySpecializeDetailList";
import {
  deleteCertificatesBySpecialize,
  getCertificatesBySpecialize,
} from "../SpecializeDetailPtSilce";
const { Search } = Input;
const CertificatesBySpecializeDetail = (props) => {
  const { id } = useParams();
  const listCertificates = useSelector((state) => state.SpecializeDetailPt.items);
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
    dispatch(getCertificatesBySpecialize(id));
  }, [dispatch]);

  const onDelete = async (e) => {
    try {
      const resultAction = await dispatch(deleteCertificatesBySpecialize(e?.id));
      unwrapResult(resultAction);
      notification.success({ message: `Xoá thành công !` });
    } catch (error) {
      notification.error({ message: `${error}` });
    }
  };
  const handleCancel = async () => {
    await setDataModal({
      openModal: false,
      type: "",
      dataEdit: null,
    });
    dispatch(getCertificatesBySpecialize(id));
  };
  // const onSearch = (value) => {
  //   if (value) {
  //     props.history.push(ROUTER.PT.SPECIALIZEDETAILPT.concat(`?name__~=${value}`));
  //   } else {
  //     props.history.push(ROUTER.PT.SPECIALIZEDETAILPT);
  //     dispatch(getCertificatesBySpecialize(id));
  //   }
  // };

  return (
    <>
      <Card style={{ backgroundColor: "#ffffff", borderRadius: "8px" }} title="Danh sách chứng chỉ">
        <Row gutter={24} style={{ marginBottom: "20px" }}>
          <Col span={6}>
            {/* <Search placeholder="Tìm kiếm" size="large" style={{ width: "100%" }} enterButton onSearch={onSearch} /> */}
          </Col>
          <Col span={8}>
            {/* <Row>
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
                Chứng chỉ
              </h1>
            </Row> */}
          </Col>
          <Col span={6} />
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
            <CertificatesBySpecializeDetailForm
              openModal={dataModal.openModal}
              type={dataModal.type}
              dataEdit={dataModal.dataEdit}
              handleCancel={handleCancel}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <CertificatesBySpecializeDetailList
              onEdit={showModal}
              dataTable={listCertificates}
              onDelete={onDelete}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default CertificatesBySpecializeDetail;
