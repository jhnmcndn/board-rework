'use client';

import SuccessWithdrawModal from '@/app/withdraw/components/SuccessWIthdrawModal';
import OtherHeader from '@/components/OtherHeader';
import useModalStore from '@/store/modals';
import styles from './index.module.scss';

export default function WithdrawLayout({ children }: { children: React.ReactNode }) {
  const isWithdrawSuccessModalOpen = useModalStore((state) => state.isWithdrawSuccessModalOpen);

  return (
    <div className={styles.withdrawPageContainer}>
      {isWithdrawSuccessModalOpen && <SuccessWithdrawModal />}
      <OtherHeader headerTitle='提现' />
      <div className={styles.withdrawPageBody}>{children}</div>
    </div>
  );
}
