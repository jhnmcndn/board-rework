import Loader from '@/components/Loader';
import NoData from '@/components/NoData';
import { useGameStore } from '@/components/Providers/GameStoreProvider';
import { useEffect, useState } from 'react';
import Announce from '../Announce';
import SearchField from '../SearchField';
import CategoryListBar from './components/CategoryListBar';
import ListLargeIcons from './components/ListLargeIcons';
import ListSmallIcons from './components/ListSmallIcons';
import styles from './index.module.scss';

const MainContentList = () => {
  const { sideBar, activeSideBarItem, gameInfoGroup, isGamesLoading } = useGameStore((state) => state);
  const [activePlatformId, setActivePlatformId] = useState(-1);
  const [searchFieldData, setSearchFieldData] = useState('');
  const [delayRender, setDelayRender] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      // This is code to prevent laggy first render animation of home page
      setDelayRender(false);
    }, 500);
  }, []);

  if (delayRender) {
    return;
  }

  return (
    <div className={styles.mainListWrapper}>
      {activeSideBarItem.type === 4 ? (
        <div className={styles.categorySearchContainer}>
          <CategoryListBar setActivePlatformId={setActivePlatformId} />
          <div className={styles.searchWrapper}>
            <SearchField searchFieldData={searchFieldData} setSearchFieldData={setSearchFieldData} />
          </div>
        </div>
      ) : (
        <div className={styles.announceSearchContainer}>
          <Announce />
          <div className={styles.searchWrapper}>
            <SearchField searchFieldData={searchFieldData} setSearchFieldData={setSearchFieldData} />
          </div>
        </div>
      )}

      {isGamesLoading && <Loader load={isGamesLoading} />}

      <div className={styles.listContainer}>
        {activeSideBarItem.id === 9 && gameInfoGroup.length === 0 && !isGamesLoading && <NoData />}

        {sideBar.map((item, idx) => {
          if (item.type !== 2 && item.type !== 3) {
            if (item.type === 4) {
              return (
                activeSideBarItem.id === item.id &&
                gameInfoGroup?.map((platform, idx) => {
                  return (
                    activePlatformId === platform.id && <ListSmallIcons key={idx} searchFieldData={searchFieldData} />
                  );
                })
              );
            } else {
              return activeSideBarItem.id === item.id && <ListSmallIcons key={idx} searchFieldData={searchFieldData} />;
            }
          } else {
            return activeSideBarItem.id === item.id && <ListLargeIcons key={idx} searchFieldData={searchFieldData} />;
          }
        })}
      </div>
    </div>
  );
};

export default MainContentList;
