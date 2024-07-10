import { AccountNow, AccountNowState } from '@/types/app';
import { create } from 'zustand';

const initialAccountNowState = {
  userBalance: 0,
} satisfies AccountNow;

export const useAccountNowStore = create<AccountNowState>()((set) => ({
  accountNow: initialAccountNowState,
  setAccountNow: (accountNow) => set(() => ({ accountNow })),
}));
