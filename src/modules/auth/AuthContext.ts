import { createContext, useContext } from "react";
import type { ReactNode } from "react";

export interface User {
  id: string;
  phone: string;
  name?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (phone: string) => Promise<void>;
  verifyOTP: (phone: string, otp: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export interface AuthProviderProps {
  children: ReactNode;
}

export { AuthContext };
