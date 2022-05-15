import { Button, Descriptions, Modal, Table } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { convertCurrency } from "../../../../utils";

const ListBill = () => {
  const { loading, data } = useSelector((state) => state.transactions);

  const [visible, setVisible] = useState(false);
  const [bill, setBill] = useState(null);
  const showModal = (value) => {
    setBill(value);
    setVisible(true);
  };

  const columns = [
    {
      title: "Mã VNPay",
      dataIndex: "code_vnp",
      key: "code_vnp",
      render: (text) => text,
    },
    {
      title: "Học viên",
      dataIndex: "name",
      key: "name",
      render: (text) => text,
    },
    {
      title: "Ngân hàng",
      dataIndex: "code_bank",
      key: "code_bank",
      render: (t, r, i) => t,
    },
    {
      title: "Số tiền",
      dataIndex: "money",
      key: "money",
      render: (money) => convertCurrency(money),
    },
    {
      title: "Nội dung",
      dataIndex: "note",
      key: "note",
      render: (text) => <>{text === "CoursePayment" ? "Thanh toán khóa học" : "Nạp tiền"}</>,
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
      width: 150,
      render: (time) => time,
    },
    {
      title: "Hóa đơn",
      dataIndex: "",
      key: "",
      width: 120,
      render: (t, r, i) => (
        <>
          {r.bill !== null ? (
            <>
              <Button onClick={() => showModal(r.bill)}>Xem hóa đơn</Button>

              {/*  Modal show hóa đơn */}
              <Modal
                title="Thông tin hóa đơn"
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                visible={visible}
                width={1000}
                cancelText="Thoát"
                okButtonProps={{ hidden: true }}
              >
                <Descriptions title={`Hóa đơn: #${bill?.id}`} bordered>
                  <Descriptions.Item label="Mã đơn" span={2}>
                    #{bill?.code_bill}
                  </Descriptions.Item>

                  <Descriptions.Item label="Số tiền">
                    {convertCurrency(bill?.money)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Tên khóa học" span={3}>
                    {bill?.course?.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Thanh toán">
                    {bill?.status === "Wallet" ? "Bằng ví" : "Trực tiếp"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Thời gian">{bill?.time}</Descriptions.Item>
                </Descriptions>
              </Modal>
            </>
          ) : (
            ""
          )}
        </>
      ),
    },
  ];
  return <Table loading={loading} columns={columns} dataSource={data} scroll={{ x: 768 }}></Table>;
};

export default ListBill;
