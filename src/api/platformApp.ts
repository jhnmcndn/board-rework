import { ip } from '@/api/misc';
import { request } from '@/api/request';
import type { AccountInfo, Init } from '@/types/app';
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

  const params = {
    token: loginNow ? loginNow.token : 'randomString',
    id: loginNow ? loginNow.token : '23',
  };

  const response: AxiosResponse<RootResponse<Init>> = await request.post(
    APP_ROUTE.PLATFORM + API_ENDPOINT.INIT,
    params
  );
  const { data } = response.data;
  return data;
};

export const login = async ({ username, password }: LoginParams) => {
  const response: AxiosResponse<RootResponse<AccountInfo>> = await request.post(
    APP_ROUTE.PLATFORM + API_ENDPOINT.LOGIN,
    {
      mobile: username,
      passwd: password,
      deviceId: generateDeviceId(),
      ip: await ip(),
    },
    {
      headers: {
        version: import.meta.env.VITE_APP_VERSION,
      },
    }
  );
  const { data } = response.data;
  return data;
};
