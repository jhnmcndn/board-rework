import { CustomerService } from '@/types/app';
import { createStore } from 'zustand';

export const csState = {
  createBy: undefined,
  createTime: undefined,
  details: undefined,
  icon: undefined,
  id: undefined,
  status: undefined,
  title: undefined,
  updateBy: undefined,
  updateTime: undefined,
  url: undefined,
} satisfies CustomerService;

export type CSState = {
  cs: CustomerService[];
  activeTab: number;
};

export type CSActions = {
  setCS: (cs: CustomerService[]) => void;
  setActiveTab: (index: number) => void;
};

export type CSStore = CSState & CSActions;

export const createCSStore = () =>
  createStore<CSStore>()((set) => ({
    cs: [csState],
    activeTab: 0,
    setCS: (cs) => set((state) => ({ cs: [...state.cs, ...cs] })),
    setActiveTab: (index) => set(() => ({ activeTab: index })),
  }));
