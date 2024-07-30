import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

export type PersonalInfoState = {
  activeTab: number;
};

export type PersonalInfoAction = {
  setActiveTab: (index: number) => void;
};

export type PersonalInfoStore = PersonalInfoState & PersonalInfoAction;

export const createPersonalInfoStore = () =>
  createStore<PersonalInfoStore>()(
    persist(
      (set) => ({
        activeTab: 0,
        setActiveTab: (index) => set(() => ({ activeTab: index })),
      }),
      {
        name: 'personal-info-store',
      },
    ),
  );
