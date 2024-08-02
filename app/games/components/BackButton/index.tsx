import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

const BackButton = () => {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [constraints, setConstraints] = useState({
    top: 0,
    left: 0,
    right: window.innerWidth,
    bottom: window.innerHeight,
  });

  useEffect(() => {
    const updateConstraints = () => {
      setConstraints({
        top: 0,
        left: 0,
        right: window.innerWidth,
        bottom: window.innerHeight,
      });
    };

    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

  return (
    <motion.div
      className={styles.exit}
      drag
      dragConstraints={constraints}
      onClick={() => {
        if (isDragging) return;

        router.push('/');
        // popSound();
      }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
    >
      返回
    </motion.div>
  );
};

export default BackButton;
