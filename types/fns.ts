import { ErrorData, GameInfoGroup, RspGameInfo } from './app';

export type GetGameInfoGroupFn = (id: number) => Promise<ErrorData | GameInfoGroup[] | undefined>;

export type GetGameInfosParams = {
  id: number;
  pid: number;
};
export type GetGameInfosFn = (params?: GetGameInfosParams) => Promise<ErrorData | RspGameInfo[] | undefined>;
