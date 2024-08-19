'use client';

import CoinPurse from '@/components/CoinPurse';
import styles from '@/components/OtherHeader/index.module.scss';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useImages from '@/hooks/useImages';
import { sfx } from '@/utils/audioFile';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import Draggable from 'react-draggable';

export type OtherHeaderProps = {
  headerTitle?: string;
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
  const isRechargePage = pathname.toLowerCase().includes('recharge');
  const isWebviewPage = pathname.toLowerCase().includes('webview');
  const isSharePage = pathname.toLowerCase().includes('share');
  const isGamePage = pathname.toLowerCase().includes('games');

  const rechargeTitle = pathname.includes('rechargeHistory') ? '充值记录' : '充值';

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

  const handleDragStop = () => {
    if (started) return setHasData(true);
    setHasData(false);
    setTimeout(() => setStarted(true), 1500);
  };

  const handleDrag = () => {
    setTimeout(() => setStarted(false), 50);
  };

  const handleShareBtnClick = () => router.push('/share');

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
      key={pathname}
      className={classNames(styles.otherHeader, {
        [styles.webviewOverrides]: isWebviewPage,
      })}
      data-theme={theme}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.backBtnContainer} data-click={sfx.popAudio} onClick={() => router.back()}>
        <Image src={images.backBtn} alt='Back' width={72} height={69} className={styles.backBtn} />
      </div>

      <div
        className={classNames(styles.titleContainer, {
          [styles.isWebview]: isWebview,
        })}
      >
        <div className={styles.headerTitle}>
          <span>{headerTitle || rechargeTitle}</span>
          {headerTitle === '推广代理' && (
            <div className={styles.historyRecordBtn} onClick={handleShareBtnClick}>
              <Image src={images.shareIcon} alt='Share Icon' width={38} height={54} className={styles.shareIcon} />
              <span className={styles.text}>推广攻略 &gt;</span>
            </div>
          )}
        </div>

        {isRechargePage && !pathname.includes('rechargeHistory') && (
          <div
            data-click={sfx.popAudio}
            className={styles.historyRecordBtn}
            onClick={() => router.push('/recharge/rechargeHistory')}
          >
            <Image
              src={images.historyRecord}
              alt='History Record'
              width={38}
              height={54}
              className={styles.historyIcon}
            />
            <span className={styles.text}>充值记录 &gt;</span>
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
