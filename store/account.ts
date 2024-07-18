import { AccountInfo, AccountNow, Init } from '@/types/app';
import { THEME } from '@/types/enums';
import { createStore as createZustandStore } from 'zustand';

export const initState = {
  actionSwitch: undefined,
  captchaId: undefined,
  customerUrl: undefined,
  customerUrl2: undefined,
  downUrl: undefined,
  firstRechargeUrl: undefined,
  hasNew: undefined,
  heCai6: undefined,
  latestFore: undefined,
  latestVersion: undefined,
  productId: undefined,
  starPic: undefined,
  updateText: undefined,
  webUrl: undefined,
} satisfies Init;

export const accountInfoState = {
  accountCharge: undefined,
  accountNow: undefined,
  codeNow: undefined,
  codeTotal: undefined,
  codeWill: undefined,
  headImg: undefined,
  id: undefined,
  inviterCode: undefined,
  newAccount: undefined,
  nextLevelIntegral: undefined,
  nickName: undefined,
  phone: undefined,
  registerType: undefined,
  status: undefined,
  token: undefined,
  vip: undefined,
} satisfies AccountInfo;

export const accountNowState = {
  balance: undefined,
} satisfies AccountNow;

type AccountState = {
  init: Init;
  accountInfo: AccountInfo;
  theme: THEME;
  accountNow: AccountNow;
  boxPassIsSet: boolean;
};

type AccountActions = {
  setInit: (init: Partial<Init>) => void;
  setAccountInfo: (accountInfo: Partial<AccountInfo>) => void;
  setTheme: (theme: THEME) => void;
  setAccountNow: (accountNow: Partial<AccountNow>) => void;
  setBoxPassIsSet: (boxPassIsSet: boolean) => void;
};

export type AccountStore = AccountState & AccountActions;

export const createAccountStore = () =>
  createZustandStore<AccountStore>()((set) => ({
    init: initState,
    accountInfo: accountInfoState,
    theme: THEME.BLACK_GOLD,
    accountNow: accountNowState,
    boxPassIsSet: false,
    setInit: (init) => set(() => ({ init: { ...init } })),
    setAccountInfo: (accountInfo) => set(() => ({ accountInfo: { ...accountInfo } })),
    setTheme: (theme) => set(() => ({ theme })),
    setAccountNow: (accountNow) => set(() => ({ accountNow: { ...accountNow } })),
    setBoxPassIsSet: (boxPassIsSet) => set(() => ({ boxPassIsSet })),
  }));
