import React, { useState } from "react";
const PasswordToggle = ({ children, onTogglePass }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
    onTogglePass(!passwordShown);
  };
  return (
    <div className="tw-relative">
      {children}
      {passwordShown ? (
        <i
          className="far fa-eye tw-absolute tw-top-1/2 tw-right-0 tw-pr-3 tw-transform tw--translate-y-1/2 tw-cursor-pointer tw-text-xs"
          onClick={togglePassword}
        ></i>
      ) : (
        <i
          className="far fa-eye-slash tw-absolute tw-top-1/2 tw-right-0 tw-pr-3 tw-transform tw--translate-y-1/2 tw-cursor-pointer tw-text-xs"
          onClick={togglePassword}
        ></i>
      )}
    </div>
  );
};

export default PasswordToggle;
