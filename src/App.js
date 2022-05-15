import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import "../src/assets/scss/style.scss";
import TheLayoutAdmin from "./components/componentsAdmin/layouts/TheLayout";
import TheLayoutPT from "./components/componentsPT/layouts/TheLayout";
import MainLayoutWebsite from "./components/componentsWebsite/layout/MainLayoutWebsite";
import ProfilePage from "./components/componentsWebsite/ProfilePage/Layout";
import LoginAdmin from "./pages/Admin/Login/Login";
const App = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  return (
    <Switch>
      <Route exact path="/admin/login">
        <LoginAdmin />
      </Route>
      <Route path="/admin">
        <TheLayoutAdmin />
      </Route>
      <Route path="/pt">
        <TheLayoutPT />
      </Route>
      <Route path="/khach-hang">
        <ProfilePage />
      </Route>
      <Route path="/">
        <MainLayoutWebsite />
      </Route>
    </Switch>
  );
};

export default App;
