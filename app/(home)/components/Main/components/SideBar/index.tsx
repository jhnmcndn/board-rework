'use client';

import { refetch } from '@/api/refetch';
import { useGameStore } from '@/components/Providers/GameStoreProvider';
import useFetchGame from '@/hooks/useFetchGame';
import useImages from '@/hooks/useImages';
import { API_ENDPOINT } from '@/types/enums';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';
import styles from './index.module.scss';

const SideBar = () => {
  const { images } = useImages();
  const { handleChange } = useFetchGame();
  const containerRef = useRef<HTMLDivElement>(null);
  const { sideBar, activeSideBarItem, isGamesLoading } = useGameStore((state) => state);

  const handleRefresh = async () => {
    await refetch(API_ENDPOINT.GAME_TYPES);
  };

  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.2 }}
      className={styles.sidebarWrapper}
    >
      <div className={styles.title}>
        <Image src={images.sidebarTitle} alt='Sidebar title' />
      </div>

      <div className={styles.list}>
        <PullToRefresh onRefresh={handleRefresh} pullingContent={''}>
          <div ref={containerRef} className={styles.sidebarSwiper}>
            {sideBar.map((item, index) => {
              if (item.id === 6) return null;

              return (
                <div
                  key={index}
                  className={classNames(styles.sideBarItemContainer, {
                    [styles.disabled]: item.id === activeSideBarItem.id || isGamesLoading,
                  })}
                  onClick={() => handleChange(item)}
                >
                  <Image height={1} width={434} className={styles.divider} src={images.divider} alt='divider' />
                  <div
                    className={classNames(styles.sideBarItem, {
                      [styles.sidebarItemActive]: item.id === activeSideBarItem.id,
                    })}
                  >
                    <Image className={styles.icon} width={23} height={28} src={item?.icon || ''} alt='icon' />
                    <span>{item.name}</span>
                  </div>

                  {index === sideBar.length - 1 && (
                    <Image height={1} width={434} className={styles.divider} src={images.divider} alt='divider' />
                  )}
                </div>
              );
            })}
          </div>
        </PullToRefresh>
      </div>
    </motion.div>
  );
};

export default SideBar;
