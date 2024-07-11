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

export interface HeCai6 {
  reds: string[];
  blue: string[];
  green: string[];
}

export interface Init {
  latestVersion: any;
  latestFore: any;
  downUrl: any;
  hasNew: boolean;
  updateText: any;
  customerUrl: string;
  customerUrl2: string;
  webUrl: string;
  starPic: string;
  heCai6: HeCai6;
  captchaId: string;
  actionSwitch: string;
  productId: string;
  firstRechargeUrl: string;
}

export interface InitState {
  init: Init;
  setInit: (init: Init) => void;
}

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
