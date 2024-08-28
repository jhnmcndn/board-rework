'use client';

import { refetch } from '@/api/refetch';
import { useGameStore } from '@/components/Providers/GameStoreProvider';
import useFetchGame from '@/hooks/useFetchGame';
import useImages from '@/hooks/useImages';
import { RspGameType } from '@/types/app';
import { API_ENDPOINT } from '@/types/enums';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { memo, useRef } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';
import styles from './index.module.scss';

const SideBarTitle = memo(() => {
  const {
    images: { sidebarTitle },
  } = useImages();
  return (
    <div className={styles.title}>
      <Image src={sidebarTitle} alt='Sidebar title' />
    </div>
  );
});

const SideBar = () => {
  const { images } = useImages();
  const { handleChange } = useFetchGame();
  const containerRef = useRef<HTMLDivElement>(null);
  const { sideBar, activeSideBarItem, isGamesLoading } = useGameStore((state) => state);

  const handleClick = (item: RspGameType, index: number) => {
    handleChange(item);
    if (!containerRef.current) return;

    if (index > 2) {
      containerRef.current.scrollBy({ top: 300, behavior: 'smooth' });
    }
    if (index < 2) {
      containerRef.current.scrollBy({ top: -300, behavior: 'smooth' });
    }
  };

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
      <SideBarTitle />
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
                  onClick={() => handleClick(item, index)}
                >
                  <Image height={1} width={434} className={styles.divider} src={images.divider} alt='divider' />
                  <div
                    className={classNames(styles.sideBarItem, {
                      [styles.sidebarItemActive]: item.id === activeSideBarItem.id,
                    })}
                  >
                    <div className={styles.iconWrapper}>
                      <Image src={item?.icon || ''} alt='icon' quality={100} fill sizes='100vh' />
                    </div>
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
