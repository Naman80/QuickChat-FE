import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { AppShell } from "./AppShell";
import { Providers } from "./Providers";

export default function App() {
  return (
    <Providers>
      <AppShell>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppShell>
    </Providers>
  );
}
