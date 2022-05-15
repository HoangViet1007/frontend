import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Table, message, notification, Popconfirm } from "antd";
import Modal from "antd/lib/modal/Modal";
import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChangeComplains, setComplains } from "../ComplainsSlice";
const TableComplain = () => {
  const { Complains, loading, loadingCalcel } = useSelector(
    (state) => state.Complains
  );
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contentComplain, setContentComplain] = useState("");
  const [IdCancel, setIdCancel] = useState("");
  const onCancelComplain = async (id) => {
    try {
      const result = await dispatch(ChangeComplains(id));
      unwrapResult(result);
      dispatch(setComplains(id));

      notification.success({
        message: "Hủy khiếu nại thành công",
      });
    } catch (error) {
      message.error("Hủy khiếu nại thất bại");
    }
  };
  const columns = [
    {
      title: "STT",
      render: (t, r, i) => i + 1,
      width: 5,
    },
    {
      title: "Tên buổi học",
      dataIndex: "course_planes",
      key: "nameCourse",
      render: (course_planes) => course_planes?.stage?.course?.name,
    },

    {
      title: "PT",
      dataIndex: "course_student",
      key: "PT",
      width: 150,
      render: (course_student) => course_student?.users?.name,
    },
    {
      title: "Lý do",
      dataIndex: "reason_complain",
      key: "reason_complain",
      width: 100,
      render: (reason_complain) => (
        <div
          className="tw-text-blue-500 tw-cursor-pointer tw-text-xs"
          onClick={() => {
            setIsModalVisible(true);
            setContentComplain(reason_complain);
          }}
        >
          Chi tiết
        </div>
      ),
    },
    {
      title: "Thời gian",
      dataIndex: "date",
      key: "date",
      width: 150,
    },
    {
      title: "Chức năng",
      width: 150,
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Popconfirm
          title="Bạn có chắc muốn hủy khiếu nại"
          onConfirm={() => onCancelComplain(id)}
          okText="Đồng ý"
          cancelText="Hủy"
        >
          <Button
            loading={id === IdCancel && loadingCalcel}
            type="danger"
            onClick={() => {
              setIdCancel(id);
            }}
          >
            Hủy
          </Button>
        </Popconfirm>
      ),
    },
  ];
  return (
    <>
      <Table
        loading={loading}
        columns={columns}
        dataSource={Complains}
        scroll={{ x: 768 }}
        // pagination={{
        //   total: pagination.total,
        //   current: pagination.current_page,
        // }}
        // onChange={handleTableChange}
        rowKey={(record) => record.id}
        expandable={{
          expandedRowRender: (record) => {
            return (
              <ul className="tw-text-xs">
                <li className="tw-py-2">
                  <span className="tw-min-w-[130px] tw-inline-block tw-font-medium">
                    Email PT:
                  </span>
                  <span>{record?.course_student?.users?.email}</span>
                </li>
                <li className="tw-py-2">
                  <span className="tw-min-w-[130px] tw-inline-block tw-font-medium">
                    SĐT PT:
                  </span>
                  <span>{record?.course_student?.users?.phone}</span>
                </li>
                <li className="tw-py-2">
                  <span className="tw-min-w-[130px] tw-inline-block tw-font-medium">
                    Buổi học:
                  </span>
                  <span>{record?.title}</span>
                </li>
                <li className="tw-py-2">
                  <span className="tw-min-w-[130px] tw-inline-block tw-font-medium">
                    Giai đoạn:
                  </span>
                  <span>{record?.course_planes?.stage?.name}</span>
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
      <Modal
        title="Nội dung khiếu nại"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={
          <Button type="primary" onClick={() => setIsModalVisible(false)}>
            Thoát
          </Button>
        }
      >
        {contentComplain}
      </Modal>
    </>
  );
};

export default TableComplain;
