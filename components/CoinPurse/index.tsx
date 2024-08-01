'use client';

import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useAuthCheck from '@/hooks/useAuthCheck';
import useImages from '@/hooks/useImages';
import classNames from 'classnames';
import Image from 'next/image';
import { CSSProperties, FC, useEffect, useState } from 'react';
import styles from './index.module.scss';

export type CoinPurseProps = {
  position?: CSSProperties['position'];
  top?: CSSProperties['top'];
  left?: CSSProperties['left'];
  iColor?: string;
  betLog?: boolean;
  inputBg?: string;
  noShuffle?: boolean;
};
export type CoinPurseComponent = FC<Readonly<CoinPurseProps>>;

const CoinPurse: CoinPurseComponent = (props) => {
  const { position, top, left, iColor, betLog, inputBg, noShuffle } = props;
  const { images } = useImages();
  const { authCheck } = useAuthCheck();
  const userBalance = useAccountStore((state) => state.accountNow.balance);
  const userToken = useAccountStore((state) => state.accountInfo.token);
  const [animateSpin, setAnimateSpin] = useState(false);
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
        <Image src={images.coin} alt='Coin' width={96} height={70} className={styles.coin} />
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
          <Image
            src={images.reload}
            alt='Reload'
            width={70}
            height={70}
            onClick={() => authCheck(() => console.log('// TODO Refetch balance'))}
          />
        </div>
      )}
    </>
  );
};

export default CoinPurse;
