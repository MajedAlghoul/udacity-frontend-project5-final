import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App.jsx";
import { TripsProvider } from "./hooks/useTrips.jsx";

createRoot(document.getElementById("root")).render(
  //<StrictMode>
  <TripsProvider>
    <App />
  </TripsProvider>
  //</StrictMode>
);

// register service worker
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then((registration) => {
      console.log("Service worker registered:", registration);
    })
    .catch((error) => {
      console.error("Service worker registration failed:", error);
    });
}
