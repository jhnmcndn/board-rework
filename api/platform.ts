import { request } from '@/api';
import { AccountNow, Init, MessageHomeNotice, MessageOnSites, RootResponse } from '@/types/app';
import { API_ENDPOINT, APP_ROUTE } from '@/types/enums';
import { getToken } from '@/utils/getToken';

export const getAccountNow = async () => {
  const data = await request<RootResponse<AccountNow>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.ACCOUNT_NOW,
  });
  return data.data;
};

export const init = async () => {
  const data = await request<RootResponse<Init>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.INIT,
    body: {
      token: getToken(),
      id: getToken(),
    },
  });
  return data.data;
};

export const getMessageHomeNotices = async () => {
  const response = await request<Pick<RootResponse<MessageHomeNotice[]>, 'data' | 'otherData'>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.MESSAGE_HOME_NOTICES,
  });
  const { data, otherData } = response;
  return { data, otherData };
};

export const getMessageOnSites = async () => {
  const data = await request<RootResponse<MessageOnSites>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.MESSAGE_ON_SITES,
  });
  return data.data;
};

export const boxPassIsOpen = async () => {
  const data = await request<RootResponse<boolean>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.BOX_PASS_IS_OPEN,
    otherHeaders: {
      token: getToken(),
    },
  });
  return data.data;
};
