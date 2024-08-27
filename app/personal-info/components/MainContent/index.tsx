'use client';

import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import Sidebar from '@/components/Sidebar';
import { GameCategoryList, TGameBalance, TradeTypes, VIPGiftInfo } from '@/types/app';
import { FC, useState } from 'react';
import AccountDetails from '../AccountDetails';
import Betting from '../Betting';
import GameBalance from '../GameBalance';
import Privilege from '../Privilege';
import SecurityCenter from '../SecurityCenter';
import VipDetails from '../VipDetails';
import styles from './index.module.scss';

const MainContent: FC<
  Readonly<{
    vipGiftInfo: VIPGiftInfo;
    gameCategoryList: GameCategoryList[];
    tradeTypes: TradeTypes[];
    gameBalance: TGameBalance[];
  }>
> = ({ vipGiftInfo, gameCategoryList, tradeTypes, gameBalance }) => {
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
          {activeSidebarItem === 2 && <Betting gameCategoryList={gameCategoryList} />}
          {activeSidebarItem === 3 && <SecurityCenter />}
          {activeSidebarItem === 4 && <AccountDetails tradeTypes={tradeTypes} />}
          {activeSidebarItem === 5 && <GameBalance gameBalance={gameBalance} />}
        </div>
      </section>
    </main>
  );
};

export default MainContent;
