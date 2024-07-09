import { THEME } from './enums';

export type UserInfo = {
  token: any;
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
  phone: any;
  newAccount: boolean;
};

export interface UserInfoState {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
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
