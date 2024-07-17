'use client';
import { useStore } from '@/components/providers/StoreProvider';
import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import styles from './index.module.scss';
import Image from 'next/image';

interface IProps {
  setSearchFieldData: Dispatch<SetStateAction<string>>;
  searchFieldData: string;
}

const SearchField: FC<IProps> = ({ searchFieldData, setSearchFieldData }) => {
  const theme = useStore((state) => state.theme);
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchFieldData(e.target.value);
  };
  const serachIcon = require(`@/assets/blackGold/main/searchIcon.png`);
  const searchClear = require(`@/assets/blackGold/main/searchClear.png`);

  return (
    <div className={styles.searchBg}>
      <input value={searchFieldData} type='text' placeholder='搜索游戏' onChange={handleSearchChange} />
      {searchFieldData.length === 0 ? (
        <Image src={serachIcon} alt='Search Icon' />
      ) : (
        <Image src={searchClear} onClick={() => setSearchFieldData('')} alt='Search Clear' />
      )}
    </div>
  );
};

export default SearchField;
