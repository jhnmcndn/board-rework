'use client';

import OtherHeader from '@/components/OtherHeader';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import Sidebar from '@/components/Sidebar';
import { useState } from 'react';
import ClaimRecord from '../ClaimRecord';
import MyPromotion from '../MyPromotion';
import PerformanceInquiry from '../PerformanceInquiry';
import styles from './index.module.scss';

const MainContent = () => {
  const [activeSidebarItem, setActiveSidebarItem] = useState(0);
  const theme = useAccountStore((state) => state.theme);
  const list = ['我的推广', '领取记录', '业绩查询'];

  return (
    <div className={styles.washCodePage}>
      <OtherHeader headerTitle={'推广代理'} showPurse />
      <div className={styles.wrapper}>
        <Sidebar
          sidebarItems={list}
          activeSidebarItem={activeSidebarItem}
          setActiveSidebarItem={setActiveSidebarItem}
        />
        <div className={styles.mainContent} data-theme={theme}>
          {activeSidebarItem === 0 && <PerformanceInquiry />}
          {activeSidebarItem === 1 && <ClaimRecord />}
          {activeSidebarItem === 2 && <MyPromotion />}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
