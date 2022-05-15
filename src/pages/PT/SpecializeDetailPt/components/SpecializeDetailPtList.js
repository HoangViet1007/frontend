
 
import { DeleteTwoTone, HighlightTwoTone } from "@ant-design/icons";
import { Popconfirm, Space, Tooltip } from "antd";
import React from "react";
import TableAdmin from "../../../../components/componentsAdmin/table/TableAdmin";

const columns = (onDelete, onEdit, onNextPage, showKhoahoc) => [
  {
    title: "STT",
    width: 20,
    render: (t, r, i) => i + 1,
  },

  {
    title: "Chuyên môn",
    dataIndex: "specialize",
    key: "specialize",
    render: (value) => value?.name,
    sorter: (a, b) => (a?.name > b?.name ? 1 : -1),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Kinh nghiệm (năm)",
    dataIndex: "experience",
    key: "experience",
    sorter: (a, b) => (a?.experience > b?.experience ? 1 : -1),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Khoá học",
    dataIndex: "courses",
    key: "courses",
    render: (value, record) => (
      <Space>
        <span> {value?.length} </span>
        <span>
          <a
            style={{ color: "#0000FF", fontSize: "11px" }}
            onClick={() => showKhoahoc(record.courses)}
          >
            {value?.length > 0 ? "( Chi tiết )" : ""}
          </a>
        </span>
      </Space>
    ),
  },
  {
    title: "Chứng chỉ",
    dataIndex: "certificates",
    key: "certificates",
    render: (value, record) => (
      <Space>
        <span> {value?.length} </span>
        <span>
          <a style={{ color: "#0000FF", fontSize: "11px" }} onClick={() => onNextPage(record.id)}>
            ( Chi tiết )
          </a>
        </span>
        {/* {record.certificates?.length > 0 ? (
          <Tooltip title="Chi tiết chứng chỉ">
            <EyeTwoTone onClick={() => onNextPage(record.id)} />
          </Tooltip>
        ) : (
          <Tooltip title="Chi tiết chứng chỉ">
            <EyeOutlined onClick={() => onNextPage(record.id)} />
          </Tooltip>
        )} */}
      </Space>
    ),
  },
  // {
  //   title: "Trạng thái",
  //   dataIndex: "status",
  //   key: "status",
  //   render: (value) => (
  //     <span
  //       style={{
  //         background: value.status === "Inactive" ? "#e0f9f4" : "#fff1e6",
  //         borderRadius: 5,
  //         fontSize: "13px",
  //         color: value.status === "Inactive" ? "#4adabb" : "#feaa54",
  //         padding: 7,
  //         border: value.status === "Inactive" ? "1px solid #c6f4eb" : " 1px solid #ffe5d1",
  //       }}
  //     >
  //       {value.status === "Active" ? "Kích hoạt" : "Chưa kích hoạt"}
  //     </span>
  //   ),
  // },
  {
    title: "Chức năng",
    key: "action",
    width: 150,
    render: (record) => (
      <Space>
        <Tooltip title="Chỉnh sửa">
          <HighlightTwoTone onClick={() => onEdit("update", record)} />
        </Tooltip>
        <Popconfirm title="Bạn có chắc chắn muốn xóa không ?" onConfirm={() => onDelete(record)}>
          <Tooltip title="Xóa">
            <DeleteTwoTone />
          </Tooltip>
        </Popconfirm>
      </Space>
    ),
  },
];

const SpecializeDetailPtList = ({
  dataTable,
  onDelete,
  onEdit,
  onChangePage,
  meta,
  onNextPage,
  showKhoahoc,
}) => {
  return (
    <>
      <TableAdmin
        columns={columns(onDelete, onEdit, onNextPage, showKhoahoc)}
        dataTable={dataTable}
        onChangePage={onChangePage}
        meta={meta}
      />
    </>
  );
};

export default SpecializeDetailPtList;
