import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getInfoUser } from "../../../pages/UserSlice";
import { Content, Sidebar, Footer, Header } from "./index";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);
const Layout = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInfoUser());
  }, []);
  return (
    <>
      <Suspense fallback={loading}>
        <div className="c-app c-default-layout">
          <Sidebar />
          <div className="c-wrapper">
            <Header />
            <div className="c-body">
              <Content />
            </div>
            <Footer />
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default Layout;
