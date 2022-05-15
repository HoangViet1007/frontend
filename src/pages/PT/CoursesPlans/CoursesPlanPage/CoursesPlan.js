import { PlusCircleTwoTone } from "@ant-design/icons";
import { Button, Card, Col, Row, Typography, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link, useParams } from "react-router-dom";
import ROUTER from "../../../../router/router";
import { Api } from "../../../../utils/Api";
import CoursesPlanList from "../components/CoursesPlanList";
import { deletePlan, getPlan } from "../CoursesPlanSlice";
const { Title } = Typography;
const CoursesPlan = (props) => {
  const history = useHistory();
  const plans = useSelector((state) => state.plans.items);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { idStage } = useParams();
  const [stageName, setStageName] = useState("");

  useEffect(() => {
    const getStageName = async () => {
      const { data } = await Api.get(`detail-stage/${idStage}`);
      setStageName(data?.name);
    };
    getStageName();
  }, [idStage]);

  useEffect(() => {
    const { search } = props.history.location;
    let params;
    const filterOptions = search.split("?")[1];
    if (filterOptions !== undefined) {
      params = `{"${decodeURI(filterOptions)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')}"}`;
      dispatch(getPlan(JSON.parse(params)));
    } else {
      dispatch(getPlan(idStage));
    }
  }, [dispatch, props.history.location]);

  const onDelete = async (e) => {
    try {
      dispatch(deletePlan(e?.id));
    } catch (error) {
      notification.error({ message: `${error}` });

    }
  };
  const onChangePage = (value) => {
    if (value) {
      props.history.push(ROUTER.PT.COURSES.concat(`?page=${value}`));
    } else {
      props.history.push(ROUTER.PT.COURSES);
      dispatch(getPlan(null));
    }
  };
  return (
    <>
      <Button type="primary" className="mb-5" onClick={() => history.goBack()}>
        Quay lại
      </Button>
      <Card style={{ backgroundColor: "#ffffff", borderRadius: "8px" }}>
        <Row gutter={24} style={{ marginBottom: "20px" }}>
          <Col span={12}>
            {/* <Search
              placeholder="Tìm kiếm"
              size="large"
              style={{ width: "100%" }}
              enterButton
              onSearch={onSearch}
            /> */}
            <Title level={4}>
              Danh sách buổi học của giai đoạn "{stageName}"
            </Title>
          </Col>
          <Col span={20}>
            {/* <Form.Item label="Trạng thái" style={{ maxWidth: "60%" }}>
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
                <Option value="Inactive"> Inactive </Option>
                <Option value="Active"> Active </Option>
              </Select>
            </Form.Item> */}
          </Col>
          <Col span={4}>
            <Link to={`/pt/khoa-hoc/${id}/giai-doan/${idStage}/them-buoi-hoc`}>
              <Button
                style={{
                  borderRadius: ".42rem",
                  border: "#00d084",
                  opacity: 1,
                  marginLeft: "50px",
                }}
                type="primary"
              >
                <PlusCircleTwoTone />
                Thêm mới
              </Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <CoursesPlanList
              // meta={meta}
              dataTable={plans}
              onDelete={onDelete}
              onChangePage={onChangePage}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default CoursesPlan;
