'use client';

import { FC, useEffect, useState } from 'react';
import { ErrorData, PayTypeList } from '@/types/app';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import RechargeSidebar from '@/app/recharge/components/RechargeSidebar';
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
    <div className={styles.rechargePageContainer}>
      <div className={styles.rechargePageBody}>
        <RechargeSidebar activeSidebarItem={activeSidebarItem} setActiveSidebarItem={setActiveSidebarItem} />
        <div className={styles.child}>Recharge Page</div>
      </div>
    </div>
  );
};

export default RechargePage;
