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
        setBettingFilter: (filter) => {
          const dateFilter = filter === '今天' ? 'today' : filter === '昨天' ? 'yesterday' : 'month';
          return set((state) => ({
            betting: {
              ...state.betting,
              filter: dateFilter,
            },
          }));
        },
      }),
      {
        name: 'personal-info-store',
      },
    ),
  );
