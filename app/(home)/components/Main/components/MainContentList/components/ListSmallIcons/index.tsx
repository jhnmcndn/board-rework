import ImgWithFallback from '@/components/ImgWithFallback';
import NoData from '@/components/NoData';
import { useGameStore } from '@/components/Providers/GameStoreProvider';
import useImages from '@/hooks/useImages';
import { RspGameInfo } from '@/types/app';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/grid';
import { Grid } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './index.module.scss';

interface IProps {
  searchFieldData: string;
  setSearchFieldData: Dispatch<SetStateAction<string>>;
}

const ListSmallIcons: FC<IProps> = ({ searchFieldData, setSearchFieldData }) => {
  const { images } = useImages();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [filteredData, setFilteredData] = useState<RspGameInfo[] | undefined>();
  const [filteredDataEven, setFilteredDataEven] = useState<RspGameInfo[]>([]);
  const [filteredDataOdd, setFilteredDataOdd] = useState<RspGameInfo[]>([]);
  const activeSideBarItem = useGameStore((state) => state.activeSideBarItem);
  const gameInfos = useGameStore((state) => state.gameInfos);
  const isGamesLoading = useGameStore((state) => state.isGamesLoading);

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

  return (
    <div
      id='listSmallWrapper'
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
      {filteredData?.length === 0 && !isGamesLoading && <NoData />}

      {!isGamesLoading && filteredData?.length !== 0 && (
        <div className={styles.rowsContainer}>
          <motion.div
            animate={{ x: 0 }}
            initial={{ x: '100vw' }}
            transition={{ delay: 0.4 }}
            className={styles.firstRow}
          >
            <Swiper
              slidesPerView='auto'
              spaceBetween={15}
              grabCursor
              grid={{
                rows: 2,
                fill: 'column',
              }}
              modules={[Grid]}
            >
              {filteredData?.map((item, idx) => {
                return (
                  <SwiperSlide
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
                      fallback={images.fallback}
                      loadingIcon={images.loading}
                      alt={item.icon || ''}
                      className='swiper-lazy'
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ListSmallIcons;
