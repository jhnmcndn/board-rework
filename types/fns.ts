import { CustomerService, ErrorData, GameInfoGroup, RspGameInfo } from '@/types/app';

export type GetGameInfoGroupFn = (id: number) => Promise<ErrorData | GameInfoGroup[] | undefined>;
export type GetGameInfosParams = { id: number; pid: number };
export type GetGameInfosFn = (params?: GetGameInfosParams) => Promise<ErrorData | RspGameInfo[] | undefined>;
export type CustomerServiceFn = () => Promise<ErrorData | CustomerService[] | undefined>;
export type CustomerServiceData = Awaited<ReturnType<CustomerServiceFn>>;
