import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, message } from "antd";
const UploadImgPreview = (props) => {
  const [urlUser, setUrlUser] = useState("");
  useEffect(() => {
    setUrlUser(props.src);
  }, [props.src]);
  const onfile = (e) => {
    if (e.target.files.length > 0) {
      if (e.target.files[0].type.split("/")[0] === "image") {
        const url = URL.createObjectURL(e.target.files[0]);
        setUrlUser(url);
        props.onSuccess(e.target.files[0]);
      } else {
        message.error("Hãy chọn file ảnh");
      }
    }
  };
  return (
    <div
      className="tw-w-32 tw-h-32 tw-border-2 tw-border-white tw-bg-[#fafafa] tw-rounded tw-relative 
      "
    >
      <label
        htmlFor="inputFile"
        className="text-center tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-cursor-pointer"
      >
        <div>
          <PlusOutlined />
          <div>Chọn ảnh</div>
        </div>
      </label>
      <input
        type="file"
        id="inputFile"
        className=" tw-w-0 tw-h-0 tw-invisible"
        onChange={onfile}
      />

      {urlUser && (
        <>
          <Image
            height="100%"
            width="100%"
            className="tw-h-full tw-w-full tw-object-cover tw-absolute"
            src={urlUser}
            alt="Hình ảnh không tồn tại"
          />
          <label
            htmlFor="inputFile"
            className="tw-absolute tw-top-0 tw-right-0 tw-z-[3] tw-bg-white tw-w-6 tw-h-6 tw-text-center tw-cursor-pointer tw-rounded-full tw-transform tw-translate-x-1/2 tw--translate-y-1/2"
          >
            <i className="fas fa-pen tw-text-[10px]"></i>
          </label>
          {urlUser !== props.src && (
            <div
              className="tw-absolute tw-bottom-0 tw-right-0 tw-z-[3] tw-bg-white tw-w-6 tw-h-6 tw-text-center tw-cursor-pointer tw-rounded-full tw-transform tw-translate-x-1/2 tw-translate-y-1/2 mb-0"
              onClick={() => {
                setUrlUser(props.src);
                props.onSuccess("");
              }}
            >
              <span className="tw-text-[10px]">x</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UploadImgPreview;
