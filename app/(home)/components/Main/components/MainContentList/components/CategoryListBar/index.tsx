import { getGameInfos } from '@/api/game';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { useGameStore } from '@/components/Providers/GameStoreProvider';
import { GameInfoGroup } from '@/types/app';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import styles from './index.module.scss';

interface IProps {
  setActivePlatformId: Dispatch<SetStateAction<number>>;
}

const CategoryListBar: FC<IProps> = ({ setActivePlatformId }) => {
  const theme = useAccountStore((state) => state.theme);
  const gameInfoGroup = useGameStore((state) => state.gameInfoGroup);
  const setGameInfos = useGameStore((state) => state.setGameInfos);
  const activeSideBarItem = useGameStore((state) => state.activeSideBarItem);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    var item = document.getElementById('cateListWrapper') as HTMLDivElement;
    const handleMouseWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) item.scrollLeft += 100;
      else item.scrollLeft -= 100;
    };
    item.addEventListener('wheel', handleMouseWheel, { passive: true });
    return () => {
      item.removeEventListener('wheel', handleMouseWheel);
    };
  }, []);

  const fetchGameInfo = async (params: { id: number; pid: number }) => {
    const response = await getGameInfos(params);
    if (response && !('message' in response)) {
      setGameInfos(response);
    }
  };

  const handleOnClick = async (item: GameInfoGroup, index: number) => {
    setActiveTab(index);
    setActivePlatformId(item.id || -1);
    fetchGameInfo({ id: activeSideBarItem.id || 1, pid: item.id || -1 });
  };

  return (
    <div id='cateListWrapper' className={styles.cateListWrapper}>
      <div className={styles.lists}>
        {gameInfoGroup?.map((item, index: number) => {
          return (
            <motion.div
              key={index}
              initial={{ y: '120%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4 }}
              className={classNames(styles.iconHolder, {
                [styles.iconHolderActive]: activeTab === index,
              })}
              onClick={() => handleOnClick(item, index)}
              data-theme={theme}
            >
              <img loading='lazy' src={item.icon} alt='Icon' />
              <span>{item.name} </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryListBar;
