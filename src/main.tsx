import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./index.css";
import { Providers } from "./providers/Providers.tsx";
// import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Providers>
    <App />
  </Providers>
  // </StrictMode>
);
