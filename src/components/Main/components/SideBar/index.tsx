import { useGetGameTypes } from '@/actions';
import { activeSideBarItem, useGameStore } from '@/store/gameTypes';
import { useAppStore } from '@/store/useAppStore';
import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';
import styles from './index.module.scss';
import blackGoldTitle from '/src/assets/blackGold/main/sidebarTitle.png';

const SideBar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: sideBar, refetch } = useGetGameTypes();
  const theme = useAppStore((state) => state.theme);
  const { setActiveSideBarItem, game } = useGameStore((state) => state);

  useEffect(() => {
    if (sideBar) {
      setActiveSideBarItem(sideBar.rspGameTypes.length > 0 ? sideBar?.rspGameTypes[0] : activeSideBarItem);
    }
  }, [sideBar]);

  const handleRefresh = async () => {
    try {
      await refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.title}>
        <img src={blackGoldTitle} alt="" />
      </div>

      <div className={styles.list}>
        <PullToRefresh onRefresh={handleRefresh} className={styles.pullToRefresh}>
          <div ref={containerRef} className={styles.sidebarSwiper}>
            {sideBar?.rspGameTypes.map((item, index) => {
              if (item.id === 6) {
                return null;
              }

              return (
                <div
                  key={index}
                  className={styles.sideBarItemContainer}
                  onClick={() => {
                    // popSound();
                    // sessionStorage.setItem('id_sidebar', idx);
                    setActiveSideBarItem(item);
                  }}
                >
                  <img
                    className={styles.divider}
                    src={`/src/assets/${theme}/main/divider.png`}
                    alt="divider"
                  />
                  <div
                    className={classNames(styles.sideBarItem, {
                      [styles.sidebarItemActive]: item.id === game.activeSideBarItem.id,
                    })}
                  >
                    <img className={styles.icon} src={item.icon} alt="icon" />
                    <span>{item.name}</span>
                  </div>

                  {index === sideBar.rspGameTypes.length - 1 && (
                    <img
                      className={styles.divider}
                      src={`/src/assets/${theme}/main/divider.png`}
                      alt="divider"
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
