import { useGameStore } from '@/store/useGameStore';
import { GameInfoGroup } from '@/types/app';
import { useState } from 'react';
import CategoryListBar from './components/CategoryListBar';
import styles from './index.module.scss';

const MainContentList = () => {
  const activeSideBarItem = useGameStore((state) => state.activeSideBarItem);
  const [activePlatformId, setActivePlatformId] = useState(-1);
  const [searchFieldData, setSearchFieldData] = useState('');
  const [platformsList, setPlatformsList] = useState<GameInfoGroup[]>([]);

  return (
    <div className={styles.mainListWrapper}>
      {activeSideBarItem.type === 4 ? (
        <div className={styles.categorySearchContainer}>
          <CategoryListBar setActivePlatformId={setActivePlatformId} />
          <div className={styles.searchWrapper}>
            {/* <SearchField searchFieldData={searchFieldData} setSearchFieldData={setSearchFieldData} /> */}
          </div>
        </div>
      ) : (
        <div className={styles.announceSearchContainer}>
          {/* <Announce />
          <div className={styles.searchWrapper}>
            <SearchField searchFieldData={searchFieldData} setSearchFieldData={setSearchFieldData} />
          </div> */}
        </div>
      )}
    </div>
  );
};

export default MainContentList;
