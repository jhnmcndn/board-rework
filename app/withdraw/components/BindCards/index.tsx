'use client';

import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { refetch } from '@/api/refetch';
import Image from 'next/image';
import { API_ENDPOINT } from '@/types/enums';
import useModalStore from '@/store/modals';
import useImages from '@/hooks/useImages';
import styles from './index.module.scss';

type ListItem = {
  text: string;
  onClick: () => void;
};

const BindCards = () => {
  const theme = useAccountStore((state) => state.theme);
  const bindCardList = useAccountStore((state) => state.bindCardList);
  const { openBindBank, openBindUSDT } = useModalStore();
  const { images } = useImages();

  const listItems: ListItem[] = [
    {
      text: '绑定银行卡',
      onClick: () => openBindBank(),
    },
    {
      text: '添加USDT',
      onClick: () => openBindUSDT(),
    },
  ];

  const censorMyAccount = (myAccount: string): string => {
    if (myAccount.length < 4) {
      return myAccount;
    }
    return '*'.repeat(myAccount.length - 4) + myAccount.slice(-4);
  };

  return (
    <div className={styles.bindCardContainer}>
      <PullToRefresh onRefresh={() => refetch(API_ENDPOINT.BIND_CARD_LIST)}>
        <ul className={styles.cardWrapper}>
          {bindCardList?.memberCardList?.map((item, index) => {
            return (
              <li key={index} className={styles.cardList}>
                <div className={styles.bankDetails}>
                  <Image
                    src={item?.bankIcon || ''}
                    className={styles.leftIcons}
                    width={100}
                    height={100}
                    alt='Bank Icon'
                  />
                  <span className={styles.text}>{item?.bankName}</span>
                </div>
                <span className={styles.bankAccount}>{censorMyAccount(item?.bankAccount as string)}</span>
              </li>
            );
          })}
          {listItems.map((item, index) => (
            <li key={index} className={`${styles.cardList} ${styles.canClick}`} onClick={item.onClick}>
              <div className={styles.bankDetails}>
                <Image src={images.plusSign} className={styles.leftIcons} width={50} height={50} alt='Add' />
                <span className={styles.text}>{item.text}</span>
              </div>
              <Image src={images.arrowSign} className={styles.arrowIcon} width={26} height={50} alt='Arrow' />
            </li>
          ))}
        </ul>
      </PullToRefresh>
    </div>
  );
};

export default BindCards;
