import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; //no needed with the new method
import App from "./App";
import Auth from "./components/Auth/Auth";
import "./index.css";

// Auth wraps the children ( App.jsx ) to check if the token is healthy or not.
ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth>
    <App />
  </Auth>
);
