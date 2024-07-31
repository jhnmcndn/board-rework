'use client';

import CSPop from '@/app/customer-service/components/CSPop';
import FAQ from '@/app/customer-service/components/FAQ';
import Iframe from '@/app/customer-service/components/Iframe';
import styles from '@/app/customer-service/components/MainContent/index.module.scss';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { useCSStore } from '@/components/Providers/CSStoreProvider';
import { CustomerService, ErrorData, MessageCommonProblems } from '@/types/app';
import { CustomerServiceData } from '@/types/fns';
import { FC, useEffect } from 'react';

export type MainContentComponentProps = {
  hasCSData: boolean;
  csData: CustomerServiceData;
  faq: ErrorData | MessageCommonProblems[] | undefined;
};
export type MainContentComponent = FC<Readonly<MainContentComponentProps>>;

const MainContent: MainContentComponent = ({ hasCSData, csData, faq }) => {
  const theme = useAccountStore((state) => state.theme);
  const { activeTab, setCS } = useCSStore((state) => state);

  useEffect(() => {
    if (hasCSData) {
      setCS(csData as CustomerService[]);
    }
  }, []);

  return (
    <section className={styles.mainContent} data-theme={theme}>
      {activeTab === 0 && <Iframe />}
      {hasCSData && activeTab === 1 && <CSPop />}
      {!hasCSData ? activeTab === 1 && <FAQ faq={faq} /> : activeTab === 2 && <FAQ faq={faq} />}
    </section>
  );
};

export default MainContent;
