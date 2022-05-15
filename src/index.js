import "@vime/core/themes/default.css";
import "@vime/core/themes/light.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { icons } from "./assets/icons/index";
import store from "./store";
import "antd/dist/antd.css";
import "./assets/css/tailwind.css";
import "./assets/css/custom-antd.css";

React.icons = icons;
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
