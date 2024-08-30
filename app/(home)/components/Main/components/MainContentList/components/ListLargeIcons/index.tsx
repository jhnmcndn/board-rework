import MemoizedIconHolder from '@/components/MemoizedIconHolder';
import NoData from '@/components/NoData';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { useGameStore } from '@/components/Providers/GameStoreProvider';
import useAuthActions from '@/hooks/useAuthActions';
import useFetchGame from '@/hooks/useFetchGame';
import useImages from '@/hooks/useImages';
import { GameInfoGroup, ListIconProps, RspGameInfo } from '@/types/app';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useRef, useState } from 'react';
import ListSmallIcons from '../ListSmallIcons';
import styles from './index.module.scss';

type CombinedGameInfo = RspGameInfo & GameInfoGroup;

const ListLargeIcons: FC<ListIconProps> = ({ searchFieldData }) => {
  const router = useRouter();
  const { images } = useImages();
  const { authCheck } = useAuthActions();
  const { fetchGameInfo } = useFetchGame();
  const rowsContainerRef = useRef<HTMLDivElement | null>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [data, setData] = useState<CombinedGameInfo[]>([]);
  const [filteredData, setFilteredData] = useState<CombinedGameInfo[] | undefined>();
  const [defaultX, setDefaultX] = useState(0);
  const [isTransition, setIsTransition] = useState(true);
  const theme = useAccountStore((state) => state.theme);
  const {
    activeSideBarItem,
    gameInfos,
    gameInfoGroup,
    showPlatform,
    activePlatform,
    isGamesLoading,
    setShowPlatform,
    setActivePlatform,
  } = useGameStore((state) => state);

  useEffect(() => {
    if (showPlatform) return;

    const bigIconTranslateX = sessionStorage.getItem('bigIconTranslateX');
    if (bigIconTranslateX) {
      sessionStorage.removeItem('bigIconTranslateX');
      setTimeout(() => {
        setDefaultX(Number(bigIconTranslateX));
      }, 1000);

      setTimeout(() => {
        setIsTransition(false);
      }, 2000);
    } else {
      setIsTransition(false);
    }
  }, [showPlatform]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (rowsContainerRef.current) {
        const containerWidth = rowsContainerRef.current.scrollWidth;
        const viewportWidth = rowsContainerRef.current.clientWidth * 2;
        const leftContraint = -(containerWidth - viewportWidth);
        setDragConstraints({ left: leftContraint < 1 ? leftContraint : 0, right: 0 });
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [filteredData, showPlatform]);

  useEffect(() => {
    if (!searchFieldData) {
      setFilteredData(data || []);
    }
    if (searchFieldData && data.length > 0) {
      setFilteredData(
        data.filter((item) => {
          if (item && item.name) {
            return item?.name.toLowerCase().includes(searchFieldData.toLowerCase());
          }
        }),
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
  }, [gameInfoGroup, gameInfos]);

  const renderPlatFormListHeader = () => {
    return (
      <div className={styles.listHeader} data-theme={theme}>
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: 0, transition: { delay: 0.2 } }}
          className={styles.leftContent}
        >
          <Image src={activePlatform?.icon || ''} width={200} height={200} alt='Icon' />
          <span>{activePlatform?.name}</span> <span>总共{gameInfos?.length}款小游戏</span>
        </motion.div>
        <motion.div
          initial={{ y: '-150%' }}
          animate={{ y: 0, transition: { delay: 0.2 } }}
          className={styles.rightContent}
        >
          <Image
            src={images.cardGameBack}
            width={200}
            height={200}
            onClick={() => {
              setDefaultX(0);
              setIsTransition(true);
              setShowPlatform(false);
            }}
            alt='Card Game Back'
          />
        </motion.div>
      </div>
    );
  };

  const handleOnClick = async (item: CombinedGameInfo) => {
    if (isDragging) return;

    if (activeSideBarItem.type === 2) {
      authCheck(() => {
        router.push(`/games?id=${item.id}`);
      });
    } else {
      await fetchGameInfo({ id: activeSideBarItem.id || 1, pid: item.id || 1 });
      setActivePlatform(item);
      setShowPlatform(true);
    }
    handleScrollIntoView();
  };

  const handleScrollIntoView = () => {
    const containerRef = rowsContainerRef.current;
    if (!containerRef) return;
    const coords = containerRef.style.transform.match(/^translateX\((.+)px\) translateY\((.+)px\)/);

    if (coords?.length) {
      if (Number(coords[1]) < 0) {
        sessionStorage.setItem('bigIconTranslateX', coords[1]);
      }
    }
  };

  return (
    <>
      {!showPlatform && filteredData?.length === 0 && !isGamesLoading && <NoData />}
      {!showPlatform && !isGamesLoading && filteredData?.length !== 0 && (
        <div
          id='listLargeWrapper'
          className={classNames(styles.listLargeWrapper, {
            [styles.listLargeType2Overlay]: activeSideBarItem.type === 2,
          })}
        >
          <motion.div
            className={styles.listLargeContainer}
            drag={isTransition ? false : 'x'}
            dragConstraints={dragConstraints}
            dragElastic={0.1}
            ref={rowsContainerRef}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            dragTransition={{
              power: 0.2,
              timeConstant: 30,
              bounceDamping: 26,
            }}
            style={{
              x: defaultX,
              y: '0px', // Do not remove this
              ...(isTransition ? { transition: '.7s' } : {}),
            }}
          >
            <motion.div className={styles.firstRow}>
              {filteredData?.map((item, idx) => {
                return (
                  <MemoizedIconHolder
                    key={item.id}
                    idx={idx}
                    item={item}
                    handleOnClick={handleOnClick}
                    styles={styles}
                    isLargeIcon
                  />
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      )}

      {showPlatform && (
        <>
          {renderPlatFormListHeader()}
          {data.map(
            (item, idx) =>
              item.id === activePlatform?.id && (
                <ListSmallIcons key={item.id || '' + idx} searchFieldData={searchFieldData} />
              ),
          )}
        </>
      )}
    </>
  );
};

export default ListLargeIcons;
