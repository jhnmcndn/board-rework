'use client';

import BindCards from '@/app/withdraw/components/BindCards';
import SelfWithdrawal from '@/app/withdraw/components/SelfWithdrawal';
import WithdrawRecord from '@/app/withdraw/components/WithdrawRecord';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { FC, Fragment, useEffect, useState } from 'react';

import Sidebar from '@/components/Sidebar';
import { BankList, BindCardList, ErrorData } from '@/types/app';

export type WithdrawPageComponent = FC<
  Readonly<{
    bindCardList?: BindCardList | ErrorData;
    bankList?: BankList[] | ErrorData;
  }>
>;

export const WithdrawPage: WithdrawPageComponent = ({ bindCardList, bankList }) => {
  // const withdrawActiveTab = useAccountStore((state) => state.withdrawActiveTab);
  const { setBindCardList, setBankList } = useAccountStore((state) => state);
  const [activeSidebarItem, setActiveSidebarItem] = useState(0);
  const sidebarItems = ['自主提现', '打码详情', '钱包管理', '提现记录'];

  useEffect(() => {
    if (bindCardList && !('message' in bindCardList)) {
      setBindCardList(bindCardList);
    }

    if (bankList && !('message' in bankList)) {
      setBankList(bankList);
    }
  }, [bindCardList, bankList]);

  return (
    <Fragment>
      <Sidebar
        sidebarItems={sidebarItems}
        activeSidebarItem={activeSidebarItem}
        setActiveSidebarItem={setActiveSidebarItem}
      />
      <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
        {activeSidebarItem === 0 && <SelfWithdrawal />}
        {/*{activeSidebarItem === 1 && <CodingDetails />}*/}
        {activeSidebarItem === 2 && <BindCards />}
        {activeSidebarItem === 3 && <WithdrawRecord />}
      </div>
    </Fragment>
  );
};
