'use client';

import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { MemberCardList, SpecialBankInfoMap } from '@/types/app';
import { onClickSound } from '@/utils/audioFile';
import classnames from 'classnames';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

const SelfWithdrawal = () => {
  const theme = useAccountStore((state) => state.theme);
  const bindCardList = useAccountStore((state) => state.bindCardList);
  const userBalance = useAccountStore((state) => state.accountNow.balance);
  const [amountToWithdraw, setAmountToWithdraw] = useState('');
  const [showSpecialAddCardModal, setShowSpecialAddCardModal] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [selectedBindCard, setSelectedBindCard] = useState<MemberCardList>({});
  const [bindCards, setBindCards] = useState<MemberCardList[] | undefined>();
  const [selectedCard, setSelectedCard] = useState(selectedBindCard ? selectedBindCard : null);
  const [showSafeBox, setShowSafeBox] = useState(false);
  const [specialCard, setSpecialCard] = useState<SpecialBankInfoMap>({});
  const [alertNotif, setAlertNotif] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [passedBankName, setPassedBankName] = useState('');
  const [passedBankID, setPassedBankID] = useState();

  useEffect(() => {
    setBindCards(bindCardList?.memberCardList);
    // setSelectedBindCard(bindCardList?.memberCardList[0]);
  }, []);

  useEffect(() => {
    setSelectedCard(selectedBindCard);
  }, [selectedBindCard]);

  useEffect(() => {
    // setSpecialCard(bindCardList?.specialBankInfoMap);
    // withdrawPassIsOpen().then((res) => {
    //   dispatch(setWithdrawPassIsSet(res.data?.data));
    // });
  }, []);

  const refreshCardList = () => {
    setBindCards(bindCardList?.memberCardList);
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
    onClickSound('pop');
  };

  return (
    <>
      {/* Should be replaced by openAlert() from useModalStore */}
      {/* <AlertContainer alertMe={alertNotif} notify={alertMessage} /> */}
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
          {bindCards && bindCards.length > 0 && (
            <ul className={styles.selectBindCardList}>
              {bindCards.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={classnames(styles.bankCard, {
                      [styles.selectedCard]: item?.id === selectedBindCard?.id,
                    })}
                    onClick={() => {
                      setSelectedBindCard(item);
                      selectedCard === item ? setSelectedCard(null) : setSelectedCard(item);
                      onClickSound('pop');
                    }}
                  >
                    <div className={styles.bankDetails}>
                      <Image src={item?.bankIcon || ''} width={200} height={200} alt='Bank Icon' />
                      <span
                        className={classnames(styles.toggle, {
                          [styles.toggleSelected]: item?.id === selectedCard?.id,
                        })}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          <div className={styles.addCardsCont}>
            <div
              className={styles.addCard}
              onClick={() => {
                onClickSound('pop');
                setShowAddCardModal(!showAddCardModal);
              }}
            >
              <Image src={require(`@/assets/${theme}/withdraw/plusVector.png`)} width={50} height={50} alt='Add Bank' />
              <span>绑定银行卡</span>
            </div>
            {specialCard &&
              Object.keys(specialCard)?.map((card, index) => {
                return (
                  <div
                    key={index}
                    className={styles.addCard}
                    onClick={() => {
                      setShowSpecialAddCardModal(!showSpecialAddCardModal);
                      // setPassedBankID(specialCard[card]);
                      setPassedBankName(card);
                    }}
                  >
                    <Image
                      src={require(`@/assets/${theme}/withdraw/plusVector.png`)}
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
            <div className={styles.withdrawButton} onClick={handleWithdraw}>
              <span>立即提现</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SelfWithdrawal;
