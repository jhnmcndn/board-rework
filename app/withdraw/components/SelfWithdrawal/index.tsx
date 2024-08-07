'use client';

import { useEffect, useState } from 'react';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { MemberCardList, SpecialBankInfoMap } from '@/types/app';
import { onClickSound } from '@/utils/audioFile';
import AddCardModal from '@/app/withdraw/components/AddCardModal';
import classnames from 'classnames';
import Image from 'next/image';
import styles from './index.module.scss';

const SelfWithdrawal = () => {
  const theme = useAccountStore((state) => state.theme);
  const bindCardList = useAccountStore((state) => state.bindCardList);
  const userBalance = useAccountStore((state) => state.accountNow.balance);
  const [amountToWithdraw, setAmountToWithdraw] = useState('');
  const [showSpecialAddCardModal, setShowSpecialAddCardModal] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [selectedBindCard, setSelectedBindCard] = useState<MemberCardList>({});
  const [selectedCard, setSelectedCard] = useState(bindCardList?.memberCardList?.[0]);
  const [showSafeBox, setShowSafeBox] = useState(false);
  const [specialCard, setSpecialCard] = useState<SpecialBankInfoMap>({});
  const [alertNotif, setAlertNotif] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const fetchBindCardList = useAccountStore((state) => state.fetchBindCardList);

  const [passedBankName, setPassedBankName] = useState('');
  const [passedBankID, setPassedBankID] = useState();

  useEffect(() => {
    fetchBindCardList();
  }, []);

  const handleToggleClick = (item) => {
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
    onClickSound('pop');
  };

  return (
    <>
      {/* Should be replaced by openAlert() from useModalStore */}
      {/* <AlertContainer alertMe={alertNotif} notify={alertMessage} /> */}
      <AddCardModal
        showMe={showAddCardModal}
        onClose={() => {
          setShowAddCardModal(!showAddCardModal);
        }}
        special={false}
      />
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
          {bindCardList?.memberCardList?.length > 0 && (
            <ul className={styles.selectBindCardList}>
              {bindCardList?.memberCardList?.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={classnames(styles.bankCard, {
                      [styles.selectedCard]: item?.id === selectedCard?.id,
                    })}
                    onClick={() => {
                      setSelectedBindCard(item);
                      selectedCard === item ? setSelectedCard(null) : setSelectedCard(item);
                      onClickSound('pop');
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
              className={styles.addCard}
              onClick={() => {
                onClickSound('pop');
                setShowAddCardModal(!showAddCardModal);
              }}
            >
              <Image
                src={require(`@/assets/${theme}/fragments/plusVector.png`)}
                width={50}
                height={50}
                alt='Add Bank'
              />
              <span>绑定银行卡</span>
            </div>
            {bindCardList?.specialBankInfoMap &&
              Object.keys(bindCardList?.specialBankInfoMap).map((card, index) => {
                return (
                  <div
                    key={index}
                    className={styles.addCard}
                    onClick={() => {
                      setShowSpecialAddCardModal(!showSpecialAddCardModal);
                      setPassedBankID(specialCard[card]);
                      setPassedBankName(card);
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
