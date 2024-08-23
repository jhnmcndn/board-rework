import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

export type PersonalInfoState = {
  betting: {
    activeTab: number;
    filter: string;
    enumMoney: string | null;
  };
};

export type PersonalInfoAction = {
  setBettingActiveTab: (activeTab: number) => void;
  setBettingFilter: (filter: string) => void;
  setTradeTypes: (enumMoney: string) => void;
};

export type PersonalInfoStore = PersonalInfoState & PersonalInfoAction;

export const createPersonalInfoStore = () =>
  createStore<PersonalInfoStore>()(
    persist(
      (set) => ({
        betting: {
          activeTab: 0,
          filter: 'today',
          enumMoney: null,
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
        setTradeTypes: (enumMoney) => {
          return set((state) => ({
            betting: {
              ...state.betting,
              enumMoney,
            },
          }));
        },
      }),
      {
        name: 'personal-info-store',
      },
    ),
  );
