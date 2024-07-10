import { APP_ROUTE } from '@/types/enums';
import type { GetAccountInfo, GetGameTypes, RootResponse } from '@/types/response';
import type { AxiosResponse } from 'axios';
import { request } from './request';

export const getGameTypes = async () => {
  const response: AxiosResponse<RootResponse<GetGameTypes>> = await request.post(
    APP_ROUTE.GAME_APP + 'getGameTypes'
  );
  const { data } = response.data;
  return data;
};

export const getAccountInfo = async () => {
  const response: AxiosResponse<RootResponse<GetAccountInfo>> = await request.post(
    APP_ROUTE.GAME_APP + 'getAccountInfo'
  );
  const { data } = response.data;
  return data;
};
