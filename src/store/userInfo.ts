import { UserInfo, UserInfoState } from '@/types/app';
import { create } from 'zustand';

const initialUserInfoState = {
  token: null,
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
  phone: null,
  newAccount: false,
} satisfies UserInfo;

export const useUserInfoStore = create<UserInfoState>()((set) => ({
  userInfo: initialUserInfoState,
  setUserInfo: (userInfo) => set((state) => ({ userInfo: { ...state.userInfo, ...userInfo } })),
}));
