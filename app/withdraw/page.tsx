'use client'

import { useAccountStore } from "@/components/Providers/AccountStoreProvider";
import SelfWithdrawal from '@/app/withdraw/components/SelfWithdrawal';
import styles from './index.module.scss';

const Withdraw = () => {
  const bindCardList = useAccountStore((state) => state.bindCardList);
  const withdrawActiveTab = useAccountStore((state) => state.withdrawActiveTab);

  return (
    <div className={styles.withdrawContents}>
      {withdrawActiveTab === 0 && <SelfWithdrawal />}
      {/*{withdrawActiveTab === 1 && <CodingDetails />}*/}
      {/*{withdrawActiveTab === 2 && <BindCards />}*/}
      {/*{withdrawActiveTab === 3 && <CashWithdrawalRecord />}*/}
    </div>
  )
};

export default Withdraw;
