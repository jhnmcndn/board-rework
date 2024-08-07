import { getAccountInfo } from '@/api/game';
import { getAccountNow } from '@/api/platform';
import {
  AccountInfo,
  AccountNow,
  BankList,
  BindCardList,
  Init,
  WithdrawRechargeBody,
  WithdrawRechargeDetail,
} from '@/types/app';
import { THEME } from '@/types/enums';
import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';
import { getBankList, getBindCardList, getWithdrawRechargeDetail } from '@/api/pay';

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

export const bankListState = {
  id: undefined,
  bankName: undefined,
  bankIcon: undefined,
  sort: undefined,
} satisfies BankList;

export const withdrawRecordListState = {
  money: undefined,
  orderNo: undefined,
  requestTime: undefined,
  bankName: undefined,
  status: undefined,
  remark: undefined,
  color: undefined,
  bankAccount: undefined,
  bankAddress: undefined,
};

type AccountState = {
  init: Init;
  accountInfo: AccountInfo;
  theme: THEME;
  accountNow: AccountNow;
  boxPassIsSet: boolean;
  bindCardList: BindCardList;
  withdrawActiveTab: number;
  bankList: BankList[];
  withdrawRecordList: WithdrawRechargeDetail[];
};

type AccountActions = {
  setInit: (init: Partial<Init>) => void;
  setAccountInfo: (accountInfo: Partial<AccountInfo>) => void;
  setTheme: (theme: THEME) => void;
  setAccountNow: (accountNow: Partial<AccountNow>) => void;
  setBoxPassIsSet: (boxPassIsSet: boolean) => void;
  setBindCardList: (bindCardList: BindCardList) => void;
  setWithdrawRecordList: (withdrawRecordList: WithdrawRechargeDetail) => void;
  setWithdrawActiveTab: (index: number) => void;
  setBankList: (bankList: BankList) => void;
  fetchBankList: () => void;
  fetchBindCardList: () => void;
  fetchWithdrawRecordList: ({ type, pageNum, pageSize }: WithdrawRechargeBody) => void;
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
        bankList: [bankListState],
        withdrawRecordList: [withdrawRecordListState],
        setInit: (init) => set(() => ({ init: { ...init } })),
        setAccountInfo: (accountInfo) => set(() => ({ accountInfo: { ...accountInfo } })),
        setTheme: (theme) => set(() => ({ theme })),
        setAccountNow: (accountNow) => set(() => ({ accountNow: { ...accountNow } })),
        setBoxPassIsSet: (boxPassIsSet) => set(() => ({ boxPassIsSet })),
        setBindCardList: (bindCardList) => set(() => ({ bindCardList })),
        setWithdrawRecordList: (withdrawRecordList) => set(() => ({ withdrawRecordList })),
        setWithdrawActiveTab: (index) => set(() => ({ withdrawActiveTab: index })),
        setBankList: (bankList) => set(() => ({ bankList: bankList })),
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
        fetchBankList: async () => {
          const bankList = await getBankList();
          if (!bankList || 'message' in bankList) return set(() => ({ bankList: [bankListState] }));
          return set(() => ({ bankList }));
        },
        fetchBindCardList: async () => {
          const bindCardList = await getBindCardList();
          if (!bindCardList || 'message' in bindCardList) return set(() => ({ bindCardList: bindCardListState }));
          return set(() => ({ bindCardList }));
        },
        fetchWithdrawRecordList: async ({ type, pageNum, pageSize }) => {
          const withdrawRecordList = await getWithdrawRechargeDetail({
            type: type,
            pageNum: pageNum,
            pageSize: pageSize,
          });
          if (!withdrawRecordList || 'message' in withdrawRecordList) {
            return set(() => ({ withdrawRecordList: withdrawRecordListState }));
          }
          return set(() => ({ withdrawRecordList }));
        },
      }),
      {
        name: 'account-store',
      },
    ),
  );
