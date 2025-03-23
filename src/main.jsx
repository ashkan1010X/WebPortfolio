import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import MatrixRainEffect from "./components/MatrixRainEffect.jsx"; // Correct path for MatrixRainEffect
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MatrixRainEffect /> {/* Add the MatrixRainEffect component here */}
    <App />
  </BrowserRouter>
);
