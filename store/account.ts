import { getAccountInfo } from '@/api/game';
import { getBindCardList, getWithdrawRechargeDetail } from '@/api/pay';
import { getAccountNow, getActivityInfos, getActivityTypes, getCodeFlowList } from '@/api/platform';
import { defaultInitData } from '@/constants/defaultReturnData';
import {
  AccountInfo,
  AccountNow,
  ActivityInfos,
  ActivityTypes,
  BankList,
  BindCardList,
  CodeFlowList,
  Init,
  WithdrawRechargeBody,
  WithdrawRechargeDetail,
} from '@/types/app';
import { THEME } from '@/types/enums';
import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

export const accountInfoState = {
  accountCharge: undefined,
  accountNow: undefined,
  codeNow: undefined,
  codeTotal: 0,
  codeWill: undefined,
  headImg: undefined,
  id: undefined,
  inviterCode: undefined,
  newAccount: undefined,
  nextLevelIntegral: 0,
  nickName: undefined,
  phone: undefined,
  registerType: undefined,
  status: undefined,
  token: undefined,
  vip: 1,
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
  bankList: BankList[];
  withdrawRecordList: WithdrawRechargeDetail[];
  codeFlowList: CodeFlowList[];
  activityTypes: ActivityTypes[];
  activityInfos: ActivityInfos[];
};

type AccountActions = {
  setInit: (init: Init) => void;
  setAccountInfo: (accountInfo: AccountInfo) => void;
  setTheme: (theme: THEME) => void;
  setAccountNow: (accountNow: Partial<AccountNow>) => void;
  setBoxPassIsSet: (boxPassIsSet: boolean) => void;
  setBindCardList: (bindCardList: BindCardList) => void;
  setWithdrawRecordList: (withdrawRecordList: WithdrawRechargeDetail[]) => void;
  setWithdrawActiveTab: (index: number) => void;
  setBankList: (bankList: BankList[]) => void;
  setCodeFlowList: (codeFlowList: CodeFlowList[]) => void;
  fetchBindCardList: () => void;
  fetchWithdrawRecordList: ({ type, pageNum, pageSize }: WithdrawRechargeBody) => void;
  fetchCodeFlowList: () => void;
  fetchActivityTypes: () => void;
  fetchActivityInfos: (activityType: number) => void;
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
        init: defaultInitData,
        accountInfo: accountInfoState,
        theme: THEME.BLACK_GOLD,
        accountNow: accountNowState,
        boxPassIsSet: false,
        bindCardList: bindCardListState,
        withdrawActiveTab: 0,
        bankList: [],
        withdrawRecordList: [],
        codeFlowList: [],
        activityTypes: [],
        activityInfos: [],
        setInit: (init) => set(() => ({ init: { ...init } })),
        setAccountInfo: (accountInfo) => set(() => ({ accountInfo: { ...accountInfo } })),
        setTheme: (theme) => set(() => ({ theme })),
        setAccountNow: (accountNow) => set(() => ({ accountNow: { ...accountNow } })),
        setBoxPassIsSet: (boxPassIsSet) => set(() => ({ boxPassIsSet })),
        setBindCardList: (bindCardList) => set(() => ({ bindCardList })),
        setWithdrawRecordList: (withdrawRecordList) => set(() => ({ withdrawRecordList })),
        setWithdrawActiveTab: (index) => set(() => ({ withdrawActiveTab: index })),
        setBankList: (bankList) => set(() => ({ bankList })),
        setCodeFlowList: (codeFlowList) => set(() => ({ codeFlowList })),
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
            return set(() => ({ withdrawRecordList: [] }));
          }
          return set(() => ({ withdrawRecordList }));
        },
        fetchCodeFlowList: async () => {
          const codeFlowList = await getCodeFlowList();
          if (!codeFlowList || 'message' in codeFlowList) {
            return set(() => ({ codeFlowList: [] }));
          }
          return set(() => ({ codeFlowList }));
        },
        fetchActivityTypes: async () => {
          const activityTypes = await getActivityTypes();
          if (!activityTypes || 'message' in activityTypes) {
            return set(() => ({ activityTypes: [] }));
          }
          return set(() => ({ activityTypes }));
        },
        fetchActivityInfos: async (activityType) => {
          const activityInfos = await getActivityInfos(activityType);
          if (!activityInfos || 'message' in activityInfos) {
            return set(() => ({ activityInfos: [] }));
          }
          return set(() => ({ activityInfos }));
        },
      }),
      {
        name: 'account-store',
      },
    ),
  );
