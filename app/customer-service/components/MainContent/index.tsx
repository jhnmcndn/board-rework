'use client';

import CSPop from '@/app/customer-service/components/CSPop';
import Iframe from '@/app/customer-service/components/Iframe';
import styles from '@/app/customer-service/components/MainContent/index.module.scss';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { useCSStore } from '@/components/Providers/CSStoreProvider';
import { useEffect } from 'react';
import FAQ from '../FAQ';

const MainContent = () => {
  const theme = useAccountStore((state) => state.theme);
  const { csData, activeTab, fetchCSData } = useCSStore((state) => state);

  useEffect(() => {
    fetchCSData();
  }, []);

  return (
    <section className={styles.mainContent} data-theme={theme}>
      {activeTab === 0 && <Iframe />}
      {csData.length > 0 && activeTab === 1 && <CSPop />}
      {csData.length < 1 ? activeTab === 1 && <FAQ /> : activeTab === 2 && <FAQ />}
    </section>
  );
};

export default MainContent;
