'use client';

import RechargeSidebar from '@/app/recharge/elements/RechargeSidebar';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { RECHARGE_OPTION } from '@/constants/enums';
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
  const { payTypeList: payTypeData, setPayTypeList } = useAccountStore((state) => state);
  const [activeSidebar, setActiveSidebar] = useState(RECHARGE_OPTION.DIRECT);
  const usdtData = payTypeData.filter((item) => item.id === RECHARGE_OPTION.USDT)[0];

  useEffect(() => {
    if (payTypeList && !('message' in payTypeList)) {
      setPayTypeList(payTypeList);
    }
  }, [payTypeList]);

  const renderRechargeProcess = () => {
    switch (activeSidebar) {
      case RECHARGE_OPTION.DIRECT:
        return <DirectDeposit />;
      case RECHARGE_OPTION.USDT:
        return <USDT usdtData={usdtData} />;
      case RECHARGE_OPTION.VIP_PAY:
        return <VIPPay />;
      default:
        return <ThirdPartyDeposit option={activeSidebar} />;
    }
  };

  return (
    <>
      <RechargeSidebar activeSidebarItem={activeSidebar} setActiveSidebarItem={setActiveSidebar} />
      <div className={styles.recharge__content}>{renderRechargeProcess()}</div>
    </>
  );
};

export default RechargePage;
