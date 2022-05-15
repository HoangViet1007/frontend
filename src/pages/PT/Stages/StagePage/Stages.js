import {
  DeleteTwoTone,
  HighlightTwoTone,
  LoadingOutlined,
  PlusCircleTwoTone,
  PlusOutlined,
  PoweroffOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { unwrapResult } from "@reduxjs/toolkit";
import { DefaultUi, Player, Video } from "@vime/react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  notification,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
  Upload,
} from "antd";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useHistory,
  useLocation,
  useParams,
  Prompt,
} from "react-router-dom";
import TableAdmin from "../../../../components/componentsPT/table/TableAdmin";
import ROUTER from "../../../../router/router";
import {
  EDITORCONFIGURATION,
  UPLOAD_API_URL,
  UPLOAD_VIDEO_API_URL,
} from "../../../../utils/Config";
import { getCoursesID } from "../../Courses/CoursesSlice";
import {
  addPlan,
  deletePlan,
  getPlan,
  getPlanDetail,
  updatePlan,
} from "../../CoursesPlans/CoursesPlanSlice";
import { getStages, removeStage } from "../StageSlice";
import { Api } from "../../../../utils/Api";
const Stages = () => {
  const { Option } = Select;
  const [form] = Form.useForm();

  const [expanded, setExpanded] = useState(false);
  const [expandedId, setExpandedId] = useState("");
  const [addStageId, setAddStageId] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrlOld, setVideoUrlOld] = useState("");
  const [videoNameOld, setVideoNameOld] = useState("");
  const plans = useSelector((state) => state.plans.items);

  const [isUploading, setIsUploading] = useState(false);
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Chỉ có thể tải lên file JPEG và PNG!");
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error("Ảnh phải nhỏ hơn 5MB!");
    }
    return isJpgOrPng && isLt2M;
  }

  const handleUploadVideo = {
    action: UPLOAD_VIDEO_API_URL,
    async onChange(info) {
      let fileList = [...info.fileList];
      if (fileList) {
        await Api.post(`https://upload.ngon.in/remove-video`, {
          key: uploadingVideoKey,
        });
        setUploadingVideoKey("");
      }
      if (info.file.status === "done") {
        setVideoUrl(info.file.response.url);
        setUploadingVideoKey(info.file.response.name);
        return message.success(`Tải lên ${info.file.name} thành công`);
      } else if (info.file.status === "error") {
        message.error(`Lỗi: ${info.file.response.error}`);
        return message.error(`Tải lên ${info.file.name} thất bại.`);
      } else if (info.file.status === "removed") {
        await Api.post(`https://upload.ngon.in/remove-video`, {
          key: info.file.response.name,
        });
        setVideoUrl(videoUrlOld);
        setUploadingVideoKey("");
      }
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 5,
      format: (percent) => `${parseFloat(percent.toFixed(1))}%`,
    },
  };
  const onDelete = async (e) => {
    try {
      const resulDispatch = await dispatch(deletePlan(e?.id));
      unwrapResult(resulDispatch);
    } catch (error) {
      notification.error({ message: `${error}` });
    }
  };
  const handleUploadImage = (info) => {
    if (info.file.status === "uploading") {
      setIsUploading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(info.file.response.url);
        setIsUploading(false);
      });
      message.success(`Tải lên ảnh ${info.file.originFileObj.name} thành công`);
    }
    if (info.file.status === "error") {
      setIsUploading(false);
      message.error(`${info.file.response.status}`);
    }
  };

  const uploadButton = (
    <div>
      {isUploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </div>
  );
  const plan = useSelector((state) => state.plans.item);

  useEffect(async () => {
    expanded
      ? await dispatch(getPlan(expandedId))
      : await dispatch(getPlan(null));
  }, [expandedId]);

  useEffect(() => {
    setContent(plan?.content);
    setDescription(plan?.descreption);
    setVideoUrl(plan?.video_link);
    setVideoUrlOld(plan?.video_link);
    form.setFieldsValue({
      name: plan?.name,
      status: plan?.status === "Active" ? "Active" : "Inactive",
      type: plan?.type === 0 ? "Trực tuyến" : "Video",
      descreption: plan?.descreption,
      content: plan?.content,
      video_link: videoUrl,
      image: plan?.image,
      stage_id: idStage,
      id: idPlans,
    });
  }, [plan, form]);

  const tailLayout = {
    wrapperCol: {
      offset: 11,
      span: 6,
    },
  };

  const [idStage, setIdStage] = useState("");

  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const search = useLocation().search;
  const {
    loading,
    items: dataTable,
    meta,
  } = useSelector((state) => state.Stages);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [videoToPlay, setVideoToPlay] = useState("");
  const [idPlans, setIdPlans] = useState("");

  useEffect(async () => {
    dispatch(getCoursesID(id));
  }, []);

  const currentCourse = useSelector((state) => state.courses.item);

  const showModal = (e) => {
    setIsModalVisible(true);
    setVideoToPlay(e);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleTableChange = (pagination) => {
    if (pagination !== meta.current_page && pagination !== 1) {
      history.push(`${ROUTER.PT.STAGE}/${id}/giai-doan?page=${pagination}`);
    } else {
      history.push(`${ROUTER.PT.STAGE}/${id}/giai-doan`);
    }
  };

  const fetchSearch = (value) => {
    if (value) {
      history.push(`${ROUTER.PT.STAGE}/${id}/giai-doan?name__~=${value}`);
      const params = `?name__~=${value}`;
      dispatch(getStages({ id, params }));
    } else {
      history.push(`${ROUTER.PT.STAGE}/${id}/giai-doan`);
    }
  };
  const debounceSearch = useCallback(debounce(fetchSearch, 1000), []);
  const onSearch = (e) => {
    debounceSearch(e.target.value);
  };
  const remove = async (e) => {
    try {
      const resulDispatch = await dispatch(removeStage(e.id));
      unwrapResult(resulDispatch);
    } catch (error) {
      notification.error({ message: `${error}` });
    }
  };

  useEffect(() => {
    !search
      ? dispatch(getStages({ id }))
      : dispatch(getStages({ id, params: search }));
  }, [search, id]);

  useEffect(() => {}, []);

  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);
  const [confirmLoadingAdd, setConfirmLoadingAdd] = useState(false);
  const [uploadingVideoKey, setUploadingVideoKey] = useState("");

  const showModalEdit = (record) => {
    setVisibleEdit(true);
    dispatch(getPlanDetail(record.id));
    setIdPlans(record.id);
    setIdStage(record.stage_id);
    setImageUrl(record.image);
    const video = record.video_link;
    const regex = /[^/\\&\?]+\.\w{3,4}(?=([\?&].*$|$))/;
    if (video) {
      setVideoNameOld(video?.match(regex)[0]);
    }
  };

  const showModalAdd = (record) => {
    setVisibleAdd(true);
    setAddStageId(record.id);
  };

  const handleOkEdit = () => {
    dispatch(getStages({ id }));
  };

  const handleOkAdd = () => {
    dispatch(getStages({ id }));
  };
  const handleCancelEdit = async (del) => {
    if (uploadingVideoKey !== "") {
      if (
        window.confirm(
          "Bạn đang tải lên video, nếu thoát sẽ xảy ra mất dữ liệu?"
        )
      ) {
        await Api.post(`https://upload.ngon.in/remove-video`, {
          key: uploadingVideoKey,
        });
        setUploadingVideoKey("");
      } else {
        return false;
      }
    }
    setVisibleEdit(false);
    setImageUrl("");
    setVideoNameOld("");
  };

  // if (uploadingVideoKey !== "") {
  //   window.addEventListener("beforeunload", async function (e) {
  //     if (e) {
  //       e.preventDefault();
  //       e.returnValue = "";
  //       await Api.post(`https://upload.ngon.in/remove-video`, {
  //         key: uploadingVideoKey,
  //       });
  //       setUploadingVideoKey("");
  //     } else {
  //       console.log("else");
  //       e.preventDefault();
  //       e.returnValue = "";
  //     }
  //   });
  // }

  const handleCancelAdd = async () => {
    if (uploadingVideoKey !== "") {
      if (
        window.confirm(
          "Bạn đang tải lên video, nếu thoát sẽ xảy ra mất dữ liệu?"
        )
      ) {
        await Api.post(`https://upload.ngon.in/remove-video`, {
          key: uploadingVideoKey,
        });
        setUploadingVideoKey("");
      } else {
        return false;
      }
    }

    setImageUrl("");
    setVideoNameOld("");
    setVisibleAdd(false);
  };

  // end

  const onFinishEdit = async (value) => {
    const newData = {
      ...value,
      descreption: description,
      content: content,
      image: imageUrl,
      video_link:
        value?.type === "0"
          ? ""
          : videoUrlOld === videoUrl
          ? videoUrlOld
          : videoUrl,
      stage_id: value?.stage_id,
      type:
        value?.type === "Trực tuyến"
          ? 0
          : value?.type === "Video"
          ? 1
          : value?.type,
    };
    try {
      const resulDispatch = await dispatch(updatePlan(newData));
      unwrapResult(resulDispatch);
      dispatch(getPlan(expandedId));
      setVisibleEdit(false);
      await Api.post(`https://upload.ngon.in/remove-video`, {
        key: videoNameOld,
      });
      setUploadingVideoKey("");
      setVideoNameOld("");
      notification.success({ message: `Sửa thành công !!!` });
    } catch (error) {
      return notification.error({ message: `${error}` });
    }
  };

  const onFinishAdd = async (value) => {
    const data = {
      ...value,
      descreption: description,
      content: content,
      stage_id: addStageId,
      image: imageUrl,
      video_link: videoUrl,
    };
    try {
      const resulDispatch = await dispatch(addPlan(data));
      unwrapResult(resulDispatch);
      dispatch(getPlan(expandedId));
      setVisibleAdd(false);
      setImageUrl("");
      setVideoUrl("");
      setUploadingVideoKey("");
      notification.success({
        message: `Thêm buổi học thành công !!!`,
      });
    } catch (error) {
      return notification.error({ message: `${error}` });
    }
  };
  const tablePlan = [
    { title: "STT", width: 20, render: (t, r, i) => i + 1 },
    {
      title: "Tên buổi học",
      width: 900,
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Video",
      dataIndex: "",
      key: "",
      render: (t, r, i) => (
        <>
          {r.type === 0 ? (
            ""
          ) : (
            <Button
              type="primary"
              icon={<PoweroffOutlined />}
              onClick={() => showModal(r.video_link)}
            >
              Xem video
            </Button>
          )}

          <Modal
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={() => handleCancel()}
            okButtonProps={{ hidden: true }}
            cancelButtonProps={{ hidden: false }}
            width={1000}
            centered
            destroyOnClose={true}
          >
            <Player>
              <Video>
                <source data-src={videoToPlay} type="video/mp4" />
              </Video>
              <DefaultUi></DefaultUi>
            </Player>
          </Modal>
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: 180,
      key: "status",
      render: (value) => (
        <span
          style={{
            background: value === "Active" ? "#e0f9f4" : "#fff1e6",
            borderRadius: 5,
            fontSize: "12px",
            color: value === "Active" ? "#4adabb" : "#feaa54",
            padding: 7,
            border:
              value === "Active" ? "1px solid #c6f4eb" : " 1px solid #ffe5d1",
          }}
        >
          {value === "Active" ? "Kích hoạt" : "Chưa kích hoạt"}
        </span>
      ),
    },
    {
      title: "Loại kiểu học",
      dataIndex: "type",
      width: 150,
      key: "type",
      render: (value) => (
        <span
          style={{
            background: value === 0 ? "#e0f9f4" : "#fff1e6",
            borderRadius: 5,
            fontSize: "12px",
            color: value === 0 ? "#4adabb" : "#feaa54",
            padding: 7,
            border: value === 0 ? "1px solid #c6f4eb" : " 1px solid #ffe5d1",
          }}
        >
          {value === 0 ? "Trực tuyến" : "Video"}
        </span>
      ),
    },

    {
      title: "Chức năng",
      key: "action",
      width: 150,
      render: (record) => (
        <div className="text-center">
          <Space>
            <Tooltip title="Chỉnh sửa">
              <HighlightTwoTone onClick={() => showModalEdit(record)} />
              <Modal
                title="Chỉnh sửa buổi học"
                style={{ top: 20 }}
                visible={visibleEdit}
                onOk={handleOkEdit}
                confirmLoading={confirmLoadingEdit}
                onCancel={handleCancelEdit}
                okButtonProps={{ hidden: true }}
                cancelButtonProps={{ hidden: true }}
                width={1300}
                centered
                destroyOnClose={true}
              >
                <Form
                  layout="vertical"
                  form={form}
                  id="course_plan"
                  onFinish={onFinishEdit}
                >
                  <Row gutter={24}>
                    <Col span={24}>
                      <Row gutter={24}>
                        <Col span={12}>
                          <Form.Item
                            label="Tên buổi học"
                            name="name"
                            rules={[
                              {
                                required: true,
                                message: "Mời nhập tên buổi học",
                              },
                            ]}
                          >
                            <Input placeholder="Tên buổi học" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            label="Trạng thái"
                            name="status"
                            rules={[
                              {
                                required: true,
                                message: "Mời chọn trạng thái",
                              },
                            ]}
                          >
                            <Select placeholder="Mời chọn trạng thái">
                              <Option value="Active">Kích hoạt</Option>
                              <Option value="Inactive">Chưa kích hoạt</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            label="Loại kiểu học"
                            name="type"
                            rules={[
                              {
                                required: true,
                                message: "Mời chọn loại kiểu học",
                              },
                            ]}
                          >
                            <Select
                              onChange={onTypeChange}
                              placeholder="Mời chọn loại kiểu học"
                            >
                              <Option value="0">Trực tuyến</Option>
                              <Option value="1">Video</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            shouldUpdate={(prevValues, currentValues) =>
                              prevValues.type !== currentValues.type
                            }
                          >
                            {({ getFieldValue }) =>
                              getFieldValue("type") === "1" ||
                              getFieldValue("type") === "Video" ? (
                                <>
                                  <Form.Item name="video_link" label="Video">
                                    <Upload
                                      maxCount={1}
                                      {...handleUploadVideo}
                                      accept=".mp4"
                                    >
                                      <Button icon={<UploadOutlined />}>
                                        Tải lên
                                      </Button>
                                    </Upload>
                                  </Form.Item>
                                </>
                              ) : null
                            }
                          </Form.Item>
                        </Col>

                        <Col span={12}>
                          <Form.Item
                            name="image"
                            label="Ảnh"
                            rules={[
                              {
                                required: false,
                                message: "Mời tải lên ảnh",
                              },
                            ]}
                          >
                            <Upload
                              listType="picture-card"
                              className="avatar-uploader"
                              showUploadList={false}
                              action={UPLOAD_API_URL}
                              beforeUpload={beforeUpload}
                              onChange={handleUploadImage}
                            >
                              {imageUrl ? (
                                <img
                                  src={imageUrl}
                                  alt="avatar"
                                  style={{ width: "100%", height: "100%" }}
                                />
                              ) : (
                                uploadButton
                              )}
                            </Upload>
                          </Form.Item>
                        </Col>

                        <Col span={12} hidden>
                          <Form.Item label="stage_id" name="stage_id">
                            <Input defaultValue={record.stage_id} disabled />
                          </Form.Item>
                        </Col>

                        <Col hidden>
                          <Form.Item label="id" name="id">
                            <Input defaultValue={record.id} />
                          </Form.Item>
                        </Col>

                        <Col span={24}>
                          <Form.Item
                            label="Mô tả"
                            name="descreption" // Chờ backend sửa chính tả
                            rules={[
                              {
                                required: true,
                                message: "Mời nhập mô tả",
                              },
                            ]}
                          >
                            <CKEditor
                              editor={Editor}
                              config={EDITORCONFIGURATION}
                              data={description}
                              onChange={(event, editor) => {
                                const data = editor.getData();
                                setDescription(data);
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            label="Nội dung"
                            name="content"
                            rules={[
                              {
                                required: true,
                                message: "Mời nhập nội dung",
                              },
                            ]}
                          >
                            <CKEditor
                              editor={Editor}
                              config={EDITORCONFIGURATION}
                              data={content}
                              onChange={(event, editor) => {
                                const data = editor.getData();
                                setContent(data);
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={21}>
                          <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                              Chỉnh sửa
                            </Button>
                            <Button
                              className="ml-4"
                              type="primary"
                              danger
                              onClick={() => handleCancelEdit()}
                            >
                              Hủy thao tác
                            </Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Form>
                {plan?.cousre?.status === "Happening" ? (
                  <p className="tw-text-red-400 tw-my-4">
                    Lưu ý: Để khóa học được hoạt động, sau khi chỉnh sửa buổi
                    học hãy gửi yêu cầu xét duyệt khóa học cho quản trị viên.
                  </p>
                ) : (
                  ""
                )}
                {/* end form */}
              </Modal>
            </Tooltip>

            <Popconfirm
              title="Bạn có chắc chắn muốn xóa không ?"
              onConfirm={() => onDelete(record)}
            >
              <Tooltip title="Xóa">
                <DeleteTwoTone />
              </Tooltip>
            </Popconfirm>
          </Space>
        </div>
      ),
    },
  ];
  const columns = [
    { title: "STT", width: 20, render: (t, r, i) => i + 1 },
    {
      title: "Tên giai đoạn",
      width: 600,
      dataIndex: "name",
      key: "name",
      render: (text) => <div className="w-64">{text}</div>,
    },
    {
      title: "Tiêu đề",
      dataIndex: "short_content",
      key: "short_content",
      width: 200,
      render: (text) => text,
    },
    {
      title: "Trạng thái",
      width: 180,
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Kích hoạt", value: "Active" },
        { text: "Chưa kích hoạt", value: "Inactive" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (value) => (
        <span
          style={{
            background: value === "Active" ? "#e0f9f4" : "#fff1e6",
            borderRadius: 5,
            fontSize: "13px",
            color: value === "Active" ? "#4adabb" : "#feaa54",
            padding: 7,
            border:
              value === "Active" ? "1px solid #c6f4eb" : " 1px solid #ffe5d1",
          }}
        >
          {value === "Active" ? "Kích hoạt" : "Chưa kích hoạt"}
        </span>
      ),
    },
    {
      title: "Chức năng",
      key: "action",
      width: 150,
      render: (record) => (
        <div className="text-center">
          <Space>
            <Tooltip title="Chỉnh sửa">
              <Link to={`${ROUTER.PT.STAGE}/${id}/sua-giai-doan/${record.id}`}>
                <HighlightTwoTone />
              </Link>
            </Tooltip>
            <Popconfirm
              placement="topRight"
              title="Bạn có chắc chắn muốn xóa không ?"
              onConfirm={() => remove(record)}
            >
              <Tooltip title="Xóa">
                <DeleteTwoTone />
              </Tooltip>
            </Popconfirm>
            <Tooltip title="Thêm buổi học">
              {/* <Link to={`stages/${record.id}`}>
              </Link> */}
              <PlusCircleTwoTone onClick={() => showModalAdd(record)} />

              <Modal
                title="Thêm buổi học"
                style={{ top: 20 }}
                visible={visibleAdd}
                onOk={handleOkAdd}
                confirmLoading={confirmLoadingAdd}
                onCancel={handleCancelAdd}
                width={1300}
                footer={null}
                destroyOnClose={true}
              >
                <Form layout="vertical" id="course_plan" onFinish={onFinishAdd}>
                  <Row gutter={24}>
                    <Col span={24}>
                      <Row gutter={24}>
                        <Col span={12}>
                          <Form.Item
                            label="Tên buổi học"
                            name="name"
                            rules={[
                              {
                                required: true,
                                message: "Mời nhập tên buổi học",
                              },
                            ]}
                          >
                            <Input placeholder="Tên buổi học" />
                          </Form.Item>
                        </Col>

                        <Col span={12} hidden>
                          <Form.Item label="stage_id" name="stage_id">
                            <Input defaultValue={record.stage_id} disabled />
                          </Form.Item>
                        </Col>

                        <Col span={12}>
                          <Form.Item
                            label="Trạng thái"
                            name="status"
                            rules={[
                              {
                                required: true,
                                message: "Mời chọn trạng thái",
                              },
                            ]}
                          >
                            <Select placeholder="Mời chọn trạng thái">
                              <Option value="Active">Kích hoạt</Option>
                              <Option value="Inactive">Chưa kích hoạt</Option>
                            </Select>
                          </Form.Item>
                        </Col>

                        <Col span={12}>
                          <Form.Item
                            label="Loại kiểu học"
                            name="type"
                            rules={[
                              {
                                required: true,
                                message: "Mời chọn Loại kiểu học",
                              },
                            ]}
                          >
                            <Select
                              defaultValue="Chọn Loại kiểu học"
                              onChange={onTypeChange}
                            >
                              <Option value="0">Trực tuyến</Option>
                              <Option value="1">Video</Option>
                            </Select>
                          </Form.Item>
                        </Col>

                        <Col span={12}>
                          <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) =>
                              prevValues.type !== currentValues.type
                            }
                          >
                            {({ getFieldValue }) =>
                              getFieldValue("type") === "1" ? (
                                <Form.Item
                                  name="Video"
                                  label="Video"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Vui lòng tải lên video",
                                    },
                                  ]}
                                >
                                  <Upload
                                    maxCount={1}
                                    {...handleUploadVideo}
                                    accept=".mp4"
                                  >
                                    <Button icon={<UploadOutlined />}>
                                      Tải lên video
                                    </Button>
                                  </Upload>
                                </Form.Item>
                              ) : null
                            }
                          </Form.Item>
                        </Col>

                        <Col span={12}>
                          <Form.Item
                            name="image"
                            label="Ảnh"
                            rules={[
                              {
                                required: false,
                                message: "Mời tải lên ảnh",
                              },
                            ]}
                          >
                            <Upload
                              listType="picture-card"
                              className="avatar-uploader"
                              showUploadList={false}
                              action={UPLOAD_API_URL}
                              beforeUpload={beforeUpload}
                              onChange={handleUploadImage}
                            >
                              {imageUrl ? (
                                <img
                                  src={imageUrl}
                                  alt="avatar"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              ) : (
                                uploadButton
                              )}
                            </Upload>
                          </Form.Item>
                        </Col>

                        <Col span={24}>
                          <Form.Item
                            label="Mô tả"
                            name="descreption" // Chờ backend sửa chính tả
                            rules={[
                              {
                                required: true,
                                message: "Mời nhập mô tả",
                              },
                            ]}
                          >
                            <CKEditor
                              editor={Editor}
                              config={EDITORCONFIGURATION}
                              data=""
                              onChange={(event, editor) => {
                                const data = editor.getData();
                                setDescription(data);
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            label="Nội dung"
                            name="content"
                            rules={[
                              {
                                required: true,
                                message: "Mời nhập nội dung",
                              },
                            ]}
                          >
                            <CKEditor
                              editor={Editor}
                              config={EDITORCONFIGURATION}
                              data=""
                              onChange={(event, editor) => {
                                const data = editor.getData();
                                setContent(data);
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                              Thêm mới
                            </Button>
                            <Button
                              className="ml-4"
                              type="primary"
                              danger
                              onClick={() => handleCancelAdd()}
                            >
                              Hủy thao tác
                            </Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Form>
                {/* end form */}
              </Modal>
            </Tooltip>
          </Space>
        </div>
      ),
    },
  ];

  const onTypeChange = async (value) => {
    if (uploadingVideoKey !== "") {
      await Api.post(`https://upload.ngon.in/remove-video`, {
        key: uploadingVideoKey,
      });
      setUploadingVideoKey("");
    } else {
      return false;
    }
    // switch (value) {
    //   case "1":
    //     form.setFieldsValue({
    //       // note: "1",
    //     });
    // }
  };
  return (
    <>
      <Button
        type="primary"
        className="mb-5"
        onClick={() => history.push(ROUTER.PT.COURSES)}
      >
        Quay lại
      </Button>
      <Card
        style={{ backgroundColor: "#ffffff", borderRadius: "8px" }}
        title={"Danh sách giai đoạn: " + currentCourse?.name}
      >
        <div className="tw-flex tw-justify-between tw-py-3">
          <Space direction="vertical">
            <Input
              placeholder="Tìm tên giai đoạn"
              style={{ width: 200 }}
              type="search"
              suffix={
                <SearchOutlined className="tw-text-gray-400 tw-text-md tw-font-medium" />
              }
              onChange={onSearch}
            />
          </Space>
          <Link to={`${ROUTER.PT.STAGE}/${id}/them-giai-doan`}>
            <Button
              style={{
                borderRadius: "4px",
              }}
              type="primary"
            >
              <div className="tw-flex tw-items-center">
                <PlusCircleTwoTone /> <span className="ml-2">Thêm mới</span>
              </div>
            </Button>
          </Link>
        </div>
        <TableAdmin
          columns={columns}
          dataTable={dataTable}
          loading={loading}
          meta={meta}
          onChangePage={handleTableChange}
          expandable={{
            expandedRowRender: (record, index, indent, expandedRow) => {
              if (expandedRow === true) {
                setExpanded(expandedRow);
                setExpandedId(record.id);
                return <Table columns={tablePlan} dataSource={plans} />;
              }
            },
            onExpandedRowsChange: (expandedRows) => {
              if (expandedRows.length > 1) {
                expandedRows.shift();
              }
            },
          }}
        />
      </Card>
    </>
  );
};

export default Stages;
