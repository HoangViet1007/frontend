import { CKEditor } from "@ckeditor/ckeditor5-react";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Card, Form, Input, notification, Select, Spin } from "antd";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadImgPreview from "../../../../components/UploadImgPreview";
import { EDITORCONFIGURATION } from "../../../../utils/Config";
import { changeInfoUser } from "../../../UserSlice";
import { updateProfile } from "../ProfileDetailSlice";

const ProfileDetailPage = () => {
  const { loading: loadingUpdate } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.InfoUser);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [description, setDescription] = useState("");
  const infoUser = useSelector((state) => state.InfoUser.infoUser);
  const listSocial_all = useSelector((state) => state.InfoUser.social_all);
  const [url, setUrl] = useState("");
  const onfile = (file) => {
    setUrl(file);
  };

  const dataSocials = infoUser?.socials;
  const formSocials = {};
  dataSocials?.map((item) => {
    formSocials[item.pivot.social_id] = item.user_socials[0].link;
  });
  useEffect(() => {
    setDescription(infoUser?.description);
    form.setFieldsValue({
      name: infoUser?.name,
      address: infoUser?.address,
      phone: infoUser?.phone,
      email: infoUser?.email,
      sex: infoUser?.sex,
      socials: formSocials,
      description: infoUser?.description,
    });
  }, [infoUser, form]);
  const onFinish = async ({ image, ...newdata }) => {
    const a = { ...newdata };
    const b = [];
    Object.keys(a.socials).map((key) => {
      let c = { id: Number(key), link: a.socials[key] };
      if (a.socials[key]) {
        b.push(c);
      }
    });
    // delete a.socials;
    a.socials = b;
    try {
      const resultApi = await dispatch(
        updateProfile({
          ...infoUser,
          id: infoUser.id,
          currentImage: infoUser.image,
          ...a,
          description: description,
          ChangeImage: url,
        })
      );
      unwrapResult(resultApi);
      dispatch(changeInfoUser(resultApi.payload));

      notification.success({ message: "C???p nh???t t??i kho???n th??nh c??ng" });
    } catch (error) {
      if (error) {
        form.setFields([
          error.phone && {
            name: "phone",
            errors: [error.phone],
          },
        ]);
      }
      notification.error({ message: "C???p nh???t t??i kho???n th???t b???i" });
    }
  };
  return (
    <Card title="Th??ng tin PT" className="tw-bg-gray-100">
      <Spin spinning={loading || loadingUpdate}>
        {infoUser && (
          <Form
            labelCol={{
              span: 8,
              className: "tw-text-left",
            }}
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              name="image"
              label="H??nh ???nh"
              // rules={[{ required: true, message: "H??y nh???p ???nh c???a b???n" }]}
            >
              <UploadImgPreview src={infoUser.image} onSuccess={onfile} />
            </Form.Item>
            <Form.Item
              name="name"
              label="H??? t??n"
              rules={[{ required: true, message: "H??y nh???p t??n c???a b???n" }]}
            >
              <Input size="large" className="tw-bg-[#f5f8fa]" />
            </Form.Item>
            <Form.Item
              name="address"
              label="?????a ch???"
              rules={[{ required: true, message: "H??y nh???p ?????a ch???" }]}
            >
              <Input size="large" className="tw-bg-[#f5f8fa]" />
            </Form.Item>
            <Form.Item
              name="phone"
              label="S??T"
              rules={[{ required: true, message: "H??y nh???p s??? ??i???n tho???i" }]}
            >
              <Input size="large" className="tw-bg-[#f5f8fa]" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "H??y nh???p email" }]}
            >
              <Input disabled size="large" className="tw-bg-[#f5f8fa]" />
            </Form.Item>
            <Form.Item
              name="sex"
              label="Gi???i t??nh"
              rules={[{ required: true, message: "H??y ch???n gi???i t??nh" }]}
            >
              <Select size="large" className="tw-bg-[#f5f8fa]">
                <Select.Option value="Male">Nam</Select.Option>
                <Select.Option value="Female">N???</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="M???ng x?? h???i">
              {listSocial_all &&
                listSocial_all.map((item) => {
                  return (
                    <>
                      {item?.name}
                      <Form.Item name={["socials", `${item?.id}`]}>
                        <Input
                          size="middle"
                          className="tw-bg-[#f5f8fa] tw-mb-3"
                        />
                      </Form.Item>
                    </>
                  );
                })}
            </Form.Item>
            <Form.Item label="Gi???i thi???u b???n th??n" name="description">
              <CKEditor
                editor={Editor}
                config={EDITORCONFIGURATION}
                data={infoUser?.description}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDescription(data);
                }}
              />
            </Form.Item>
            <Form.Item>
              <div className="tw-text-right">
                <Button type="primary" htmlType="submit" size="large">
                  L??u thay ?????i
                </Button>
              </div>
            </Form.Item>
          </Form>
        )}
      </Spin>
    </Card>
  );
};

export default ProfileDetailPage;
