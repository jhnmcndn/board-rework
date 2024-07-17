import { request } from '@/api';
import { AccountInfo, ErrorData, GameInfoGroup, GetGameTypes, RootResponse, RspGameInfo } from '@/types/app';
import { API_ENDPOINT, APP_ROUTE } from '@/types/enums';

export const getAccountInfo = async () => {
  const data = await request<RootResponse<AccountInfo>>({
    route: APP_ROUTE.GAME,
    endpoint: API_ENDPOINT.ACCOUNT_INFO,
  });
  return data.data;
};

export const getGameTypes = async () => {
  const data = await request<RootResponse<GetGameTypes>>({
    route: APP_ROUTE.GAME,
    endpoint: API_ENDPOINT.GAME_TYPES,
    tags: API_ENDPOINT.GAME_TYPES,
  });
  return data.data;
};

export type GetGameInfoGroupFn = (id: number) => Promise<ErrorData | GameInfoGroup[] | undefined>;

export const getGameInfoGroup: GetGameInfoGroupFn = async (id) => {
  const body = { id };
  const response = await request<RootResponse<GameInfoGroup[]>>({
    route: APP_ROUTE.GAME,
    endpoint: API_ENDPOINT.GAME_INFO_GROUP,
    body,
  });
  return response.data;
};

export type GetGameInfosParams = {
  id: number;
  pid: number;
};

export type GetGameInfosFn = (params?: GetGameInfosParams) => Promise<ErrorData | RspGameInfo[] | undefined>;

export const getGameInfos: GetGameInfosFn = async (params) => {
  const body = { id: params?.id || 1, pid: params?.pid || -1 };
  const response = await request<RootResponse<RspGameInfo[]>>({
    route: APP_ROUTE.GAME,
    endpoint: API_ENDPOINT.GAME_INFOS,
    body,
  });
  return response.data;
};
