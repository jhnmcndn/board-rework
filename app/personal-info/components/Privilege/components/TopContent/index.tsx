'use client';

import styles from '@/app/personal-info/components/Privilege/index.module.scss';
import { getCrownImageByTheme } from '@/app/personal-info/utils/getCrownImageByTheme';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import Image from 'next/image';
import { FC } from 'react';

export type TopContentComponent = FC<
  Readonly<{
    vipLevel: number;
    nextVipLevel: number;
    progressBar: number;
    nextLevelIntegralToFixed: string | number;
  }>
>;

const TopContent: TopContentComponent = ({ vipLevel, nextVipLevel, progressBar, nextLevelIntegralToFixed }) => {
  const theme = useAccountStore((state) => state.theme);

  // Assets
  const crownImg = getCrownImageByTheme(theme);
  const vipBadgeImg = require('@/assets/commons/vipBadge.png');
  const currentVipLevelImg = require(`@/assets/commons/vipLevels/vip${vipLevel}.png`);
  const nextVipLevelImg = require(`@/assets/commons/vipLevels/vip${nextVipLevel}.png`);

  return (
    <div className={styles.topContent}>
      <div className={styles.topContentWrapper}>
        <div className={styles.topContentHeader}>
          <Image src={crownImg} alt='Crown' />
          <span>当前会员等级</span>
        </div>
        <div className={styles.vip}>
          <div className={styles.badge}>
            <Image src={vipBadgeImg} alt='VIP Badge' />
          </div>
          <div className={styles.progressDetails}>
            <span className={styles.level}>当前会员等级: VIP {vipLevel}</span>
            <div className={styles.progress}>
              <div className={styles.currentVipLevel}>
                <Image src={currentVipLevelImg} alt='Current VIP Level' />
              </div>
              <div className={styles.progressBarWrapper}>
                <div className={styles.progressBar} style={{ width: `${progressBar}%` }} />
              </div>
              <div className={styles.nextVipLevel}>
                <Image src={nextVipLevelImg} alt='Next VIP Level' />
              </div>
            </div>
            <span className={styles.tooltip}>
              还差{nextLevelIntegralToFixed}打码量升级到VIP{vipLevel + 1}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopContent;
