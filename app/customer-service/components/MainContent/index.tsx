'use client';

import CSPop from '@/app/customer-service/components/CSPop';
import Iframe from '@/app/customer-service/components/Iframe';
import styles from '@/app/customer-service/components/MainContent/index.module.scss';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { useCSStore } from '@/components/Providers/CSStoreProvider';
import { CustomerService } from '@/types/app';
import { CustomerServiceData } from '@/types/fns';
import { FC } from 'react';

export type MainContentComponentProps = { hasCSData: boolean; csData: CustomerServiceData };
export type MainContentComponent = FC<Readonly<MainContentComponentProps>>;

const MainContent: MainContentComponent = ({ hasCSData, csData }) => {
  const theme = useAccountStore((state) => state.theme);
  const activeTab = useCSStore((state) => state.activeTab);
  const setCS = useCSStore((state) => state.setCS);

  const setStoreData = () => {
    if (hasCSData) {
      setCS(csData as CustomerService[]);
    }
  };

  return (
    <section className={styles.mainContent} data-theme={theme} onLoad={setStoreData}>
      {activeTab === 0 && <Iframe />}
      {hasCSData && activeTab === 1 && <CSPop />}
      {/* {csActiveTab === 0 && <CsIframe />}
      {!!csPopData?.length && csActiveTab === 1 && <CsPop csPopData={csPopData} />}
      {!csPopData?.length ? csActiveTab === 1 && <FAQComponent /> : csActiveTab === 2 && <FAQComponent />} */}
    </section>
  );
};

export default MainContent;
