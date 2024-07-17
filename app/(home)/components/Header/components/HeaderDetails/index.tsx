'use client';

import { isMobile } from 'react-device-detect';
import styles from './index.module.scss';
import CoinPurse from '@/components/CoinPurse';

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
