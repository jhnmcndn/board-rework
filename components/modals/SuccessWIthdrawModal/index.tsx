'use client';

import useImages from '@/hooks/useImages';
import useModalStore from '@/store/modals';
import Image from 'next/image';
import styles from './index.module.scss';
import { AnimatePresence } from 'framer-motion';
import useIsMounted from '@/hooks/useIsMounted';
import ModalLayout from '@/components/modals/ModalLayout';
import HeaderModalTitle from '@/components/HeaderModalTitle';
import Button from '@/components/Fragments/Button';
import { createPortal } from 'react-dom';

const SuccessWithdrawModal = () => {
  const { images } = useImages();
  const isMounted = useIsMounted();
  const { closeWithdrawSuccess, isWithdrawSuccessOpen } = useModalStore();

  const modalContent = (
    <AnimatePresence>
      {isWithdrawSuccessOpen && (
        <ModalLayout onClose={closeWithdrawSuccess} backdrop={0.8}>
          <div className={styles.modalWrapper}>
            <HeaderModalTitle title='意见反馈箱' onClick={closeWithdrawSuccess} />
            <div className={styles.body}>
              <Image
                className={styles.withdrawSuccessImg}
                src={images.withdrawSuccess}
                alt='Success'
                width={180}
                height={180}
              />
              <span className={styles.notice}>提现申请请求成功，请耐心等待</span>
              <span className={styles.instructions}>
                成功付款后,将自动到账请注意查看。如长时间没有反应,请联系在线客服确认。
              </span>
              <Button className={styles.button} text='确认' onClick={closeWithdrawSuccess} />
            </div>
          </div>
        </ModalLayout>
      )}
    </AnimatePresence>
  );

  if (isMounted() && isWithdrawSuccessOpen) {
    const element = typeof window === 'undefined' ? null : (document.getElementById('modal-root') as HTMLDivElement);
    if (element) return createPortal(modalContent, element);
  }

  return null;
};

export default SuccessWithdrawModal;
