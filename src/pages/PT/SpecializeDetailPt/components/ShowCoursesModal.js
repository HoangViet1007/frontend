import React from "react";
import { showPhoto } from "../../../../components/componentsAdmin/ShowPhoto/showPhoto";
import { convertCurrency } from "../../../../utils";
import { Table } from "antd";
import FormModal from "../../../../components/componentsPT/Modal/FormModal";

const ShowCoursesModal = (props) => {
  const { openModal, dataTable, handleCancel } = props;
  const expandedRowRender = (dataTable) => {
    const columnss = [
      {
        title: "STT",
        width: 20,
        render: (t, r, i) => i + 1,
      },

      {
        title: "Tên khoá học",
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
      {
        title: "Số buổi",
        dataIndex: "lessons",
        key: "lessons",
        width: 200,
        render: (value) => `${value} buổi`,
      },
      {
        title: "Giá",
        dataIndex: "price",
        key: "price",
        width: 200,
        render: (value) => convertCurrency(value),
      },
    ];

    return <Table size="small" columns={columnss} dataSource={dataTable} pagination={false} />;
  };
  return (
    <>
      <FormModal
        titleModal="Danh sách khoá học"
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

export default ShowCoursesModal;
