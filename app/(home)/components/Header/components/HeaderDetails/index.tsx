'use client';

import dynamic from 'next/dynamic';
import { isMobile } from 'react-device-detect';
import styles from './index.module.scss';

const CoinPurse = dynamic(() => import('@/components/CoinPurse'), { ssr: false });

const HeaderDetails = () => {
  return (
    <div className={styles.headerDetails}>
      <div className={styles.coinPurseWrapper}>
        <div className={styles.coinPurseContainer}>
          <CoinPurse position='relative' top={0} left={isMobile ? '0.15rem' : '0'} />
        </div>
      </div>
    </div>
  );
};

export default HeaderDetails;
