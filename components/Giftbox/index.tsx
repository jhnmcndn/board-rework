'use client';

import { receiveVipGift } from '@/api/platform';
import { refetch } from '@/api/refetch';
import useImages from '@/hooks/useImages';
import useModalStore from '@/store/modals';
import { API_ENDPOINT } from '@/types/enums';
import classNames from 'classnames';
import Image from 'next/image';
import { FC } from 'react';
import { useAccountStore } from '../Providers/AccountStoreProvider';
import styles from './index.module.scss';

const Giftbox: FC<
  Readonly<{
    backgroundColor: 'pink' | 'blue' | 'orange';
    type: 'jackpot' | 'gift';
    title: string;
    levelBonus: string;
    bonusStatus: string;
  }>
> = ({ backgroundColor, type, title, levelBonus, bonusStatus }) => {
  const { images } = useImages();
  const imgSrc = type === 'gift' ? images.vipGift : images.vipAdvJackpot;
  const openAlert = useModalStore((s) => s.openAlert);
  const fetchAccountNow = useAccountStore((s) => s.fetchAccountNow);
  const handleReceiveGift = async ({ type }: { type: number }) => {
    const response = await receiveVipGift({ type });
    openAlert(response.message);
    refetch(API_ENDPOINT.VIP_GIFT_INFO);
    fetchAccountNow();
  };
  return (
    <div className={styles.container}>
      <div
        className={classNames(styles.header, {
          [styles[backgroundColor]]: backgroundColor,
        })}
      >
        <Image src={imgSrc} alt='Gift' width={97} height={83} />
        <span className={styles.giftTitle}>{title}</span>
      </div>
      <div
        className={classNames(styles.giftContent, {
          [styles[backgroundColor]]: backgroundColor,
        })}
      >
        <span className={styles.levelBonus}>¥{levelBonus}</span>
        <div
          className={classNames(styles.bonusStatus, {
            [styles.active]: bonusStatus === '未领取',
          })}
          onClick={() => handleReceiveGift({ type: type === 'jackpot' ? 1 : 2 })}
        >
          {bonusStatus}
        </div>
      </div>
    </div>
  );
};

export default Giftbox;
