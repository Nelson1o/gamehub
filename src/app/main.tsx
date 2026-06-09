import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { validateEnv } from "@/shared/config";
import "@/shared/assets/styles/index.scss";

import { AppRouter, QueryProvider } from "./providers";

validateEnv();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  </StrictMode>
);
