'use client';

import styles from '@/app/personal-info/components/Privilege/index.module.scss';
import { getCrownImageByTheme } from '@/app/personal-info/utils/getCrownImageByTheme';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import Image from 'next/image';

const Privilege = () => {
  const theme = useAccountStore((state) => state.theme);
  const accountInfo = useAccountStore((state) => state.accountInfo);

  // Computation for progress bar
  const codeTotal = accountInfo.codeTotal || 0;
  const nextLevelIntegral = accountInfo.nextLevelIntegral || 0;
  const nextLevelIntegralToFixed = nextLevelIntegral % 1 !== 0 ? nextLevelIntegral.toFixed(2) : nextLevelIntegral;
  const progressBar = (codeTotal / (codeTotal + nextLevelIntegral)) * 100 || 0;

  // Determining current vip level
  const vipLevel = accountInfo.vip || 1;
  const isMaxVipLevel = vipLevel === 50;
  const nextVipLevel = isMaxVipLevel ? 50 : vipLevel + 1;

  return (
    <div className={styles.container} data-theme={theme}>
      <div className={styles.wrapper}>
        <div className={styles.topContent}>
          <div className={styles.topContentWrapper}>
            <div className={styles.topContentHeader}>
              <Image src={getCrownImageByTheme(theme)} alt='Crown' />
              <span>当前会员等级</span>
            </div>
            <div className={styles.vip}>
              <div className={styles.badge}>
                <Image src={require('@/assets/commons/vipBadge.png')} alt='VIP Badge' />
              </div>
              <div className={styles.progressDetails}>
                <span className={styles.level}>当前会员等级: VIP {vipLevel}</span>
                <div className={styles.progress}>
                  <div className={styles.currentVipLevel}>
                    <Image src={require(`@/assets/commons/vipLevels/vip${vipLevel}.png`)} alt='Current VIP Level' />
                  </div>
                  <div className={styles.progressBarWrapper}>
                    <div className={styles.progressBar} style={{ width: `${progressBar}%` }} />
                  </div>
                  <div className={styles.nextVipLevel}>
                    <Image src={require(`@/assets/commons/vipLevels/vip${nextVipLevel}.png`)} alt='Next VIP Level' />
                  </div>
                </div>
                <div className={styles.tooltip}>
                  还差{nextLevelIntegralToFixed}打码量升级到VIP{vipLevel + 1}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privilege;
