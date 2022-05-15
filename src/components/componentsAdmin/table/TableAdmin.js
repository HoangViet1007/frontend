import React from "react";
import { Table } from "antd";
const TableAdmin = (props) => {
  const { columns, dataTable, meta, onChangePage, expandable } = props;
  return (
    <>
      <Table
        columns={columns}
        expandable={expandable}
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
        scroll={{ x: 800 }}
      />
    </>
  );
};

export default TableAdmin;
