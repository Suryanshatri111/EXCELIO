import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import store from "./redux/store.js";
import { Provider } from "react-redux";

//
import AppRouter from "./AppRoutes.jsx";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
