import { request } from '@/api';
import { BankList, BindCardList, RootResponse, WithdrawRechargeBody, WithdrawRechargeDetail } from '@/types/app';
import { API_ENDPOINT, APP_ROUTE } from '@/types/enums';
import { getFromLocalStorage } from '@/utils/helpers';

export const getBindCardList = async () => {
  const token = getFromLocalStorage('token');
  const data = await request<RootResponse<BindCardList>>({
    route: APP_ROUTE.PAY,
    endpoint: API_ENDPOINT.BIND_CARD_LIST,
    tags: API_ENDPOINT.BIND_CARD_LIST,
    otherHeaders: {
      token: token || '',
    },
  });
  return data.data;
};

export const getBankList = async () => {
  const token = getFromLocalStorage('token');
  const data = await request<RootResponse<BankList[]>>({
    route: APP_ROUTE.PAY,
    endpoint: API_ENDPOINT.BANK_LIST,
    tags: API_ENDPOINT.BANK_LIST,
    otherHeaders: {
      token: token || '',
    },
  });
  return data.data;
};

export const setBindCard = async (realName: string, bankAccount: string, bankAddress: string, bankId: number) => {
  const token = getFromLocalStorage('token');
  const body = {
    realName,
    bankAccount,
    bankAddress,
    bankId,
  };
  const data = await request<Pick<RootResponse<null>, 'code' | 'msg'>>({
    route: APP_ROUTE.PAY,
    endpoint: API_ENDPOINT.BIND_CARD,
    tags: API_ENDPOINT.BIND_CARD,
    body,
    otherHeaders: {
      token: token || '',
    },
  });
  const { code, msg } = data;
  return { code, msg };
};

export const getWithdrawRechargeDetail = async ({ type, pageNum = 1, pageSize = 50 }: WithdrawRechargeBody) => {
  const token = getFromLocalStorage('token');
  const body = {
    type,
    pageNum,
    pageSize,
  };
  const data = await request<RootResponse<WithdrawRechargeDetail[]>>({
    route: APP_ROUTE.PAY,
    endpoint: API_ENDPOINT.WITHDRAW_RECHARGE_DETAIL,
    tags: API_ENDPOINT.WITHDRAW_RECHARGE_DETAIL,
    body,
    otherHeaders: {
      token: token || '',
    },
  });
  return data.data;
};
