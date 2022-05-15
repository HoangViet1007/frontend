import { unwrapResult } from "@reduxjs/toolkit";
import { Col, Form, Input, notification, Row, Select } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormModal from "../../../../components/componentsAdmin/Modal/FormModal";
import { getAllSpecialize } from "../../../Admin/Specialize/SpecializeSlice";
import { getInfoUser } from "../../../UserSlice";
import { addSpecializeDetailPt, updateSpecializeDetailPt } from "../SpecializeDetailPtSilce";

const { Option } = Select;
const SpecializeDetailPtForm = (props) => {
  const dispatch = useDispatch();
  const { handleCancel, openModal, dataEdit, type } = props;
  const [form] = Form.useForm();
  const listAllspecialize = useSelector((state) => state.specialize.items);
  const infoUser = useSelector((state) => state.InfoUser.infoUser);
  useEffect(() => {
    const specializeEditName = dataEdit?.specialize;
    if (dataEdit !== null) {
      form.setFieldsValue({
        experience: dataEdit?.experience,
        specialize_id: specializeEditName?.id,
      });
    } else {
      form.resetFields();
    }
    dispatch(getAllSpecialize());
    dispatch(getInfoUser());
  }, [dataEdit, form]);
  const onFinish = async (value) => {
    const payload = {
      experience: value?.experience,
      specialize_id: value?.specialize_id,
      user_id: infoUser?.id,
    };

    if (type === "update" && dataEdit?.id) {
      try {
        const id = dataEdit?.id;
        const resulDispatch = await dispatch(updateSpecializeDetailPt({ id, payload }));
        if (resulDispatch.error) {
          form.setFields([
            resulDispatch.payload.specialize_id
              ? {
                  name: "specialize_id",
                  errors: [resulDispatch.payload.specialize_id],
                }
              : "",
            resulDispatch.payload.experience
              ? {
                  name: "experience",
                  errors: [resulDispatch.payload.experience],
                }
              : "",
          ]);
        }
        unwrapResult(resulDispatch);
        notification.success({ message: `Sửa chuyên môn thành công !!!` });
        handleCancel();
        form.resetFields();
      } catch (error) {
        notification.error({ message: `Sửa chuyên môn thất bại !` });
      }
    } else {
      try {
        const resulDispatch = await dispatch(addSpecializeDetailPt(payload));
        if (resulDispatch.error) {
          form.setFields([
            resulDispatch.payload.specialize_id
              ? {
                  name: "specialize_id",
                  errors: [resulDispatch.payload.specialize_id],
                }
              : "",
            resulDispatch.payload.experience
              ? {
                  name: "experience",
                  errors: [resulDispatch.payload.experience],
                }
              : "",
          ]);
        }
        unwrapResult(resulDispatch);
        notification.success({ message: `Thêm thành công !!!` });
        handleCancel();
        form.resetFields();
      } catch (error) {
        // const getErr = (obj, index) => {
        //   var i = 0;
        //   for (var attr in obj) {
        //     if (index === i) {
        //       return obj[attr];
        //     }
        //     i++;
        //   }
        //   return null;
        // };
        // const messageErr = getErr(error, 0);
        // return notification.error({
        //   message: ` Lỗi: ${messageErr} `,
        // });
        notification.error({ message: `Thêm chuyên môn thất bại !` });
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
      >
        <Form layout="vertical" form={form} id="specializedetailpt" onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={24}>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="Năm kinh nghiệm"
                    name="experience"
                    rules={[
                      {
                        required: true,
                        message: "Mời nhập năm kinh nghiệm",
                      },
                      {
                        pattern: /^(0|[1-9][0-9]*)$/,
                        message: "Năm kinh nghiệm không hợp lệ ",
                      },
                    ]}
                  >
                    <Input placeholder="Năm kinh nghiệm" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Tên chuyên môn" name="specialize_id">
                    <Select showSearch className="select-custom" placeholder="Tìm trạng thái">
                      {listAllspecialize?.map((item, index) => {
                        return (
                          <Option key={index} value={item.id}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>
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

export default SpecializeDetailPtForm;
