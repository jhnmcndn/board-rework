'use client';

import { getRecommendDetail } from '@/api/game';
import OtherHeader from '@/components/OtherHeader';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import Sidebar from '@/components/Sidebar';
import { useEffect, useState } from 'react';
import ClaimRecord from '../ClaimRecord';
import MyPromotion from '../MyPromotion';
import PerformanceInquiry from '../PerformanceInquiry';
import styles from './index.module.scss';

const MainContent = () => {
  const [activeSidebarItem, setActiveSidebarItem] = useState(0);
  const theme = useAccountStore((state) => state.theme);
  const [recommendDetailData, setRecommendDetailData] = useState({});
  const list = ['我的推广', '领取记录', '业绩查询'];

  useEffect(() => {
    updateRecommendDetail();
  }, []);

  const updateRecommendDetail = () => {
    getRecommendDetail().then((res) => setRecommendDetailData(res));
  };

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
          {activeSidebarItem === 0 && (
            <MyPromotion recommendDetailData={recommendDetailData} updateRecommendDetail={updateRecommendDetail} />
          )}
          {activeSidebarItem === 1 && <ClaimRecord />}
          {activeSidebarItem === 2 && <PerformanceInquiry />}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
