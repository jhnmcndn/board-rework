import { MessageOnSites } from '@/types/app';
import { createStore as createZustandStore } from 'zustand';

export const initialMessageOnSites = {
  id: 0,
  title: '',
  content: '',
  createTime: '',
} satisfies MessageOnSites;

type State = {
  messageOnSites: MessageOnSites;
};

type Actions = {
  setMessageOnSites: (messageOnSites: MessageOnSites) => void;
};

export type Store = State & Actions;

export const createStore = () =>
  createZustandStore<Store>()((set) => ({
    messageOnSites: initialMessageOnSites,
    setMessageOnSites: (messageOnSites) => set(() => ({ messageOnSites })),
  }));
