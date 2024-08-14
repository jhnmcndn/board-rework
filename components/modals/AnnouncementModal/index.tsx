'use client';

import HeaderModalTitle from '@/components/HeaderModalTitle';
import useIsMounted from '@/hooks/useIsMounted';
import useModalStore from '@/store/modals';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';
import ModalLayout from '../ModalLayout';
import styles from './index.module.scss';

const AnnoucementModal: React.FC = () => {
  const isMounted = useIsMounted();
  const { isAnnouncementOpen, closeAnnouncement } = useModalStore();
  const modalContent = (
    <AnimatePresence>
      <ModalLayout closeOnOutsideClick onClose={closeAnnouncement} backdrop={0.5}>
        <div className={styles.announcementContainer}>
          <HeaderModalTitle title='设置' onClick={closeAnnouncement} />
          asfsdfklj
        </div>
      </ModalLayout>
    </AnimatePresence>
  );

  if (isMounted() && isAnnouncementOpen) {
    const element = document.getElementById('modal-root') as HTMLDivElement;
    if (element) return createPortal(modalContent, element);
  }

  return null;
};

export default AnnoucementModal;
