import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  notification,
  Row,
  Select,
  Upload,
} from "antd";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import ROUTER from "../../../../router/router";
import { Api } from "../../../../utils/Api";
import { EDITORCONFIGURATION, UPLOAD_API_URL } from "../../../../utils/Config";
import { getCoursesID, updateCourses } from "../CoursesSlice";

const { Option } = Select;
const CoursesEdit = () => {
  const history = useHistory();
  const [specialize, setSpecialize] = useState([]);
  const [level, setLevel] = useState([]);
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const [form] = Form.useForm();
  const courses = useSelector((state) => state.courses.item);
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState("");
  
  useEffect(() => {
    setContent(courses?.content);
    setDescription(courses?.description);
    setImageUrl(courses?.image);
    form.setFieldsValue({
      name: courses?.name,
      display: courses?.display === "Active" ? "Active" : "Inactive",
      description: courses?.description,
      price: courses?.price,
      image: courses?.image,
      content: courses?.content,
      customer_level_id: courses?.customer_level_id,
      lessons: courses?.lessons,
      time_a_lessons: courses?.time_a_lessons,
      specialize_detail_id: courses?.specialize_detail_id,
    });
  }, [courses, form]);

  useEffect(() => {
    dispatch(getCoursesID(id));
  }, []);

  useEffect(() => {
    const getData = async () => {
      const { data: getSpecialize } = await Api.get("/specialize-detail/pt");
      const { data: getLevel } = await Api.get("/customer_level");
      setSpecialize(getSpecialize.data);
      setLevel(getLevel.data);
    };
    getData();
  }, []);

  // New upload

  const [isUploading, setIsUploading] = useState(false);
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Ch??? c?? th??? t???i l??n file JPEG v?? PNG!");
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error("???nh ph???i nh??? h??n 5MB!");
    }
    return isJpgOrPng && isLt2M;
  }

  const handleUploadImage = (info) => {
    if (info.file.status === "uploading") {
      setIsUploading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(info.file.response.url);
        setIsUploading(false);
      });
      message.success(`T???i l??n ???nh ${info.file.originFileObj.name} th??nh c??ng`);
    }
    if (info.file.status === "error") {
      setIsUploading(false);
      message.error(`${info.file.response.status}`);
    }
  };

  const uploadButton = (
    <div>
      {isUploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>T???i l??n</div>
    </div>
  );

  // New upload

  const render = () => {
    const onFinish = async (value) => {
      const payload = {
        name: value?.name,
        display: value?.display === "Active" ? "Active" : "Inactive",
        description: description,
        price: value?.price,
        image: imageUrl,
        content: content,
        customer_level_id: value?.customer_level_id,
        lessons: value?.lessons,
        time_a_lessons: value?.time_a_lessons,
        specialize_detail_id: value?.specialize_detail_id,
      };
      try {
        const resulDispatch = await dispatch(updateCourses({ id, payload }));
        unwrapResult(resulDispatch);
        notification.success({ message: `S???a th??nh c??ng !!!` });
        history.push(ROUTER.PT.COURSES);
      } catch (error) {
        return notification.error({ message: `${error}` });
      }
    };

    return (
      <>
        <Form layout="vertical" form={form} id="courses" onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={24}>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="T??n kh??a h???c"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "M???i nh???p t??n kh??a h???c",
                      },
                    ]}
                  >
                    <Input placeholder="T??n kh??a h???c" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Tr???ng th??i hi???n th???" name="display">
                    <Select>
                      <Option value="Active">Hi???n th???</Option>
                      <Option value="Inactive">???n</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Gi?? kh??a h???c"
                    name="price"
                    rules={[
                      {
                        required: true,
                        message: "M???i nh???p gi??",
                      },
                      {
                        pattern: /^(0|[1-9][0-9]*)$/,
                        message: "Vui l??ng nh???p b???ng s???",
                      },
                    ]}
                  >
                    <Input placeholder="Gi??" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="image" label="???nh">
                    <Upload
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      action={UPLOAD_API_URL}
                      beforeUpload={beforeUpload}
                      onChange={handleUploadImage}
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="avatar"
                          style={{ width: "100%", height: "100%" }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label=" Th???i gian/bu???i (ph??t)"
                    name="time_a_lessons"
                    rules={[
                      {
                        required: true,
                        message: "M???i nh???p th???i gian/bu???i",
                      },
                      {
                        pattern: /^(0|[1-9][0-9]*)$/,
                        message: "Vui l??ng nh???p b???ng s???",
                      },
                    ]}
                  >
                    <Input placeholder="Th???i gian/bu???i" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="T???ng s??? bu???i"
                    name="lessons"
                    rules={[
                      {
                        required: true,
                        message: "M???i nh???p t???ng s??? bu???i",
                      },
                      {
                        pattern: /^(0|[1-9][0-9]*)$/,
                        message: "Vui l??ng nh???p b???ng s???",
                      },
                    ]}
                  >
                    <Input placeholder="T???ng s??? bu???i" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="C???p ?????"
                    name="customer_level_id"
                    rules={[
                      {
                        required: true,
                        message: "M???i nh???p c???p ?????",
                      },
                      {
                        pattern: /^(0|[1-9][0-9]*)$/,
                        message: "Vui l??ng nh???p b???ng s???",
                      },
                    ]}
                  >
                    {/* <Input placeholder="chuy??n m??n" /> */}
                    <Select
                      className="select-custom"
                      placeholder="M???i nh???p c???p ?????"
                    >
                      {level?.map((item, index) => {
                        return (
                          <Option key={index} value={item?.id}>
                            {item?.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Chuy??n m??n"
                    name="specialize_detail_id"
                    rules={[
                      {
                        required: true,
                        message: "Chuy??n m??n",
                      },
                    ]}
                  >
                    {/* <Input placeholder="H??y ch???n chuy??n m??n" /> */}
                    <Select
                      className="select-custom"
                      placeholder="H??y ch???n chuy??n m??n"
                    >
                      {specialize?.map((item, index) => {
                        return (
                          <Option key={index} value={item?.id}>
                            {item?.specialize?.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="M?? t???"
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: "M???i nh???p m?? t???",
                      },
                    ]}
                  >
                    {/* <Input placeholder="m?? t???" /> */}
                    <CKEditor
                      editor={Editor}
                      config={EDITORCONFIGURATION}
                      data={courses?.description}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setDescription(data);
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="N???i dung"
                    name="content"
                    rules={[
                      {
                        required: false,
                        message: "M???i nh???p n???i dung",
                      },
                    ]}
                  >
                    <CKEditor
                      editor={Editor}
                      config={EDITORCONFIGURATION}
                      data={courses?.content}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setContent(data);
                      }}
                    />
                  </Form.Item>
                </Col>
                <div className="tw-text-center tw-flex-auto">
                  <Form.Item className="ml-4">
                    <Button type="primary" className="" htmlType="submit">
                      Ch???nh s???a
                    </Button>
                    <Button
                      className="ml-4"
                      type="primary"
                      danger
                      onClick={() => history.push(ROUTER.PT.COURSES)}
                    >
                      Tho??t
                    </Button>
                  </Form.Item>
                </div>
              </Row>
            </Col>
          </Row>
        </Form>
        {courses?.status === "Happening" && (
          <div className="tw-text-red-500">
            L??u ??: ????? kh??a h???c ???????c ti???p t???c ho???t ?????ng, sau khi ch???nh s???a h??y
            g???i y??u c???u cho qu???n tr??? vi??n x??t duy???t.
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <Card style={{ backgroundColor: "#ffffff", borderRadius: "8px" }}>
        {render()}
      </Card>
    </>
  );
};

export default CoursesEdit;
