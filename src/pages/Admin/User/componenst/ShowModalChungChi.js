import { Table } from "antd";
import React from "react";
import { showPhoto } from "../../../../components/componentsAdmin/ShowPhoto/showPhoto";
import FormModal from "../../../../components/componentsPT/Modal/FormModal";

const ShowModalChungChi = (props) => {
  const { openModal, dataTable, handleCancel, name } = props;
  const expandedRowRender = (dataTable) => {
    const columnss = [
      {
        title: "STT",
        width: 20,
        render: (t, r, i) => i + 1,
      },

      {
        title: "Tên chứng chỉ",
        dataIndex: "name",
        key: "name",
        width: 300,
      },
      {
        title: "Ảnh",
        dataIndex: "image",
        key: "image",
        width: 200,
        render: (value) => showPhoto(value),
      },
    ];

    return (
      <Table
        size="small"
        columns={columnss}
        dataSource={dataTable}
        pagination={false}
      />
    );
  };
  return (
    <>
      <FormModal
        titleModal={`Danh sách chứng chỉ : ${name}`}
        titleForm={"khoahoc"}
        visible={openModal}
        handleCancel={() => {
          handleCancel();
        }}
        width={"60%"}
        footer={null}
      >
        {expandedRowRender(dataTable)}
      </FormModal>
    </>
  );
};

export default ShowModalChungChi;
