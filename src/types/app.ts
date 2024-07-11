export interface Init {
  latestVersion: string | null;
  latestFore: string | null;
  downUrl: string | null;
  hasNew: boolean;
  updateText: string | null;
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

export interface ActiveSideBarItem {
  id: number;
  name: string;
  icon: string;
  type: number;
}

export interface Game {
  activeSideBarItem: ActiveSideBarItem;
}

export interface GameState {
  game: Game;
  setActiveSideBarItem: (activeSideBarItem: ActiveSideBarItem) => void;
}

export interface InitState {
  init: Init;
  setInit: (init: Init) => void;
}

export interface AccountInfoState {
  accountInfo: AccountInfo;
  setAccountInfo: (accountInfo: AccountInfo) => void;
}
export interface AccountNowState {
  accountNow: AccountNow;
  setAccountNow: (accountNow: AccountNow) => void;
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
