export type ServerConfig = {
  agent: string;
  domain: string;
  server: '8801' | '8802' | '8803';
  title: string;
};

export type ErrorData = {
  message: string;
};

export type RootResponse<T = unknown> = {
  code: number;
  msg: string;
  data: T;
  total: number;
  hasNext: boolean;
  otherData: string;
};

export type Init = {
  latestVersion: string;
  latestFore: string;
  downUrl: string;
  hasNew: boolean;
  updateText: string;
  customerUrl: string;
  customerUrl2: string;
  webUrl: string;
  starPic: string;
  heCai6: HeCai6;
  captchaId: string;
  actionSwitch: string;
  productId: string;
  firstRechargeUrl: string;
};

export type HeCai6 = {
  reds: string[];
  blue: string[];
  green: string[];
};

export type LoginDevicePayload = {
  inviterCode: string | null;
  deviceId: string;
  ip: string;
  phoneModel: string | null;
  validate: string | null;
};

export type AccountInfo = {
  token?: string;
  id?: string;
  nickName?: string;
  vip: number;
  headImg?: string;
  accountNow?: number;
  accountCharge?: number;
  codeNow?: number;
  codeWill?: number;
  codeTotal: number;
  nextLevelIntegral: number;
  status?: number;
  inviterCode?: string;
  registerType?: number;
  phone?: string;
  newAccount?: boolean;
};

export type AccountNow = {
  balance?: number;
};

export interface MessageHomeNotice {
  id?: number;
  title?: string;
  content?: string;
}

export type RspGameType = {
  id?: number;
  name?: string;
  icon?: string;
  type?: number;
};

export type RspGameInfo = {
  id?: number;
  name?: string;
  icon?: string;
  maintain?: boolean;
  recommend?: boolean;
  largeIcon?: boolean;
  gameCategory?: string;
  lotteryId?: any;
  kindId?: string;
  platformId?: number;
};

export type GetGameTypes = {
  rspGameTypes?: RspGameType[];
  rspGameInfos?: RspGameInfo[];
};

export type GameInfoGroup = {
  id?: number;
  name?: string;
  icon?: string;
  cardIcon?: string;
  rspGameInfos?: RspGameInfo[];
};

export interface ActiveSideBarItem {
  id?: number;
  name?: string;
  icon?: string;
  type?: number;
}

export interface MessageOnSites {
  id?: number;
  title?: string;
  content?: string;
  createTime?: string;
  isRead?: boolean;
}

export type CustomerService = {
  id: number;
  title: string;
  icon: string;
  details: string;
  url: string;
  status: boolean;
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime: string;
};

export type BindCardList = {
  memberCardList?: MemberCardList[];
  rspWithdrawInfo?: RspWithdrawInfo;
  specialBankInfoMap?: SpecialBankInfoMap;
};

export type MemberCardList = {
  id?: number;
  bankAccount?: string;
  realName?: string;
  bankAddress?: string;
  dv?: boolean;
  bankIcon?: string;
  bankName?: string;
  bankCode?: string;
};

export type RspWithdrawInfo = {
  canWithdrawMoney?: number;
  accountNow?: number;
  needBeat?: number;
  usdtWithdrawExchangeRate?: number;
};

export type SpecialBankInfoMap = {
  USDT?: number;
};

export type MessageCommonProblems = {
  id: number;
  title: string;
  content: string;
};

export type VIPGiftInfo = {
  vipSetList: VIPSetList[];
  levelBonusStatus: number;
  weekBonusStatus: number;
};

export type VIPSetList = {
  level: number;
  levelBonus: number;
  weekBonus: number;
  bcode: number;
};

export type BankList = {
  id?: number;
  bankName?: string;
  bankIcon?: string;
  sort?: number;
};

export type WithdrawRechargeDetail = {
  money?: number;
  orderNo?: string;
  requestTime?: string;
  bankName?: string;
  status?: number;
  remark?: string;
  color?: string;
  bankAccount?: string;
  bankAddress?: string;
};

export type WithdrawRechargeBody = {
  type?: string;
  pageNum?: number;
  pageSize?: number;
};

export type ResetPassword = {
  oldPasswd?: string;
  newPasswd?: string;
};

export type WithToken = {
  token?: string;
};

export type ReceiveVipGiftParams = {
  type: number;
};

export type ReceiveVipGift = {
  message?: string;
};

export type CodeFlowList = {
  createTime?: string;
  income?: number;
  des?: string;
  cur?: number;
  status?: number;
  charge?: number;
};

export type WithdrawBankBody = {
  memberCardId?: number;
  withdrawMoney?: number;
  withdrawalPass?: string;
};

export type GameCategoryList = {
  des: string;
  name: string;
  platforms: any[];
};

export type PasswordsState = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  showOldPassword: boolean;
  showNewPassword: boolean;
  showConfirmPassword: boolean;
};

export type PasswordProps = {
  label: string;
  value: string;
  type: string;
  name: keyof PasswordsState;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleVisibility: () => void;
  icon: string;
};

export type listContainerProps = {
  onClick?: () => void;
  icon: string;
  text: string;
};

export type ListContainerProps = {
  dataClick?: boolean;
  onClick?: () => void;
  icon: string;
  text: string;
};

export interface WashCodeDetail {
  washCodeAmount: number;
  washCodeTime: string;
  money: any;
  rspGameTypeWashCodes: RspGameTypeWashCode[];
}

export interface RspGameTypeWashCode {
  codeAmountTotal: number;
  washCodeRate: string;
  gameTypeName: string;
  gameTypeId: number;
  washCodeAmount: number;
}

export type ActivityInfos = {
  id: number;
  icon: string;
  title: string;
  createTime: string;
  content: string;
  effect: boolean;
  type: number;
  url: any;
  typeId: number;
};

export type ActivityList = {
  id: number;
  icon: string;
  title: string;
  createTime: string;
  content: string;
  effect: boolean;
  type: number;
  url: any;
  typeId: number;
};

export type ActivityTypes = {
  activityList: ActivityList[];
  id: number;
  name: string;
};
