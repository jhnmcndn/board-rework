'use client';

import CoinPurse from '@/components/CoinPurse';
import styles from '@/components/OtherHeader/index.module.scss';
import { useStore } from '@/components/providers/StoreProvider';
import { THEME } from '@/types/enums';
import { onClickSound } from '@/utils/audioFile';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import Draggable from 'react-draggable';

export type OtherHeaderProps = {
  headerTitle: string;
  isWebview?: boolean;
  hasPurse?: boolean;
};
export type OtherHeaderComponent = FC<Readonly<OtherHeaderProps>>;

const OtherHeader: OtherHeaderComponent = ({ isWebview, headerTitle, hasPurse }) => {
  const theme = useStore((state) => state.theme);
  const accountBalance = useStore((state) => state.accountNow.balance);
  const pathname = usePathname();
  const router = useRouter();
  const [isDraggable, setIsDraggable] = useState(false);
  const [started, setStarted] = useState(false);
  const [hasData, setHasData] = useState(false);
  const isRechargeHistoryPage = pathname.toLowerCase().includes('recharge-history');
  const isRechargePage = pathname.toLowerCase().includes('recharge');
  const isWebviewPage = pathname.toLowerCase().includes('webview');
  const isSharePage = pathname.toLowerCase().includes('share');
  const isGamePage = pathname.toLowerCase().includes('games');
  const backBtnImg = require(`@/assets/${theme}/header/backBtn.png`);
  const historyRecordImg = require(`@/assets/${theme}/header/historyRecord.png`);

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
    onClickSound('pop');
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
    onClickSound('pop');
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
        <div className={styles.exit} onClick={() => onClickSound('pop')} id='23'>
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
          <div onClick={handleBack}>
            <Image src={backBtnImg} alt='Back' width={72} height={69} className={styles.backBtn} />
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
          <div className={styles.historyRecordBtn} onClick={handleHistoryRecordBtnClick}>
            <Image src={historyRecordImg} alt='History Record' width={38} height={54} className={styles.hrImage} />
            {/* styles.prioRed does not exist in the scss module. Remove if necessary! */}
            <span className={classNames({ [styles.prioRed]: theme === THEME.YELLOW_WHITE })}>充值记录 &gt;</span>
          </div>
        )}
      </div>

      <div className={styles.coinPurseContainer}>{!hasPurse && <CoinPurse />}</div>
    </motion.div>
  );
};

export default OtherHeader;
