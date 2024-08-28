import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { Dispatch, JSXElementConstructor, ReactElement, ReactNode, SetStateAction } from 'react';

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

export type LoginPhonePayload = {
  mobile: string;
  passwd: string;
  deviceId: string;
  ip: string;
  validate: string | null;
};

export type RegisterPhonePayload = {
  mobile: string;
  passwd: string;
  code: string;
  inviterCode: string;
  deviceId: string;
  ip: string;
  phoneModel: string | null;
};

export type ThirdPartyRechargePayload = {
  channelId: number;
  amount: string;
  ip: string;
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

export type MessageHomeNotice = {
  id?: number;
  title?: string;
  content?: string;
};

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

export type ActiveSideBarItem = {
  id?: number;
  name?: string;
  icon?: string;
  type?: number;
};

export type MessageOnSites = {
  id?: number;
  title?: string;
  content?: string | ReactElement<any, string | JSXElementConstructor<any>>[];
  createTime?: string;
  isRead?: boolean;
};

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
  notif?: string | number;
};

export type WashCodeDetail = {
  washCodeAmount: number;
  washCodeTime: string;
  money: any;
  rspGameTypeWashCodes: RspGameTypeWashCode[];
};

export type TWashCodeLogs = {
  memberId: string;
  codeAmount: number;
  washCodeTime: string;
  washCodeAmount: number;
  washCodeRate: string;
  gameTypeName: string;
  gameTypeId: number;
};

export type RspGameTypeWashCode = {
  codeAmountTotal: number;
  washCodeRate: string;
  gameTypeName: string;
  gameTypeId: number;
  washCodeAmount: number;
};

export type ActivityInfos = {
  id?: number;
  icon?: string;
  title?: string;
  createTime?: string;
  content?: string;
  effect?: boolean;
  type?: number;
  url?: any;
  typeId?: number;
};

export type ActivityListState = {
  id: number;
  list: ActivityInfos[];
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
  activityList?: ActivityList[];
  id?: number;
  name?: string;
};

export interface ActivityQuestSectionTypes {
  activityList?: ActivityQuestList[];
  id?: number;
  name?: string;
}

export interface ActivityQuestList {
  id: number;
  icon: string;
  title: string;
  content: string;
  target: number;
  reward: number;
  curNum: number;
  status: number;
  gameTypeId: number;
  typeId: any;
}

export type ListItemProps = {
  id: number;
  title: string;
};

export type ModalLayoutProps = {
  onClose?: () => void;
  children: ReactNode;
  isAlert?: boolean;
  closeOnOutsideClick?: boolean;
  backdrop?: number;
};

export type VersionRowProps = {
  label: string;
  value: string | React.ReactNode;
  buttonLabel: string;
  onButtonClick?: () => void;
};

export type SearchFieldProps = {
  setSearchFieldData: Dispatch<SetStateAction<string>>;
  searchFieldData: string;
  placeholder?: string;
};

export type ListIconProps = {
  searchFieldData: string;
  setSearchFieldData: Dispatch<SetStateAction<string>>;
};

export type CategoryListBarProps = {
  setActivePlatformId: Dispatch<SetStateAction<number>>;
};

export type HeaderProps = {
  title?: string;
  logoSrc?: string | StaticImport;
  onClick?: () => void;
};

export type PayTypeList = {
  id: number;
  name: string;
  iconUrl: string;
  sort: number;
  recommend: boolean;
  effect: boolean;
  type: number;
  deviceType: string;
  openLevelMin: number;
  openLevelMax: number;
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime: string;
  tex1: string;
  tex2: string;
  tex3: string;
  tex4: string;
  tex5: string;
};

export type PayChannelList = {
  id: number;
  name: string;
  rechargeMin: number | null;
  rechargeMax: number | null;
  quickAmount: string;
  openLevelMin: number | null;
  openLevelMax: number | null;
  string: string | null;
};

export type WashCodeDesc = {
  beat: string;
  codeInterval: string;
  washRate: string;
};

export type WashCodeRate = {
  id: number;
  name: string;
  washCodeDescList: WashCodeDesc[];
};

export type BoxAccount = {
  accountNow: number;
  boxAccount: number;
};

export type TradeTypes = {
  type: number;
  des: string;
  name: string;
};

export type TFundDetails = {
  createTime: string;
  des: string;
  pay: number;
  income: number;
  total: number;
  totalBefore: number;
  type: number;
};

export type FundDetailsPayload = {
  enumMoney: string;
  enumReqTime: string;
  pageSize?: number;
};

export type TGameBalance = {
  money: number;
  platformId: number;
  platformName: string;
};

export type BoxAccountResponse = {
  accountNow?: number;
  boxAccount?: number;
};

export type BindPhonePayload = {
  mobile: string;
  passwd: string;
  code: string;
};
