import { getAccountInfo } from '@/api/game';
import { getAccountNow } from '@/api/platform';
import { AccountInfo, AccountNow, BindCardList, Init } from '@/types/app';
import { THEME } from '@/types/enums';
import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

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

export const bindCardListState = {
  memberCardList: undefined,
  rspWithdrawInfo: undefined,
  specialBankInfoMap: undefined,
} satisfies BindCardList;

type AccountState = {
  init: Init;
  accountInfo: AccountInfo;
  theme: THEME;
  accountNow: AccountNow;
  boxPassIsSet: boolean;
  bindCardList: BindCardList;
  withdrawActiveTab: number;
};

type AccountActions = {
  setInit: (init: Partial<Init>) => void;
  setAccountInfo: (accountInfo: Partial<AccountInfo>) => void;
  setTheme: (theme: THEME) => void;
  setAccountNow: (accountNow: Partial<AccountNow>) => void;
  setBoxPassIsSet: (boxPassIsSet: boolean) => void;
  setBindCardList: (bindCardList: BindCardList) => void;
  setWithdrawActiveTab: (index: number) => void;
};

export type AccountApiCalls = {
  fetchAccountInfo: () => void;
  fetchAccountNow: () => void;
};

export type AccountStore = AccountState & AccountActions & AccountApiCalls;

export const createAccountStore = () =>
  createStore<AccountStore>()(
    persist(
      (set) => ({
        init: initState,
        accountInfo: accountInfoState,
        theme: THEME.BLACK_GOLD,
        accountNow: accountNowState,
        boxPassIsSet: false,
        bindCardList: bindCardListState,
        withdrawActiveTab: 0,
        setInit: (init) => set(() => ({ init: { ...init } })),
        setAccountInfo: (accountInfo) => set(() => ({ accountInfo: { ...accountInfo } })),
        setTheme: (theme) => set(() => ({ theme })),
        setAccountNow: (accountNow) => set(() => ({ accountNow: { ...accountNow } })),
        setBoxPassIsSet: (boxPassIsSet) => set(() => ({ boxPassIsSet })),
        setBindCardList: (bindCardList) => set(() => ({ bindCardList })),
        setWithdrawActiveTab: (index) => set(() => ({ withdrawActiveTab: index })),

        fetchAccountInfo: async () => {
          const accountInfo = await getAccountInfo();
          if (!accountInfo || 'message' in accountInfo) return set(() => ({ accountInfo: accountInfoState }));
          return set(() => ({ accountInfo }));
        },
        fetchAccountNow: async () => {
          const accountNow = await getAccountNow();
          if (!accountNow || 'message' in accountNow) return set(() => ({ accountNow: accountNowState }));
          return set(() => ({ accountNow }));
        },
      }),
      {
        name: 'account-store',
      },
    ),
  );
