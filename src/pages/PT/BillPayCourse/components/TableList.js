import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../BillPayCourseSlice";
import { Table } from "antd";
import { convertCurrency, convertToUnicode } from "../../../../utils";
import { showPhoto } from "../../../../components/componentsPT/ShowPhoto/showPhoto";
import { Link } from "react-router-dom";
const TableList = () => {
  const { loading, listBillCoursePt, pagination } = useSelector(
    (state) => state.BillPayCoursePt
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
      width: 100,
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
                <span className="tw-min-w-[70px] tw-inline-block tw-font-medium">
                  Ghi chú:
                </span>
                <span className="tw-pl-3">{record?.note}</span>
              </li>

              <li className="tw-py-2">
                <span className="tw-min-w-[70px] tw-inline-block tw-font-medium">
                  Thời gian:
                </span>
                <span className="tw-pl-3">{record?.time}</span>
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
