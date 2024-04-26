// location.js
import { Store } from "antd/es/form/interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLocationStore = create(
  persist(
    (set) => ({
      zipCodeObject: {},
      rooms: 100,
      totalSqFt: 0,
      perimeter: 0,
      floors: 0,
      changeRooms: (rooms: number) => set((state: Store) => ({ rooms })),
      changeZipCode: (zipCodeObject: object) =>
        set((state: Store) => ({ zipCodeObject })),
      changeFloors: (floors: number) => set((state: Store) => ({ floors })),
      changePerimeter: (perimeter: number) =>
        set((state: Store) => ({ perimeter })),
      changeTotalSqFt: (totalSqFt: number) =>
        set((state: Store) => ({ totalSqFt })),
    }),
    { name: "location_storage" }
  )
);

export const useUserStore = create(
  persist(
    (set) => ({
      isUserLoggedIn: false,
      changeIsUserLoggedIn: (isUserLoggedIn: boolean) =>
        set((state: Store) => ({ isUserLoggedIn })),
    }),
    { name: "user_storage" }
  )
);

export const useRoomStore = create(
  persist(
    (set) => ({
      kingOneQuantity: 0,
      kingStudioQuantity: 0,
      doubleQueenQuantity: 0,
      ADAQuantity: 0,
      changeKingOne: (kingOneQuantity: number) =>
        set((state: Store) => ({ kingOneQuantity })),
      changeKingStudio: (kingStudioQuantity: number) =>
        set((state: Store) => ({ kingStudioQuantity })),
      changeUserInputDoubleQueen: (userInputDoubleQueenQuantity: number) =>
        set((state: Store) => ({ userInputDoubleQueenQuantity })),
      changeDoubleQueen: (doubleQueenQuantity: number) =>
        set((state: Store) => ({ doubleQueenQuantity })),
      changeADA: (ADAQuantity: number) =>
        set((state: Store) => ({ ADAQuantity })),
    }),
    { name: "room_storage" }
  )
);
