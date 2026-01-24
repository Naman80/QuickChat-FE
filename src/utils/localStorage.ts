export const LOCALSTORAGE = {
  USER: "userDetails",
  USER_PHONE: "userPhoneNumber",
  TOKEN: "userAccessToken",
} as const;

type LocalStorageKey = (typeof LOCALSTORAGE)[keyof typeof LOCALSTORAGE];

export function getLocalStorageItem(key: LocalStorageKey) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

export function setLocalStorageItem(key: LocalStorageKey, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeLocalStorageItem(key: LocalStorageKey) {
  localStorage.removeItem(key);
}

export function clearLocalStorage() {
  localStorage.clear();
}
