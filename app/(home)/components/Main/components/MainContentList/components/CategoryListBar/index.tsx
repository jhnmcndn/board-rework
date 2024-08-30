import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { useGameStore } from '@/components/Providers/GameStoreProvider';
import useFetchGame from '@/hooks/useFetchGame';
import { CategoryListBarProps, GameInfoGroup } from '@/types/app';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import styles from './index.module.scss';

const CategoryListBar: FC<CategoryListBarProps> = ({ setActivePlatformId }) => {
  const [activeTab, setActiveTab] = useState(0);
  const { fetchGameInfo } = useFetchGame();
  const theme = useAccountStore((state) => state.theme);
  const { gameInfoGroup, activeSideBarItem } = useGameStore((state) => state);

  useEffect(() => {
    var item = document.getElementById('cateListWrapper') as HTMLDivElement;
    const handleMouseWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) item.scrollLeft += 100;
      else item.scrollLeft -= 100;
    };
    item.addEventListener('wheel', handleMouseWheel, { passive: true });
    return () => {
      item.removeEventListener('wheel', handleMouseWheel);
    };
  }, []);

  const handleOnClick = async (item: GameInfoGroup, index: number) => {
    setActiveTab(index);
    setActivePlatformId(item.id || -1);
    fetchGameInfo({ id: activeSideBarItem.id || 1, pid: item.id || -1 });
  };

  return (
    <div id='cateListWrapper' className={styles.cateListWrapper}>
      <div className={styles.lists}>
        {gameInfoGroup?.map((item, index: number) => {
          return (
            <motion.div
              key={index}
              initial={{ y: '120%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4 }}
              className={styles.iconHolder}
              onClick={() => handleOnClick(item, index)}
              data-theme={theme}
            >
              <div className={styles.icon}>
                <Image
                  loading='lazy'
                  src={item.icon || ''}
                  alt='Icon'
                  fill
                  quality={100}
                  sizes={'(max-width: 600px) 100vw, 50vw'}
                />
              </div>
              <span>{item.name} </span>
              {activeTab === index && <motion.div layoutId='tab-active' className={styles.iconHolderActive} />}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryListBar;
