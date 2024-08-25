import { AccountInfo, Init, RootResponse } from '@/types/app';

export const defaultRootResponse = {
  code: 500,
  data: null,
  hasNext: false,
  msg: '',
  otherData: '',
  total: 0,
} satisfies RootResponse;

export const defaultInitData = {
  actionSwitch: '',
  captchaId: '',
  customerUrl: '',
  customerUrl2: '',
  downUrl: '',
  firstRechargeUrl: '',
  hasNew: false,
  heCai6: {
    blue: [],
    green: [],
    reds: [],
  },
  latestFore: '',
  latestVersion: '',
  productId: '',
  starPic: '',
  updateText: '',
  webUrl: '',
} satisfies Init;

export const defaultAccountInfo = {
  token: undefined,
  id: undefined,
  nickName: undefined,
  vip: 1,
  headImg: undefined,
  accountNow: undefined,
  accountCharge: undefined,
  codeNow: undefined,
  codeWill: undefined,
  codeTotal: 0,
  nextLevelIntegral: 0,
  status: undefined,
  inviterCode: undefined,
  registerType: undefined,
  phone: undefined,
  newAccount: undefined,
} satisfies AccountInfo;
