'use client'

import SelfWithdrawal from "@/app/withdraw/components/SelfWithdrawal";
import { useAccountStore } from "@/components/Providers/AccountStoreProvider";
import { FC, useEffect } from 'react';

import {
  BankList,
  BindCardList,
  ErrorData,
} from '@/types/app'

export type WithdrawPageComponent = FC<
  Readonly<{
    bindCardList?: BindCardList | ErrorData;
    bankList?: BankList | ErrorData;
  }>
>;

export const WithdrawPage: WithdrawPageComponent = ({
  bindCardList,
  bankList
}) => {
  const withdrawActiveTab = useAccountStore((state) => state.withdrawActiveTab);
  const { setBindCardList, setBankList } = useAccountStore((state) => state);

  useEffect(() => {
    if (bindCardList && !('message' in bindCardList)) {
      setBindCardList(bindCardList);
    }

    if (bankList && !('message' in bankList)) {
      setBankList(bankList);
    }
  }, [bindCardList, bankList]);

  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'auto'}}>
      {withdrawActiveTab === 0 && <SelfWithdrawal/>}
      {/*{withdrawActiveTab === 1 && <CodingDetails />}*/}
      {/*{withdrawActiveTab === 2 && <BindCards />}*/}
      {/*{withdrawActiveTab === 3 && <CashWithdrawalRecord />}*/}
    </div>
  )
}