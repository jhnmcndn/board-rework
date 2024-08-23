'use client';

import Button from '@/components/Fragments/Button';
import HeaderModalTitle from '@/components/HeaderModalTitle';
import ModalLayout from '@/components/modals/ModalLayout';
import useIsMounted from '@/hooks/useIsMounted';
import useModalStore from '@/store/modals';
import classnames from 'classnames';
import { AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from './index.module.scss';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { boxAccount, setBoxPass } from '@/api/platform';
import CryptoJS from 'crypto-js';

const PassCodeModal = () => {
  const boxPassIsSet = useAccountStore((state) => state.boxPassIsSet);
  const setBoxPassIsSet = useAccountStore((state) => state.setBoxPassIsSet);
  const isMounted = useIsMounted();
  const { closePassCode, isPassCodeOpen } = useModalStore();
  const [input, setInput] = useState('');
  const inputArray = input.split('');
  const pathname = usePathname();
  const router = useRouter();
  const { openAlert } = useModalStore();
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

  const handleClick = async (e: BaseSyntheticEvent) => {
    const isWithdraw = pathname?.includes('withdraw');
    const value = e.target.innerText;

    if (value === '删除') {
      // ~~Delete Button~~
      const newNum = input.slice(0, -1);
      setInput(newNum);
      ['first', 'second', 'third', 'fourth'].forEach((id, index) => {
        const element = document.getElementById(id) as HTMLInputElement | null;
        if (element) {
          element.value = newNum[index] || '';
        }
      });
    } else if (value === '确认') {
      // ~~Confirm Button~~
      if (input.length !== 4) {
        openAlert({ body: '请输入密码' });
      } else {
        if (isWithdraw) {
          console.log('~~withdrawwww');
        } else {
          if (!boxPassIsSet) {
            const { msg, code } = await setBoxPass(input);
            if (code !== 200) {
              openAlert({ body: msg });
            } else {
              setBoxPassIsSet(true);
            }
          } else {
            const { code, msg } = await boxAccount(input);
            if (code !== 200) {
              openAlert({ body: msg });
            } else {
              const encryptedPass = CryptoJS.AES.encrypt(input, 'secret-key').toString();
              sessionStorage.setItem('pass', encryptedPass);
              router.push('/safebox');
              closePassCode();
            }
          }
        }
      }
      clearAllInput();
    } else if (removeSpaces(input).length < 4) {
      // ~~Input Button~~
      setInput(removeSpaces(input + value));
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isPassCodeOpen && (
        <ModalLayout onClose={closePassCode} backdrop={0.8}>
          <div className={styles.wrapper}>
            <HeaderModalTitle title='提现密码' onClick={closePassCode} />
            <div className={styles.passCodeContainer}>
              <span className={styles.title}>
                {/*IBABALIK KO PO ITONG CONDITION WWAIT LANG*/}
                {/*{withdrawPassIsSet ? '提现密码' : '请设置提现密码'}*/}
                请设置提现密码
              </span>

              <div className={styles.inputWrapper}>
                <input type='password' disabled id='first' value={inputArray[0] || ''} />
                <input type='password' disabled id='second' value={inputArray[1] || ''} />
                <input type='password' disabled id='third' value={inputArray[2] || ''} />
                <input type='password' disabled id='fourth' value={inputArray[3] || ''} />
              </div>
              <div className={styles.buttonsInput}>
                {btnValues.flat().map((item) => {
                  return (
                    <Button
                      id={item}
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

export default PassCodeModal;
