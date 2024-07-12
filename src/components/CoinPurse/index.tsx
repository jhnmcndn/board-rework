import { useAccountStore } from '@/store/useAccountStore';
import { useAppStore } from '@/store/useAppStore';
import type { CoinPurseComponent } from '@/types/component';
import { isLoggedIn, onClickSound } from '@/utils/app';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import coinIcon from '/src/assets/blackGold/header/coin.png';

const CoinPurse: CoinPurseComponent = (props) => {
  const { position, top, left, iColor, betLog, inputBg, noShuffle } = props;
  const { userBalance } = useAccountStore((state) => state.accountNow);
  const theme = useAppStore((state) => state.theme);
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
              onClickSound('pop');
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
