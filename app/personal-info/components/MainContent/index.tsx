'use client';

import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import Sidebar from '@/components/Sidebar';
import { VIPGiftInfo } from '@/types/app';
import { FC, useState } from 'react';
import Betting from '../Betting';
import Privilege from '../Privilege';
import VipDetails from '../VipDetails';
import styles from './index.module.scss';

const MainContent: FC<
  Readonly<{
    vipGiftInfo: VIPGiftInfo;
  }>
> = ({ vipGiftInfo }) => {
  const theme = useAccountStore((s) => s.theme);
  const sidebarItems = ['VIP特权', 'VIP详情', '投注记录', '安全中心', '账户明细', '游戏余额'];
  const [activeSidebarItem, setActiveSidebarItem] = useState(0);
  return (
    <main className={styles.container}>
      <Sidebar
        sidebarItems={sidebarItems}
        activeSidebarItem={activeSidebarItem}
        setActiveSidebarItem={setActiveSidebarItem}
      />
      <section className={styles.wrapper}>
        <div className={styles.content} data-theme={theme}>
          {activeSidebarItem === 0 && <Privilege theme={theme} vipGiftInfo={vipGiftInfo} />}
          {activeSidebarItem === 1 && <VipDetails vipGiftInfo={vipGiftInfo} />}
          {activeSidebarItem === 2 && <Betting />}
        </div>
      </section>
    </main>
  );
};

export default MainContent;
