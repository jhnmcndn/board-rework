'use client';

import classNames from 'classnames';
import { CSSProperties, FC, useEffect, useState } from 'react';
import styles from './index.module.scss';
import coinIcon from '@/assets/blackGold/header/coin.png';
import { useStore } from '@/components/providers/StoreProvider';
import Image from 'next/image';

export type CoinPurseProps = {
  position: CSSProperties['position'];
  top: CSSProperties['top'];
  left: CSSProperties['left'];
  iColor?: string;
  betLog?: boolean;
  inputBg?: string;
  noShuffle?: boolean;
};
export type CoinPurseComponent = FC<Readonly<CoinPurseProps>>;

const CoinPurse: CoinPurseComponent = (props) => {
  const { position, top, left, iColor, betLog, inputBg, noShuffle } = props;
  const userBalance = useStore((state) => state.accountNow.balance);
  const userToken = useStore((state) => state.accountInfo.token);
  const theme = useStore((state) => state.theme);
  const [animateSpin, setAnimateSpin] = useState(false);
  const reloadImage = require(`@/assets/${theme}/header/reload.png`);
  const isLoggedIn = userToken !== undefined;

  useEffect(() => {
    const spinTimer = setTimeout(() => setAnimateSpin(false), 500);
    return () => {
      clearTimeout(spinTimer);
    };
  }, [animateSpin]);

  return (
    <>
      <div
        className={styles.coinPurseWrapper}
        style={{
          color: iColor || 'white',
          position: position || 'relative',
          top,
          left,
        }}
      >
        <Image src={coinIcon} alt='Coin icon' width={96} height={70} className={styles.coin} />
        {!betLog && (
          <div className={styles.coinInput}>
            <input
              className={styles.userBalanceInput}
              value={isLoggedIn ? userBalance : 0}
              disabled={true}
              style={{ background: inputBg, color: iColor }}
            />
          </div>
        )}
      </div>
      {!noShuffle && (
        <div className={classNames(styles.shuffles, { shuffleSpin: animateSpin })}>
          <Image src={reloadImage} alt='Reload' width={70} height={70} />
        </div>
      )}
    </>
  );
};

export default CoinPurse;
