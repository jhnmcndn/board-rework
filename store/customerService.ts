import { customerService, getMessageCommonProblems } from '@/api/platform';
import { CustomerService, MessageCommonProblems } from '@/types/app';
import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

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

export const msgCommonProblemsState = {
  content: undefined,
  id: undefined,
  title: undefined,
} satisfies MessageCommonProblems;

export type CSState = {
  csData: CustomerService[];
  activeTab: number;
  msgCommonProblems: MessageCommonProblems[];
};

export type CSActions = {
  setCSData: (csData: CustomerService[]) => void;
  setActiveTab: (index: number) => void;
};

export type CSApiCalls = {
  fetchCSData: () => void;
  fetchMsgCommonProblems: () => void;
};

export type CSStore = CSState & CSActions & CSApiCalls;

export const createCSStore = () =>
  createStore<CSStore>()(
    persist(
      (set) => ({
        csData: [csState],
        activeTab: 0,
        msgCommonProblems: [],
        setCSData: (csData) => set(() => ({ csData })),
        setActiveTab: (index) => set(() => ({ activeTab: index })),

        fetchCSData: async () => {
          const csData = await customerService();
          if (!csData || 'message' in csData) return set(() => ({ csData: [csState] }));
          return set(() => ({ csData }));
        },
        fetchMsgCommonProblems: async () => {
          const msgCommonProblems = await getMessageCommonProblems();
          if (!msgCommonProblems || 'message' in msgCommonProblems) return set(() => ({ msgCommonProblems: [] }));
          console.log(msgCommonProblems);

          return set(() => ({ msgCommonProblems }));
        },
      }),
      {
        name: 'customer-service-store',
      },
    ),
  );
