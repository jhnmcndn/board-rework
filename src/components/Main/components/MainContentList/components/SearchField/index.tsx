import { useAppStore } from '@/store/useAppStore';
import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import styles from './index.module.scss';

interface IProps {
  setSearchFieldData: Dispatch<SetStateAction<string>>;
  searchFieldData: string;
}

const SearchField: FC<IProps> = ({ searchFieldData, setSearchFieldData }) => {
  const theme = useAppStore((state) => state.theme);
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchFieldData(e.target.value);
  };

  return (
    <div className={styles.searchBg}>
      <input value={searchFieldData} type="text" placeholder="搜索游戏" onChange={handleSearchChange} />
      {searchFieldData.length === 0 ? (
        <img src={`src/assets/${theme}/main/searchIcon.png`} alt="Search Icon" />
      ) : (
        <img
          src={`src/assets/${theme}/main/searchClear.png`}
          onClick={() => setSearchFieldData('')}
          alt="Search Clear"
        />
      )}
    </div>
  );
};

export default SearchField;
