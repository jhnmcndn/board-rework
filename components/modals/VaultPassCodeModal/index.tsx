'use client';

import { setWithdrawPass, withdrawBank } from '@/api/pay';
import { boxAccount, setBoxPass } from '@/api/platform';
import Button from '@/components/Fragments/Button';
import HeaderModalTitle from '@/components/HeaderModalTitle';
import ModalLayout from '@/components/modals/ModalLayout';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useIsMounted from '@/hooks/useIsMounted';
import useModalStore from '@/store/modals';
import classnames from 'classnames';
import CryptoJS from 'crypto-js';
import { AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './index.module.scss';

const VaultPassCodeModal = () => {
  const setWithdrawPassIsSet = useAccountStore((state) => state.setWithdrawPassIsSet);
  const withdrawPassIsSet = useAccountStore((state) => state.withdrawPassIsSet);
  const setBoxPassIsSet = useAccountStore((state) => state.setBoxPassIsSet);
  const withdrawAmount = useAccountStore((state) => state.withdrawAmount);
  const boxPassIsSet = useAccountStore((state) => state.boxPassIsSet);
  const selectedBank = useAccountStore((state) => state.selectedBank);
  const { closePassCode, isPassCodeOpen, openWithdrawSuccess, openAlert } = useModalStore();
  const [input, setInput] = useState('');
  const inputArray = input.split('');
  const isMounted = useIsMounted();
  const pathname = usePathname();
  const router = useRouter();

  const removeSpaces = (num: string) => num.toString().replace(/\s/g, '');

  useEffect(() => {
    if (isPassCodeOpen) {
      clearAllInput();
    }
  }, [isPassCodeOpen]);

  const btnValues = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    ['删除', 9, 0, '确认'],
  ];

  const clearAllInput = () => {
    setInput('');
    ['first', 'second', 'third', 'fourth'].forEach((id) => {
      const element = document.getElementById(id) as HTMLInputElement | null;
      if (element) {
        element.value = '';
      }
    });
  };

  const handleDelete = () => {
    const newNum = input.slice(0, -1);
    setInput(newNum);
    ['first', 'second', 'third', 'fourth'].forEach((id, index) => {
      const element = document.getElementById(id) as HTMLInputElement | null;
      if (element) {
        element.value = newNum[index] || '';
      }
    });
  };

  const handleConfirm = async () => {
    if (input.length !== 4) {
      openAlert('请输入密码');
      return;
    }

    if (pathname?.includes('withdraw')) {
      await handleWithdrawPass();
    } else {
      await handleBoxPass();
    }

    clearAllInput();
  };

  const handleWithdrawPass = async () => {
    if (!withdrawPassIsSet) {
      const { code, msg } = await setWithdrawPass(input);
      if (code !== 200) {
        openAlert(msg);
      } else {
        setWithdrawPassIsSet(true);
      }
    } else {
      const { code, msg } = await withdrawBank(selectedBank, withdrawAmount, input);
      if (code !== 200) {
        openAlert(msg);
      } else {
        openWithdrawSuccess();
      }
      closePassCode();
    }
  };

  const handleBoxPass = async () => {
    if (!boxPassIsSet) {
      const { msg, code } = await setBoxPass(input);
      if (code !== 200) {
        openAlert(msg);
      } else {
        setBoxPassIsSet(true);
      }
    } else {
      const { code, msg } = await boxAccount(input);
      if (code !== 200) {
        openAlert(msg);
      } else {
        const encryptedPass = CryptoJS.AES.encrypt(input, 'secret-key').toString();
        sessionStorage.setItem('pass', encryptedPass);
        router.push('/safebox');
        closePassCode();
      }
    }
  };

  const handleInput = (value: string) => {
    if (removeSpaces(input).length < 4) {
      setInput(removeSpaces(input + value));
    }
  };

  const handleClick = async (e: BaseSyntheticEvent) => {
    const value = e.target.innerText;

    switch (value) {
      case '删除':
        handleDelete();
        break;
      case '确认':
        await handleConfirm();
        break;
      default:
        handleInput(value);
        break;
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isPassCodeOpen && (
        <ModalLayout onClose={closePassCode} backdrop={0.8} closeOnOutsideClick>
          <div className={styles.wrapper}>
            <HeaderModalTitle title='提现密码' onClick={closePassCode} />
            <div className={styles.passCodeContainer}>
              <span className={styles.title}>
                {withdrawPassIsSet ? '提现密码' : '请设置提现密码'}
                请设置提现密码
              </span>

              <div className={styles.inputWrapper}>
                {['first', 'second', 'third', 'fourth'].map((id, index) => (
                  <input key={id} type='password' disabled id={id} value={inputArray[index] || ''} />
                ))}
              </div>
              <div className={styles.buttonsInput}>
                {btnValues.flat().map((item) => {
                  return (
                    <Button
                      id={`${item}`}
                      key={item}
                      className={classnames({
                        [styles.button]: true,
                        [styles.enterButton]: item === '确认',
                        [styles.deleteButton]: item === '删除',
                      })}
                      text={item}
                      onClick={handleClick}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </ModalLayout>
      )}
    </AnimatePresence>
  );

  if (isMounted()) {
    const element = document.getElementById('modal-root') as HTMLDivElement;
    if (element) return createPortal(modalContent, element);
  }

  return null;
};

export default VaultPassCodeModal;
