import type { User } from "../modules/internal/auth/AuthContext";

export const LOCALSTORAGE = {
  USER: "userDetails",
  USER_PHONE: "userPhoneNumber",
  TOKEN: "userAccessToken",
} as const;

type LocalStorageKey = (typeof LOCALSTORAGE)[keyof typeof LOCALSTORAGE];

interface LocalStorageShape {
  [LOCALSTORAGE.USER]: User | null;
  [LOCALSTORAGE.USER_PHONE]: string | null;
  [LOCALSTORAGE.TOKEN]: string | null;
}

export function getLocalStorageItem<K extends LocalStorageKey>(
  key: K,
): LocalStorageShape[K] {
  const item = localStorage.getItem(key);
  if (item === null) return null;

  try {
    return JSON.parse(item);
  } catch {
    console.warn(`Failed to parse localStorage key "${key}"`);
    return null;
  }
}

export function setLocalStorageItem<K extends LocalStorageKey>(
  key: K,
  value: LocalStorageShape[K],
): void {
  if (value === undefined) {
    console.warn(`Not saving undefined for key "${key}"`);
    return;
  }

  if (value === null) {
    localStorage.removeItem(key);
    return;
  }

  localStorage.setItem(key, JSON.stringify(value));
}

export function removeLocalStorageItem(key: LocalStorageKey) {
  localStorage.removeItem(key);
}

export function clearLocalStorage() {
  localStorage.clear();
}
