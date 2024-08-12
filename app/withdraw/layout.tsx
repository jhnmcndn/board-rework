'use client';

import SuccessWithdrawModal from '@/app/withdraw/components/SuccessWIthdrawModal';
import OtherHeader from '@/components/OtherHeader';
import Sidebar from '@/components/Sidebar';
import useModalStore from '@/store/modals';
import { useState } from 'react';
import styles from './index.module.scss';

export default function WithdrawLayout({ children }: { children: React.ReactNode }) {
  const isWithdrawSuccessModalOpen = useModalStore((state) => state.isWithdrawSuccessModalOpen);
  const [activeSidebarItem, setActiveSidebarItem] = useState(0);
  const sidebarItems = ['自主提现', '打码详情', '钱包管理', '提现记录'];

  return (
    <div className={styles.withdrawPageContainer}>
      {isWithdrawSuccessModalOpen && <SuccessWithdrawModal />}
      <OtherHeader headerTitle='提现' />
      <div className={styles.withdrawPageBody}>
        <Sidebar
          sidebarItems={sidebarItems}
          activeSidebarItem={activeSidebarItem}
          setActiveSidebarItem={setActiveSidebarItem}
        />
        {children}
      </div>
    </div>
  );
}
