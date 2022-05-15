 

import { UploadOutlined } from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  Button, Col, Form, Input, notification, Row, Select,
  Upload
} from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormModal from "../../../../components/componentsAdmin/Modal/FormModal";
import { uploadImg } from "../../../../utils/uploadImg";
import { getSpecialize } from "../../Specialize/SpecializeSlice";
import {
  addCertificates,
  getCertificates,
  updateCertificates
} from "../CertificatesSlice";

const { Option } = Select;
const SpecializeForm = (props) => {
  const dispatch = useDispatch();
  const { handleCancel, openModal, dataEdit, type } = props;
  const [form] = Form.useForm();
  const specialize = useSelector((state) => state.specialize.items);
  useEffect(() => {
    if (dataEdit !== null) {
      form.setFieldsValue({
        name: dataEdit?.name,
        image: dataEdit?.image,
        specialize_detail_id: dataEdit?.specialize_detail_id,
      });
    } else {
      form.resetFields();
    }
    dispatch(getCertificates(null));
    dispatch(getSpecialize());
  }, [dataEdit, form]);
  const onFinish = async (value) => {
    const url = await uploadImg(value.image.file);
    const payload = {
      name: value?.name,
      image: url,
      specialize_detail_id: value?.specialize_detail_id,
    };

    if (type === "update" && dataEdit?.id) {
      try {
        const id = dataEdit?.id;
        const resultAction = await dispatch(
          updateCertificates({ id, payload })
        );
        unwrapResult(resultAction);
        notification.success({ message: `Sửa thành công !!!` });
        handleCancel();
        form.resetFields();
      } catch (error) {
        return notification.error({ message: `  Đã có lỗi xảy ra ` });
      }
    } else {
      try {
        const resulDispatch = await dispatch(addCertificates(payload));
        unwrapResult(resulDispatch);
        notification.success({ message: `Thêm thành công !!!` });
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
  return (
    <>
      <FormModal
        titleModal={type === "create" ? "Thêm mới" : `Cập nhật`}
        titleForm={"certificates"}
        visible={openModal}
        handleCancel={() => {
          handleCancel();
          form.resetFields();
        }}
      >
        <Form
          layout="vertical"
          form={form}
          id="certificates"
          onFinish={onFinish}
        >
          <Row gutter={24}>
            <Col span={24}>
              <Row gutter={24}>
                <Col span={12}>
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
                <Col span={12}>
                  <Form.Item label="Tên chuyên môn" name="specialize_detail_id">
                    <Select
                      showSearch
                      className="select-custom"
                      placeholder="Tìm trạng thái"
                    >
                      {specialize.map((item) => {
                        return <Option value={item.name}>{item.name}</Option>;
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Upload" name="image">
                    <Upload beforeUpload="false">
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </FormModal>
    </>
  );
};

export default SpecializeForm;
