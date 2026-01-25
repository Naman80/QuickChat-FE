import { useState, useCallback, type ReactNode } from "react";
import {
  LOCALSTORAGE,
  setLocalStorageItem,
  removeLocalStorageItem,
  getLocalStorageItem,
} from "../../../utils/localStorage";
import { AuthContext } from "./AuthContext";
import type { AuthContextValue, User } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const user = getLocalStorageItem(LOCALSTORAGE.USER);
    const token = getLocalStorageItem(LOCALSTORAGE.TOKEN);

    if (user && token) {
      return user;
    }
    return null;
  });

  const requestOtp = useCallback(async (phone: string) => {
    try {
      const response = await fetch("/auth/request-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      if (!response.ok) {
        throw new Error("Failed to send OTP");
      }

      // Store phone number temporarily for verification
      setLocalStorageItem(LOCALSTORAGE.USER_PHONE, phone);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }, []);

  const verifyOtp = useCallback(async (phone: string, otp: string) => {
    // Call backend API to verify OTP
    try {
      const response = await fetch("/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, otp }),
      });

      if (!response.ok) {
        throw new Error("Invalid OTP");
      }

      const data = await response.json();

      // Store user data and token
      setUser(data.userDetails);
      setLocalStorageItem(LOCALSTORAGE.USER, data.userDetails);
      setLocalStorageItem(LOCALSTORAGE.TOKEN, data.accessToken);
      removeLocalStorageItem(LOCALSTORAGE.USER_PHONE);
    } catch (error) {
      console.error("OTP verification error:", error);
      throw error;
    }
  }, []);

  const restoreUser = useCallback((user: User) => {
    setUser(user);
  }, []);

  const clearUser = useCallback(() => {
    setUser(null);
  }, []);

  console.log("Auth Provider rendered");

  const value: AuthContextValue = {
    user,
    requestOtp,
    verifyOtp,
    restoreUser,
    clearUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
