import MemoizedIconHolder from '@/components/MemoizedIconHolder';
import NoData from '@/components/NoData';
import { useGameStore } from '@/components/Providers/GameStoreProvider';
import useAuthCheck from '@/hooks/useAuthCheck';
import useImages from '@/hooks/useImages';
import { RspGameInfo } from '@/types/app';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/grid';
import styles from './index.module.scss';

interface IProps {
  searchFieldData: string;
  setSearchFieldData: Dispatch<SetStateAction<string>>;
}

const ListSmallIcons: FC<IProps> = ({ searchFieldData, setSearchFieldData }) => {
  const router = useRouter();
  const { images } = useImages();
  const rowsContainerRef = useRef<HTMLDivElement | null>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [filteredData, setFilteredData] = useState<RspGameInfo[] | undefined>();
  const { gameInfos, activeSideBarItem, isGamesLoading } = useGameStore((state) => state);
  const { authCheck } = useAuthCheck();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (rowsContainerRef.current) {
        const containerWidth = rowsContainerRef.current.scrollWidth;
        const viewportWidth = rowsContainerRef.current.clientWidth * 2.1;
        setDragConstraints({ left: -(containerWidth - viewportWidth), right: 0 });
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [filteredData]);

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

  const handleGameClick = (item: RspGameInfo) => {
    if (isDragging) return;
    sessionStorage.setItem('id', String(item.id));
    sessionStorage.setItem('id_2', String(item.id));
    var data_Category = item.gameCategory === 'HG' ? true : false;

    authCheck(() => {
      if (activeSideBarItem.id === 6) {
        router.push(`/game/${item.lotteryId}`);
      } else {
        if (data_Category) {
        } else {
          router.push(`/games?id=${item.id}`);
        }
      }
    });
  };

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
        <motion.div
          className={styles.rowsContainer}
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
            {filteredData?.map((item, idx) => {
              if (idx % 2 !== 0) return;
              return <MemoizedIconHolder key={idx} item={item} handleOnClick={handleGameClick} styles={styles} />;
            })}
          </motion.div>

          <motion.div
            animate={{ x: 0 }}
            initial={{ x: '100vw' }}
            transition={{ delay: 0.4 }}
            className={styles.secondRow}
          >
            {filteredData?.map((item, idx) => {
              if (idx % 2 === 0) return;
              return <MemoizedIconHolder key={idx} item={item} handleOnClick={handleGameClick} styles={styles} />;
            })}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ListSmallIcons;
