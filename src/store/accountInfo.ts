import type { AccountInfo, AccountInfoState } from '@/types/app';
import { create } from 'zustand';

const initialAccountInfoState = {
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

export const useUserInfoStore = create<AccountInfoState>()((set) => ({
  userInfo: initialAccountInfoState,
  setUserInfo: (userInfo) => set((state) => ({ userInfo: { ...state.userInfo, ...userInfo } })),
}));
