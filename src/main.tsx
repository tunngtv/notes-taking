import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";
import AsyncReduxProvider from "./providers/AsyncReduxProvider.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import "./index.css";
import "./styles/index.scss";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <AsyncReduxProvider>
          <App />
        </AsyncReduxProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
