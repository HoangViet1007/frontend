import React from "react";
import { CFooter } from "@coreui/react";

const Footer = () => {
  return (
    <CFooter fixed={false}>
      <div className="mfs-auto">
        <span className="mr-1">Website thuê PT ©2021</span>
      </div>
    </CFooter>
  );
};

export default React.memo(Footer);
