'use client';

import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useModalStore from '@/store/modals';
import { sfx } from '@/utils/audioFile';
import classnames from 'classnames';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { MemberCardList } from '@/types/app';

const SelfWithdrawal = () => {
  const theme = useAccountStore((state) => state.theme);
  const bindCardList = useAccountStore((state) => state.bindCardList);
  const userBalance = useAccountStore((state) => state.accountNow.balance);
  const setSelectedBank = useAccountStore((state) => state.setSelectedBank);
  const setWithdrawAmount = useAccountStore((state) => state.setWithdrawAmount);
  const withdrawAmount = useAccountStore((state) => state.withdrawAmount);
  const [selectedCard, setSelectedCard] = useState<MemberCardList | null>(null);
  const { openBindBank, openBindUSDT, openPassCode, openAlert } = useModalStore();

  useEffect(() => {
    if (bindCardList?.memberCardList && bindCardList.memberCardList.length > 0) {
      setSelectedCard(bindCardList.memberCardList[0]);
    }
  }, [bindCardList]);

  useEffect(() => {
    setSelectedBank(selectedCard?.id);
  }, [selectedCard]);

  const handleWithdraw = () => {
    if (!withdrawAmount) {
      openAlert({ body: '请输入正确金额' });
      return;
    } else if (!selectedCard) {
      openAlert({ body: '请选择提现卡' });
      return;
    } else {
      openPassCode();
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
            maxLength={10}
            onChange={(e) => {
              const value = e.target.value;
              setWithdrawAmount(value ? Number(value) : undefined);
            }}
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
                    setSelectedCard(item);
                    setSelectedBank(selectedCard?.id);
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
          {Object.entries(bindCardList?.specialBankInfoMap ?? {}).map(([key, value], index) => {
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
                <span>{key}</span>
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
