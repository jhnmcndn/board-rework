import { getGameInfos } from '@/api/game';
import ImgWithFallback from '@/components/ImgWithFallback';
import NoData from '@/components/NoData';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { useGameStore } from '@/components/Providers/GameStoreProvider';
import useImages from '@/hooks/useImages';
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
  const { images } = useImages();
  const rowsContainerRef = useRef<HTMLDivElement | null>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [data, setData] = useState<CombinedGameInfo[]>([]);
  const [filteredData, setFilteredData] = useState<CombinedGameInfo[] | undefined>();
  const theme = useAccountStore((state) => state.theme);
  const {
    activeSideBarItem,
    gameInfos,
    gameInfoGroup,
    showPlatform,
    activePlatform,
    isGamesLoading,
    setGameInfos,
    setShowPlatform,
    setActivePlatform,
    setIsGamesLoading,
  } = useGameStore((state) => state);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (rowsContainerRef.current) {
        const containerWidth = rowsContainerRef.current.scrollWidth;
        const viewportWidth = rowsContainerRef.current.clientWidth * 2.1;
        setDragConstraints({ left: -(containerWidth - viewportWidth), right: 0 });
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

  const fetchGameInfo = async (params: { id: number; pid: number }) => {
    setIsGamesLoading(true);
    const response = await getGameInfos(params);
    if (response && !('message' in response)) {
      setGameInfos(response);
    }
    setIsGamesLoading(false);
  };

  const PlatFormListHeader = () => {
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
              setShowPlatform(false);
            }}
            alt='Card Game Back'
          />
        </motion.div>
      </div>
    );
  };

  const handleOnClick = (item: CombinedGameInfo) => {
    if (isDragging) return;

    if (activeSideBarItem.type === 2) {
      // to follow
    } else {
      setActivePlatform(item);
      fetchGameInfo({ id: activeSideBarItem.id || 1, pid: item.id || 1 });
      setShowPlatform(true);
    }
  };

  return (
    <>
      {!showPlatform && filteredData?.length === 0 && !isGamesLoading && <NoData />}
      {!showPlatform && filteredData?.length !== 0 && (
        <div
          id='listLargeWrapper'
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
          <motion.div
            className={styles.listLargeContainer}
            drag='x'
            dragConstraints={dragConstraints}
            dragElastic={0.1}
            ref={rowsContainerRef}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
          >
            <motion.div
              animate={{ x: 0 }}
              initial={{ x: '100vw' }}
              transition={{ delay: 0.4 }}
              className={styles.firstRow}
            >
              {filteredData?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={classNames(styles.iconHolder, {
                      [styles.isMaintenance]: item.maintain,
                    })}
                    onClick={() => handleOnClick(item)}
                  >
                    {item.maintain && (
                      <div className='isMaintainLargeIcon'>
                        <div>正在维修</div>
                      </div>
                    )}

                    <ImgWithFallback
                      src={(activeSideBarItem.type === 3 ? item.cardIcon : item.icon) || ''}
                      fallback={images.fallback}
                      loadingIcon={images.loading}
                      alt={item.icon || item.cardIcon || ''}
                    />
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
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
