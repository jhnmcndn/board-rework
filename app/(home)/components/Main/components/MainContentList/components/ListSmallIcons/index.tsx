import MemoizedIconHolder from '@/components/MemoizedIconHolder';
import NoData from '@/components/NoData';
import { useGameStore } from '@/components/Providers/GameStoreProvider';
import useAuthActions from '@/hooks/useAuthActions';
import { ListIconProps, RspGameInfo } from '@/types/app';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';

const ListSmallIcons: FC<ListIconProps> = ({ searchFieldData }) => {
  const router = useRouter();
  const { authCheck } = useAuthActions();
  const rowsContainerRef = useRef<HTMLDivElement | null>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [filteredData, setFilteredData] = useState<RspGameInfo[] | undefined>();
  const [defaultX, setDefaultX] = useState(0);
  const [isTransition, setIsTransition] = useState(true);
  const { gameInfos, activeSideBarItem, isGamesLoading } = useGameStore((state) => state);

  useEffect(() => {
    const smallIconTranslateX = sessionStorage.getItem('smallIconTranslateX');
    if (smallIconTranslateX) {
      sessionStorage.removeItem('smallIconTranslateX');
      setTimeout(() => {
        setDefaultX(Number(smallIconTranslateX));
      }, 1000);

      setTimeout(() => {
        setIsTransition(false);
      }, 2000);
    } else {
      setIsTransition(false);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (rowsContainerRef.current) {
        const containerWidth = rowsContainerRef.current.scrollWidth;
        const viewportWidth = rowsContainerRef.current.clientWidth * 2;
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
    var data_Category = item.gameCategory === 'HG';

    authCheck(() => {
      if (!data_Category) {
        router.push(`/games?id=${item.id}`);
        handleScrollIntoView();
      }
    });
  };

  const handleScrollIntoView = () => {
    const containerRef = rowsContainerRef.current;
    if (!containerRef) return;
    const coords = containerRef.style.transform.match(/^translateX\((.+)px\) translateY\((.+)px\)/);

    if (coords?.length) {
      if (Number(coords[1]) < 0) {
        sessionStorage.setItem('smallIconTranslateX', coords[1]);
      }
    }
  };

  return (
    <div
      id='listSmallWrapper'
      className={classNames(styles.listSmallWrapper, {
        [styles.type3Overlay]: activeSideBarItem?.type === 3,
        [styles.noDataOverlay]: filteredData?.length === 0,
      })}
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
          dragTransition={{
            power: 0.2,
            timeConstant: 50,
            bounceDamping: 26,
          }}
          style={{
            x: defaultX,
            y: '0px', // Do not remove this
            ...(isTransition ? { transition: '.7s' } : {}),
          }}
        >
          <div className={styles.firstRow}>
            {filteredData?.map((item, idx) => {
              if (idx % 2 !== 0) return;
              return (
                <MemoizedIconHolder key={idx} idx={idx} item={item} handleOnClick={handleGameClick} styles={styles} />
              );
            })}
          </div>

          <div className={styles.secondRow}>
            {filteredData?.map((item, idx) => {
              if (idx % 2 === 0) return;
              return (
                <MemoizedIconHolder
                  key={idx}
                  idx={idx + 0.5}
                  item={item}
                  handleOnClick={handleGameClick}
                  styles={styles}
                />
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ListSmallIcons;
