import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import { Col, Form, Input, message, notification, Row, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import FormModal from "../../../../components/componentsAdmin/Modal/FormModal";
import { UPLOAD_API_URL } from "../../../../utils/Config";
import {
  addCertificatesBySpecialize,
  getCertificatesBySpecialize,
  updateCertificatesBySpecialize,
} from "../SpecializeDetailPtSilce";

const CertificatesBySpecializeDetailForm = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { handleCancel, openModal, dataEdit, type } = props;
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [form] = Form.useForm();
  useEffect(() => {
    if (dataEdit !== null) {
      form.setFieldsValue({
        name: dataEdit?.name,
        image: dataEdit?.image,
      });
      setImageUrl(dataEdit?.image);
    } else {
      form.resetFields();
    }
    dispatch(getCertificatesBySpecialize(id));
  }, [dataEdit, form]);

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

  const onFinish = async (value) => {
    const payload = {
      name: value?.name,
      image: imageUrl ? imageUrl : dataEdit?.image,
      specialize_detail_id: id,
    };
    if (type === "update" && dataEdit?.id) {
      try {
        const id = dataEdit?.id;
        const resultAction = await dispatch(updateCertificatesBySpecialize({ id, payload }));
        if (resultAction.error) {
          form.setFields([
            resultAction.payload.name
              ? {
                  name: "name",
                  errors: [resultAction.payload.name],
                }
              : "",
            resultAction.payload.image
              ? {
                  name: "image",
                  errors: [resultAction.payload.image],
                }
              : "",
          ]);
        }
        unwrapResult(resultAction);
        notification.success({ message: `Sửa chứng chỉ thành công !!!` });
        handleCancel();
        form.resetFields();
        setImageUrl("");
      } catch (error) {
        notification.error({ message: `Sửa chứng chỉ thất bại !` });
      }
    } else {
      try {
        const resulDispatch = await dispatch(addCertificatesBySpecialize(payload));
        if (resulDispatch.error) {
          form.setFields([
            resulDispatch.payload.name
              ? {
                  name: "name",
                  errors: [resulDispatch.payload.name],
                }
              : "",
            resulDispatch.payload.image
              ? {
                  name: "image",
                  errors: [resulDispatch.payload.image],
                }
              : "",
          ]);
        }
        unwrapResult(resulDispatch);
        notification.success({ message: `Thêm chứng chỉ thành công !!!` });
        handleCancel();
        form.resetFields();
      } catch (error) {
        notification.error({ message: `Thêm chứng chỉ thất bại !` });
      }
    }
  };
  return (
    <>
      <FormModal
        titleModal={type === "create" ? "Thêm mới" : `Cập nhật`}
        titleForm={"certificatesbyspec"}
        visible={openModal}
        handleCancel={() => {
          handleCancel();
          form.resetFields();
          setImageUrl("");
        }}
      >
        <Form layout="vertical" form={form} id="certificatesbyspec" onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={24}>
              <Row gutter={24}>
                <Col span={4} />
                <Col span={15}>
                  <Form.Item
                    label="Tên chứng chỉ"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập tên chứng chỉ",
                      },
                    ]}
                  >
                    <Input placeholder="Hãy nhập tên chứng chỉ..." />
                  </Form.Item>
                </Col>
                <Col span={4} />
                <Col span={4} />
                <Col span={8}>
                  <Form.Item
                    label="Ảnh"
                    name="image"
                    rules={[
                      {
                        required: true,
                        message: "Mời chọn ảnh",
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
                {/* <Col span={4}>
                  <Form.Item>{renderImgEdit(dataEdit?.image)}</Form.Item>
                </Col> */}
              </Row>
            </Col>
          </Row>
        </Form>
      </FormModal>
    </>
  );
};

export default CertificatesBySpecializeDetailForm;
