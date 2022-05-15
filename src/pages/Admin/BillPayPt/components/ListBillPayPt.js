import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, createBillPT } from "../BillPayPtSlice";
import { Button, Modal, Table, Form, Input, Upload, notification } from "antd";
import { convertCurrency, convertToUnicode } from "../../../../utils";
import { Link, useHistory } from "react-router-dom";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { previewImage, setUrlImage } from "../../../PreviewImageSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import ROUTER from "../../../../router/router";
const ListBillPayPt = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataClick, setDataClick] = useState({});
  const history = useHistory();
  const { loading, listBill, pagination, loadingCreateBill } = useSelector(
    (state) => state.BillPayPt
  );
  const { loading: loadingImg, urlImage } = useSelector(
    (state) => state.previewImage
  );
  const dispatch = useDispatch();
  const handleTableChange = (pagination, filters, sorter, extra) => {
    if (extra.action === "paginate") {
      dispatch(setFilters({ page: pagination.current }));
    }
  };
  const [form] = Form.useForm();
  const handleSubmit = async (data) => {
    const { note, image, money_old } = data;
    const newData = { note, image, money_old, ...dataClick };
    try {
      const resulDispatch = await dispatch(createBillPT(newData));
      unwrapResult(resulDispatch);
      notification.success({
        message: "Tạo hóa đơn thành công",
      });
      setIsModalVisible(false);
      form.resetFields();
      dispatch(setUrlImage());
      history.push(ROUTER.ADMIN.BILL_COURSES_PT);
    } catch (error) {
      if (typeof error !== "object") {
        notification.error({
          message: error,
        });
      } else if (typeof error === "object") {
        form.setFields([
          error.image
            ? {
                name: "image",
                errors: [error.image],
              }
            : "",
        ]);
      } else {
        notification.error({
          message: "Tạo hóa đơn thất bại",
        });
      }
    }
  };
  useEffect(() => {
    return () => {
      urlImage && URL.revokeObjectURL(urlImage);
    };
  }, [urlImage]);
  const handleCreateBill = (values) => {
    setIsModalVisible(true);
    let price;
    if (values?.courses?.price <= 2000000) {
      price = Math.floor(values?.courses?.price * (90 / 100));
    } else {
      price = Math.floor(values?.courses?.price * (85 / 100));
    }
    setDataClick({
      user_id: values?.courses?.teacher.id,
      course_student_id: values?.id,
      money_old: values?.courses?.price,
      money: price,
    });
    form.setFieldsValue({
      courseName: values?.courseName,
      money_old: convertCurrency(values?.courses?.price),
      money: convertCurrency(price),
      teacher: values?.userName,
      student: values?.users?.name,
    });
  };
  const uploadButton = (
    <div>
      {loadingImg ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </div>
  );
  const beforeUpload = (file) => {
    if (["image/jpeg", "image/png", "image/webp"].includes(file.type))
      dispatch(previewImage(file));
  };
  const columns = [
    {
      title: "#",
      width: 10,
      render: (c, r, i) => i + 1,
    },
    {
      title: "Khóa học",
      dataIndex: "courseName",
      key: "courseName",
      width: 200,
      render: (courseName, r) => (
        <Link
          className="tw-text-blue-500"
          to={`/khoa-hoc/${
            r?.courses?.name && convertToUnicode(r?.courses?.name)
          }/${r?.courses?.id}`}
        >
          {courseName}
        </Link>
      ),
    },
    {
      title: "Số tiền",
      dataIndex: "courses",
      key: "courses",
      width: 100,
      render: (courses) => convertCurrency(courses.price),
      sorter: (a, b) => a.courses.price - b.courses.price,
    },
    {
      title: "Tên PT",
      dataIndex: "userName",
      key: "userName",
      width: 150,
    },
    {
      title: "Tên học viên",
      dataIndex: "users",
      key: "users",
      width: 150,
      render: (users) => users.name,
    },
    {
      title: "Chức năng",
      width: 80,
      render: (c, r) => (
        <Button
          type="primary"
          onClick={() => {
            handleCreateBill(r);
          }}
        >
          Tạo hóa đơn
        </Button>
      ),
    },
  ];
  return (
    <>
      <Table
        loading={loading}
        columns={columns}
        dataSource={listBill}
        scroll={{ x: 768 }}
        pagination={{
          total: pagination.total,
          current: pagination.current_page,
        }}
        onChange={handleTableChange}
        rowKey={(record) => record.id}
      />
      <Modal
        title="TẠO HÓA ĐƠN"
        visible={isModalVisible}
        onOk={form.submit}
        confirmLoading={loadingCreateBill}
        onCancel={() => {
          setIsModalVisible(false);
          dispatch(setUrlImage());
          form.resetFields();
        }}
        okText="Tạo"
        cancelText="Hủy"
        className="lg:!tw-w-1/2"
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className="tw-flex">
            <Form.Item
              label="Tên Khóa học"
              name="courseName"
              className="tw-flex-1 tw-mr-2"
            >
              <Input size="large" disabled />
            </Form.Item>
            <Form.Item
              name="money_old"
              label="Giá Khóa học"
              className="tw-flex-1 tw-ml-2"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập giá khóa học",
                },
              ]}
            >
              <Input size="large" disabled />
            </Form.Item>
          </div>
          <div className="tw-flex">
            <Form.Item
              label="Tên PT"
              name="teacher"
              className="tw-flex-1 tw-mr-2"
            >
              <Input size="large" disabled />
            </Form.Item>
            <Form.Item
              label="Tên học viên"
              name="student"
              className="tw-flex-1 tw-ml-2"
            >
              <Input size="large" disabled />
            </Form.Item>
          </div>
          <div className="tw-flex">
            <Form.Item
              name="money"
              label="Số tiền giao dịch"
              className="tw-flex-1 tw-mr-2"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập số tiền",
                },
              ]}
            >
              <Input size="large" disabled />
            </Form.Item>
            <Form.Item
              label="Ảnh giao dịch"
              className="tw-flex-1 tw-ml-2"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Hãy chọn hình ảnh",
                },
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject();
                    }
                    if (
                      value &&
                      ["image/jpeg", "image/png", "image/webp"].includes(
                        value.file.type
                      )
                    ) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(
                        new Error("Hãy chọn hình ảnh jpeg,png,webp")
                      );
                    }
                  },
                }),
              ]}
            >
              <Upload
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                status="error"
              >
                {loadingImg && urlImage ? (
                  <div className="tw-relative tw-h-full tw-w-full tw-overflow-hidden">
                    <div className="tw-absolute tw-z-10 tw-top-1/2 tw-left-1/2 tw-transform tw--translate-x-1/2 tw--translate-y-1/2">
                      <LoadingOutlined />
                    </div>
                    <img
                      src={urlImage}
                      alt="avatar"
                      className="tw-h-full tw-w-full tw-object-cover"
                    />
                  </div>
                ) : urlImage ? (
                  <img
                    src={urlImage}
                    alt="avatar"
                    className="tw-h-full tw-w-full tw-object-cover fade-main"
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
          </div>
          <Form.Item
            name="note"
            label="Nội dung"
            rules={[
              {
                required: true,
                message: "Hãy nhập nội dung",
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ListBillPayPt;
