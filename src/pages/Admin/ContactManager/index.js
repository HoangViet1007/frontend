import { Card, Table, Modal, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MailOutlined } from "@ant-design/icons";
import { getContactList } from "./ContactSlice";
import moment from "moment";
import "moment/locale/vi";
import { useHistory } from "react-router-dom";
import { ShowForPermission } from "../../../components/componentsAdmin/ShowPermission/ShowForPermissionComponent";

const ContactManagerPage = () => {
  const dispatch = useDispatch();
  const [visibleContent, setVisibleContent] = useState(false);
  const [content, setContent] = useState("");
  const history = useHistory();

  const showModalContent = (data) => {
    setVisibleContent(true);
    setContent(data);
  };

  const handleCancel = () => {
    setVisibleContent(false);
  };
  const { data: contactItem } = useSelector((state) => state.contact);

  useEffect(() => {
    dispatch(getContactList());
  }, [dispatch]);

  const contactColumn = [
    {
      title: "STT",
      dataIndex: "",
      key: "",
      width: 50,
      render: (text, record, index) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (text, record, index) => {
        return <>{text}</>;
      },
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      key: "phone",
      width: 100,
      render: (text, record, index) => {
        return <>{text}</>;
      },
    },
    {
      title: "Địa chỉ email",
      dataIndex: "email",
      key: "email",
      width: 120,
      render: (text, record, index) => {
        return <>{text}</>;
      },
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      width: 250,
      render: (text, record, index) => {
        return <>{text}</>;
      },
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      width: 190,
      render: (text, record, index) => {
        return (
          <>
            <span
              className="tw-cursor-pointer tw-bg-blue-500 tw-rounded tw-p-2 tw-text-white hover:tw-bg-blue-700"
              type="primary"
              onClick={() => showModalContent(text)}
            >
              Xem chi tiết
            </span>
          </>
        );
      },
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 190,
      render: (text, record, index) => {
        return (
          <>
            {text === "Process" ? (
              <span className="tw-bg-green-500 tw-rounded tw-p-2 tw-text-white">Đang xử lý</span>
            ) : (
              text
            )}
          </>
        );
      },
    },

    {
      title: "Thời gian",
      dataIndex: "created_at",
      key: "created_at",
      width: 180,
      render: (text, record, index) => {
        return <>{moment(text).format("HH:mm DD-MM-YYYY")}</>;
      },
    },
    {
      title: "Phản hồi",
      dataIndex: "",
      key: "",
      width: 170,
      render: (text, record, index) => {
        return (
          <>
            <ShowForPermission permission="contact:feedback">
              <button
                onClick={() =>
                  history.push("/admin/tra-loi-mail", {
                    name: record.name,
                    email: record.email,
                    phone: record.phone,
                    title: record.title,
                    created_at: record.created_at,
                  })
                }
                className="tw-rounded tw-p-2"
              >
                <>
                  <Button>
                    <MailOutlined />
                  </Button>
                </>
              </button>
            </ShowForPermission>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Modal
        title="Nội dung"
        visible={visibleContent}
        onOk={() => handleCancel()}
        onCancel={() => handleCancel()}
        cancelText="Thoát"
        okButtonProps={{ hidden: true }}
        width={1000}
      >
        <p>{content}</p>
      </Modal>

      <Card title="Danh sách liên hệ">
        <Table columns={contactColumn} dataSource={contactItem} scroll={{ x: 1100 }} />
      </Card>
    </>
  );
};

export default ContactManagerPage;
