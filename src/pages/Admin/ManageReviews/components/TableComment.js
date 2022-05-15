import { unwrapResult } from "@reduxjs/toolkit";
import { message, Rate, Switch, Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus, setFilters } from "../ManageReviewsSlice";
const TableComment = () => {
  const { loading, comments, pagination } = useSelector(
    (state) => state.ManageComment
  );
  const dispatch = useDispatch();
  const handleTableChange = (pagination, filters, sorter, extra) => {
    if (extra.action === "paginate") {
      dispatch(setFilters({ page: pagination.current }));
    }
  };
  const onChangeStatus = async (checked, { id }) => {
    const status = checked ? "Active" : "Inactive";
    try {
      const resulDispatch = await dispatch(changeStatus({ status, id }));
      unwrapResult(resulDispatch);
      message.success(`Đã ${checked ? "hiện" : "ẩn"} đánh giá`);
    } catch (error) {
      message.error("Thay đổi trạng thái thất bại");
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
      width: 200,
      dataIndex: "course",
      key: "course",
      render: (course) => course?.name,
    },
    {
      title: "Đánh giá",
      width: 150,
      dataIndex: "number_stars",
      key: "number_stars",
      render: (number_stars) => (
        <Rate
          className="tw-text-sm"
          defaultValue={number_stars}
          disabled
        ></Rate>
      ),
    },
    {
      title: "Nội dung",
      // width: 250,
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Học viên",
      width: 150,
      dataIndex: "user_comment",
      key: "user_comment",
      render: (user_comment) => user_comment.name,
    },
    {
      title: "Trạng thái",
      // width: 10,
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Switch
          className="tw-w-[65px]"
          checkedChildren="Hiện"
          unCheckedChildren="Ẩn"
          defaultChecked={status === "Active"}
          onChange={(checked) => onChangeStatus(checked, record)}
        />
      ),
    },
  ];
  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={comments}
      scroll={{ x: 768 }}
      rowKey={(record) => record.id}
      pagination={{
        total: pagination.total,
        current: pagination.current_page,
      }}
      onChange={handleTableChange}
      expandable={{
        expandedRowRender: (record) => {
          return (
            <ul>
              <li>
                <div className="tw-font-medium">
                  Thông viên học viên Đánh giá:
                </div>
                <ul className="tw-text-xs tw-pl-4">
                  <li className="tw-py-1">
                    <span className="tw-min-w-[100px] tw-inline-block tw-font-medium">
                      Tên học viên:
                    </span>
                    <span>{record?.user_comment?.name}</span>
                  </li>
                  <li className="tw-py-1">
                    <span className="tw-min-w-[100px] tw-inline-block tw-font-medium">
                      Email:
                    </span>
                    <span>{record?.user_comment?.email}</span>
                  </li>
                  <li className="tw-py-2">
                    <span className="tw-min-w-[100px] tw-inline-block tw-font-medium">
                      SĐT:
                    </span>
                    <span>{record?.user_comment?.phone}</span>
                  </li>
                </ul>
              </li>
              <li>
                <div className="tw-font-medium">Thông viên PT:</div>
                <ul className="tw-text-xs tw-pl-4">
                  <li className="tw-py-1">
                    <span className="tw-min-w-[100px] tw-inline-block tw-font-medium">
                      Tên PT:
                    </span>
                    <span>{record?.course?.teacher?.name}</span>
                  </li>
                  <li className="tw-py-1">
                    <span className="tw-min-w-[100px] tw-inline-block tw-font-medium">
                      Email:
                    </span>
                    <span>{record?.course?.teacher?.email}</span>
                  </li>
                  <li className="tw-py-2">
                    <span className="tw-min-w-[100px] tw-inline-block tw-font-medium">
                      SĐT:
                    </span>
                    <span>{record?.course?.teacher?.phone}</span>
                  </li>
                </ul>
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
    />
  );
};

export default TableComment;
