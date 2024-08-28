'use client';

import ModalLayout from '@/components/modals/ModalLayout';
import useIsMounted from '@/hooks/useIsMounted';
import { serverConfig } from '@/server';
import useModalStore from '@/store/modals';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import styles from './index.module.scss';

export default function AlertContainer() {
  const { alertContent, isAlertOpen, closeAlert } = useModalStore();
  const alertIcon = require(`@/public/assets/${serverConfig.server}/favicon.ico`);
  const isMounted = useIsMounted();

  const modalContent = (
    <ModalLayout isAlert onClose={closeAlert}>
      <div className={styles.alert__wrapper}>
        <div className={styles.alert__textContainer}>
          <div className={styles.alert__imageContainer}>
            <Image src={alertIcon} alt='alert' className={styles.alert__icon} />
          </div>
          {alertContent && <span className={styles.alert__message}>{alertContent}</span>}
        </div>
      </div>
    </ModalLayout>
  );

  if (isMounted() && isAlertOpen) {
    const element = document.getElementById('modal-root') as HTMLDivElement;
    if (element) return createPortal(modalContent, element);
  }

  return null;
}
