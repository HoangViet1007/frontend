import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { setFilters } from "../BillPayCoursePtSlice";
import { convertCurrency, convertToUnicode } from "../../../../utils";
import { showPhoto } from "../../../../components/componentsPT/ShowPhoto/showPhoto";
const TableList = () => {
  const { loading, listBillCoursePt, pagination } = useSelector(
    (state) => state.BillPayCourseAdmin
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
      title: "Mã hóa đơn",
      dataIndex: "code_bill",
      key: "code_bill",
      width: 100,
    },
    {
      title: "Khóa học",
      dataIndex: "course_student",
      key: "courseName",
      width: 200,
      render: (course_student) => (
        <Link
          className="tw-text-blue-500"
          to={`/khoa-hoc/${
            course_student?.courses?.name &&
            convertToUnicode(course_student?.courses?.name)
          }/${course_student?.courses?.id}`}
        >
          {course_student?.courses?.name}
        </Link>
      ),
    },

    {
      title: "PT",
      dataIndex: "userNamePt",
      key: "userNamePt",
      width: 100,
    },
    {
      title: "Học viên",
      dataIndex: "course_student",
      key: "student",
      width: 100,
      render: (course_student) => course_student?.users?.name,
    },
    {
      title: "Số tiền",
      dataIndex: "money",
      key: "money",
      width: 100,
      render: (money) => convertCurrency(money),
      sorter: (a, b) => a - b,
    },
    {
      title: "Ảnh giao dịch",
      dataIndex: "image",
      key: "image",
      width: 50,
      render: (image) => showPhoto(image),
    },
  ];
  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={listBillCoursePt}
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
                <span className="tw-min-w-[80px] tw-inline-block tw-font-medium">
                  Thời gian:
                </span>
                <span>{record?.time}</span>
              </li>
              <li className="tw-py-2">
                <span className="tw-min-w-[80px] tw-inline-block tw-font-medium">
                  Ghi chú:
                </span>
                <span>{record?.note}</span>
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
