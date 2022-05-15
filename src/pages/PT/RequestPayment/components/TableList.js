import React from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { convertCurrency, convertToUnicode } from "../../../../utils";
import { setFilters } from "../RequestPaymentSlice";
import { showPhoto } from "../../../../components/componentsPT/ShowPhoto/showPhoto";

const TableList = () => {
  const { loading, listRequest, pagination } = useSelector(
    (state) => state.RequestPayment
  );
  const dispatch = useDispatch();
  const handleTableChange = (pagination, filters, sorter, extra) => {
    if (extra.action === "paginate") {
      dispatch(setFilters({ page: pagination.current }));
    }
  };
  const columns = [
    {
      title: "STT",
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
      title: "Hình ảnh",
      dataIndex: "courses",
      key: "image",
      width: 100,
      render: (courses) => showPhoto(courses?.image),
    },
    {
      title: "Giá",
      dataIndex: "courses",
      key: "courses",
      width: 100,
      render: (courses) => convertCurrency(courses.price),
      sorter: (a, b) => a.courses.price - b.courses.price,
    },
    {
      title: "Tên học viên",
      dataIndex: "users",
      key: "users",
      width: 150,
      render: (users) => users.name,
    },
    // {
    //   title: "Chức năng",
    //   width: 80,
    //   render: (c, r) => <Button type="primary">Tạo hóa đơn</Button>,
    // },
  ];
  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={listRequest}
      scroll={{ x: 768 }}
      pagination={{
        total: pagination.total,
        current: pagination.current_page,
      }}
      onChange={handleTableChange}
      rowKey={(record) => record.id}
      expandable={{
        expandedRowRender: (record) => {
          return (
            <ul className="tw-text-xs">
              <li className="tw-py-2">
                <span className="tw-min-w-[100px] tw-inline-block tw-font-medium">
                  Email học viên:
                </span>
                <span>{record?.users?.email}</span>
              </li>
              <li className="tw-py-2">
                <span className="tw-min-w-[100px] tw-inline-block tw-font-medium">
                  Địa chỉ:
                </span>
                <span>{record?.users?.address}</span>
              </li>
              <li className="tw-py-2">
                <span className="tw-min-w-[100px] tw-inline-block tw-font-medium">
                  SĐT:
                </span>
                <span>{record?.users?.phone}</span>
              </li>
            </ul>
          );
        },
        onExpandedRowsChange: (expandedRows) => {
          if (expandedRows.length > 1) {
            expandedRows.shift();
          }
        },
      }}
    ></Table>
  );
};

export default TableList;
