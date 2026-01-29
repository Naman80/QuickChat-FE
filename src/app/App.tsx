import { AppRoutes } from "./AppRoutes";
import { AppShell } from "./AppShell";
import { Providers } from "./Providers";

export default function App() {
  return (
    <Providers>
      <AppShell>
        <AppRoutes />
      </AppShell>
    </Providers>
  );
}
