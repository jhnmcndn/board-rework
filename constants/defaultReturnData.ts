import { Init, RootResponse } from '@/types/app';

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
