import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { validateEnv } from "@/shared/config";

import { AppRouter, QueryProvider, ThemeProvider } from "./providers";

import "@/shared/assets/styles/index.scss";

validateEnv();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryProvider>
        <AppRouter />
      </QueryProvider>
    </ThemeProvider>
  </StrictMode>
);
