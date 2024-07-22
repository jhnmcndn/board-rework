'use client'

import useModalStore from "@/store/modals";
import Image from 'next/image';
import styles from './index.module.scss';
import { useAccountStore } from "@/components/Providers/AccountStoreProvider";

const SuccessWithdrawModal = () => {
  const closeWithdrawSuccessModal = useModalStore((state) => state.closeWithdrawSuccessModal);
  const theme = useAccountStore((state) => state.theme);

  return (
    <div className={styles.successModalContainer}>
      <div className={styles.modalWrapper}>
        <div className={styles.header}>
          <span>意见反馈箱</span>
          <Image
            src={require(`@/assets/${theme}/withdraw/closeBtnModal.png`)}
            alt='Close'
            width={54}
            height={54}
            onClick={() => closeWithdrawSuccessModal()}
          />
        </div>
        <div className={styles.body}>
          <Image
            className={styles.withdrawSuccessImg}
            src={require(`@/assets/${theme}/withdraw/withdrawSuccessModal.png`)}
            alt='Success'
            width={180}
            height={180}
          />
          <span className={styles.notice}>提现申请请求成功，请耐心等待</span>
          <span className={styles.instructions}>成功付款后,将自动到账请注意查看。如长时间没有反应,请联系在线客服确认。</span>
          <span
            className={styles.button}
            onClick={() => closeWithdrawSuccessModal()}
          >
            确认
          </span>
        </div>
      </div>
    </div>
  );
};

export default SuccessWithdrawModal;