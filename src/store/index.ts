import { Store } from "antd/es/form/interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      zipCode: 0,
      rooms: 100,
      totalSqFt: 58334,
      perimeter: 598,
      floors: 4,
      isUserLoggedIn: false,
      changeRooms: (rooms: number) =>
        set((state: Store) => ({
          rooms,
        })),
      changeZipCode: (zipCode: number) =>
        set((state: Store) => ({
          zipCode,
        })),
      changeFloors: (floors: number) =>
        set((state: Store) => ({
          floors,
        })),
      changePerimeter: (perimeter: number) =>
        set((state: Store) => ({
          perimeter,
        })),
      changeTotalSqFt: (totalSqFt: number) =>
        set((state: Store) => ({
          totalSqFt,
        })),
      changeKingOne: (kingOneQuantity: number) =>
        set((state: Store) => ({
          kingOneQuantity,
        })),
      changeKingStudio: (kingStudioQuantity: number) =>
        set((state: Store) => ({
          kingStudioQuantity,
        })),
      changeDoubleQueen: (doubleQueenQuantity: number) =>
        set((state: Store) => ({
          doubleQueenQuantity,
        })),
      changeADA: (ADAQuantity: number) =>
        set((state: Store) => ({
          ADAQuantity,
        })),
      changeIsUserLoggedIn: (isUserLoggedIn: boolean) =>
        set((state: Store) => ({
          isUserLoggedIn,
        })),
    }),
    { name: "raap_storage" }
  )
);

export const useLocationStore = useStore;
