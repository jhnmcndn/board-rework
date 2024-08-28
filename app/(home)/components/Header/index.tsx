import { motion } from 'framer-motion';
import { memo } from 'react';
import HeaderButtons from './components/HeaderButtons';
import HeaderDetails from './components/HeaderDetails';
import HeaderTitle from './components/HeaderTitle';
import VipPart from './components/VipPart';
import styles from './index.module.scss';

export const Header = memo(() => {
  return (
    <motion.div initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.15 }} className={styles.header}>
      <VipPart />
      <div className={styles.rightHeadContainer}>
        <HeaderDetails />
        <HeaderTitle />
        <HeaderButtons />
      </div>
    </motion.div>
  );
});
