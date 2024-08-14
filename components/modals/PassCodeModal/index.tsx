'use client';

import useModalStore from '@/store/modals';
import { createPortal } from 'react-dom';
import useIsMounted from '@/hooks/useIsMounted';
import ModalLayout from '@/components/modals/ModalLayout';
import HeaderModalTitle from '@/components/HeaderModalTitle';
import styles from './index.module.scss';
import Button from '@/components/Fragments/Button';
import classnames from 'classnames';
import { AnimatePresence } from 'framer-motion';

const PassCodeModal = () => {
  const isMounted = useIsMounted();
  const { closePassCode, isPassCodeOpen } = useModalStore();

  const btnValues = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    ['删除', 9, 0, '确认'],
  ];

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
                <input type='text' disabled id='first' value={'umulan'} />
                <input type='text' disabled id='second' value={'bumagyo'} />
                <input type='text' disabled id='third' value={'pangit'} />
                <input type='text' disabled id='fourth' value={'ka'} />
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
    const element = typeof window === 'undefined' ? null : (document.getElementById('modal-root') as HTMLDivElement);
    if (element) return createPortal(modalContent, element);
  }

  return null;
};

export default PassCodeModal;
