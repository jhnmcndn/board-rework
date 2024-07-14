import type { AccountInfo, GameInfo } from '@/types/app';
import { API_ENDPOINT, APP_ROUTE } from '@/types/enums';
import type { GetGameTypes, RootResponse } from '@/types/response';
import type { AxiosResponse } from 'axios';
import { request } from './request';

export const getGameTypes = async () => {
  const response: AxiosResponse<RootResponse<GetGameTypes>> = await request.post(
    APP_ROUTE.GAME_APP + API_ENDPOINT.GAME_TYPES
  );
  const { data } = response.data;
  return data;
};

export const getAccountInfo = async () => {
  const response: AxiosResponse<RootResponse<AccountInfo>> = await request.post(
    APP_ROUTE.GAME_APP + API_ENDPOINT.ACCOUNT_INFO
  );
  const { data } = response.data;
  return data;
};

export const getGameInfoGroup = async (id: number) => {
  const body = { id };
  const response: AxiosResponse<RootResponse<GameInfo>> = await request.post(
    APP_ROUTE.GAME_APP + API_ENDPOINT.GAME_INFO_GROUP,
    body
  );
  const { data } = response.data;
  return data;
};
