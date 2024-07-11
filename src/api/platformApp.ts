import { Init } from '@/types/app';
import { APP_ROUTE } from '@/types/enums';
import type { RootResponse } from '@/types/response';
import type { AxiosResponse } from 'axios';
import { request } from './request';

export const getAccountNow = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response: AxiosResponse<RootResponse<any>> = await request.post(APP_ROUTE.PLATFORM + 'getAccountNow');
  const { data } = response.data;
  return data;
};

export const getInit = async () => {
  const loginNow: any = localStorage.getItem('loginNow');

  var params = {
    token: loginNow ? loginNow.token : 'adhhjaksdhjk',
    id: loginNow ? loginNow.token : '23',
  };

  const response: AxiosResponse<RootResponse<Init>> = await request.post(APP_ROUTE.PLATFORM + 'init', params);
  const { data } = response.data;
  return data;
};
