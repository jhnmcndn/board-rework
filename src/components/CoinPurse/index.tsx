import { useAccountNowStore } from '@/store/accountNow';
import { useThemeStore } from '@/store/theme';
import { isLoggedIn } from '@/utils/app';
import classNames from 'classnames';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import coinIcon from '/src/assets/blackGold/header/coin.png';

type TProps = {
  position: any;
  accountNow: string | number;
  top: number;
  left: string;
  iColor?: string;
  betLog?: boolean;
  inputBg?: string;
  noShuffle?: boolean;
};

const CoinPurse: FC<TProps> = (props) => {
  const { position, accountNow, top, left, iColor, betLog, inputBg, noShuffle } = props;
  const { userBalance } = useAccountNowStore((state) => state.accountNow);
  const theme = useThemeStore((state) => state.theme);
  const [animateSpin, setAnimateSpin] = useState(false);

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
        <img src={coinIcon} className={styles.coin} alt="" />

        {!betLog && (
          <div className={styles.coinInput}>
            <input
              className={styles.userBalanceInput}
              value={isLoggedIn() ? userBalance : 0}
              disabled={true}
              style={{ background: inputBg, color: iColor }}
            />
          </div>
        )}
      </div>
      {!noShuffle && (
        <div className={classNames(styles.shuffles, { shuffleSpin: animateSpin })}>
          <img
            src={`/src/assets/${theme}/header/reload.png`}
            alt=""
            style={{ left }}
            onClick={() => {
              // popSound();
              if (!isLoggedIn()) {
                // dispatch(setShowLoginModal(true));
              } else {
                setAnimateSpin(true);
                // dispatch(updateBalance());
              }
            }}
          />
        </div>
      )}
    </>
  );
};

export default CoinPurse;
