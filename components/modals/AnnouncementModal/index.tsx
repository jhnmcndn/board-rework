'use client';

import HeaderModalTitle from '@/components/HeaderModalTitle';
import useIsMounted from '@/hooks/useIsMounted';
import { serverConfig } from '@/server';
import useModalStore from '@/store/modals';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';
import ModalLayout from '../ModalLayout';
import styles from './index.module.scss';

const AnnouncementModal: React.FC = () => {
  const isMounted = useIsMounted();
  const { isAnnouncementOpen, closeAnnouncement } = useModalStore();
  const logoIcon = require(`@/assets/${serverConfig.server}/modal_logo.png`);

  const modalContent = (
    <AnimatePresence>
      {isAnnouncementOpen && (
        <ModalLayout closeOnOutsideClick onClose={closeAnnouncement} backdrop={0.5}>
          <div className={styles.announcementContainer}>
            <HeaderModalTitle logoSrc={logoIcon} onClick={closeAnnouncement} />
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

export default AnnouncementModal;
