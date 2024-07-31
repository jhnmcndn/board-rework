'use client';

import { getGameInfoGroup, getGameInfos } from '@/api/game';
import { refetch } from '@/api/refetch';
import { useGameStore } from '@/components/Providers/GameStoreProvider';
import useImages from '@/hooks/useImages';
import { RspGameType } from '@/types/app';
import { API_ENDPOINT } from '@/types/enums';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';
import styles from './index.module.scss';

const SideBar = () => {
  const { images } = useImages();
  const containerRef = useRef<HTMLDivElement>(null);
  const sideBar = useGameStore((state) => state.sideBar);
  const activeSideBarItem = useGameStore((state) => state.activeSideBarItem);
  const setActiveSideBarItem = useGameStore((state) => state.setActiveSideBarItem);
  const setGameInfos = useGameStore((state) => state.setGameInfos);
  const setGameInfoGroup = useGameStore((state) => state.setGameInfoGroup);
  const showPlatform = useGameStore((state) => state.showPlatform);
  const activePlatform = useGameStore((state) => state.activePlatform);
  const setShowPlatform = useGameStore((state) => state.setShowPlatform);
  const isGamesLoading = useGameStore((state) => state.isGamesLoading);
  const setIsGamesLoading = useGameStore((state) => state.setIsGamesLoading);

  const fetchGameInfoGroup = async (id: number) => {
    setIsGamesLoading(true);
    const response = await getGameInfoGroup(id);
    if (response && !('message' in response)) {
      setGameInfoGroup(response);
    }
    setIsGamesLoading(false);
  };

  const fetchGameInfo = async (params: { id: number; pid: number }, item?: RspGameType) => {
    let newParams = params;
    if (item && item.type === 3 && showPlatform) {
      newParams = { id: params.id, pid: activePlatform.id || -1 };
    }
    setIsGamesLoading(true);
    const response = await getGameInfos(newParams);
    if (response && !('message' in response)) {
      setGameInfos(response);
    }
    setIsGamesLoading(false);
  };

  const handleRefresh = async () => {
    await refetch(API_ENDPOINT.GAME_TYPES);
  };

  const handleOnClick = (item: RspGameType) => {
    if (item.type === 4 || item.type === 3) {
      fetchGameInfoGroup(item.id || 0);
    }
    if (item.type === 2) {
      setShowPlatform(false);
    }
    fetchGameInfo({ id: item.id || 0, pid: -1 }, item);
    setActiveSideBarItem(item);
    // popSound();
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
        <PullToRefresh onRefresh={handleRefresh}>
          <div ref={containerRef} className={styles.sidebarSwiper}>
            {sideBar.map((item, index) => {
              if (item.id === 6) return null;

              return (
                <div
                  key={index}
                  className={classNames(styles.sideBarItemContainer, {
                    [styles.disabled]: item.id === activeSideBarItem.id || isGamesLoading,
                  })}
                  onClick={() => handleOnClick(item)}
                >
                  <Image height={1} width={434} className={styles.divider} src={images.divider} alt='divider' />
                  <div
                    className={classNames(styles.sideBarItem, {
                      [styles.sidebarItemActive]: item.id === activeSideBarItem.id,
                    })}
                  >
                    <img className={styles.icon} src={item.icon} alt='icon' />
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
