'use client';

import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import Sidebar from '@/components/Sidebar';
import { BoxAccountResponse, TFundDetails } from '@/types/app';
import { FC, useState } from 'react';
import FundDetails from '../FundDetails';
import Funds from '../Funds';
import styles from './index.module.scss';

const MainContent: FC<
  Readonly<{
    boxAccount: BoxAccountResponse;
    fundDetails: TFundDetails[];
  }>
> = ({ boxAccount, fundDetails }) => {
  const theme = useAccountStore((s) => s.theme);
  const sidebarItems = ['资金转入', '资金取出', '互转明细'];
  const [activeSidebarItem, setActiveSidebarItem] = useState(0);

  return (
    <main className={styles.container}>
      <Sidebar
        sidebarItems={sidebarItems}
        activeSidebarItem={activeSidebarItem}
        setActiveSidebarItem={setActiveSidebarItem}
      />
      <div className={styles.content} data-theme={theme}>
        {activeSidebarItem === 0 && <Funds type='transfer' boxAccount={boxAccount} />}
        {activeSidebarItem === 1 && <Funds type='withdraw' boxAccount={boxAccount} />}
        {activeSidebarItem === 2 && <FundDetails fundDetails={fundDetails} />}
      </div>
    </main>
  );
};

export default MainContent;
