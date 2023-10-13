import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import Login from "./Components/Login";
import Layout from "./Layout";

// import Home from "./Layout";
// import Login from "./Components/Login";
const token = localStorage?.getItem("token");
import { store } from "./app/store.js";
import { Provider } from "react-redux";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>{token ? <Layout /> : <Login />}</Provider>
  </React.StrictMode>
);
