'use client';

import CoinPurse from '@/components/CoinPurse';
import styles from '@/components/OtherHeader/index.module.scss';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useImages from '@/hooks/useImages';
import { THEME } from '@/types/enums';
import { sfx } from '@/utils/audioFile';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import Draggable from 'react-draggable';

export type OtherHeaderProps = {
  headerTitle: string;
  isWebview?: boolean;
  showPurse?: boolean;
};
export type OtherHeaderComponent = FC<Readonly<OtherHeaderProps>>;

const OtherHeader: OtherHeaderComponent = ({ isWebview, headerTitle, showPurse }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { images } = useImages();
  const [started, setStarted] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  const theme = useAccountStore((state) => state.theme);
  const accountBalance = useAccountStore((state) => state.accountNow.balance);
  const isRechargeHistoryPage = pathname.toLowerCase().includes('recharge-history');
  const isRechargePage = pathname.toLowerCase().includes('recharge');
  const isWebviewPage = pathname.toLowerCase().includes('webview');
  const isSharePage = pathname.toLowerCase().includes('share');
  const isGamePage = pathname.toLowerCase().includes('games');

  // NOTE: Modify this line after creating the music store
  // const turnBgMusicOn = useMusicStore((state) => state.turnBgMusicOn)

  useEffect(() => {
    if (isGamePage) {
      // NOTE: Activate once the music store is created
      // turnBgMusicOn(false)

      // NOTE: Activate once game set in store is created
      // setInGameState(true)
      setIsDraggable(true);
    }
    if (isWebviewPage) {
      // NOTE: Activate once game set in store is created
      // setInGameState(true)
      setIsDraggable(true);
    }
  }, [isGamePage, isWebviewPage]);

  const handleBack = () => {
    if (isRechargeHistoryPage) return router.push('/recharge?from=recharge-history');
    if (isSharePage) return router.push('/promotion-agent');
    if (isWebview) return router.push('/recharge');
    router.push('/');
  };

  const handleDragStop = () => {
    if (started) return setHasData(true);
    setHasData(false);
    setTimeout(() => setStarted(true), 1500);
  };

  const handleDrag = () => {
    setTimeout(() => setStarted(false), 50);
  };

  const handleHistoryRecordBtnClick = () => {
    if (isRechargePage) return router.push('/recharge-history');
    router.push('/recharge');
  };

  if (isDraggable)
    return (
      <Draggable
        defaultPosition={{ x: 0, y: 10 }}
        onStop={handleDragStop}
        bounds='body'
        onStart={() => setStarted(true)}
        onDrag={handleDrag}
      >
        <div data-click={sfx.popAudio} className={styles.exit} id='23'>
          返回
        </div>
      </Draggable>
    );

  return (
    <motion.div
      className={classNames(styles.otherHeader, {
        [styles.webviewOverrides]: isWebviewPage,
      })}
      data-theme={theme}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.otherHeaderContainer}>
        <div className={styles.backBtnContainer}>
          <div data-click={sfx.popAudio} onClick={handleBack}>
            <Image src={images.backBtn} alt='Back' width={72} height={69} className={styles.backBtn} />
          </div>
        </div>
      </div>

      <div
        className={classNames(styles.titleContainer, {
          [styles.isWebview]: isWebview,
        })}
      >
        <div className={styles.headerTitle}>
          <span>{headerTitle}</span>
        </div>
        {headerTitle === '充值' && (
          <div data-click={sfx.popAudio} className={styles.historyRecordBtn} onClick={handleHistoryRecordBtnClick}>
            <Image src={images.historyRecord} alt='History Record' width={38} height={54} className={styles.hrImage} />
            {/* styles.prioRed does not exist in the scss module. Remove if necessary! */}
            <span className={classNames({ [styles.prioRed]: theme === THEME.YELLOW_WHITE })}>充值记录 &gt;</span>
          </div>
        )}
      </div>

      {showPurse && (
        <div className={styles.coinPurseContainer}>
          <CoinPurse />
        </div>
      )}
    </motion.div>
  );
};

export default OtherHeader;
