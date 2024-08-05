import { request } from '@/api';
import { BindCardList, RootResponse, BankList } from '@/types/app';
import { API_ENDPOINT, APP_ROUTE } from '@/types/enums';

export const getBindCardList = async () => {
  const data = await request<RootResponse<BindCardList>>({
    route: APP_ROUTE.PAY,
    endpoint: API_ENDPOINT.BIND_CARD_LIST,
    tags: API_ENDPOINT.BIND_CARD_LIST,
    otherHeaders: {
      // This token should be from the initial request headers.
      // Remove after creating the auth logic!
      token: 'Lsd61ab49381b68d7015118f3c79d947d2',
    },
  });
  return data.data;
};

export const getBankList = async () => {
  const data = await request<RootResponse<BankList>>({
    route: APP_ROUTE.PAY,
    endpoint: API_ENDPOINT.BANK_LIST,
    tags: API_ENDPOINT.BANK_LIST,
    otherHeaders: {
      // This token should be from the initial request headers.
      // Remove after creating the auth logic!
      token: 'Lsd61ab49381b68d7015118f3c79d947d2',
    },
  });
  return data.data;
}

export const setBindCard = async (realName: string, bankAccount: string, bankAddress: string, bankId: number) => {
  const body = {
    realName,
    bankAccount,
    bankAddress,
    bankId,
  };
  const data = await request<Pick<RootResponse<null>, | 'code' | 'msg'>>({
    route: APP_ROUTE.PAY,
    endpoint: API_ENDPOINT.BIND_CARD,
    tags: API_ENDPOINT.BIND_CARD,
    body,
    otherHeaders: {
      // This token should be from the initial request headers.
      // Remove after creating the auth logic!
      token: 'Lsd61ab49381b68d7015118f3c79d947d2',
      // token: localStorage.getItem('token'),
    },
  });
  const {code, msg} = data
  return {code, msg};
}