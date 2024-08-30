'use server';

import { request } from '@/api';
import {
  BankList,
  BindCardList,
  PayChannelList,
  PayTypeList,
  RootResponse,
  ThirdPartyRechargePayload,
  UsdtRechargeList,
  UsdtRechargePayload,
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
  const data = await request<Pick<RootResponse<null>, 'code' | 'msg'>>({
    route: APP_ROUTE.PAY,
    endpoint: API_ENDPOINT.BIND_CARD,
    tags: API_ENDPOINT.BIND_CARD,
    body: {
      realName,
      bankAccount,
      bankAddress,
      bankId,
    },
  });
  const { code, msg } = data;
  return { code, msg };
};

export const getWithdrawRechargeDetail = async ({
  type,
  pageNum = 1,
  pageSize = 50,
}: {
  type: string;
  pageNum: number;
  pageSize: number;
}) => {
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

export const withdrawBank = async (memberCardId: number, withdrawMoney: number, withdrawalPass: string) => {
  const data = await request<Pick<RootResponse<null>, 'code' | 'msg'>>({
    route: APP_ROUTE.PAY,
    endpoint: API_ENDPOINT.WITHDRAW_BANK,
    tags: API_ENDPOINT.WITHDRAW_BANK,
    body: {
      memberCardId,
      withdrawMoney,
      withdrawalPass,
    },
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

export const getPayChannelList = async (typeId: number) => {
  const data = await request<RootResponse<PayChannelList[]>>({
    body: { typeId },
    route: APP_ROUTE.PAY,
    endpoint: API_ENDPOINT.PAY_CHANNEL_LIST,
    tags: API_ENDPOINT.PAY_CHANNEL_LIST,
  });
  return data.data;
};

export const requestThirdPartyRecharge = async ({ channelId, amount, ip }: ThirdPartyRechargePayload) => {
  const data = await request<RootResponse<string>>({
    body: { channelId, money: amount, realIp: ip },
    route: APP_ROUTE.PAY,
    endpoint: API_ENDPOINT.ONLINE_RECHARGE,
    tags: API_ENDPOINT.ONLINE_RECHARGE,
  });
  return data;
};

export const getRechargeUsdtList = async () => {
  const data = await request<RootResponse<UsdtRechargeList[]>>({
    route: APP_ROUTE.PAY,
    endpoint: API_ENDPOINT.RECHARGE_USDT_LIST,
    tags: API_ENDPOINT.RECHARGE_USDT_LIST,
  });
  return data.data;
};

export const rechargeUsdt = async ({ id, transactionId, rechargeNumber }: UsdtRechargePayload) => {
  const data = await request<RootResponse<any>>({
    body: { id, transactionId, rechargeNumber },
    route: APP_ROUTE.PAY,
    endpoint: API_ENDPOINT.USDT_RECHARGE,
    tags: API_ENDPOINT.USDT_RECHARGE,
  });
  return data;
};

export const rechargeBankList = async () => {
  // Return type is currently inline since there's no data we can check from, to be updated
  const data = await request<
    RootResponse<
      {
        bankChargeLimit: string;
        id: string;
        discountBill: number;
        bankName: string;
        accountName: string;
        bankAccount: string;
        bankAddress: string;
      }[]
    >
  >({
    endpoint: API_ENDPOINT.RECHARGE_BANK_LIST,
    route: APP_ROUTE.PAY,
    tags: API_ENDPOINT.RECHARGE_BANK_LIST,
  });
  if (!data.data || 'message' in data.data) return [];
  return data.data;
};

export const bankRecharge = async ({
  rechargeMoney,
  rechargeUserName,
  bankBaseId,
  ip,
}: {
  rechargeMoney: string;
  rechargeUserName: string;
  bankBaseId: string;
  ip: string;
}) => {
  const data = await request<RootResponse<any>>({
    endpoint: API_ENDPOINT.BANK_RECHARGE,
    route: APP_ROUTE.PAY,
    tags: API_ENDPOINT.BANK_RECHARGE,
    body: {
      bankBaseId,
      ip,
      rechargeMoney,
      rechargeUserName,
    },
  });
  return data;
};
