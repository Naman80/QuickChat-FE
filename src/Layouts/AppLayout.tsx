import type { ReactNode } from "react";

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen w-screen bg-neutral-900 text-white flex">
      {children}
    </div>
  );
};
