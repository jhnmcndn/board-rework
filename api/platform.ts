import { request } from '@/api';
import {
  AccountInfo,
  AccountNow,
  CustomerService,
  Init,
  LoginDevicePayload,
  MessageCommonProblems,
  MessageHomeNotice,
  MessageOnSites,
  RootResponse,
  VIPGiftInfo,
} from '@/types/app';
import { API_ENDPOINT, APP_ROUTE } from '@/types/enums';
import { CustomerServiceFn } from '@/types/fns';

export const loginDevice = async (payload: LoginDevicePayload) => {
  const data = await request<RootResponse<AccountInfo>>({
    body: payload,
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.LOGIN_DEVICE,
    tags: API_ENDPOINT.LOGIN_DEVICE,
  });
  return data.data;
};

export const getAccountNow = async () => {
  const data = await request<RootResponse<AccountNow>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.ACCOUNT_NOW,
    tags: API_ENDPOINT.ACCOUNT_NOW,
  });
  return data.data;
};

export const init = async () => {
  const data = await request<RootResponse<Init>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.INIT,
    tags: API_ENDPOINT.INIT,
    body: {
      token: 'uEd2844af8c6220e11faa797b8bab0cc70',
      id: 'uEd2844af8c6220e11faa797b8bab0cc70',
    },
  });
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

export const customerService: CustomerServiceFn = async () => {
  const token = localStorage?.getItem('token');
  const data = await request<RootResponse<CustomerService[]>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.CUSTOMER_SERVICE,
    tags: API_ENDPOINT.CUSTOMER_SERVICE,
    otherHeaders: {
      token: token || '',
    },
  });
  return data.data;
};

export const getMessageCommonProblems = async () => {
  const data = await request<RootResponse<MessageCommonProblems[]>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.MESSAGE_COMMON_PROBLEMS,
    tags: API_ENDPOINT.MESSAGE_COMMON_PROBLEMS,
  });
  return data.data;
};

export const getVipGiftInfo = async () => {
  const token = localStorage?.getItem('token');
  const data = await request<RootResponse<VIPGiftInfo>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.VIP_GIFT_INFO,
    tags: API_ENDPOINT.VIP_GIFT_INFO,
    otherHeaders: {
      token: token || '',
    },
  });
  return data.data;
};
