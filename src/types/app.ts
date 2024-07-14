import type { RspGameInfo } from './response';

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

export type GameInfoGroup = {
  id: number;
  name: string;
  icon: string;
  cardIcon: string;
  rspGameInfos: RspGameInfo[];
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

export interface GameState {
  activeSideBarItem: ActiveSideBarItem;
  gameInfoGroup: GameInfoGroup[];
  setActiveSideBarItem: (activeSideBarItem: ActiveSideBarItem) => void;
  setGameInfoGroup: (gameInfoGroup: GameInfoGroup[]) => void;
}

export interface Mail {
  id: number;
  title: string;
  content: string;
  createTime: string;
}

export interface MailState {
  mails: Mail[];
}
