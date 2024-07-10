import type { THEME } from './enums';

export type AccountInfo = {
  token: string;
  id: string;
  nickName: string;
  vip: number;
  headImg: string;
  accountNow: number;
  accountCharge: number;
  codeNow: number;
  codeWill: number;
  codeTotal: number;
  nextLevelIntegral: number;
  status: number;
  inviterCode: string;
  registerType: number;
  phone: string;
  newAccount: boolean;
};

export type AccountNow = {
  userBalance: number;
};

export interface AccountInfoState {
  userInfo: AccountInfo;
  setUserInfo: (userInfo: AccountInfo) => void;
}
export interface AccountNowState {
  accountNow: AccountNow;
  setAccountNow: (accountNow: AccountNow) => void;
}

export interface ThemeState {
  theme: THEME;
  setTheme: (theme: THEME) => void;
}

export type Music = {
  music: boolean;
  pop: boolean;
};

export interface MusicState {
  playState: Music;
  setMusic: (play: boolean) => void;
  setPop: (play: boolean) => void;
}
