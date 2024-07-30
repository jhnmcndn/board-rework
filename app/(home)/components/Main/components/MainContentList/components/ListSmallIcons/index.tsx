import fallbackIcon from '@/assets/commons/fallBacks/onErrorImg.png';
import loadingIcon from '@/assets/commons/fallBacks/squareLoad2.gif';
import ImgWithFallback from '@/components/ImgWithFallback';
import Loader from '@/components/Loader';
import NoData from '@/components/NoData';
import { useGameStore } from '@/components/Providers/GameStoreProvider';
import { RspGameInfo } from '@/types/app';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';

interface IProps {
  searchFieldData: string;
  setSearchFieldData: Dispatch<SetStateAction<string>>;
}

const ListSmallIcons: FC<IProps> = ({ searchFieldData, setSearchFieldData }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [filteredData, setFilteredData] = useState<RspGameInfo[] | undefined>();
  const [filteredDataEven, setFilteredDataEven] = useState<RspGameInfo[]>([]);
  const [filteredDataOdd, setFilteredDataOdd] = useState<RspGameInfo[]>([]);
  const [iconWidth, setIconWidth] = useState(0);
  const activeSideBarItem = useGameStore((state) => state.activeSideBarItem);
  const gameInfos = useGameStore((state) => state.gameInfos);
  const isGamesLoading = useGameStore((state) => state.isGamesLoading);

  const isVivoBrowser = /VivoBrowser/i.test(navigator.userAgent);
  let initialTouchX: number | null = null;
  let initialTouchY: number | null = null;
  let isScrolling = false;

  useEffect(() => {
    if (!searchFieldData) {
      setFilteredData(gameInfos || []);
    }
    if (searchFieldData && gameInfos) {
      setFilteredData(
        gameInfos.filter((item) => {
          if (item && item.name) {
            return item?.name.toLowerCase().includes(searchFieldData.toLowerCase());
          }
        }),
      );
    }
  }, [searchFieldData, gameInfos]);

  useEffect(() => {
    var item: HTMLElement | null = document.getElementById('listSmallWrapper');

    if (!item) {
      return;
    }

    item.style.scrollBehavior = 'smooth';

    const handleMouseWheel = (e: WheelEvent) => {
      if (!item) {
        return;
      }

      if (e.deltaY > 0) item.scrollLeft += 200;
      else item.scrollLeft -= 200;
    };
    item.addEventListener('wheel', handleMouseWheel, { passive: true });

    return () => {
      setSearchFieldData && setSearchFieldData('');
      item?.removeEventListener('wheel', handleMouseWheel);
    };
  }, []);

  useEffect(() => {
    setFilteredDataOdd(
      filteredData?.filter((_, index) => {
        return index % 2 !== 0;
      }) || [],
    );
    setFilteredDataEven(
      filteredData?.filter((_, index) => {
        return index % 2 === 0;
      }) || [],
    );
  }, [filteredData]);

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

  useEffect(() => {
    if (sessionStorage.getItem('id_2')) {
      setTimeout(() => {
        document.getElementById(sessionStorage.getItem('id_2') || '')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'center',
        });
      }, 1500);
    }
  }, []);

  return (
    <div
      id='listSmallWrapper'
      ref={containerRef}
      className={classNames(styles.listSmallWrapper, {
        [styles.type3Overlay]: activeSideBarItem?.type === 3,
        [styles.noDataOverlay]: filteredData?.length === 0,
      })}
      style={{
        // overflow:
        //   showSettings || showPleaseRotate || showLoginModal || showOtherModalComp ? 'hidden' : 'auto',

        zIndex: 0,
      }}
    >
      {isGamesLoading && <Loader load={isGamesLoading} />}
      {filteredData?.length === 0 && !isGamesLoading && <NoData />}

      {!isGamesLoading && filteredData?.length !== 0 && (
        <div className={styles.rowsContainer}>
          <motion.div
            animate={{ x: 0 }}
            initial={{ x: '100vw' }}
            transition={{ delay: 0.4 }}
            className={styles.firstRow}
          >
            {filteredDataEven?.map((item, idx) => {
              return (
                <div
                  key={item.id}
                  id={item.id?.toString()}
                  className={classNames(styles.iconHolder, {
                    [styles.isMaintenance]: item.maintain,
                  })}
                  onClick={() => {
                    // handleGameClick(item);
                  }}
                >
                  {item.maintain && (
                    <div className='isMaintain'>
                      <div>正在维修</div>
                    </div>
                  )}
                  <ImgWithFallback
                    src={item.icon || ''}
                    fallback={fallbackIcon}
                    loadingIcon={loadingIcon}
                    alt={item.icon || ''}
                  />
                </div>
              );
            })}
          </motion.div>

          <motion.div
            animate={{ x: 0 }}
            initial={{ x: '100vw' }}
            transition={{ delay: 0.4 }}
            className={styles.secondRow}
          >
            {filteredDataOdd?.map((item, idx) => {
              return (
                <div
                  key={item.id}
                  id={item.id?.toString()}
                  className={classNames(styles.iconHolder, {
                    [styles.isMaintenance]: item.maintain,
                  })}
                  onClick={() => {
                    // handleGameClick(item);
                  }}
                >
                  {item.maintain && (
                    <div className='isMaintain'>
                      <div>正在维修</div>
                    </div>
                  )}
                  <ImgWithFallback
                    src={item.icon || ''}
                    fallback={fallbackIcon}
                    loadingIcon={loadingIcon}
                    alt={item.icon || ''}
                  />
                </div>
              );
            })}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ListSmallIcons;
