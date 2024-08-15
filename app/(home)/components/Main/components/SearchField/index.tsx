'use client';

import useImages from '@/hooks/useImages';
import Image from 'next/image';
import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import styles from './index.module.scss';

interface IProps {
  setSearchFieldData: Dispatch<SetStateAction<string>>;
  searchFieldData: string;
  placeholder?: string;
}

const SearchField: FC<IProps> = ({ searchFieldData, setSearchFieldData, placeholder = '搜索游戏' }) => {
  const { images } = useImages();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearchFieldData(e.target.value);

  return (
    <div className={styles.searchBg}>
      <input value={searchFieldData} type='text' placeholder={placeholder} onChange={handleSearchChange} />
      {searchFieldData.length === 0 ? (
        <Image src={images.search} alt='Search' />
      ) : (
        <Image src={images.searchClear} onClick={() => setSearchFieldData('')} alt='Clear' />
      )}
    </div>
  );
};

export default SearchField;
