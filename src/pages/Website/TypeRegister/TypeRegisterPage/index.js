import { Card, Col, Row } from "antd";
import React from "react";
import PageTitle from "../../../../components/componentsWebsite/TitlePage";
import ImgLogoButton from "../../../../assets/images/clinet/logo-2.png";
import { Link } from "react-router-dom";
import ROUTER from "../../../../router/router";
const TypeRegisterPage = () => {
  return (
    <>
      <PageTitle namePage="Đăng ký" />
      <div className="tw-py-7">
        <div className="tw-max-w-4xl tw-mx-auto">
          <Row>
            <Col
              className="gutter-row tw-p-3"
              xs={{ span: 24 }}
              md={{ span: 12 }}
            >
              <Card className="tw-shadow">
                <h2 className="tw-font-medium tw-text-[20px]">Bạn là PT</h2>
                <p className="tw-py-3 tw-text-gray-600 tw-font-medium">
                  Đăng ký bằng Email và Password
                </p>
                <div className="register-button">
                  <Link to={ROUTER.CLIENT.REGISTERPT}>
                    <button className="theme-btn btn-style-three tw-border tw-w-full tw-p-1">
                      <div className="tw-relative tw-z-[1] tw-flex tw-items-center tw-justify-center">
                        <img className="tw-w-12" src={ImgLogoButton} alt="Hình ảnh không tồn tại" />
                        <span className=" tw-pl-5 tw-font-medium tw-normal-case ">
                          Đăng ký làm PT
                        </span>
                      </div>
                    </button>
                  </Link>
                </div>
              </Card>
            </Col>
            <Col
              className="gutter-row tw-p-3"
              xs={{ span: 24 }}
              md={{ span: 12 }}
            >
              <Card className="tw-shadow">
                <h2 className="tw-font-medium tw-text-[20px]">
                  Bạn là Khách hàng
                </h2>
                <p className="tw-py-3 tw-text-gray-600 tw-font-medium">
                  Đăng ký bằng Email và Password
                </p>
                <div className="register-button">
                  <Link to={ROUTER.CLIENT.REGISTERCUSTUMER}>
                    <button className="theme-btn btn-style-three tw-border tw-w-full tw-p-1">
                      <div className="tw-relative tw-z-[1] tw-flex tw-items-center tw-justify-center">
                        <img className="tw-w-12" src={ImgLogoButton} alt="Hình ảnh không tồn tại" />
                        <span className=" tw-pl-5 tw-font-medium tw-normal-case ">
                          Đăng ký làm khách hàng
                        </span>
                      </div>
                    </button>
                  </Link>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default TypeRegisterPage;
