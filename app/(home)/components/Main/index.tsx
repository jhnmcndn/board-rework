'use client';

import React from 'react';
import styles from './index.module.scss';
import SideBar from './components/SideBar';

const Main = () => {
  return (
    <main className={styles.mainWrapper}>
      <SideBar />
    </main>
  );
};

export default Main;
