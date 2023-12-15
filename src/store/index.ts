import { Store } from "antd/es/form/interface";
import { create } from "zustand";

const useStore = create((set) => ({
  zipCode: 0,
  rooms: 100,
  changeRooms: (rooms: number) =>
    set((state: Store) => ({
      rooms,
    })),
  changeZipCode: (zipCode: number) =>
    set((state: Store) => ({
      zipCode,
    })),
}));

export const useLocationStore = useStore;
