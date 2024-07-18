import { getGameInfos } from '@/api/game';
import fallbackIcon from '@/assets/commons/fallBacks/onErrorImg.png';
import loadingIcon from '@/assets/commons/fallBacks/squareLoad2.gif';
import ImgWithFallback from '@/components/ImgWithFallback';
import NoData from '@/components/NoData';
import { useGameStore } from '@/components/providers/GameProvider';
import { useStore } from '@/components/providers/StoreProvider';
import { GameInfoGroup, RspGameInfo } from '@/types/app';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import ListSmallIcons from '../ListSmallIcons';
import styles from './index.module.scss';

interface IProps {
  searchFieldData: string;
  setSearchFieldData: Dispatch<SetStateAction<string>>;
}

type CombinedGameInfo = RspGameInfo & GameInfoGroup;

const ListLargeIcons: FC<IProps> = ({ searchFieldData, setSearchFieldData }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [filteredData, setFilteredData] = useState<CombinedGameInfo[]>([]);
  const [data, setData] = useState<CombinedGameInfo[]>([]);
  const [iconWidth, setIconWidth] = useState(0);
  const theme = useStore((state) => state.theme);
  const activeSideBarItem = useGameStore((state) => state.activeSideBarItem);
  const gameInfos = useGameStore((state) => state.gameInfos);
  const setGameInfos = useGameStore((state) => state.setGameInfos);
  const gameInfoGroup = useGameStore((state) => state.gameInfoGroup);
  const showPlatform = useGameStore((state) => state.showPlatform);
  const setShowPlatform = useGameStore((state) => state.setShowPlatform);
  const activePlatform = useGameStore((state) => state.activePlatform);
  const setActivePlatform = useGameStore((state) => state.setActivePlatform);

  const isVivoBrowser = /VivoBrowser/i.test(navigator.userAgent);
  let initialTouchX: number | null = null;
  let initialTouchY: number | null = null;
  let isScrolling = false;

  useEffect(() => {
    if (!searchFieldData) {
      setFilteredData(gameInfoGroup || []);
    }
    if (searchFieldData && data.length > 0) {
      setFilteredData(
        data.filter((item) => {
          if (item && item.name) {
            return item?.name.toLowerCase().includes(searchFieldData.toLowerCase());
          }
        })
      );
    }
  }, [searchFieldData, data]);

  useEffect(() => {
    if (activeSideBarItem.type === 2) {
      setData(gameInfos || []);
      return;
    }
    if (activeSideBarItem.type === 3) {
      setData(gameInfoGroup || []);
    }
  }, [activeSideBarItem, gameInfoGroup, gameInfos]);

  useEffect(() => {
    const item = containerRef.current;

    const scrollFn = (e: WheelEvent) => {
      if (!item) return;
      if (e.deltaY > 0) item.scrollLeft += 100;
      else item.scrollLeft -= 100;
    };

    if (!showPlatform && item) {
      item.addEventListener('wheel', scrollFn, { passive: true });
    }
    return () => {
      setSearchFieldData('');
      item && item.removeEventListener('wheel', scrollFn);
    };
  }, [containerRef.current, showPlatform]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const handleTouchStart = (event: TouchEvent) => {
      initialTouchX = event.touches[0].clientX;
      initialTouchY = event.touches[0].clientY;
      isScrolling = false;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!initialTouchX || !initialTouchY) return;

      const currentTouchX = event.touches[0].clientX;
      const currentTouchY = event.touches[0].clientY;

      const diffX = initialTouchX - currentTouchX;
      const diffY = initialTouchY - currentTouchY;

      // Check if the swipe is predominantly vertical
      if (Math.abs(diffY) > Math.abs(diffX)) {
        event.preventDefault(); // Prevent vertical scrolling

        // Swipe up
        if (diffY > 0) {
          if (!isScrolling) {
            // Move the div to the left (scroll horizontally to the right)
            smoothScroll(container, 'left', 100);
            isScrolling = true;
          }
        }
        // Swipe down
        else {
          if (!isScrolling) {
            // Move the div to the right (scroll horizontally to the left)
            smoothScroll(container, 'right', 100);
            isScrolling = true;
          }
        }
      }

      initialTouchX = currentTouchX;
      initialTouchY = currentTouchY;
    };

    const smoothScroll = (element: HTMLDivElement | null, direction: 'left' | 'right', distance: number) => {
      let scrollAmount = 0;
      const scrollStep = 10;
      const speed = 5; // Adjust scrolling speed if needed

      const slideTimer = setInterval(() => {
        if (!element) {
          return;
        }

        if (direction === 'left') {
          element.scrollLeft += scrollStep;
        } else {
          element.scrollLeft -= scrollStep;
        }

        scrollAmount += scrollStep;

        if (scrollAmount >= distance) {
          clearInterval(slideTimer);
          isScrolling = false;
        }
      }, speed);
    };

    isVivoBrowser && container.addEventListener('touchstart', handleTouchStart);
    isVivoBrowser && container.addEventListener('touchmove', handleTouchMove);

    return () => {
      isVivoBrowser && container.removeEventListener('touchstart', handleTouchStart);
      isVivoBrowser && container.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const fetchGameInfo = async (params: { id: number; pid: number }) => {
    const response = await getGameInfos(params);
    if (response && !('message' in response)) {
      setGameInfos(response);
    }
  };

  const PlatFormListHeader = () => {
    return (
      <div className={styles.listHeader} data-theme={theme}>
        <div className={styles.leftContent}>
          <Image src={activePlatform?.icon || ''} width={200} height={200} alt="Icon" />
          <span>{activePlatform?.name}</span> <span>总共{gameInfos?.length}款小游戏</span>
        </div>
        <div className={styles.rightContent}>
          <Image
            src={require(`@/assets/${theme}/main/cardGameBack.png`)}
            width={200}
            height={200}
            onClick={() => {
              setShowPlatform(false);
            }}
            alt="Card Game Back"
          />
        </div>
      </div>
    );
  };

  const handleIconWidthChange = (value: number) => {
    setIconWidth(value);
  };

  const load = filteredData === undefined;

  return (
    <>
      {!showPlatform && filteredData?.length === 0 && (
        <div className={styles.noGamesContainer}>
          <NoData />
        </div>
      )}

      {!showPlatform && filteredData?.length !== 0 && (
        <div
          id="listLargeWrapper"
          ref={containerRef}
          className={classNames(styles.listLargeWrapper, {
            [styles.listLargeType2Overlay]: activeSideBarItem.type === 2,
          })}
          style={{
            // overflow:
            //   showSettings || showPleaseRotate || showLoginModal || showOtherModalComp
            //     ? 'hidden'
            //     : 'auto',
            zIndex: 0,
          }}
        >
          <div
            style={{
              width: '100%',
              margin: '0 0.15rem',
            }}
          >
            <div className={styles.firstRow}>
              {load && '<Loading load={load} />'}

              {filteredData?.map((item, idx) => {
                return (
                  <motion.div
                    key={idx}
                    animate={{ x: 0 }}
                    initial={{ x: '100vw' }}
                    transition={{ delay: 1 }}
                    className={classNames(styles.iconHolder, {
                      [styles.isMaintenance]: item.maintain,
                    })}
                    onClick={() => {
                      setActivePlatform(item);
                      fetchGameInfo({ id: activeSideBarItem.id || 1, pid: item.id || 1 });
                      setShowPlatform(true);
                    }}
                  >
                    {item.maintain && (
                      <div className="isMaintainLargeIcon">
                        <div>正在维修</div>
                      </div>
                    )}

                    <ImgWithFallback
                      // largeWidth={detectMobile.isMobile() ? ".89rem" : ""}
                      keyIcon={(activeSideBarItem.type === 3 ? item.cardIcon : item.icon) || ''}
                      fallback={fallbackIcon}
                      loadingIcon={loadingIcon}
                      loading="lazy"
                      src={(activeSideBarItem.type === 3 ? item.cardIcon : item.icon) || ''}
                      handleIconWidthChange={handleIconWidthChange}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {showPlatform && (
        <>
          {PlatFormListHeader()}
          {data ? (
            <>
              {data.map((item, idx) => {
                return (
                  item.id === activePlatform?.id && (
                    <ListSmallIcons
                      key={item.id || '' + idx}
                      searchFieldData={searchFieldData}
                      setSearchFieldData={setSearchFieldData}
                    />
                  )
                );
              })}
            </>
          ) : (
            ''
          )}
        </>
      )}
    </>
  );
};

export default ListLargeIcons;
