import { UploadOutlined } from "@ant-design/icons";

import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Upload,
  Image,
  message,
  notification,
} from "antd";
import React, { useState, useEffect } from "react";
import FormModal from "./../../../../components/componentsAdmin/Modal/FormModal";
import user from "../../../../assets/user.png";
import { uploadImg } from "./../../../../utils/uploadImg";
import { addSetting } from "../SettingSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { updateSetting } from "./../SettingSlice";
import { flatMap } from "lodash";
const { Option } = Select;
const SettingForm = (props) => {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState("");
  const { handleCancel, openModal, type, dataEdit } = props;
  const [form] = Form.useForm();
  const uploadImageHandle = {
    async onChange(info) {
      const typeImg = info?.file?.type;
      if (typeImg === "image/png" || typeImg === "image/jpeg") {
        await uploadImg(info.file).then((img) => {
          setImageUrl(img);
        });
        message.success("Tải ảnh thành công !");
      } else {
        message.error("Vui lòng chọn đúng định dạng ảnh !");
      }
    },
  };

  const fieldFrom = [
    { name: "Văn bản", type: "text" },
    { name: "Upload Ảnh", type: "upload" },
  ];
  const [typeSelect, setTypeSelect] = useState("");
  const onChange = (value) => {
    setTypeSelect(value);
    form.resetFields();
  };
  useEffect(() => {
    const editValue = dataEdit?.config_value;
    if (dataEdit !== null) {
      form.setFieldsValue({
        config_key: dataEdit?.config_key,
        config_value: dataEdit?.config_value ? dataEdit?.config_value : imageUrl,
        status: dataEdit?.status === "Active" ? true : false,
      });
      editValue?.slice(0, 8) === "https://" ? setTypeSelect("upload") : setTypeSelect("text");

      setImageUrl(dataEdit?.config_value);
    } else {
      form.resetFields();
      setImageUrl(dataEdit?.config_value);
    }
  }, [dataEdit, form]);
  const onFinish = async (value) => {
    const payload = {
      config_key: value?.config_key,
      config_value: value?.config_value ? value?.config_value : imageUrl,
      status: value?.status === true ? "Active" : "Inactive",
    };
    if (type === "update" && dataEdit?.id) {
      try {
        const id = dataEdit?.id;
        const resultAction = await dispatch(updateSetting({ id, payload }));
        unwrapResult(resultAction);
        notification.success({ message: `Sửa cấu hình thành công !` });
        handleCancel();
        form.resetFields();
      } catch (error) {
        const getErr = (obj, index) => {
          var i = 0;
          for (var attr in obj) {
            if (index === i) {
              return obj[attr];
            }
            i++;
          }
          return null;
        };
        const messageErr = getErr(error, 0);
        return notification.error({
          message: ` Lỗi: ${messageErr} `,
        });
      }
    } else {
      try {
        const resulDispatch = await dispatch(addSetting(payload));
        unwrapResult(resulDispatch);
        notification.success({ message: `Thêm cấu hình thành công !` });
        handleCancel();
        form.resetFields();
      } catch (error) {
        const getErr = (obj, index) => {
          var i = 0;
          for (var attr in obj) {
            if (index === i) {
              return obj[attr];
            }
            i++;
          }
          return null;
        };
        const messageErr = getErr(error, 0);
        return notification.error({
          message: ` Lỗi: ${messageErr} `,
        });
      }
    }
  };
  const renderFrom = (typee) => {
    if (typee === "text") {
      return (
        <>
          <Form layout="vertical" onFinish={onFinish} form={form} id="setting">
            <Col span={24}>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item
                    name="config_key"
                    label="Tiêu đề"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập tiêu đề",
                      },
                    ]}
                  >
                    <Input placeholder="Tiêu đề" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="config_value"
                    label="Nội dung"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập nội dung",
                      },
                    ]}
                  >
                    <Input.TextArea rows={4} placeholder="Nội dung" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Trạng thái" name="status" valuePropName="checked">
                    <Switch defaultChecked={false} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Form>
        </>
      );
    }
    if (typee === "upload") {
      return (
        <>
          <Form layout="vertical" onFinish={onFinish} form={form} id="setting">
            <Col span={24}>
              <Row gutter={24}>
                <Col span={24} lg={{ span: 16 }}>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        name="config_key"
                        label="Tiêu đề"
                        rules={[
                          {
                            required: true,
                            message: "Mời nhập tiêu đề",
                          },
                        ]}
                      >
                        <Input placeholder="Tiêu đề" />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item label="Trạng thái" name="status" valuePropName="checked">
                        <Switch />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={24} lg={{ span: 8 }}>
                  <Row style={{ justifyContent: "center" }}>
                    <Form.Item name="image">
                      <Image
                        src={imageUrl === undefined ? user : imageUrl}
                        style={{
                          height: 150,
                          width: 150,
                          borderRadius: "50%",
                          marginTop: "27px",
                        }}
                        alt="Hình ảnh không tồn tại"
                      />
                    </Form.Item>
                  </Row>
                  <Row style={{ justifyContent: "center" }}>
                    <Upload beforeUpload="false" showUploadList={false} {...uploadImageHandle}>
                      <Button icon={<UploadOutlined />}>
                        {type === "update" ? "Thay đổi ảnh" : "Chọn ảnh"}
                      </Button>
                    </Upload>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Form>
        </>
      );
    }
  };
  return (
    <>
      <FormModal
        titleModal={type === "create" ? "Thêm mới" : `Cập nhật`}
        titleForm={"setting"}
        visible={openModal}
        handleCancel={() => {
          handleCancel();
          form.resetFields();
          setTypeSelect("");
        }}
        width={"30%"}
      >
        {type === "create" ? (
          <Form.Item
            label="Chọn định dạng"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              style={{ backgroundColor: "#f0f2f5" }}
              showSearch
              name="selectType"
              // style={{ width: 200 }}
              placeholder="Chọn type"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {fieldFrom.map((item) => {
                return <Option value={item.type}>{item.name}</Option>;
              })}
            </Select>
          </Form.Item>
        ) : (
          ""
        )}

        {renderFrom(typeSelect)}
      </FormModal>
    </>
  );
};

export default SettingForm;
