import { useAppStore } from '@/store/useAppStore';
import { useGameStore } from '@/store/useGameStore';
import classNames from 'classnames';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import styles from './index.module.scss';

interface IProps {
  setActivePlatformId: Dispatch<SetStateAction<number>>;
}

const CategoryListBar: FC<IProps> = ({ setActivePlatformId }) => {
  const theme = useAppStore((state) => state.theme);
  const gameInfoGroup = useGameStore((state) => state.gameInfoGroup);
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

  return (
    <div id="cateListWrapper" className={styles.cateListWrapper}>
      <div className={styles.lists}>
        {gameInfoGroup?.map((item, index: number) => {
          return (
            <div
              className={classNames(styles.iconHolder, {
                [styles.iconHolderActive]: activeTab === index,
              })}
              onClick={() => {
                setActiveTab(index);
                setActivePlatformId(item.id);
              }}
              data-theme={theme}
            >
              <img loading="lazy" src={item.icon} alt="Icon" />
              <span>{item.name} </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryListBar;
