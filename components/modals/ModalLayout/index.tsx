'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import useClickOutside from '@/hooks/useClickOutside';
import styles from './index.module.scss';

interface ModalLayoutProps {
  onClose?: () => void;
  children: ReactNode;
  isAlert?: boolean;
  closeOnOutsideClick?: boolean;
}

function ModalLayout({ closeOnOutsideClick = false, isAlert = false, children, onClose }: ModalLayoutProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const clickOutSide = useClickOutside(modalRef);
  document.body.style.overflow = 'hidden';

  useEffect(() => {
    if (isAlert) {
      setTimeout(() => {
        onClose?.();
      }, 1500);
    }
  }, []);

  const handleClose = () => {
    if (closeOnOutsideClick && clickOutSide) onClose?.();
    document.body.style.overflow = 'auto';
  };

  return (
    <div className={styles.modalOverlay} onClick={handleClose} id="modal-layout">
      <div className={styles.modalOverlay__container} ref={modalRef}>
        {children}
      </div>
    </div>
  );
}

export default ModalLayout;
