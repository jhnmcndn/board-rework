import type { AccountInfo, AccountNow } from '@/types/app';
import { create } from 'zustand';

export const initialAccountInfoState: AccountInfo = {
  token: '',
  id: '',
  nickName: '',
  vip: 0,
  headImg: '',
  accountNow: 0,
  accountCharge: 0,
  codeNow: 0,
  codeWill: 0,
  codeTotal: 0,
  nextLevelIntegral: 0,
  status: 0,
  inviterCode: '',
  registerType: 0,
  phone: '',
  newAccount: false,
} satisfies AccountInfo;

const initialAccountNowState = {
  userBalance: 0,
} satisfies AccountNow;

interface AccountStore {
  accountInfo: AccountInfo;
  accountNow: AccountNow;
  setAccountInfo: (accountInfo: AccountInfo) => void;
  setAccountNow: (accountNow: AccountNow) => void;
}

export const useAccountStore = create<AccountStore>()((set) => ({
  accountInfo: initialAccountInfoState,
  accountNow: initialAccountNowState,
  setAccountInfo: (accountInfo) => set(() => ({ accountInfo })),
  setAccountNow: (accountNow) => set(() => ({ accountNow })),
}));
