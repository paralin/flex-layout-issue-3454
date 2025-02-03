import { scan } from "react-scan";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

if (typeof window !== "undefined") {
  scan({
    enabled: true,
    log: true, // logs render info to console (default: false)
  });
}

createRoot(document.getElementById("root")!).render(
  (<App />) as React.ReactNode,
);
