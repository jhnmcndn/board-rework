'use server';

import { request } from '@/api';
import { defaultInitData } from '@/constants/defaultReturnData';
import {
  AccountInfo,
  AccountNow,
  CustomerService,
  Init,
  LoginDevicePayload,
  MessageCommonProblems,
  MessageHomeNotice,
  MessageOnSites,
  ReceiveVipGift,
  ReceiveVipGiftParams,
  ResetPassword,
  RootResponse,
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
  if (data.data && 'token' in data.data) cookies().set('token', `${data.data.token}`);
  return data.data;
};

export const getAccountNow = async () => {
  const data = await request<RootResponse<AccountNow>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.ACCOUNT_NOW,
    tags: API_ENDPOINT.ACCOUNT_NOW,
    otherHeaders: {
      token: cookies().get('token')?.value || '',
    },
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
    otherHeaders: {
      token: '',
    },
  });
  return data.data;
};

export const customerService = async () => {
  const data = await request<RootResponse<CustomerService[]>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.CUSTOMER_SERVICE,
    tags: API_ENDPOINT.CUSTOMER_SERVICE,
    otherHeaders: {
      token: cookies().get('token')?.value || '',
    },
  });
  if (!data.data || 'message' in data.data) return [] satisfies CustomerService[];
  return data.data;
};

export const getMessageCommonProblems = async () => {
  const data = await request<RootResponse<MessageCommonProblems[]>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.MESSAGE_COMMON_PROBLEMS,
    tags: API_ENDPOINT.MESSAGE_COMMON_PROBLEMS,
    otherHeaders: {},
  });
  if (!data.data || 'message' in data.data) return [] satisfies CustomerService[];
  return data.data;
};

export const getVipGiftInfo = async (token?: string) => {
  const data = await request<RootResponse<VIPGiftInfo>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.VIP_GIFT_INFO,
    tags: API_ENDPOINT.VIP_GIFT_INFO,
    otherHeaders: {
      token: token ? token : cookies().get('token')?.value || '',
    },
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
    otherHeaders: {
      token: token ? token : cookies().get('token')?.value || '',
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
  const token = cookies().get('token')?.value || '';
  const data = await request<RootResponse<ResetPassword>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.RESET_PASSWD,
    tags: API_ENDPOINT.RESET_PASSWD,
    otherHeaders: {
      token: token,
    },
    body: { oldPasswd, newPasswd },
  });
  return data;
};
