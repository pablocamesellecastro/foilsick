import { StateStorage } from "zustand/middleware";

export const customSessionStorageAPI: StateStorage = {
  getItem: function (name: string): string | Promise<string | null> | null {
    if(!name) return null;
      const data = sessionStorage.getItem(name)
      return data

  },
  setItem: function (name: string, value: string | any): void | Promise<void> {


        sessionStorage.setItem(name,value)
  },
  removeItem: function (name: string): void | Promise<void> {
      //console.log('removeItem',name);
  }
}
