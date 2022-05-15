import React from "react";
import { Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { convertCurrency, convertToUnicode } from "../../../../utils";
import { Link } from "react-router-dom";
import { setFilters } from "../BillCustomerSlice";
const ListBill = () => {
  const { loading, listBill, pagination } = useSelector(
    (state) => state.BillCustomer
  );
  const dispatch = useDispatch();
  const handleTableChange = (pagination, filters, sorter, extra) => {
    if (extra.action === "paginate") {
      dispatch(setFilters({ page: pagination.current }));
    }
  };
  const columns = [
    {
      title: "Mã hóa đơn",
      dataIndex: "code_bill",
      key: "code_bill",
      width: 120,
      render: (code_bill) => code_bill,
    },
    {
      title: "Khóa học",
      dataIndex: "name",
      key: "name",
      render: (name, r) => (
        <Link
          className="tw-text-blue-500"
          to={`/khoa-hoc/${
            r?.course?.name && convertToUnicode(r?.course?.name)
          }/${r?.course?.id}`}
        >
          {name}
        </Link>
      ),
    },
    {
      title: "Số tiền",
      dataIndex: "money",
      key: "money",
      width: 120,
      render: (money) => convertCurrency(money),
      sorter: (a, b) => a.money - b.money,
    },
    {
      title: "Thanh toán",
      dataIndex: "status",
      key: "status",
      width: 150,
      filters: [
        {
          text: "Thanh toán bằng ví",
          value: "Wallet",
        },
        {
          text: "Thanh toán trực tiếp",
          value: "Direct",
        },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <div className="tw-text-center">
          {status === "Wallet" ? (
            <Tag
              style={{
                background: "rgb(224, 249, 244)",
                borderRadius: " 5px",
                fontSize: "13px",
                color: "rgb(74, 218, 187)",
                padding: "3px",
                border: "1px solid rgb(198, 244, 235)",
              }}
            >
              Bằng ví
            </Tag>
          ) : (
            <Tag color="orange">Trực tiếp</Tag>
          )}
        </div>
      ),
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
      width: 150,
      render: (time) => time,
    },
  ];
  return (
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
    ></Table>
  );
};

export default ListBill;
