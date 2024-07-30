import { getGameInfos } from '@/api/game';
import fallbackIcon from '@/assets/commons/fallBacks/onErrorImg.png';
import loadingIcon from '@/assets/commons/fallBacks/squareLoad2.gif';
import ImgWithFallback from '@/components/ImgWithFallback';
import NoData from '@/components/NoData';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { useGameStore } from '@/components/Providers/GameStoreProvider';
import { GameInfoGroup, RspGameInfo } from '@/types/app';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import ListSmallIcons from '../ListSmallIcons';
import styles from './index.module.scss';

interface IProps {
  searchFieldData: string;
  setSearchFieldData: Dispatch<SetStateAction<string>>;
}

type CombinedGameInfo = RspGameInfo & GameInfoGroup;

const ListLargeIcons: FC<IProps> = ({ searchFieldData, setSearchFieldData }) => {
  const [filteredData, setFilteredData] = useState<CombinedGameInfo[] | undefined>();
  const [data, setData] = useState<CombinedGameInfo[]>([]);
  const theme = useAccountStore((state) => state.theme);
  const activeSideBarItem = useGameStore((state) => state.activeSideBarItem);
  const gameInfos = useGameStore((state) => state.gameInfos);
  const setGameInfos = useGameStore((state) => state.setGameInfos);
  const gameInfoGroup = useGameStore((state) => state.gameInfoGroup);
  const showPlatform = useGameStore((state) => state.showPlatform);
  const setShowPlatform = useGameStore((state) => state.setShowPlatform);
  const activePlatform = useGameStore((state) => state.activePlatform);
  const setActivePlatform = useGameStore((state) => state.setActivePlatform);
  const isGamesLoading = useGameStore((state) => state.isGamesLoading);
  const setIsGamesLoading = useGameStore((state) => state.setIsGamesLoading);

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
  }, [activeSideBarItem, gameInfoGroup, gameInfos]);

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
            src={require(`@/assets/${theme}/main/cardGameBack.png`)}
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
          <div className={styles.listLargeContainer}>
            <motion.div
              animate={{ x: 0 }}
              initial={{ x: '100vw' }}
              transition={{ delay: 0.4 }}
              className={styles.firstRow}
            >
              <Swiper slidesPerView={'auto'} spaceBetween={15} grabCursor>
                {filteredData?.map((item) => {
                  return (
                    <SwiperSlide
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
                        fallback={fallbackIcon}
                        loadingIcon={loadingIcon}
                        alt={item.icon || item.cardIcon || ''}
                      />
                    </SwiperSlide>
                  );
                })}

                <SwiperSlide className={styles.iconHolder}></SwiperSlide>
              </Swiper>
            </motion.div>
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
