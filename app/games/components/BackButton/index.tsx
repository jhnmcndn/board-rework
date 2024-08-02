import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
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
    right: window.innerWidth / 1.043,
    bottom: window.innerHeight / 1.125,
  });
  const [confirmation, setConfirmation] = useState(false);
  const fetchAccountNow = useAccountStore((state) => state.fetchAccountNow);

  useEffect(() => {
    let deboundId: NodeJS.Timeout;

    const updateConstraints = () => {
      if (deboundId) {
        clearTimeout(deboundId);
      }
      deboundId = setTimeout(() => {
        setConstraints({
          top: 0,
          left: 0,
          right: window.innerWidth / 1.043,
          bottom: window.innerHeight / 1.125,
        });
      }, 100);
    };

    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

  const onCancel = () => {
    setConfirmation(false);
  };

  const onConfirm = () => {
    fetchAccountNow();
    router.push('/');
  };

  return (
    <>
      <motion.div
        className={styles.exit}
        drag
        dragConstraints={constraints}
        onClick={() => {
          if (isDragging) return;

          setConfirmation(true);
          // popSound();
        }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
      >
        返回
      </motion.div>

      {confirmation && (
        <div className={styles.confirmation}>
          <div className={styles.container}>
            <h1>确定是否退出</h1>
            <div className={styles.buttons}>
              <button onClick={onCancel}>取消</button>
              <button onClick={onConfirm}>确定</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BackButton;
