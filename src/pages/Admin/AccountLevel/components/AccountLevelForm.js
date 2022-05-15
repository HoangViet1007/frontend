import { unwrapResult } from "@reduxjs/toolkit";
import { UploadOutlined } from "@ant-design/icons";
import {
  Col,
  Form,
  Input,
  notification,
  Row,
  Select,
  Upload,
  Image,
  message,
  Switch,
  Button,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormModal from "../../../../components/componentsAdmin/Modal/FormModal";
import { getAllSpecialize } from "../../../Admin/Specialize/SpecializeSlice";
import { getInfoUser } from "../../../UserSlice";
import user from "../../../../assets/user.png";
import { uploadImg } from "../../../../utils/uploadImg";
import { updateAccountLevel, addAccountLevel } from "./../AccountLevelSlice";

const { Option } = Select;
const AccountLevelForm = (props) => {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState("");
  const { handleCancel, openModal, dataEdit, type } = props;
  const [form] = Form.useForm();
  // const listAllAccountLevel = useSelector((state) => state.AccountLevel.items);
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

  useEffect(() => {
    if (dataEdit !== null) {
      form.setFieldsValue({
        name: dataEdit?.name,
        image: dataEdit?.image,
        display_name: dataEdit?.display_name,
        course_number: dataEdit?.course_number,
        user_number: dataEdit?.user_number,
        status: dataEdit?.status,
        is_mutable: dataEdit?.is_mutable,
      });
      setImageUrl(dataEdit?.image);
    } else {
      form.resetFields();
      setImageUrl("");
    }
  }, [dataEdit, form]);
  const onFinish = async (value) => {
    const payload = {
      name: value?.name,
      image: imageUrl,
      display_name: value?.display_name,
      course_number: value?.course_number,
      user_number: value?.user_number,
      status: value?.status === true ? "Active" : "Inactive",
      is_mutable: value?.is_mutable === true ? 1 : 2,
    };

    if (type === "update" && dataEdit?.id) {
      try {
        const id = dataEdit?.id;
        const resulDispatch = await dispatch(updateAccountLevel({ id, payload }));
        if (resulDispatch.error) {
          form.setFields([
            resulDispatch.payload.name
              ? {
                  name: "name",
                  errors: [resulDispatch.payload.name],
                }
              : "",
            resulDispatch.payload.display_name
              ? {
                  name: "display_name",
                  errors: [resulDispatch.payload.display_name],
                }
              : "",
            resulDispatch.payload.course_number
              ? {
                  name: "course_number",
                  errors: [resulDispatch.payload.course_number],
                }
              : "",
            resulDispatch.payload.user_number
              ? {
                  name: "user_number",
                  errors: [resulDispatch.payload.user_number],
                }
              : "",
            resulDispatch.payload.status
              ? {
                  name: "status",
                  errors: [resulDispatch.payload.status],
                }
              : "",
          ]);
        }
        unwrapResult(resulDispatch);
        notification.success({ message: `Sửa chức vụ thành công !!!` });
        handleCancel();
        form.resetFields();
      } catch (error) {
        notification.error({ message: `Sửa chức vụ thất bại !` });
      }
    } else {
      try {
        const resulDispatch = await dispatch(addAccountLevel(payload));
        if (resulDispatch.error) {
          form.setFields([
            resulDispatch.payload.name
              ? {
                  name: "name",
                  errors: [resulDispatch.payload.name],
                }
              : "",
            resulDispatch.payload.display_name
              ? {
                  name: "display_name",
                  errors: [resulDispatch.payload.display_name],
                }
              : "",
            resulDispatch.payload.course_number
              ? {
                  name: "course_number",
                  errors: [resulDispatch.payload.course_number],
                }
              : "",
            resulDispatch.payload.user_number
              ? {
                  name: "user_number",
                  errors: [resulDispatch.payload.user_number],
                }
              : "",
            resulDispatch.payload.status
              ? {
                  name: "status",
                  errors: [resulDispatch.payload.status],
                }
              : "",
          ]);
        }
        unwrapResult(resulDispatch);
        notification.success({ message: `Thêm chức vụ thành công !!!` });
        handleCancel();
        form.resetFields();
      } catch (error) {
        notification.error({ message: `Thêm chức vụ thất bại !` });
      }
    }
  };
  return (
    <>
      <FormModal
        titleModal={type === "create" ? "Thêm mới" : `Cập nhật`}
        titleForm={"specializedetailpt"}
        visible={openModal}
        handleCancel={() => {
          handleCancel();
          form.resetFields();
        }}
        width={"60%"}
      >
        <Form layout="vertical" form={form} id="specializedetailpt" onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={24} lg={{ span: 16 }}>
              <Row gutter={16}>
                <Col span={24} lg={{ span: 12 }}>
                  <Form.Item
                    label="Tên cấp độ"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập tên cấp độ",
                      },
                    ]}
                  >
                    <Input placeholder="Tên cấp độ" />
                  </Form.Item>
                </Col>
                <Col span={24} lg={{ span: 12 }}>
                  <Form.Item
                    label="Tên hiển thị"
                    name="display_name"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập tên hiển thị",
                      },
                    ]}
                  >
                    <Input placeholder="Tên hiển thị" />
                  </Form.Item>
                </Col>
                <Col span={24} lg={{ span: 12 }}>
                  <Form.Item
                    label="Số khoá học tối thiểu"
                    name="course_number"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập khoá học tối thiểu",
                      },
                      {
                        pattern: /^(0|[1-9][0-9]*)$/,
                        message: "Vui lòng nhập bằng số",
                      },
                    ]}
                  >
                    <Input placeholder="Tên khoá học tối thiểu" />
                  </Form.Item>
                </Col>
                <Col span={24} lg={{ span: 12 }}>
                  <Form.Item
                    label="Số học viên tối thiểu"
                    name="user_number"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập học viên tối thiểu",
                      },
                      {
                        pattern: /^(0|[1-9][0-9]*)$/,
                        message: "Vui lòng nhập bằng số",
                      },
                    ]}
                  >
                    <Input placeholder="Tên học viên tối thiểu" />
                  </Form.Item>
                </Col>
                <Col span={24} lg={{ span: 12 }}>
                  <Form.Item label="Trạng thái" name="status" valuePropName="checked">
                    <Switch
                      {...(dataEdit?.status === "Active" ? { checked: true } : { checked: false })}
                    />
                  </Form.Item>
                </Col>
                <Col span={24} lg={{ span: 12 }}>
                  <Form.Item label="Quyền xoá" name="status" valuePropName="checked">
                    <Switch
                      {...(dataEdit?.is_mutable === 1 ? { checked: true } : { checked: false })}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={24} lg={{ span: 8 }}>
              <Row style={{ justifyContent: "center" }}>
                <Form.Item name="image">
                  <Image
                    src={imageUrl !== "" ? imageUrl : user}
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
        </Form>
      </FormModal>
    </>
  );
};

export default AccountLevelForm;
