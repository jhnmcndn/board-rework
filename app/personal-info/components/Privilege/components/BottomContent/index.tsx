'use client';

import styles from '@/app/personal-info/components/Privilege/index.module.scss';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { useVipGiftInfoStore } from '@/components/Providers/VipGiftInfoStoreProvider';
import { FC, useEffect, useMemo } from 'react';
import Giftbox from '../Giftbox';

export type BottomContentComponent = FC<
  Readonly<{
    vipLevel: number;
  }>
>;

const BottomContent: BottomContentComponent = ({ vipLevel }) => {
  const fetchVipGiftInfo = useVipGiftInfoStore((state) => state.fetchVipGiftInfo);
  const vipGiftInfo = useVipGiftInfoStore((state) => state.vipGiftInfo);
  const accountInfo = useAccountStore((state) => state.accountInfo);

  useEffect(() => {
    fetchVipGiftInfo();
  }, []);

  const currentUserVipSet = useMemo(() => {
    const defaultVipSet = {
      level: 1,
      levelBonus: 0.0,
      weekBonus: 0.18,
      bcode: 0.0,
    };
    if (!vipGiftInfo.vipSetList) return defaultVipSet;
    const userVipSet = vipGiftInfo.vipSetList.find((vipSet) => vipSet.level === accountInfo.vip);
    if (!userVipSet) return defaultVipSet;
    return userVipSet;
  }, [vipGiftInfo, accountInfo]);

  const levelBonusStatus = vipGiftInfo.levelBonusStatus || 0;
  const weekBonusStatus = vipGiftInfo.weekBonusStatus || 0;
  const levelBonus = currentUserVipSet.levelBonus ? currentUserVipSet.levelBonus.toFixed(2) : '0.00';
  const weekBonus = currentUserVipSet.weekBonus ? currentUserVipSet.weekBonus.toFixed(2) : '0.00';

  return (
    <div className={styles.bottomContent}>
      <div className={styles.giftContainer}>
        <div className={styles.giftHeader}>
          <div className={styles.vipLevel}>
            <span>VIP{vipLevel}</span>
          </div>
          <div className={styles.title}>我享有的特权</div>
        </div>
        <div className={styles.giftboxContainer}>
          <div className={styles.giftboxWrapper}>
            <Giftbox
              giftboxColor='pink'
              img={require(`@/assets/commons/vipImages/advancementJackpot.png`)}
              info={levelBonusStatus === 1 ? '未领取' : '暂不可领取'}
              title='晋级彩金'
              yenCount={`¥${levelBonus}`}
            />
            <Giftbox
              giftboxColor='blue'
              img={require(`@/assets/commons/vipImages/gift.png`)}
              info={weekBonusStatus === 1 ? '未领取' : '已领取'}
              title='周礼金'
              yenCount={`¥${weekBonus}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomContent;
