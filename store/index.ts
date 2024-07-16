import { AccountInfo, AccountNow, Init } from '@/types/app';
import { THEME } from '@/types/enums';
import { createStore as createZustandStore } from 'zustand';

const initState = {
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

const accountInfoState = {
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

const accountNowState = {
  balance: undefined,
} satisfies AccountNow;

type State = {
  init: Init;
  accountInfo: AccountInfo;
  theme: THEME;
  accountNow: AccountNow;
};

type Actions = {
  setInit: (init: Partial<Init>) => void;
  setAccountInfo: (accountInfo: Partial<AccountInfo>) => void;
  setTheme: (theme: THEME) => void;
  setAccountNow: (accountNow: Partial<AccountNow>) => void;
};

export type Store = State & Actions;

export const createStore = () =>
  createZustandStore<Store>()((set) => ({
    init: initState,
    accountInfo: accountInfoState,
    theme: THEME.BLACK_GOLD,
    accountNow: accountNowState,
    setInit: (init) => set((state) => ({ init: { ...state.init, init } })),
    setAccountInfo: (accountInfo) => set((state) => ({ accountInfo: { ...state.accountInfo, accountInfo } })),
    setTheme: (theme) => set(() => ({ theme })),
    setAccountNow: (accountNow) => set((state) => ({ accountNow: { ...state.accountNow, accountNow } })),
  }));
