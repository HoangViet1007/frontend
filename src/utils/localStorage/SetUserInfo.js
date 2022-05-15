export const setUserInfo = (keyName, keyValue) => {
  localStorage.setItem(keyName, JSON.stringify(keyValue));
};
