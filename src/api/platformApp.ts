import { APP_ROUTE } from '@/types/enums';
import { GetAccountInfo, RootResponse } from '@/types/response';
import { AxiosResponse } from 'axios';
import { request } from './request';

export const getAccountInfo = async () => {
  const response: AxiosResponse<RootResponse<GetAccountInfo>> =
    await request.post(APP_ROUTE.GAME_APP + 'getAccountInfo');
  const { data } = response.data;
  return data;
};
