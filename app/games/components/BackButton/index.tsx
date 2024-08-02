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
  const [confirmation, setConfirmation] = useState(false);

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

  const onCancel = () => {
    setConfirmation(false);
  };

  const onConfirm = () => {
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
