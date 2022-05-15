import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Empty, notification, Space, Table, Tooltip } from "antd";
import moment from "moment";
import "moment/locale/vi";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowForPermission } from "../../../../components/componentsAdmin/ShowPermission/ShowForPermissionComponent";
import ROUTER from "../../../../router/router";
import { getComplain, updateComplain } from "./../ComplainSlice";
const ComplainList = (props) => {
  const dispatch = useDispatch();
  const { items, loading, meta } = useSelector((state) => state.complain);
  const onChangePage = (value) => {
    if (value) {
      props.history.push(ROUTER.ADMIN.COMPLAIN.concat(`?page=${value}`));
    } else {
      props.history.push(ROUTER.ADMIN.COMPLAIN);
      dispatch(getComplain(null));
    }
  };
  const onXacNhan = async (value) => {
    const data = {
      schedule_id: value?.id,
      complain: "complain",
    };
    try {
      const resulDispatch = await dispatch(updateComplain(data));
      unwrapResult(resulDispatch);
      notification.success({
        message: `Đã gửi chấp nhận khiếu nại cho người dùng !`,
      });
      dispatch(getComplain(null));
    } catch (error) {
      notification.error({ message: ` Đã có lỗi sảy ra ` });
    }
  };
  const onYeucau = async (value) => {
    const data = {
      schedule_id: value?.id,
      complain: "send_link_record",
    };
    try {
      const resulDispatch = await dispatch(updateComplain(data));
      unwrapResult(resulDispatch);
      notification.success({ message: `Đã gửi yêu cầu gửi link record !` });
      dispatch(getComplain(null));
    } catch (error) {
      notification.error({ message: `Đã có lỗi sảy ra !` });
    }
  };
  const onHuy = async (value) => {
    const data = {
      schedule_id: value?.id,
      complain: "nocomplain",
    };
    try {
      const resulDispatch = await dispatch(updateComplain(data));
      unwrapResult(resulDispatch);
      notification.success({ message: `Đã huỷ yêu câu khiếu nại của người dùng !` });
      dispatch(getComplain(null));
    } catch (error) {
      notification.error({ message: ` Đã có lỗi sảy ra !` });
    }
  };

  const disabledd = (record) => {
    const hieuNgay =
      moment().milliseconds() +
      1000 * (moment().seconds() + 60 * (moment().minutes() + 60 * moment().hours())) -
      moment(record?.date_send_link_record).milliseconds() +
      1000 *
        (moment(record?.date_send_link_record).seconds() +
          60 *
            (moment(record?.date_send_link_record).minutes() +
              60 * moment(record?.date_send_link_record).hours()));
    if (record.link_record) {
      return false;
    } else {
      if (hieuNgay > 0) {
        return true;
      } else {
        return false;
      }
    }
  };

  useEffect(() => {
    dispatch(getComplain());
  }, [dispatch]);
  const columns = [
    {
      title: "STT",
      key: "STT",
      render: (t, r, i) => i + 1,
      width: "5%",
    },
    {
      title: "Buổi học",
      dataIndex: "title",
      key: "title",
      width: "25%",
    },
    {
      title: "Học viên",
      dataIndex: "name_student",
      width: "12%",
      key: "name_student",
      render: (value) => <div className="tw-capitalize">{value}</div>,
    },
    {
      title: "Thời gian học",
      dataIndex: "start",
      key: "start",
      render: (t, r) => (
        <div>
          {r?.time_start} - {r?.time_start}
          <p>{r?.date}</p>
        </div>
      ),
      responsive: ["lg"],
    },
    {
      title: "Trạng thái",
      dataIndex: "complain",
      key: "complain",
      width: "12%",
      render: (value) => (
        <span
          style={{
            background:
              value === "Complain" ? "#99CCFF" : value === "nocomplain" ? "#e0f9f4" : "#dd716a",
            borderRadius: 5,
            fontSize: "13px",
            color: value === "Complain" ? "#fff" : value === "nocomplain" ? "#4adabb" : "#fff",
            padding: 7,
          }}
        >
          {value === "Complain"
            ? "Khiếu nại"
            : value === "nocomplain"
            ? "Khiếu nại thất bại"
            : "Yêu cầu gửi link"}
        </span>
      ),
    },
    {
      title: "Chức năng",
      key: "action",
      width: 300,
      render: (record) => (
        <Space>
          <ShowForPermission permission="complain:complete">
            <Tooltip title="PT xếp lại lịch">
              <Button type="primary" onClick={() => onXacNhan(record)}>
                Chấp nhận
              </Button>
            </Tooltip>
          </ShowForPermission>
          <ShowForPermission permission="complain:send-link-record">
            <Tooltip title={`${record?.link_record ? "" : "Yêu cầu PT gửi link record"}`}>
              <Button
                disabled={record?.link_record ? true : false}
                onClick={() => onYeucau(record)}
              >
                Yêu cầu record
              </Button>
            </Tooltip>
          </ShowForPermission>

          <ShowForPermission permission="complain:cancel-order">
            <Tooltip title="Khiếu nại không thành công">
              <Button
                disabled={disabledd(record)}
                type="primary"
                danger
                onClick={() => onHuy(record)}
              >
                Huỷ
              </Button>
            </Tooltip>
          </ShowForPermission>
        </Space>
      ),
    },
  ];
  return (
    <Table
      locale={{
        emptyText: (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>Không có khiếu nại nào</span>}
          />
        ),
      }}
      loading={loading}
      pagination={{
        current: meta?.current_page,
        total: meta?.total,
        pageSize: meta?.per_page ? meta?.per_page : 10,
        onChange: onChangePage,
      }}
      columns={columns}
      dataSource={!loading && items}
      rowKey={(record) => record.id}
      expandable={{
        expandedRowRender: (record) => {
          return (
            <>
              <div className="tw-flex tw-flex-wrap">
                <div className="tw-w-1/3">
                  <span className="tw-flex tw-text-md tw-font-bold">Thông tin khóa học</span>
                  <p>Tên khóa học: {record?.name_course}</p>
                  <p>Tên giai đoạn: {record?.name_stage}</p>
                  <p>
                    Link record:{" "}
                    {record?.link_record === null ? "Chưa cập nhật" : record?.link_record}
                  </p>
                  <p>
                    Link record:{" "}
                    {
                      <a href={record?.link_room} target="_blank">
                        {record?.link_room}
                      </a>
                    }
                  </p>
                </div>
                <div className="tw-w-1/3">
                  <span className="tw-flex tw-text-md tw-font-bold">Thông tin PT</span>
                  <p>Tên PT: {record?.course_student?.courses?.teacher?.name}</p>
                  <p>Email: {record?.course_student?.courses?.teacher?.email}</p>
                  <p>Số điện thoại: {record?.course_student?.courses?.teacher?.phone}</p>
                  <p>Địa chỉ: {record?.course_student?.courses?.teacher?.address}</p>
                </div>
                <div className="tw-w-1/3">
                  <span className="tw-flex tw-text-md tw-font-bold">Thông tin học viên</span>
                  <p>Tên học viên: {record?.course_student.users.name}</p>
                  <p>
                    Số điện thoại:{" "}
                    {record?.course_student.users.phone === null
                      ? "Không có"
                      : record?.course_student.users.phone}
                  </p>
                  <p>Email: {record?.course_student.users.email}</p>
                </div>
                <span className="tw-font-bold">Lý do khiếu nại:</span>
                <p className="tw-ml-1">{record?.reason_complain}</p>
              </div>
            </>
            // <ul className="tw-text-xs">
            //   <li className="tw-py-2">
            //     <span className=" tw-min-w-[150px] tw-inline-block tw-font-medium">
            //       Link Recrod:
            //     </span>
            //     {record?.link_record ? (
            //       <a
            //         href={record?.link_record}
            //         className="tw-capitalize tw-text-blue-500 hover:tw-text-blue-700 hover:!tw-underline "
            //       >
            //         {record?.link_record}
            //       </a>
            //     ) : (
            //       "Chưa cập cập"
            //     )}
            //   </li>
            //   <li className="tw-py-2">
            //     <span className="tw-min-w-[150px] tw-inline-block tw-font-medium">
            //       Buổi học:
            //     </span>
            //     <span>{record?.course_planes?.name}</span>
            //   </li>
            //   <li className="tw-py-2">
            //     <span className="tw-min-w-[150px] tw-inline-block tw-font-medium">
            //       Giai đoạn:
            //     </span>
            //     <span>{record?.name_stage}</span>
            //   </li>
            //   <li className=" tw-py-2">
            //     <span className="tw-min-w-[150px] tw-inline-block tw-font-medium">
            //       Thời gian học thực tế:
            //     </span>
            //     <span>
            //       {moment(record?.actual_start_time).format("HH:mm")} -
            //       {moment(record?.actual_end_time).format("HH:mm")} ({" "}
            //       {moment(record?.actual_end_time).format("DD-MM-YYYY")})
            //     </span>
            //   </li>
            //   <li className="tw-py-2">
            //     <span className=" tw-min-w-[130px] tw-inline-block tw-font-medium">
            //       Lý do khiếu nại:
            //     </span>
            //     <p>{record?.reason_complain}</p>
            //   </li>
            // </ul>
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

export default ComplainList;
