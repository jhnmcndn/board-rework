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
