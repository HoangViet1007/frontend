import React from "react";
import { Table } from "antd";
const TableAdmin = (props) => {
  const {
    columns,
    dataTable,
    meta,
    onChangePage,
    expandable = "",
    loading = false,
  } = props;
  return (
    <>
    
      <Table
        columns={columns}
        dataSource={dataTable}
        rowKey={(record) => record.id}
        pagination={
          meta?.total > meta?.per_page
            ? {
                current: meta?.current_page ? meta?.current_page : 1,
                total: meta?.total,
                pageSize: meta?.per_page ? meta?.per_page : 10,
                onChange: onChangePage,
              }
            : false
        }
        loading={loading}
        scroll={{ x: 800 }}
        expandable={expandable}
      />
    </>
  );
};

export default TableAdmin;
