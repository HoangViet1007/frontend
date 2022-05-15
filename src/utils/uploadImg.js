import { notification } from "antd";
import { storage } from "./firebase";
export const uploadImg = (imageAsFile) => {
  return new Promise((resolve) => {
    const uploadTask = storage
      .ref(`/images/${imageAsFile.name}`)
      .put(imageAsFile);
    uploadTask.on(
      "state_changed",
      (snapShot) => {
      },
      (err) => {
        notification.error({
          message: "Lỗi upload ảnh ,hãy liên hệ tc",
        });
      },
      () => {
        storage
          .ref("images")
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((url) => {
            resolve(url);
          });
      }
    );
  });
};
