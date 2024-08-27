'use client';

import RechargeSidebar from '@/app/recharge/elements/RechargeSidebar';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { ErrorData, PayTypeList } from '@/types/app';
import { FC, useEffect, useState } from 'react';
import DirectDeposit from './elements/DirectDeposit';
import ThirdPartyDeposit from './elements/ThirdPartyDeposit';
import USDT from './elements/USDT';
import VIPPay from './elements/VIPPay';
import styles from './index.module.scss';

export type RechargePageComponent = FC<
  Readonly<{
    payTypeList?: PayTypeList[] | ErrorData;
  }>
>;

const RechargePage: RechargePageComponent = ({ payTypeList }) => {
  const { setPayTypeList } = useAccountStore((state) => state);
  const [activeSidebarItem, setActiveSidebarItem] = useState(0);
  const payTypeListSide = useAccountStore((state) => state.payTypeList);

  useEffect(() => {
    if (payTypeList && !('message' in payTypeList)) {
      setPayTypeList(payTypeList);
    }
  }, [payTypeList]);

  return (
    <>
      <RechargeSidebar activeSidebarItem={activeSidebarItem} setActiveSidebarItem={setActiveSidebarItem} />
      <div className={styles.recharge__content}>
        {activeSidebarItem === 0 && <DirectDeposit />}
        {activeSidebarItem === 1 && <VIPPay />}
        {activeSidebarItem === 2 && <ThirdPartyDeposit type='AliPay' />}
        {activeSidebarItem === 3 && <ThirdPartyDeposit type='QQPay' />}
        {activeSidebarItem === 4 && <ThirdPartyDeposit type='WeChat' />}
        {activeSidebarItem === 5 && <USDT />}
      </div>
    </>
  );
};

export default RechargePage;
