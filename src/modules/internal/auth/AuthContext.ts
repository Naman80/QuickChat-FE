import { createContext, useContext } from "react";

export interface User {
  id: string;
  phone: string;
  name?: string;
}

export type AuthContextValue = {
  user: User | null;

  requestOtp: (phone: string) => Promise<void>;
  verifyOtp: (phone: string, otp: string) => Promise<void>;

  restoreUser: (user: User) => void;
  clearUser: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuthContextInternal = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
