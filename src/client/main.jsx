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
