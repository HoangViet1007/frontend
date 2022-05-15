import React from "react";
import { Image } from "antd";
export const showPhoto = (value) => {
  return (
    <Image
      width={40}
      height={40}
      style={{
        borderRadius: "50%",
        objectFit: "cover",
      }}
      src={value}
      alt="Hình ảnh không tồn tại"
    />
  );
};
