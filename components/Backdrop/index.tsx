'use client';

import { memo } from 'react';
import { createPortal } from 'react-dom';
import styles from './index.module.scss';

const BackdropComponent = () => <div className={styles.backdrop} />;

const Backdrop = () => {
  return createPortal(<BackdropComponent />, document.body as HTMLDivElement);
};

export default memo(Backdrop);
