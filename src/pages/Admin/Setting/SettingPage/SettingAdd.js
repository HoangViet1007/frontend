import React, { useState } from 'react'
import { Form, Card, Row, Col, Input, Select, Upload, Button, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addSetting } from '../SettingSlice';
import { unwrapResult } from "@reduxjs/toolkit";
import { useHistory } from 'react-router';
import ROUTER from '../../../../router/router';
// import { firebaseConfig } from '../../../../Utils/firebase';
// import firebase from 'firebase';

const { Option } = Select;
const { Search } = Input;
const SettingAdd = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const fieldFrom = [
    { name: 'Văn bản', type: 'text' },
    { name: 'Upload Ảnh', type: 'upload' },
  ]
  const [typeSelect, setTypeSelect] = useState('');
  const onChange = (value) => {
    setTypeSelect(value);
  }

  const renderFrom = (type) => {
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const tailLayout = {
      wrapperCol: {
        offset: 11,
        span: 6,
      },
    };
    const onFinish = async (value) => {
      if (type === "text") {
        try {
          const resulDispatch = await dispatch(addSetting(value));
          unwrapResult(resulDispatch);
          history.push(ROUTER.ADMIN.SETTING);
          notification.success({ message: `Thêm thành công !!!` });
        }
        catch (error) {
          return notification.error({ message: `Đã có lỗi xảy ra ` });
        }
      }
      if (type === "upload") {
        // if (!firebase.apps.length) {
        //   firebase.initializeApp(firebaseConfig);
        // }
        // const nameImg = value.upload.fileList[0]
        // let storageRef = firebase.storage().ref(`images/${nameImg.name}`);
        // storageRef.put(nameImg).then(function () {
        //   storageRef.getDownloadURL().then(async (url) => {

        //   })
        // })
      }


    }
    if (type === "text") {
      return <>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="config_key"
            label="Tiêu đề"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input style={{ width: "300px" }} />
          </Form.Item>
          <Form.Item
            name="config_value"
            label="Nội dung"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input style={{ width: "300px" }} />
          </Form.Item>
          <Form.Item
            label="Chọn định dạng"
            name="status"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              style={{ backgroundColor: '#f0f2f5' }}
              showSearch

              // style={{ width: 200 }}
              placeholder="Chọn type"

            >
              <Option value="Active">Kích hoạt</Option>
              <Option value="Inactive">Không Kích hoạt</Option>
            </Select>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" className="" htmlType="submit">
              Thêm mới
            </Button>
          </Form.Item>
        </Form>
      </>
    }
    if (type === "upload") {
      return <>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="upload"
            label="Upload"
          >
            <Upload
              listType="picture"
              maxCount={1}

            >
              <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
            </Upload>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" className="" htmlType="submit">
              Thêm mới
            </Button>
          </Form.Item>
        </Form>
      </>
    }
  }

  return (
    <>
      <Card style={{ backgroundColor: "#ffffff", borderRadius: "8px" }}>
        <Row gutter={24} style={{ marginBottom: "20px" }}>
          <Col span={10}>
            <Search placeholder="Tìm kiếm"
              size="large"
              style={{ width: '100%', borderRadius: 10 }}
              enterButton
            />
          </Col>
          <Col span={10}>
            <Row>
              <Col span={10} />
              <h1 span={4}
                style={{
                  fontSize: "1.6em",
                  fontWeight: "bold",
                  textAlign: "center",
                  borderBottom: "0.5px solid #feaa54"
                }}
              >
                Thêm mới cấu hình
              </h1>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Row style={{ marginTop: "20px" }}>
              <Col span={10} />
              <Form.Item
                label="Chọn định dạng"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  style={{ backgroundColor: '#f0f2f5' }}
                  showSearch
                  // style={{ width: 200 }}
                  placeholder="Chọn type"
                  optionFilterProp="children"
                  onChange={onChange}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {fieldFrom.map(item => {
                    return <Option value={item.type}>{item.name}</Option>
                  })}

                </Select>
              </Form.Item>
            </Row>
          </Col>
          <Row style={{ marginLeft: "35%", marginTop: "15px" }} >
            {renderFrom(typeSelect)}
          </Row>

        </Row>
      </Card>
    </>
  )
}

export default SettingAdd
