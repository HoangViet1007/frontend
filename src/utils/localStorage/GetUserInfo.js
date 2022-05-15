export const getUserInfo = (keyName) => {
  const currentImage = JSON.parse(localStorage.getItem(keyName)) || "";
  return currentImage;
};
