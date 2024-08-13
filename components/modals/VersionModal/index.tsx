'use client';

import useIsMounted from '@/hooks/useIsMounted';
import useModalStore from '@/store/modals';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';
import ModalLayout from '../ModalLayout';
import styles from './index.module.scss';

const VersionModal: React.FC = () => {
  const { closeVersion, isVersionOpen } = useModalStore();
  const isMounted = useIsMounted();

  const modalContent = (
    <AnimatePresence>
      <ModalLayout closeOnOutsideClick onClose={closeVersion}>
        <div className={styles.versionMainContainer} style={{ border: '1px solid red', width: '100%', height: '100%' }}>
          Display Version
        </div>
      </ModalLayout>
    </AnimatePresence>
  );

  if (isMounted() && isVersionOpen) {
    const element = document.getElementById('modal-root') as HTMLDivElement;
    if (element) return createPortal(modalContent, element);
  }

  return null;
};

export default VersionModal;
