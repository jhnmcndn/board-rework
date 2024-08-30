'use client';

import useClickOutside from '@/hooks/useClickOutside';
import { ModalLayoutProps } from '@/types/app';
import { MODAL_BG_ANIMATION, MODAL_CONTENT_ANIMATION } from '@/utils/helpers';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import styles from './index.module.scss';

const ModalLayout = ({ closeOnOutsideClick = false, children, onClose, backdrop = 0 }: ModalLayoutProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const clickOutSide = useClickOutside(modalRef);
  document.body.style.overflow = 'hidden';

  const handleClose = () => {
    if (closeOnOutsideClick && clickOutSide) onClose?.();
    document.body.style.overflow = 'auto';
  };

  return (
    <motion.div
      variants={MODAL_BG_ANIMATION}
      initial='hidden'
      animate='visible'
      exit='exit'
      className={styles.modalOverlay}
      onClick={handleClose}
      id='modal-layout'
      style={{ background: `rgba(0,0,0,${backdrop})` }}
    >
      <motion.div
        variants={MODAL_CONTENT_ANIMATION}
        initial='hidden'
        animate='visible'
        exit='exit'
        className={styles.modalOverlay__container}
        ref={modalRef}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default ModalLayout;
