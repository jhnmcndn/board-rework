export interface RootResponse<T = {}> {
  code: number;
  msg: string;
  data: T;
  total: any;
  hasNext: boolean;
  otherData: any;
}

export type GetGameTypes = {
  rspGameTypes: RspGameType[];
  rspGameInfos: RspGameInfo[];
};

export type RspGameType = {
  id: number;
  name: string;
  icon: string;
  type: number;
};

export type RspGameInfo = {
  id: number;
  name: string;
  icon: string;
  maintain: boolean;
  recommend: boolean;
  largeIcon: boolean;
  gameCategory: string;
  lotteryId: any;
  kindId: string;
  platformId: number;
};
