import React from "react";
import { Modal } from "antd";
const FormModal = (props) => {
  const { children, titleModal, handleCancel, onOk, visible, titleForm, width } = props;
  return (
    <>
      <Modal
        title={titleModal}
        onCancel={handleCancel}
        visible={visible}
        onOk={onOk}
        okButtonProps={{ form: `${titleForm}`, htmlType: "submit" }}
        okType="primary"
        okText="Lưu lại"
        cancelText="Hủy"
        forceRender
        style={{ top: "50%" }}
        className="tw-transform tw--translate-y-1/2"
        width={width}
      >
        {children}
      </Modal>
    </>
  );
};

export default FormModal;
