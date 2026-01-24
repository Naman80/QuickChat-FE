import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthProviderProps, AuthContextType, User } from "./AuthContext";
import {
  clearLocalStorage,
  getLocalStorageItem,
  LOCALSTORAGE,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "../../utils/localStorage";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = getLocalStorageItem(LOCALSTORAGE.USER);
    const storedToken = getLocalStorageItem(LOCALSTORAGE.TOKEN);

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, []);

  const login = useCallback(async (phone: string) => {
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

  const verifyOTP = useCallback(async (phone: string, otp: string) => {
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
      setLocalStorageItem(LOCALSTORAGE.USER, JSON.stringify(data.userDetails));
      setLocalStorageItem(LOCALSTORAGE.TOKEN, data.accessToken);
      removeLocalStorageItem(LOCALSTORAGE.USER_PHONE);
    } catch (error) {
      console.error("OTP verification error:", error);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    // removeLocalStorageItem(LOCALSTORAGE.USER);
    // removeLocalStorageItem(LOCALSTORAGE.TOKEN);
    // removeLocalStorageItem(LOCALSTORAGE.USER_PHONE);
    clearLocalStorage();
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    verifyOTP,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
