import { request } from '@/api';
import { AccountInfo, GameInfoGroup, GetGameTypes, RootResponse, RspGameInfo } from '@/types/app';
import { API_ENDPOINT, APP_ROUTE } from '@/types/enums';
import { GetGameInfoGroupFn, GetGameInfosFn } from '@/types/fns';

export const getAccountInfo = async () => {
  const data = await request<RootResponse<AccountInfo>>({
    route: APP_ROUTE.GAME,
    endpoint: API_ENDPOINT.ACCOUNT_INFO,
    tags: API_ENDPOINT.ACCOUNT_INFO,
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

export const getGameInfoGroup: GetGameInfoGroupFn = async (id) => {
  const body = { id };
  const response = await request<RootResponse<GameInfoGroup[]>>({
    route: APP_ROUTE.GAME,
    endpoint: API_ENDPOINT.GAME_INFO_GROUP,
    body,
    tags: API_ENDPOINT.GAME_INFO_GROUP,
  });
  return response.data;
};

export const getGameInfos: GetGameInfosFn = async (params) => {
  let body = {
    id: params?.id || 1,
    ...(params && params.id !== 7 ? { pid: params.pid || -1 } : {}),
  };
  const response = await request<RootResponse<RspGameInfo[]>>({
    route: APP_ROUTE.GAME,
    endpoint: API_ENDPOINT.GAME_INFOS,
    body,
    tags: API_ENDPOINT.GAME_INFOS,
  });
  return response.data;
};
