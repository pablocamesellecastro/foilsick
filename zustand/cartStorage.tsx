// filepath: /app/stores/useAppSettingsStore.ts
import { create, StateCreator } from "zustand";
import {
  StateStorage,
  createJSONStorage,
  devtools,
  persist,
} from "zustand/middleware";
import { customSessionStorageAPI } from "./utils/customSessionStorageApi";
import { Product } from "@/typings/product";

type CartStore = {
  items: Product[];
  active: boolean;
  addItem: (item: Product) => void;
  deleteCart: () => void;
  removeItem: (item: Product) => void;
  getCount: () => number;
  getTotal: () => number;
  updateQuantity: (id: string, quantity: number) => void;
};

const CartStoreAPI: StateCreator<CartStore, [["zustand/devtools", unknown]]> = (
  set,
  get,
) => ({
  //export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  active: true,

  //_________________________________________________________________

  addItem: (item: Product) => {
    set((state) => ({
      items: [...state.items, item],
    }));
  },

  //_________________________________________________________________

  deleteCart: () => {
    set((state) => {
      return { items: [] };
    });
  },

  //_________________________________________________________________

  removeItem: (item: Product) => {
    set((state) => {
      const itemsSinItem = state.items.filter(
        (elemento) => elemento.id !== item.id,
      );
      return { items: itemsSinItem };
    });
  },

  //_________________________________________________________________

  getCount: () => {
    return get().items.length;
  },

  //_________________________________________________________________

  getTotal: () => {
    let total = 0;

    for (let i = 0; i < get().items.length; i++) {
      total = total + get().items[i].price;
    }

    return total;
  },

  //_________________________________________________________________

  updateQuantity: (id: string, quantity: number) => {
    set((state) => {
      let newItems = state.items.filter((item) => item.id !== id);

      for (let i = 0; i < quantity; i++) {
        const item = state.items.find((item) => item.id === id);
        if (item) newItems.push(item);
      }

      return { items: newItems };
    });
  },
});

//+++++++++++++++++++++++++++++++
const customSessionStorage = createJSONStorage(() => customSessionStorageAPI);

export const useCartStore = create<CartStore>()(
  //@ts-ignore
  persist(CartStoreAPI, {
    name: "cart-storage",
    storage: customSessionStorage,
    merge: (persistedState: any, currentState) => {
      if (!persistedState) return currentState;

      return {
        ...currentState,
        ...persistedState,
      };
    },
  }),
);
