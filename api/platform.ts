'use server';

import { request } from '@/api';
import { defaultInitData } from '@/constants/defaultData';
import { COOKIE_MAX_AGE } from '@/constants/misc';
import {
  AccountInfo,
  AccountNow,
  ActivityInfos,
  ActivityQuestList,
  ActivityQuestSectionTypes,
  ActivityTypes,
  BoxAccount,
  CodeFlowList,
  CustomerService,
  FundDetailsPayload,
  Init,
  LoginDevicePayload,
  LoginPhonePayload,
  MessageCommonProblems,
  MessageHomeNotice,
  MessageOnSites,
  ReceiveVipGift,
  ReceiveVipGiftParams,
  ResetPassword,
  RootResponse,
  TFundDetails,
  TradeTypes,
  VIPGiftInfo,
  WithToken,
} from '@/types/app';
import { API_ENDPOINT, APP_ROUTE } from '@/types/enums';
import { cookies } from 'next/headers';

export const loginDevice = async (payload: LoginDevicePayload) => {
  const data = await request<RootResponse<AccountInfo>>({
    body: payload,
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.LOGIN_DEVICE,
    tags: API_ENDPOINT.LOGIN_DEVICE,
  });
  if (data.data && 'token' in data.data) cookies().set('token', `${data.data.token}`, { maxAge: COOKIE_MAX_AGE });
  return data;
};

export const loginPhoneNumber = async (payload: LoginPhonePayload) => {
  const data = await request<RootResponse<AccountInfo>>({
    body: payload,
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.LOGIN,
    tags: API_ENDPOINT.LOGIN,
  });
  if (data.data && 'token' in data.data) cookies().set('token', `${data.data.token}`, { maxAge: COOKIE_MAX_AGE });
  return data;
};

export const getAccountNow = async () => {
  const data = await request<RootResponse<AccountNow>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.ACCOUNT_NOW,
    tags: API_ENDPOINT.ACCOUNT_NOW,
    // otherHeaders: {
    //   token: cookies().get('token')?.value || '',
    // },
  });
  return data.data;
};

export const init = async () => {
  const data = await request<RootResponse<Init>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.INIT,
    tags: API_ENDPOINT.INIT,
    body: {
      token: cookies().get('token')?.value || '',
      id: cookies().get('token')?.value || '',
    },
  });
  if (!data.data || 'message' in data.data) return defaultInitData;
  return data.data;
};

export const getMessageHomeNotices = async () => {
  const response = await request<Pick<RootResponse<MessageHomeNotice[]>, 'data' | 'otherData'>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.MESSAGE_HOME_NOTICES,
    tags: API_ENDPOINT.MESSAGE_HOME_NOTICES,
  });
  const { data, otherData } = response;
  return { data, otherData };
};

export const getMessageOnSites = async () => {
  const data = await request<RootResponse<MessageOnSites[]>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.MESSAGE_ON_SITES,
    tags: API_ENDPOINT.MESSAGE_ON_SITES,
  });
  return data.data;
};

export const boxPassIsOpen = async () => {
  const data = await request<RootResponse<boolean>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.BOX_PASS_IS_OPEN,
    tags: API_ENDPOINT.BOX_PASS_IS_OPEN,
  });
  return data.data;
};

export const customerService = async () => {
  const data = await request<RootResponse<CustomerService[]>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.CUSTOMER_SERVICE,
    tags: API_ENDPOINT.CUSTOMER_SERVICE,
  });
  if (!data.data || 'message' in data.data) return [] satisfies CustomerService[];
  return data.data;
};

export const getMessageCommonProblems = async () => {
  const data = await request<RootResponse<MessageCommonProblems[]>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.MESSAGE_COMMON_PROBLEMS,
    tags: API_ENDPOINT.MESSAGE_COMMON_PROBLEMS,
  });
  if (!data.data || 'message' in data.data) return [] satisfies CustomerService[];
  return data.data;
};

export const getVipGiftInfo = async () => {
  const data = await request<RootResponse<VIPGiftInfo>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.VIP_GIFT_INFO,
    tags: API_ENDPOINT.VIP_GIFT_INFO,
  });
  if (!data.data || 'message' in data.data)
    return {
      vipSetList: [],
      levelBonusStatus: 0,
      weekBonusStatus: 0,
    } satisfies VIPGiftInfo;
  return data.data;
};

export const receiveVipGift = async ({ type, token }: ReceiveVipGiftParams & WithToken): Promise<ReceiveVipGift> => {
  const data = await request<RootResponse<ReceiveVipGift>>({
    endpoint: API_ENDPOINT.RECEIVE_VIP_GIFT,
    route: APP_ROUTE.PLATFORM,
    tags: API_ENDPOINT.RECEIVE_VIP_GIFT,
    body: {
      type,
    },
  });
  if (!data.data || 'message' in data.data)
    return {
      message: data.msg,
    } satisfies ReceiveVipGift;
  return {
    message: data.msg,
  } satisfies ReceiveVipGift;
};

export const resetPassword = async ({ oldPasswd, newPasswd }: { oldPasswd: string; newPasswd: string }) => {
  const data = await request<RootResponse<ResetPassword>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.RESET_PASSWD,
    tags: API_ENDPOINT.RESET_PASSWD,
    body: { oldPasswd, newPasswd },
  });
  return data;
};

export const getCodeFlowList = async () => {
  const data = await request<RootResponse<CodeFlowList[]>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.CODE_FLOW_LIST,
    tags: API_ENDPOINT.CODE_FLOW_LIST,
    body: {
      pageNum: 1,
      pageSize: 10,
    },
  });
  return data.data;
};

export const setBoxPass = async (boxPass: string) => {
  const data = await request<Pick<RootResponse<null>, 'msg' | 'code'>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.BOX_PASS_SET,
    tags: API_ENDPOINT.BOX_PASS_SET,
    body: { boxPass },
  });
  const { msg, code } = data;
  return { msg, code };
};

export const getActivityTypes = async () => {
  const data = await request<RootResponse<ActivityTypes[]>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.ACTIVITY_TYPES,
    tags: API_ENDPOINT.ACTIVITY_TYPES,
  });

  if (!data.data || 'message' in data.data) return [] satisfies ActivityTypes[];
  return data.data;
};
export const getActivityInfos = async (activityType: number) => {
  const data = await request<RootResponse<ActivityInfos[]>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.ACTIVITY_INFOS,
    tags: API_ENDPOINT.ACTIVITY_INFOS,
    body: { id: activityType },
  });
  if (!data.data || 'message' in data.data) return [] satisfies ActivityInfos[];
  return data.data;
};

export const getActivityQuestTypes = async () => {
  const data = await request<RootResponse<ActivityQuestSectionTypes[]>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.ACTIVITY_QUEST_TYPES,
    tags: API_ENDPOINT.ACTIVITY_QUEST_TYPES,
  });
  if (!data.data || 'message' in data.data) return [] satisfies ActivityQuestSectionTypes[];
  return data.data;
};

export const getActivityQuestInfos = async (activityQuestInfos: number) => {
  const data = await request<RootResponse<ActivityQuestList[]>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.ACTIVITY_QUEST_INFOS,
    tags: API_ENDPOINT.ACTIVITY_QUEST_INFOS,
    body: { id: activityQuestInfos },
  });
  if (!data.data || 'message' in data.data) return [] satisfies ActivityQuestList[];
  return data.data;
};

export const boxAccount = async (boxPass: string) => {
  const data = await request<RootResponse<BoxAccount>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.BOX_ACCOUNT,
    tags: API_ENDPOINT.BOX_ACCOUNT,
    body: { boxPass },
  });
  return data;
};

export const getTradeTypes = async () => {
  const data = await request<RootResponse<TradeTypes[]>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.TRADE_TYPES,
    tags: API_ENDPOINT.TRADE_TYPES,
  });
  if (!data.data || 'message' in data.data) return [] satisfies TradeTypes[];
  return data.data;
};

export const getFundDetails = async ({ enumMoney, enumReqTime }: FundDetailsPayload) => {
  const data = await request<RootResponse<TFundDetails[]>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.FUND_DETAILS,
    tags: API_ENDPOINT.FUND_DETAILS,
    body: { enumMoney, enumReqTime },
  });
  if (!data.data || 'message' in data.data) return [] satisfies TFundDetails[];
  return data.data;
};
