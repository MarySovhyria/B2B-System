import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { initPostHog } from "./lib/posthog";
import App from "./App";
import { ToastProvider } from "./ui/toast";
import "./ui/ui.css";

initPostHog();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </ToastProvider>
  </StrictMode>,
);
