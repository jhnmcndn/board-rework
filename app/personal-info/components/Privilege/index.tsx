'use client';

import styles from '@/app/personal-info/components/Privilege/index.module.scss';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import BottomContent from './components/BottomContent';
import TopContent from './components/TopContent';

const Privilege = () => {
  const theme = useAccountStore((state) => state.theme);
  const accountInfo = useAccountStore((state) => state.accountInfo);

  // Computation for progress bar
  const codeTotal = accountInfo.codeTotal || 0;
  const nextLevelIntegral = accountInfo.nextLevelIntegral || 0;
  const nextLevelIntegralToFixed = nextLevelIntegral % 1 !== 0 ? nextLevelIntegral.toFixed(2) : nextLevelIntegral;
  const progressBar = (codeTotal / (codeTotal + nextLevelIntegral)) * 100 || 0;

  // Determining vip level
  const vipLevel = accountInfo.vip || 1;
  const isMaxVipLevel = vipLevel === 50;
  const nextVipLevel = isMaxVipLevel ? 50 : vipLevel + 1;

  return (
    <div className={styles.container} data-theme={theme}>
      <div className={styles.wrapper}>
        <TopContent
          nextLevelIntegralToFixed={nextLevelIntegralToFixed}
          nextVipLevel={nextVipLevel}
          progressBar={progressBar}
          vipLevel={vipLevel}
        />
        <BottomContent vipLevel={vipLevel} />
      </div>
    </div>
  );
};

export default Privilege;
