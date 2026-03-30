import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { initPostHog } from "@/lib/posthog";
import App from "./App";
import { ToastProvider } from "./ui/toast";
import "./ui/ui.css";

initPostHog();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToastProvider>
  </StrictMode>,
);
