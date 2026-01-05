import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./components/ThemeProvider";
import AsyncReduxProvider from "./components/AsyncReduxProvider";
import "./index.css";
import "./styles/index.scss";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AsyncReduxProvider>
        <App />
      </AsyncReduxProvider>
    </ThemeProvider>
  </StrictMode>
);
