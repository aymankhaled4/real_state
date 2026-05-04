import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./provider/AuthProvider.tsx";
import { ToastContainer } from "react-toastify";
import FavoritesProvider from "./provider/FavoritesProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <FavoritesProvider>
          <App />
          <ToastContainer position="bottom-right" autoClose={3000} />
        </FavoritesProvider>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
);
