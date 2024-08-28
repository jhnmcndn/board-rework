'use client';

import { motion } from 'framer-motion';
import { memo } from 'react';
import LeftNavigation from './components/LeftNavigation';
import RightNavigation from './components/RightNavigation';
import styles from './index.module.scss';

export type HandleClickParams = {
  fn?: (params?: any) => void;
  params?: any;
  isActivity?: boolean;
};

const Footer = () => {
  return (
    <>
      {/* <MegaphoneModal
        open={omMegaphone}
        onClose={() => {
          setOmMegaphone(!omMegaphone);
        }}
        activesideTab={3}
      />

      <SafeBoxModal
        safeBoxOpen={safeBoxModalOpen}
        safeBoxClose={() => {
          setSafeBoxModalOpen(false);
        }}
      /> */}

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.15 }}
        className={styles.footerContent}
      >
        <LeftNavigation />
        <RightNavigation />
      </motion.div>
    </>
  );
};

export default memo(Footer);
