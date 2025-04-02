import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./css/app.css";
import "./css/bootstrap.css";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("❌ ERROR: #root element not found in index.html!");
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
