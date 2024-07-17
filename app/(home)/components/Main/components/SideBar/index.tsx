'use client';

import { getGameInfoGroup, getGameInfos, getGameTypes } from '@/api/game';
import { ErrorData, GetGameTypes, RspGameType } from '@/types/app';
import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import blackGoldTitle from '@/assets/blackGold/sidebar/sidebarTitle.png';
import Image from 'next/image';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { refetch } from '@/api/refetch';
import { useGameStore } from '@/components/providers/GameProvider';
import { useStore } from '@/components/providers/StoreProvider';
import classNames from 'classnames';

const SideBar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sideBar = useGameStore((state) => state.sideBar);
  const theme = useStore((state) => state.theme);
  const activeSideBarItem = useGameStore((state) => state.activeSideBarItem);
  const setActiveSideBarItem = useGameStore((state) => state.setActiveSideBarItem);
  const setGameInfos = useGameStore((state) => state.setGameInfos);
  const setGameInfoGroup = useGameStore((state) => state.setGameInfoGroup);

  const fetchGameInfoGroup = async (id: number) => {
    const response = await getGameInfoGroup(id);
    if (response && !('message' in response)) {
      setGameInfoGroup(response);
    }
  };

  const fetchGameInfo = async (params: { section: number; pid: number }) => {
    const response = await getGameInfos(params);
    if (response && !('message' in response)) {
      setGameInfos(response);
    }
  };

  const handleRefresh = async () => {
    await refetch('gameTypes');
  };

  const handleOnClick = (item: RspGameType) => {
    if (item.type === 4) {
      fetchGameInfoGroup(item.id || 0);
    }
    fetchGameInfo({ section: item.id || 0, pid: -1 });

    // popSound();
    setActiveSideBarItem(item);
  };

  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.title}>
        <Image src={blackGoldTitle} alt='' />
      </div>

      <div className={styles.list}>
        <PullToRefresh onRefresh={handleRefresh}>
          <div ref={containerRef} className={styles.sidebarSwiper}>
            {sideBar.map((item, index) => {
              if (item.id === 6) {
                return null;
              }

              return (
                <div key={index} className={styles.sideBarItemContainer} onClick={() => handleOnClick(item)}>
                  <Image
                    height={1}
                    width={434}
                    className={styles.divider}
                    src={require(`@/assets/${theme}/sidebar/divider.png`)}
                    alt='divider'
                  />
                  <div
                    className={classNames(styles.sideBarItem, {
                      [styles.sidebarItemActive]: item.id === activeSideBarItem.id,
                    })}
                  >
                    <img className={styles.icon} src={item.icon} alt='icon' />
                    <span>{item.name}</span>
                  </div>

                  {index === sideBar.length - 1 && (
                    <Image
                      height={1}
                      width={434}
                      className={styles.divider}
                      src={require(`@/assets/${theme}/sidebar/divider.png`)}
                      alt='divider'
                    />
                  )}
                </div>
              );
            })}
          </div>
        </PullToRefresh>
      </div>
    </div>
  );
};

export default SideBar;
