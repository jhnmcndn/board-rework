import { ip } from '@/api/misc';
import { request } from '@/api/request';
import type { AccountInfo, Init, Mail } from '@/types/app';
import { API_ENDPOINT, APP_ROUTE } from '@/types/enums';
import type { LoginParams } from '@/types/params';
import type { RootResponse } from '@/types/response';
import { generateDeviceId } from '@/utils/app';
import type { AxiosResponse } from 'axios';

export const getAccountNow = async () => {
  const response: AxiosResponse<RootResponse<any>> = await request.post(
    APP_ROUTE.PLATFORM + API_ENDPOINT.ACCOUNT_NOW
  );
  const { data } = response.data;
  return data;
};

export const init = async () => {
  const loginNow: any = localStorage.getItem('loginNow');

  const body = {
    token: loginNow ? loginNow.token : 'randomString',
    id: loginNow ? loginNow.token : '23',
  };

  const response: AxiosResponse<RootResponse<Init>> = await request.post(
    APP_ROUTE.PLATFORM + API_ENDPOINT.INIT,
    body
  );
  const { data } = response.data;
  return data;
};

export const login = async ({ username, password }: LoginParams) => {
  const body = {
    mobile: username,
    passwd: password,
    deviceId: generateDeviceId(),
    ip: await ip(),
  };

  const headers = {
    headers: {
      version: import.meta.env.VITE_APP_VERSION,
    },
  };

  const response: AxiosResponse<RootResponse<AccountInfo>> = await request.post(
    APP_ROUTE.PLATFORM + API_ENDPOINT.LOGIN,
    body,
    headers
  );
  const { data } = response.data;
  return data;
};

export const getReceivedMessage = async () => {
  const response: AxiosResponse<RootResponse<Mail[]>> = await request.post(
    APP_ROUTE.PLATFORM + API_ENDPOINT.MESSAGE_ON_SITES
  );
  const { data } = response.data;
  return data;
};
