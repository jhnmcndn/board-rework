'use client';

import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useModalStore from '@/store/modals';
import { sfx } from '@/utils/audioFile';
import classnames from 'classnames';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

const SelfWithdrawal = () => {
  const theme = useAccountStore((state) => state.theme);
  const bindCardList = useAccountStore((state) => state.bindCardList);
  const userBalance = useAccountStore((state) => state.accountNow.balance);
  const [amountToWithdraw, setAmountToWithdraw] = useState('');
  const [selectedCard, setSelectedCard] = useState(bindCardList?.memberCardList?.[0]);
  const [showSafeBox, setShowSafeBox] = useState(false);
  const fetchBindCardList = useAccountStore((state) => state.fetchBindCardList);
  const { openBindBank, openBindUSDT } = useModalStore();

  useEffect(() => {
    fetchBindCardList();
  }, []);

  const handleToggleClick = (item: any) => {
    setSelectedCard((prevSelectedCard) => (prevSelectedCard?.id === item.id ? null : item));
  };

  const handleWithdraw = () => {
    setShowSafeBox(true);
    if (!amountToWithdraw) {
      alert('请输入正确金额');
      return;
    }

    if (!selectedCard) {
      alert('请选择提现卡');
      return;
    }
  };

  return (
    <div className={styles.selfWithdrawalWrapper}>
      <section className={styles.panel}>
        <div className={styles.headerWrapper}>
          <span>提现金额</span>
        </div>
        <div className={styles.inputField}>
          <input
            type='text'
            placeholder='请输入提现金额'
            onKeyDown={(e) =>
              !['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Delete', 'Backspace'].includes(e.key) &&
              e.preventDefault()
            }
            value={amountToWithdraw}
            maxLength={10}
            onChange={(e) => setAmountToWithdraw(e.target.value)}
          />
          <div className={styles.userBalWrapper}>
            <span>当前打码量可提现金额: {userBalance || 0}</span>
          </div>
        </div>
      </section>

      <section className={`${styles.panel} ${styles.secondPanel}`}>
        <div className={styles.headerWrapper}>
          <span>提现方式</span>
        </div>
        {bindCardList.memberCardList && bindCardList?.memberCardList?.length > 0 && (
          <ul className={styles.selectBindCardList}>
            {bindCardList?.memberCardList?.map((item, index) => {
              return (
                <li
                  key={index}
                  data-click={sfx.popAudio}
                  className={classnames(styles.bankCard, {
                    [styles.selectedCard]: item?.id === selectedCard?.id,
                  })}
                  onClick={() => {
                    selectedCard === item ? setSelectedCard(undefined) : setSelectedCard(item);
                  }}
                >
                  <div className={styles.bankDetails}>
                    <Image src={item?.bankIcon || ''} width={200} height={200} alt='Bank Icon' />
                    {item?.bankName} 尾号 {item?.bankAccount?.substr(item?.bankAccount?.length - 4)}
                  </div>
                  <span
                    key={item.id}
                    className={classnames(styles.toggle, {
                      [styles.toggleSelected]: item?.id === selectedCard?.id,
                    })}
                    onClick={() => handleToggleClick(item)}
                  />
                </li>
              );
            })}
          </ul>
        )}
        <div className={styles.addCardsCont}>
          <div
            data-click={sfx.popAudio}
            className={styles.addCard}
            onClick={() => {
              openBindBank();
            }}
          >
            <Image src={require(`@/assets/${theme}/fragments/plusVector.png`)} width={50} height={50} alt='Add Bank' />
            <span>绑定银行卡</span>
          </div>
          {bindCardList?.specialBankInfoMap &&
            Object.keys(bindCardList?.specialBankInfoMap).map((card, index) => {
              return (
                <div
                  key={index}
                  className={styles.addCard}
                  onClick={() => {
                    openBindUSDT();
                  }}
                >
                  <Image
                    src={require(`@/assets/${theme}/fragments/plusVector.png`)}
                    width={50}
                    height={50}
                    alt='Add Bank'
                  />
                  <span>{card}</span>
                </div>
              );
            })}
        </div>
      </section>

      <section className={`${styles.panel} ${styles.thirdPanel}`}>
        <div className={styles.withdrawButtonWrapper}>
          <div className={styles.left}>
            <div className={styles.details}>
              <span className={styles.title}>还需打码</span>
              <span className={styles.hardCodeNaDigit}>0.00</span>
            </div>
          </div>
          <div data-click={sfx.popAudio} className={styles.withdrawButton} onClick={handleWithdraw}>
            <span>立即提现</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SelfWithdrawal;
