import { request } from '@/api';
import { AccountInfo, GameInfoGroup, RootResponse, RspGameInfo } from '@/types/app';
import { API_ENDPOINT, APP_ROUTE } from '@/types/enums';

export const getAccountInfo = async () => {
  const data = await request<RootResponse<AccountInfo>>({
    route: APP_ROUTE.GAME,
    endpoint: API_ENDPOINT.ACCOUNT_INFO,
  });
  return data.data;
};

export const getGameInfoGroup = async (id: number) => {
  const body = { id };
  const response = await request<RootResponse<GameInfoGroup[]>>({
    route: APP_ROUTE.GAME,
    endpoint: API_ENDPOINT.GAME_INFO_GROUP,
    body,
  });
  return response.data;
};

export const getGameInfos = async ({ section, pid = -1 }: { section: number; pid: number }) => {
  const body = { id: section, pid };
  const response = await request<RootResponse<RspGameInfo[]>>({
    route: APP_ROUTE.GAME,
    endpoint: API_ENDPOINT.GAME_INFOS,
    body,
  });
  return response.data;
};
