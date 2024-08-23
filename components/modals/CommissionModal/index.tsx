'use client';

import HeaderModalTitle from '@/components/HeaderModalTitle';
import ModalLayout from '@/components/modals/ModalLayout';
import useIsMounted from '@/hooks/useIsMounted';
import useModalStore from '@/store/modals';
import { AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import styles from './index.module.scss';

const CommissionModal = () => {
  const isMounted = useIsMounted();
  const { closeCommission, isCommissionOpen } = useModalStore();

  const modalContent = (
    <AnimatePresence>
      {isCommissionOpen && (
        <ModalLayout onClose={closeCommission} backdrop={0.8}>
          <div className={styles.commissionModal}>
            <HeaderModalTitle title='返佣金额列表对照' onClick={closeCommission} />
            <div className={styles.commissionModal__content}>
              <table>
                <thead>
                  <tr>
                    <th>代理级别</th>
                    <th>返佣比例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={styles.commissionModal__tableFirstRow}>
                    <td>
                      <span className={styles['commissionModal--agentTextColor']}>1级代理</span>
                    </td>
                    <td>
                      <span>0.0030</span>
                    </td>
                  </tr>
                  <tr className={styles.commissionModal__tableSecondRow}>
                    <td>
                      <span className={styles['commissionModal--agentTextColor']}>2级代理</span>
                    </td>
                    <td>
                      <span>0.0010</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className={styles.commissionModal__btnContainer}>
                <button onClick={closeCommission}>领取佣金</button>
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

export default CommissionModal;
