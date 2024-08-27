'use client';

import { APP_VERSION } from '@/constants/app';
import { serverConfig } from '@/server';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

const LoadingScreen = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [loadingWidth, setLoadingWidth] = useState(0);

  useEffect(() => {
    let loadingInterval: NodeJS.Timeout;
    if (!!localStorage.getItem('loadingScreen')) {
      setShowLoading(false);
    } else {
      setShowLoading(true);
      loadingInterval = setInterval(() => {
        setLoadingWidth((prevVal) => prevVal + 1);
      }, 50);

      if (loadingWidth === 20 || loadingWidth === 60) {
        setLoadingWidth((prevVal) => prevVal + 20);
      }

      if (loadingWidth === 120) {
        clearInterval(loadingInterval);
        localStorage.setItem('loadingScreen', 'done');
        setShowLoading(false);
      }
    }

    return () => clearInterval(loadingInterval);
  }, [loadingWidth]);

  if (!showLoading) return null;

  return (
    <div className={styles.loadingScreen}>
      <div className={styles.loadingScreen__backgroundImage}>
        <Image
          sizes='(max-width: 100vw) 100vw'
          alt='loading_bg'
          src={`/assets/${serverConfig.server}/loading_bg.webp`}
          fill
          quality={100}
          priority
        />
      </div>
      <div className={styles.loadingScreen__content}>
        <p className={styles[`loadingScreen__text${serverConfig.server}`]}>游戏正在加载中...</p>
        <div className={styles.loadingScreen__progressbarContainer}>
          <div className={styles.loadingScreen__progressbarBody}>
            <div
              className={styles.loadingScreen__progressbar}
              style={loadingWidth !== 0 ? { width: `${loadingWidth}%` } : {}}
            />
          </div>
        </div>
        <div className={styles.loadingScreen__version}>
          <p className={styles[`loadingScreen__text${serverConfig.server}`]}>当前版本: V {APP_VERSION}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
