// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { GuitarProvider } from "./GuitarContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GuitarProvider>
        <App />
      </GuitarProvider>
    </BrowserRouter>
  </React.StrictMode>
);
