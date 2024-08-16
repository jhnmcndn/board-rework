'use client';

import useImages from '@/hooks/useImages';
import { SearchFieldProps } from '@/types/app';
import Image from 'next/image';
import { ChangeEvent, FC } from 'react';
import styles from './index.module.scss';

const SearchField: FC<SearchFieldProps> = ({ searchFieldData, setSearchFieldData, placeholder = '搜索游戏' }) => {
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
