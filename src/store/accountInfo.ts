import type { AccountInfo, AccountInfoState } from '@/types/app';
import { create } from 'zustand';

export const initialAccountInfoState = {
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

export const useAccountInfoStore = create<AccountInfoState>()((set) => ({
  accountInfo: initialAccountInfoState,
  setAccountInfo: (accountInfo) => set(() => ({ accountInfo })),
}));
