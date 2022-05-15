import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getInfoUser } from "../../../pages/UserSlice";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);
const TheLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInfoUser());
  }, []);
  return (
    <>
      <Suspense fallback={loading}>
        <div className="c-app c-default-layout">
          <TheSidebar />
          <div className="c-wrapper">
            <TheHeader />
            <div className="c-body">
              <TheContent />
            </div>
            <TheFooter />
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default TheLayout;
