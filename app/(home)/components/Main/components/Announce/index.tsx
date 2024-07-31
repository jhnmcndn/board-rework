import { useGameStore } from '@/components/Providers/GameStoreProvider';
import useImages from '@/hooks/useImages';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import styles from './index.module.scss';

const Announce = () => {
  const { images } = useImages();
  const [_, setOmOpen] = useState(false);
  const announceText = useGameStore((state) => state.announceText);

  return (
    <div className={styles.announceContainer}>
      <motion.div initial={{ y: '200%' }} animate={{ y: 0 }} transition={{ delay: 0.4 }} className={styles.announceBar}>
        <Image src={images.audio} alt='AudioIcon' />
        <div className={styles.announceTextWrapper} onClick={() => setOmOpen(true)}>
          <marquee behavior='scroll' direction='left' className={styles.moveTextItem}>
            {announceText || '充值，成功率 100%，到账速度快，还享有额外的入款优惠！祝您旗开得胜！'}
          </marquee>
        </div>
      </motion.div>
    </div>
  );
};

export default Announce;
