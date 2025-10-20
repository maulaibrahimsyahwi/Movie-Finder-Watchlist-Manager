// src/main.jsx - DIPERBARUI
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { MovieProvider } from "./contexts/MovieContext.jsx";
import { WatchlistProvider } from "./contexts/WatchlistContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MovieProvider>
        <WatchlistProvider>
          <App />
        </WatchlistProvider>
      </MovieProvider>
    </BrowserRouter>
  </React.StrictMode>
);
