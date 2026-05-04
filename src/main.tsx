import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./provider/AuthProvider.tsx";
import FavoritesProvider from "./provider/FavoritesProvider.tsx";
import ThemeProvider from "./provider/ThemeProvider.tsx";
import ThemedToastContainer from "./components/ThemedToastContainer.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider>
        <AuthProvider>
          <FavoritesProvider>
            <App />
            <ThemedToastContainer />
          </FavoritesProvider>
        </AuthProvider>
      </ThemeProvider>
    </StrictMode>
  </BrowserRouter>,
);
