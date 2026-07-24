import { StateStorage } from "zustand/middleware";

export const customSessionStorageAPI: StateStorage = {
  getItem: function (name: string): string | Promise<string | null> | null {
    if (!name) return null;
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem(name);
  },

  setItem: function (name: string, value: string): void {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(name, value);
  },

  removeItem: function (name: string): void {
    if (typeof window === "undefined") return;
    // sessionStorage.removeItem(name);
  },
};
