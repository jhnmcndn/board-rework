'use client';

import React from 'react';
import styles from './index.module.scss';
import SideBar from './components/SideBar';
import MainContentList from './components/MainContentList';

const Main = () => {
  return (
    <main className={styles.mainWrapper}>
      <SideBar />
      <MainContentList />
    </main>
  );
};

export default Main;
