'use client';

import { getGameInfoGroup, getGameInfos } from '@/api/game';
import { refetch } from '@/api/refetch';
import blackGoldTitle from '@/assets/blackGold/sidebar/sidebarTitle.png';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { useGameStore } from '@/components/Providers/GameStoreProvider';
import { RspGameType } from '@/types/app';
import { API_ENDPOINT } from '@/types/enums';
import classNames from 'classnames';
import Image from 'next/image';
import { useRef } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';
import styles from './index.module.scss';

const SideBar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sideBar = useGameStore((state) => state.sideBar);
  const theme = useAccountStore((state) => state.theme);
  const activeSideBarItem = useGameStore((state) => state.activeSideBarItem);
  const setActiveSideBarItem = useGameStore((state) => state.setActiveSideBarItem);
  const setGameInfos = useGameStore((state) => state.setGameInfos);
  const setGameInfoGroup = useGameStore((state) => state.setGameInfoGroup);
  const showPlatform = useGameStore((state) => state.showPlatform);
  const activePlatform = useGameStore((state) => state.activePlatform);

  const fetchGameInfoGroup = async (id: number) => {
    const response = await getGameInfoGroup(id);
    if (response && !('message' in response)) {
      setGameInfoGroup(response);
    }
  };

  const fetchGameInfo = async (params: { id: number; pid: number }, item?: RspGameType) => {
    let newParams = params;
    if (item && item.type === 3 && showPlatform) {
      newParams = { id: params.id, pid: activePlatform.id || -1 };
    }

    const response = await getGameInfos(newParams);
    if (response && !('message' in response)) {
      setGameInfos(response);
    }
  };

  const handleRefresh = async () => {
    await refetch(API_ENDPOINT.GAME_TYPES);
  };

  const handleOnClick = (item: RspGameType) => {
    if (item.type === 4 || item.type === 3) {
      fetchGameInfoGroup(item.id || 0);
    }
    fetchGameInfo({ id: item.id || 0, pid: -1 }, item);
    setActiveSideBarItem(item);
    // popSound();
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
