import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import UsersContextProvider from "./context/UsersContext";


ReactDOM.render(
  <React.StrictMode>
    <UsersContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UsersContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);