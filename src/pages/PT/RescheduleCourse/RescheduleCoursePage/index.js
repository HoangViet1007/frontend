import { Button, Table } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getReschedule } from "../RescheduleCourseSlice";
import { Link } from "react-router-dom";
const RescheduleCoursePage = () => {
  const dispatch = useDispatch();
  const { listRescheduleCourse, loading } = useSelector(
    (state) => state.RescheduleCourse
  );
  useEffect(() => {
    dispatch(getReschedule());
  }, []);
  const columns = [
    {
      title: "STT",
      key: "name",
      render: (a, record, i) => i + 1,
    },
    {
      title: "Khóa học",
      dataIndex: "course_student",
      key: "nameCourse",
      render: (course_student) => course_student?.courses?.name,
    },
    {
      title: "Buổi học",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Thời gian",
      dataIndex: "title",
      width: 150,
      key: "title",
      render: (a, record) => (
        <>
          <div>
            {record?.time_start} - {record?.time_end}
          </div>
          {record?.date}
        </>
      ),
    },
    {
      title: "Chức năng",
      width: 100,
      dataIndex: "course_student",
      render: (course_student) => (
        <Link to={`/pt/xep-lich/${course_student?.id}`}>
          <Button type="primary">Xếp lịch lại</Button>
        </Link>
      ),
    },
  ];
  return (
    <Table
      loading={loading}
      dataSource={listRescheduleCourse}
      columns={columns}
      expandable={{
        expandedRowRender: (record) => {
          return (
            <ul className="tw-text-xs">
              <li className="tw-py-2">
                <span className=" tw-min-w-[130px] tw-inline-block tw-font-medium">
                  Tên học viên:
                </span>
                <span>{record?.course_student?.users?.name}</span>
              </li>
              <li className="tw-py-2">
                <span className=" tw-min-w-[130px] tw-inline-block tw-font-medium">
                  SĐT:
                </span>
                <span>{record?.course_student?.users?.phone}</span>
              </li>
              <li className="tw-py-2">
                <span className=" tw-min-w-[130px] tw-inline-block tw-font-medium">
                  Email:
                </span>
                <span>{record?.course_student?.users?.email}</span>
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
      rowKey={(record) => record.id}
    ></Table>
  );
};

export default RescheduleCoursePage;
