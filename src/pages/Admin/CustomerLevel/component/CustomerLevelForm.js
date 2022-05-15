import React from "react";

const CustomerLevelForm = () => {
  return (
    <>
      <Form layout="vertical" form={form} id="product" onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Tiêu đề"
              name="config_key"
              rules={[
                {
                  required: true,
                  message: "Mời nhập tên tiêu đề",
                },
              ]}
            >
              <Input placeholder="Hãy nhập tên tiêu đề..." />
            </Form.Item>
            <Form.Item
              label="Nội dung"
              name="config_value"
              rules={[
                {
                  required: true,
                  message: "Mời nhập tên nội dung",
                },
              ]}
            >
              <Input placeholder="Hãy nhập tên nội dung..." />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default CustomerLevelForm;
