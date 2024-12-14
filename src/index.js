import React from "react";
import ReactDOM from "react-dom/client"; // ReactDOM yerine ReactDOM.createRoot kullanılıyor
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); // Yeni API
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
