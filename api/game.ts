import { request } from '@/api';
import {
  AccountInfo,
  GameCategoryList,
  GameInfoGroup,
  GetGameTypes,
  RootResponse,
  RspGameInfo,
  TWashCodeLogs,
  WashCodeDetail,
  WashCodeRate,
} from '@/types/app';
import { API_ENDPOINT, APP_ROUTE } from '@/types/enums';
import { GetGameInfoGroupFn, GetGameInfosFn } from '@/types/fns';

export const getAccountInfo = async () => {
  // const token = getFromLocalStorage('token');
  const data = await request<RootResponse<AccountInfo>>({
    route: APP_ROUTE.GAME,
    endpoint: API_ENDPOINT.ACCOUNT_INFO,
    tags: API_ENDPOINT.ACCOUNT_INFO,
    // otherHeaders: {
    //   token: token || '',
    // },
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

export const getGameCategoryList = async () => {
  const response = await request<RootResponse<GameCategoryList[]>>({
    endpoint: API_ENDPOINT.GAME_CATEGORY_LIST,
    route: APP_ROUTE.GAME,
    tags: API_ENDPOINT.GAME_CATEGORY_LIST,
  });
  if (!response.data || 'message' in response.data) return [];
  return response.data;
};

export const getGameDataList = async ({ gameCategory, enumReqTime }: { gameCategory: string; enumReqTime: string }) => {
  const response = await request<RootResponse<[]>>({
    endpoint: API_ENDPOINT.GAME_DATA_LIST,
    route: APP_ROUTE.GAME,
    tags: API_ENDPOINT.GAME_DATA_LIST,
    body: {
      enumReqTime,
      gameCategory,
    },
  });
  if (!response.data || 'message' in response.data) return [];
  return response.data;
};

export const getWashCodeDetail = async () => {
  const response = await request<RootResponse<WashCodeDetail>>({
    endpoint: API_ENDPOINT.WASH_CODE_DETAIL,
    route: APP_ROUTE.GAME,
    tags: API_ENDPOINT.WASH_CODE_DETAIL,
  });
  if (!response.data || 'message' in response.data)
    return {
      washCodeAmount: 0,
      washCodeTime: '',
      money: null,
      rspGameTypeWashCodes: [],
    };
  return response.data;
};

export const getRecommendDetail = async () => {
  const response = await request<RootResponse<[]>>({
    endpoint: API_ENDPOINT.RECOMMEND_DETAIL,
    route: APP_ROUTE.PLATFORM,
    tags: API_ENDPOINT.RECOMMEND_DETAIL,
    body: {},
  });
  if (!response.data || 'message' in response.data) return [];
  return response.data;
};

export const getWashCodeLogs = async ({ pageNum = 1, pageSize = 50 }: { pageNum: number; pageSize: number }) => {
  const body = {
    pageNum,
    pageSize,
  };
  const response = await request<RootResponse<TWashCodeLogs[]>>({
    endpoint: API_ENDPOINT.WASH_CODE_LOGS,
    route: APP_ROUTE.GAME,
    tags: API_ENDPOINT.WASH_CODE_LOGS,
    body,
  });
  if (!response.data || 'message' in response.data) return [];
  return response.data;
};

export const toWashCode = async () => {
  const response = await request<RootResponse<WashCodeDetail>>({
    endpoint: API_ENDPOINT.TO_WASH_CODE,
    route: APP_ROUTE.GAME,
    tags: API_ENDPOINT.TO_WASH_CODE,
  });
  if (!response.data || 'message' in response.data)
    return {
      washCodeAmount: 0,
      washCodeTime: '',
      money: null,
      rspGameTypeWashCodes: [],
    };
  return response.data;
};

export const getWashCodeRateList = async () => {
  const response = await request<RootResponse<WashCodeRate[]>>({
    endpoint: API_ENDPOINT.WASH_CODE_RATE_LIST,
    route: APP_ROUTE.GAME,
    tags: API_ENDPOINT.WASH_CODE_RATE_LIST,
  });
  if (!response.data || 'message' in response.data) return [];
  return response.data;
};
