'use client';

import Giftbox from '@/components/Giftbox';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useImages from '@/hooks/useImages';
import { VIPGiftInfo, VIPSetList } from '@/types/app';
import { THEME } from '@/types/enums';
import Image from 'next/image';
import { FC } from 'react';
import styles from './index.module.scss';

const Privilege: FC<
  Readonly<{
    theme: THEME;
    vipGiftInfo: VIPGiftInfo;
  }>
> = ({ theme, vipGiftInfo }) => {
  const { images } = useImages();
  const { codeTotal, nextLevelIntegral, vip } = useAccountStore((s) => s.accountInfo);
  const vipProgress = (codeTotal / (codeTotal + nextLevelIntegral)) * 100 || 0;
  const currentUserVipInfo =
    vipGiftInfo.vipSetList.find((v) => v.level === vip) ||
    ({
      bcode: 0,
      level: 1,
      levelBonus: 0,
      weekBonus: 0.18,
    } satisfies VIPSetList);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.topContent}>
          <div className={styles.topContentWrapper} data-theme={theme}>
            <div className={styles.topContentHeader}>
              <Image src={images.crown} alt='VIP crown' width={42} height={35} />
              <span>当前会员等级</span>
            </div>
            <div className={styles.vipProgress}>
              <div className={styles.vipBadge}>
                <Image src={images.vipBadge} alt='VIP badge' />
              </div>
              <div className={styles.progressBarWrapper}>
                <span className={styles.progressBarHeader}>当前会员等级: VIP {vip}</span>
                <div className={styles.progressBarDetails}>
                  <div className={styles.currentVipLevel}>
                    <Image src={images.vipLevel} alt='Current vip level' width={462} height={171} />
                  </div>
                  <div className={styles.progressBar} data-theme={theme}>
                    <div
                      className={styles.progress}
                      style={{
                        width: vipProgress + '%',
                      }}
                    />
                  </div>
                  <div className={styles.nextVipLevel}>
                    <Image src={images.vipNextLevel} alt='Next vip level' width={462} height={171} />
                  </div>
                </div>
                <span className={styles.progressBarNote}>
                  还差 {nextLevelIntegral.toFixed(2)} 打码量升级到VIP{vip}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottomContent}>
          <div className={styles.bottomContentWrapper}>
            <div className={styles.bottomContentHeader}>
              <div className={styles.vipLevelWrapper}>
                <div className={styles.vipLevel}>
                  <span>VIP{vip}</span>
                </div>
              </div>
              <span className={styles.bottomContentTitle}>我享有的特权</span>
            </div>
            <div className={styles.giftboxContainer}>
              <div className={styles.giftboxWrapper}>
                <Giftbox
                  backgroundColor='pink'
                  bonusStatus={vipGiftInfo.levelBonusStatus === 1 ? '未领取' : '暂不可领取'}
                  levelBonus={currentUserVipInfo.levelBonus.toFixed(2)}
                  title='晋级彩金'
                  type='jackpot'
                />
                <Giftbox
                  backgroundColor='blue'
                  bonusStatus={vipGiftInfo.weekBonusStatus === 1 ? '未领取' : '已领取'}
                  levelBonus={currentUserVipInfo.weekBonus.toFixed(2)}
                  title='周礼金'
                  type='gift'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privilege;
