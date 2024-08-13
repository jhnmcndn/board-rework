'use client';

import useModalStore from '@/store/modals';
import { createPortal } from 'react-dom';
import useIsMounted from '@/hooks/useIsMounted';
import ModalLayout from '@/components/modals/ModalLayout';
import Image from 'next/image';
import styles from './index.module.scss';

const PassCodeModal = () => {
  const isMounted = useIsMounted();
  const { closePassCode, isPassCodeOpen } = useModalStore();

  const modalContent = (
    <>
      {isPassCodeOpen && (
        <ModalLayout onClose={closePassCode} backdrop={0.8}>
          <div className={styles.container}>
            <Image src='/assets/valak.jpg' alt='valak' width={100} height={100} />
          </div>
        </ModalLayout>
      )}
    </>
  );

  if (isMounted() && isPassCodeOpen) {
    const element = typeof window === 'undefined' ? null : (document.getElementById('modal-root') as HTMLDivElement);
    if (element) return createPortal(modalContent, element);
  }

  return null;
};

export default PassCodeModal;
