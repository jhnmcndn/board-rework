'use client';

import Button from '@/components/Fragments/Button';
import HeaderModalTitle from '@/components/HeaderModalTitle';
import ModalLayout from '@/components/modals/ModalLayout';
import useImages from '@/hooks/useImages';
import useIsMounted from '@/hooks/useIsMounted';
import useModalStore from '@/store/modals';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import styles from './index.module.scss';

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

  if (isMounted()) {
    const element = document.getElementById('modal-root') as HTMLDivElement;
    if (element) return createPortal(modalContent, element);
  }

  return null;
};

export default SuccessWithdrawModal;
