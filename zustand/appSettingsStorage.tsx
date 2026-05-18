// filepath: /app/stores/useAppSettingsStore.ts
import { create } from "zustand";

type AppSettingsStore = {
  openedCollapsibles: boolean[];
  setOpenedCollapsibles: (opened: boolean[]) => void;
  toggleOpenCollapsible: (open: boolean, index: number) => void;
};

export const useAppSettingsStore = create<AppSettingsStore>((set, get) => ({
  openedCollapsibles: [true, true, true, true],
  setOpenedCollapsibles: (opened) => set({ openedCollapsibles: opened }),
  toggleOpenCollapsible: (open: boolean, index: number) => {
    set((state) => {
      const updated = [...state.openedCollapsibles];

      updated[index] = open;

      return { openedCollapsibles: updated };
    });
  },
}));
