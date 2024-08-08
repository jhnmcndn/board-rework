'use client';

import { useEffect, useState } from 'react';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { refetch } from '@/api/refetch';
import AddCardModal from '@/app/withdraw/components/AddCardModal';
import Image from 'next/image';
import styles from './index.module.scss';

type ListItem = {
  text: string;
  addIcon: string;
  arrowIcon: string;
  onClick: () => void;
};

const BindCards = () => {
  const theme = useAccountStore((state) => state.theme);
  const bindCardList = useAccountStore((state) => state.bindCardList);
  const fetchBindCardList = useAccountStore((state) => state.fetchBindCardList);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showUSDTModal, setShowUSDTModal] = useState(false);

  const listItems: ListItem[] = [
    {
      text: '绑定银行卡',
      addIcon: 'plusVector.png',
      arrowIcon: 'arrowVector.png',
      onClick: () => setShowAddCardModal((prev) => !prev),
    },
    {
      text: '添加USDT',
      addIcon: 'plusVector.png',
      arrowIcon: 'arrowVector.png',
      onClick: () => setShowUSDTModal((prev) => !prev),
    },
  ];

  useEffect(() => {
    fetchBindCardList();
  }, []);

  const censorMyAccount = (myAccount: string): string => {
    if (myAccount.length < 4) {
      return myAccount;
    }
    return '*'.repeat(myAccount.length - 4) + myAccount.slice(-4);
  };

  return (
    <div className={styles.bindCardContainer}>
      <AddCardModal
        showMe={showAddCardModal}
        onSuccess={() => fetchBindCardList()}
        onClose={() => setShowAddCardModal(!showAddCardModal)}
      />
      <PullToRefresh onRefresh={() => refetch(APIasd_ENDPOINT.BIND_CARD_LIST)}>
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
                <span className={styles.bankAccount}>{censorMyAccount(item?.bankAccount)}</span>
              </li>
            );
          })}
          {listItems.map((item, index) => (
            <li key={index} className={styles.cardList} onClick={item.onClick}>
              <div className={styles.bankDetails}>
                <Image
                  src={require(`@/assets/${theme}/fragments/${item.addIcon}`)}
                  className={styles.leftIcons}
                  width={50}
                  height={50}
                  alt='Add'
                />
                <span className={styles.text}>{item.text}</span>
              </div>
              <Image
                src={require(`@/assets/${theme}/fragments/${item.arrowIcon}`)}
                className={styles.arrowIcon}
                width={26}
                height={50}
                alt='Arrow'
              />
            </li>
          ))}
        </ul>
      </PullToRefresh>
    </div>
  );
};

export default BindCards;
