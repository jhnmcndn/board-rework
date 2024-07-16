export type ServerConfig = {
  agent: string;
  domain: string;
  server: '8801' | '8802' | '8803';
  title: string;
};

export type ErrorData = {
  message: string;
};

export type RootResponse<T = {}> = {
  code?: number;
  msg?: string;
  data?: T;
  total?: number;
  hasNext?: boolean;
  otherData?: string;
};

export type Init = {
  latestVersion?: string;
  latestFore?: string;
  downUrl?: string;
  hasNew?: boolean;
  updateText?: string;
  customerUrl?: string;
  customerUrl2?: string;
  webUrl?: string;
  starPic?: string;
  heCai6?: HeCai6;
  captchaId?: string;
  actionSwitch?: string;
  productId?: string;
  firstRechargeUrl?: string;
};

export type HeCai6 = {
  reds?: string[];
  blue?: string[];
  green?: string[];
};

export type AccountInfo = {
  token?: string;
  id?: string;
  nickName?: string;
  vip?: number;
  headImg?: string;
  accountNow?: number;
  accountCharge?: number;
  codeNow?: number;
  codeWill?: number;
  codeTotal?: number;
  nextLevelIntegral?: number;
  status?: number;
  inviterCode?: string;
  registerType?: number;
  phone?: string;
  newAccount?: boolean;
};

export type AccountNow = {
  balance?: number;
};
