import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

export type PersonalInfoState = {
  betting: {
    activeTab: number;
    filter: string;
  };
};

export type PersonalInfoAction = {
  setBettingActiveTab: (activeTab: number) => void;
  setBettingFilter: (filter: string) => void;
};

export type PersonalInfoStore = PersonalInfoState & PersonalInfoAction;

export const createPersonalInfoStore = () =>
  createStore<PersonalInfoStore>()(
    persist(
      (set) => ({
        betting: {
          activeTab: 0,
          filter: 'today',
        },
        setBettingActiveTab: (activeTab) =>
          set((state) => ({
            betting: {
              ...state.betting,
              activeTab,
            },
          })),
        setBettingFilter: (filter) =>
          set((state) => ({
            betting: {
              ...state.betting,
              filter,
            },
          })),
      }),
      {
        name: 'personal-info-store',
      },
    ),
  );
