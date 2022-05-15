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
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import ROUTER from "../../../../router/router";
import { Api } from "../../../../utils/Api";
import { EDITORCONFIGURATION, UPLOAD_API_URL } from "../../../../utils/Config";
import { addCourses } from "../CoursesSlice";
const CoursesAdd = () => {
  const { Option } = Select;
  useEffect(() => {
    const getData = async () => {
      const { data: getSpecialize } = await Api.get("/specialize-detail/pt");
      const { data: getLevel } = await Api.get("/customer_level");
      setSpecialize(getSpecialize.data);
      setLevel(getLevel.data);
    };

    getData();
  }, []);
  const [imageUrl, setImageUrl] = useState("");

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
      message.error("Chỉ có thể tải lên file JPEG và PNG!");
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error("Ảnh phải nhỏ hơn 5MB!");
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
      message.success(`Tải lên ảnh ${info.file.originFileObj.name} thành công`);
    }
    if (info.file.status === "error") {
      setIsUploading(false);
      message.error(`${info.file.response.status}`);
    }
  };

  const uploadButton = (
    <div>
      {isUploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </div>
  );

  // New upload

  const [specialize, setSpecialize] = useState([]);
  const [level, setLevel] = useState([]);
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();

  const render = () => {
    const onFinish = async (value) => {
      value.description = description;
      value.content = content;
      value.image = imageUrl;
      try {
        const resulDispatch = await dispatch(addCourses(value));
        unwrapResult(resulDispatch);
        history.push(ROUTER.PT.COURSES);
        setImageUrl("");
        notification.success({ message: `Thêm thành công !!!` });
      } catch (error) {
        if (imageUrl === "") {
          notification.error({ message: `Chưa chọn ảnh` });
        } else {
          return notification.error({ message: `${error}` });
        }
      }
    };

    return (
      <>
        <Form layout="vertical" id="courses" onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={24}>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="Tên khóa học"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập tên khóa học",
                      },
                    ]}
                  >
                    <Input placeholder="Tên khóa học" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Trạng thái hiển thị"
                    name="display"
                    rules={[
                      {
                        required: true,
                        message: "Mời chọn trạng thái hiển thị",
                      },
                    ]}
                  >
                    <Select defaultValue="Trạng thái hiển thị">
                      <Option value="Active">Hiển thị</Option>
                      <Option value="Inactive">Ẩn</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Giá"
                    name="price"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập giá",
                      },
                      {
                        pattern: /^(0|[1-9][0-9]*)$/,
                        message: "Vui lòng nhập bằng số",
                      },
                    ]}
                  >
                    <Input placeholder="Giá" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="image"
                    label="Ảnh"
                    rules={[
                      {
                        required: false,
                        message: "Mời tải lên ảnh",
                      },
                    ]}
                  >
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
                    label=" Thời gian/buổi (phút)"
                    name="time_a_lessons"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập thời gian/buổi",
                      },
                      {
                        pattern: /^(0|[1-9][0-9]*)$/,
                        message: "Vui lòng nhập bằng số",
                      },
                    ]}
                  >
                    <Input placeholder="Thời gian/buổi" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Tổng số buổi"
                    name="lessons"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập tổng số buổi",
                      },
                      {
                        pattern: /^(0|[1-9][0-9]*)$/,
                        message: "Vui lòng nhập bằng số",
                      },
                    ]}
                  >
                    <Input placeholder="Tổng số buổi" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Cấp độ"
                    name="customer_level_id"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập cấp độ",
                      },
                    ]}
                  >
                    <Select
                      className="select-custom"
                      placeholder="Mời nhập cấp độ"
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
                    label="Chuyên môn"
                    name="specialize_detail_id"
                    rules={[
                      {
                        required: true,
                        message: "Chuyên môn",
                      },
                    ]}
                  >
                    <Select
                      className="select-custom"
                      placeholder="Hãy chọn chuyên môn"
                    >
                      {specialize.map((item, index) => {
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
                    label="Mô tả"
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập mô tả",
                      },
                    ]}
                  >
                    <CKEditor
                      editor={Editor}
                      config={EDITORCONFIGURATION}
                      data=""
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setDescription(data);
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Nội dung"
                    name="content"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập nội dung",
                      },
                    ]}
                  >
                    <CKEditor
                      editor={Editor}
                      config={EDITORCONFIGURATION}
                      data=""
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setContent(data);
                      }}
                    />
                  </Form.Item>
                </Col>

                <div className="tw-text-center tw-flex-auto">
                  <Form.Item>
                    <Button type="primary" className="" htmlType="submit">
                      Thêm mới
                    </Button>

                    <Button
                      className="ml-4"
                      type="primary"
                      danger
                      onClick={() => history.push(ROUTER.PT.COURSES)}
                    >
                      Thoát
                    </Button>
                  </Form.Item>
                </div>
              </Row>
            </Col>
          </Row>
        </Form>
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

export default CoursesAdd;
