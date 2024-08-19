import { request } from '@/api';
import {
  BankList,
  BindCardList,
  PayTypeList,
  RootResponse,
  WithdrawBankBody,
  WithdrawRechargeBody,
  WithdrawRechargeDetail,
} from '@/types/app';
import { API_ENDPOINT, APP_ROUTE } from '@/types/enums';

export const getBindCardList = async () => {
  const data = await request<RootResponse<BindCardList>>({
    route: APP_ROUTE.PAY,
    endpoint: API_ENDPOINT.BIND_CARD_LIST,
    tags: API_ENDPOINT.BIND_CARD_LIST,
  });
  return data.data;
};

export const getBankList = async () => {
  const data = await request<RootResponse<BankList[]>>({
    route: APP_ROUTE.PAY,
    endpoint: API_ENDPOINT.BANK_LIST,
    tags: API_ENDPOINT.BANK_LIST,
  });
  return data.data;
};

export const setBindCard = async (realName: string, bankAccount: string, bankAddress: string, bankId: number) => {
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
  });
  const { code, msg } = data;
  return { code, msg };
};

export const getWithdrawRechargeDetail = async ({ type, pageNum = 1, pageSize = 50 }: WithdrawRechargeBody) => {
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
  });
  return data.data;
};

export const withdrawBank = async ({ memberCardId, withdrawMoney, withdrawalPass }: WithdrawBankBody) => {
  const body = { memberCardId: memberCardId, withdrawMoney: withdrawMoney, withdrawalPass: withdrawalPass };
  const data = await request<Pick<RootResponse<null>, 'code' | 'msg'>>({
    route: APP_ROUTE.PAY,
    endpoint: API_ENDPOINT.WITHDRAW_BANK,
    tags: API_ENDPOINT.WITHDRAW_BANK,
    body,
  });
  const { code, msg } = data;
  return { code, msg };
};

export const setWithdrawPass = async (boxPass: string) => {
  const data = await request<Pick<RootResponse<null>, 'code' | 'msg'>>({
    route: APP_ROUTE.PAY,
    endpoint: API_ENDPOINT.WITHDRAW_PASS_SET,
    tags: API_ENDPOINT.WITHDRAW_PASS_SET,
    body: { boxPass },
  });
  const { code, msg } = data;
  return { code, msg };
};

export const getPayTypeList = async () => {
  const data = await request<RootResponse<PayTypeList[]>>({
    route: APP_ROUTE.PAY,
    endpoint: API_ENDPOINT.PAY_TYPE_LIST,
    tags: API_ENDPOINT.PAY_TYPE_LIST,
  });
  return data.data;
};
