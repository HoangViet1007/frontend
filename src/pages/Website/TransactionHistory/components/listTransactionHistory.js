import { Tag, Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { convertCurrency, convertToUnicode } from "../../../../utils";
import { setFilters } from "../TransactionHistorySlice";

const ListTransactionHistory = () => {
  const { loading, listTransactions, pagination } = useSelector(
    (state) => state.TransactionHistory
  );
  const dispatch = useDispatch();
  const handleTableChange = (pagination, filters, sorter, extra) => {
    if (extra.action === "paginate") {
      dispatch(setFilters({ page: pagination.current }));
    }
  };
  const columns = [
    {
      title: "Mã VNP",
      dataIndex: "code_vnp",
      key: "code_vnp",
      width: 120,
      render: (code_vnp) => code_vnp,
    },
    {
      title: "Ngân Hàng",
      dataIndex: "code_bank",
      key: "code_bank",
      width: 120,
      render: (code_bank) => code_bank,
    },
    {
      title: "Số tiền",
      dataIndex: "money",
      key: "money",
      width: 120,
      render: (money, record) => {
        if (record.note === "Rechage") {
          return (
            <div className="tw-text-[#6be3d8]">+{convertCurrency(money)}</div>
          );
        } else if (record.note === "CoursePayment") {
          return (
            <div className="tw-text-[#cf1423]">-{convertCurrency(money)}</div>
          );
        }
      },
      sorter: (a, b) => a.money - b.money,
    },
    {
      title: "Dịch vụ",
      dataIndex: "note",
      key: "note",
      width: 100,
      filters: [
        {
          text: "Nạp tiền",
          value: "Rechage",
        },
        {
          text: "Thanh toán",
          value: "CoursePayment",
        },
      ],
      onFilter: (value, record) => record.note === value,
      render: (note) => {
        return note === "Rechage" ? (
          <Tag
            style={{
              background: "rgb(224, 249, 244)",
              borderRadius: " 5px",
              fontSize: "13px",
              color: "rgb(74, 218, 187)",
              padding: "2px",
              border: "1px solid rgb(198, 244, 235)",
            }}
          >
            Nạp tiền
          </Tag>
        ) : (
          <Tag style={{ padding: "2px", borderRadius: " 5px" }} color="red">
            Thanh toán
          </Tag>
        );
      },
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
      width: 120,
      render: (time) => time,
    },
  ];
  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={listTransactions}
      scroll={{ x: 768 }}
      onChange={handleTableChange}
      rowKey={(record) => record.id}
      pagination={{
        total: pagination.total,
        current: pagination.current_page,
      }}
      expandable={{
        expandedRowRender: (record) => {
          return (
            <ul className="tw-text-xs">
              <li className="tw-py-2">
                <span className="tw-min-w-[100px] tw-inline-block tw-font-medium">
                  Mã hóa đơn:
                </span>
                <span>{record?.bill?.code_bill}</span>
              </li>
              <li className="tw-py-2">
                <span className="tw-min-w-[100px] tw-inline-block tw-font-medium">
                  Khóa học:
                </span>
                <span>
                  <Link
                    className="tw-text-blue-500"
                    to={`/khoa-hoc/${convertToUnicode(
                      record?.bill?.course?.name
                    )}/${record?.bill?.course?.id}`}
                  >
                    {record?.bill?.course?.name}
                  </Link>
                </span>
              </li>
            </ul>
          );
        },
        onExpandedRowsChange: (expandedRows) => {
          if (expandedRows.length > 1) {
            expandedRows.shift();
          }
        },
        rowExpandable: (record) => record.note !== "Rechage",
      }}
    ></Table>
  );
};

export default ListTransactionHistory;
