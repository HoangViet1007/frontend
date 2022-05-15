import { LockOutlined, UploadOutlined } from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  message,
  notification,
  Row,
  Select,
  Switch,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import user from "../../../../assets/user.png";
import FormModal from "../../../../components/componentsAdmin/Modal/FormModal";
import { uploadImg } from "../../../../utils/uploadImg";
import { Api } from "./../../../../utils/Api";
import { addUser, updateUser } from "./../UserAdminSlice";
const { Option } = Select;
const UserForm = (props) => {
  const [imageUrl, setImageUrl] = useState("");
  const [roleName, setRoleName] = useState([]);

  const dispatch = useDispatch();
  const { handleCancel, openModal, dataEdit, type } = props;
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
  const getStageName = async () => {
    const { data } = await Api.get("role");
    setRoleName(data.data);
  };

  useEffect(() => {
    const editRoles = dataEdit?.roles;
    if (dataEdit !== null) {
      form.setFieldsValue({
        name: dataEdit?.name,
        address: dataEdit?.address,
        phone: dataEdit?.phone,
        email: dataEdit?.email,
        status: dataEdit?.status,
        sex: dataEdit?.sex,
        password: dataEdit?.password,
        cf_password: dataEdit?.cf_password,
        image: dataEdit?.image,
        role_ids: editRoles?.map((item) => item?.id),
      });

      setImageUrl(dataEdit?.image);
    } else {
      form.resetFields();
      setImageUrl("");
    }
    getStageName();
  }, [dataEdit, form]);

  const onFinish = async (value) => {
    const payload = {
      name: value?.name,
      address: value?.address,
      phone: value?.phone,
      email: value?.email,
      status: value?.status === true ? "Active" : "Inactive",
      sex: value?.sex,
      password: value?.password ? value?.password : "",
      cf_password: value?.cf_password ? value?.cf_password : "",
      image: imageUrl,
      role_ids: value?.role_ids,
    };
    if (type === "update" && dataEdit?.id) {
      try {
        const id = dataEdit?.id;
        const resulDispatch = await dispatch(updateUser({ id, payload }));
        if (resulDispatch.error) {
          form.setFields([
            resulDispatch.payload?.messages?.name
              ? {
                  name: "name",
                  errors: [resulDispatch.payload?.messages?.name],
                }
              : "",
            resulDispatch.payload?.messages?.email
              ? {
                  name: "email",
                  errors: [resulDispatch.payload?.messages?.email],
                }
              : "",
            resulDispatch.payload?.messages?.phone
              ? {
                  name: "phone",
                  errors: [resulDispatch.payload?.messages?.phone],
                }
              : "",
            resulDispatch.payload?.messages?.address
              ? {
                  name: "address",
                  errors: [resulDispatch.payload?.messages?.address],
                }
              : "",
            resulDispatch.payload?.messages?.sex
              ? {
                  name: "sex",
                  errors: [resulDispatch.payload?.messages?.sex],
                }
              : "",
            resulDispatch.payload?.messages?.role_ids
              ? {
                  name: "role_ids",
                  errors: [resulDispatch.payload?.messages?.role_ids],
                }
              : "",
            resulDispatch.payload?.messages?.status
              ? {
                  name: "status",
                  errors: [resulDispatch.payload?.messages?.status],
                }
              : "",
            resulDispatch.payload?.messages?.image
              ? {
                  name: "image",
                  errors: [resulDispatch.payload?.messages?.image],
                }
              : "",
            resulDispatch.payload?.messages?.password
              ? {
                  name: "password",
                  errors: [resulDispatch.payload?.messages?.password],
                }
              : "",
            resulDispatch.payload?.messages?.cf_password
              ? {
                  name: "cf_password",
                  errors: [resulDispatch.payload?.messages?.cf_password],
                }
              : "",
          ]);
        }
        unwrapResult(resulDispatch);
        notification.success({ message: `Sửa tài khoản thành công !` });
        handleCancel();
        form.resetFields();
      } catch (error) {
        notification.error({ message: `${error?.message}` });
      }
    } else {
      try {
        const resulDispatch = await dispatch(addUser(payload));
        if (resulDispatch.error) {
          form.setFields([
            resulDispatch.payload?.messages?.name
              ? {
                  name: "name",
                  errors: [resulDispatch.payload?.messages?.name],
                }
              : "",
            resulDispatch.payload?.messages?.email
              ? {
                  name: "email",
                  errors: [resulDispatch.payload?.messages?.email],
                }
              : "",
            resulDispatch.payload?.messages?.phone
              ? {
                  name: "phone",
                  errors: [resulDispatch.payload?.messages?.phone],
                }
              : "",
            resulDispatch.payload?.messages?.address
              ? {
                  name: "address",
                  errors: [resulDispatch.payload?.messages?.address],
                }
              : "",
            resulDispatch.payload?.messages?.sex
              ? {
                  name: "sex",
                  errors: [resulDispatch.payload?.messages?.sex],
                }
              : "",
            resulDispatch.payload?.messages?.role_ids
              ? {
                  name: "role_ids",
                  errors: [resulDispatch.payload?.messages?.role_ids],
                }
              : "",
            resulDispatch.payload?.messages?.status
              ? {
                  name: "status",
                  errors: [resulDispatch.payload?.messages?.status],
                }
              : "",
            resulDispatch.payload?.messages?.image
              ? {
                  name: "image",
                  errors: [resulDispatch.payload?.messages?.image],
                }
              : "",
            resulDispatch.payload?.messages?.password
              ? {
                  name: "password",
                  errors: [resulDispatch.payload?.messages?.password],
                }
              : "",
            resulDispatch.payload?.messages?.cf_password
              ? {
                  name: "cf_password",
                  errors: [resulDispatch.payload?.messages?.cf_password],
                }
              : "",
          ]);
        }
        unwrapResult(resulDispatch);
        notification.success({ message: `Thêm tài khoản thành công !` });
        handleCancel();
        form.resetFields();
      } catch (error) {
        notification.error({ message: `Thêm tài khoản không thành công` });
      }
    }
  };
  const InputPassWord = () => {
    if (type === "create") {
      return (
        <>
          <Col span={24} lg={{ span: 12 }}>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Mời nhập password",
                },
              ]}
            >
              <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
            </Form.Item>
          </Col>
          <Col span={24} lg={{ span: 12 }}>
            <Form.Item
              label="Nhập lại mật khẩu"
              name="cf_password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Mời nhập password",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error("Hai mật khẩu không trùng khớp !!!"));
                  },
                }),
              ]}
            >
              <Input prefix={<LockOutlined />} type="password" placeholder="Nhập lại mật khẩu" />
            </Form.Item>
          </Col>
        </>
      );
    }
    return "";
  };

  return (
    <>
      <FormModal
        titleModal={type === "create" ? "Thêm mới" : `Cập nhật`}
        titleForm={"userrr"}
        visible={openModal}
        handleCancel={() => {
          handleCancel();
          form.resetFields();
          setImageUrl("");
        }}
        width={"60%"}
      >
        <Form layout="vertical" form={form} id="userrr" onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={24} lg={{ span: 16 }}>
              <Row gutter={16}>
                <Col span={24} lg={{ span: 12 }}>
                  <Form.Item
                    label="Họ và tên"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập họ và tên",
                      },
                    ]}
                  >
                    <Input placeholder="Họ và tên" />
                  </Form.Item>
                </Col>
                <Col span={24} lg={{ span: 12 }}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập email",
                      },
                      {
                        pattern:
                          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
                        message: "Email không hợp lệ",
                      },
                    ]}
                  >
                    <Input placeholder="Địa chỉ email" />
                  </Form.Item>
                </Col>
                {InputPassWord()}
                <Col span={24} lg={{ span: 12 }} className="abc">
                  <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập số điện thoại",
                      },
                      {
                        pattern:
                          /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/,
                        message: "Số điện thoại không hợp lệ",
                      },
                    ]}
                  >
                    <Input placeholder="Số điện thoại" />
                  </Form.Item>
                </Col>
                <Col span={24} lg={{ span: 12 }}>
                  <Form.Item
                    label="Địa chỉ"
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập địa chỉ",
                      },
                    ]}
                  >
                    <Input placeholder="Địa chỉ" />
                  </Form.Item>
                </Col>
                <Col span={24} lg={{ span: 12 }}>
                  <Form.Item
                    label="Giới tính"
                    name="sex"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập giới tính",
                      },
                    ]}
                  >
                    <Select showSearch className="select-custom" placeholder="Chọn giới tính">
                      <Option key="1" value="Male">
                        Nam
                      </Option>
                      <Option key="2" value="Female">
                        Nữ
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24} lg={{ span: 12 }}>
                  <Form.Item label="Chức vụ" name="role_ids">
                    <Select mode="tags" placeholder="Please select" style={{ width: "100%" }}>
                      {roleName?.map((item, index) => {
                        return (
                          <Option key={index} value={item.id}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24} lg={{ span: 12 }}>
                  <Form.Item label="Trạng thái" name="status" valuePropName="checked">
                    <Switch
                      {...(dataEdit?.status === "Active" ? { checked: true } : { checked: false })}
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

export default UserForm;
