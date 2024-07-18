'use client';

import styles from '@/app/customer-service/components/MainContent/index.module.scss';
import { useStore } from '@/components/providers/StoreProvider';
import { CustomerServiceData } from '@/types/fns';
import { FC } from 'react';

export type MainContentProps = { customerServiceData: CustomerServiceData };
export type MainContentComponent = FC<Readonly<MainContentProps>>;

const MainContent: MainContentComponent = ({ customerServiceData }) => {
  const theme = useStore((state) => state.theme);

  return (
    <section className={styles.mainContent} data-theme={theme}>
      {/* {csActiveTab === 0 && <CsIframe />}
      {!!csPopData?.length && csActiveTab === 1 && <CsPop csPopData={csPopData} />}
      {!csPopData?.length ? csActiveTab === 1 && <FAQComponent /> : csActiveTab === 2 && <FAQComponent />} */}
    </section>
  );
};

export default MainContent;
