import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { FlyoutProvider } from "./flyout/FlyoutProvider";
import { ToastProvider } from "./components/Toast";
import "./styles/global.css";
import "./styles/dashboard.css";
import "./styles/carousel.css";
import "./styles/flyout.css";
import "./styles/agent.css";
import "./styles/auth.css";
import "./styles/toast.css";

// Apply persisted display prefs before first paint so the theme doesn't flash.
try {
  const theme = JSON.parse(localStorage.getItem("lexus.theme") ?? "\"dark\"");
  const textSize = JSON.parse(
    localStorage.getItem("lexus.textSize") ?? "\"default\""
  );
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.setAttribute("data-text-size", textSize);
} catch {
  document.documentElement.setAttribute("data-theme", "dark");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <FlyoutProvider>
        <App />
      </FlyoutProvider>
    </ToastProvider>
  </StrictMode>
);
