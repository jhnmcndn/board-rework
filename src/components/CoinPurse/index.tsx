import { useAccountNowStore } from '@/store/accountNow';
import { useThemeStore } from '@/store/theme';
import { isLoggedIn } from '@/utils/app';
import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import styles from './index.module.scss';
import coinIcon from '/src/assets/blackGold/header/coin.png';

type TProps = {
  posi: any;
  accountNow: string | number;
  top: number;
  left: string;
  Icolor?: string;
  betlog?: boolean;
  inputBg?: string;
  noShuffle?: boolean;
};

const CoinPurse: FC<TProps> = (props) => {
  const { userBalance } = useAccountNowStore((state) => state.accountNow);
  const theme = useThemeStore((state) => state.theme);
  const [animateSpin, setAnimateSpin] = useState(false);

  useEffect(() => {
    let spinTimer = setTimeout(() => setAnimateSpin(false), 500);
    return () => {
      clearTimeout(spinTimer);
    };
  }, [animateSpin]);

  return (
    <>
      <div
        className={styles.coinpurseWrapper}
        style={{
          color: props.Icolor ? props.Icolor : 'white',
          position: props.posi ? props.posi : 'relative',
          top: props.top,
          left: props.left,
        }}
      >
        <img src={coinIcon} className={styles.img2} alt="" />

        {!props.betlog && (
          <div className={styles.coinInput2}>
            <input
              className={styles.userBalanceInput}
              value={isLoggedIn() ? userBalance : 0}
              disabled={true}
              style={{
                background: props.inputBg,
                width: '90%',
                color: props.Icolor,
              }}
            />
          </div>
        )}
      </div>
      {!props.noShuffle && (
        <div className={classNames(styles.shuffles, { shuffleSpin: animateSpin })}>
          <img
            onClick={() => {
              // popSound();
              if (!isLoggedIn()) {
                // dispatch(setShowLoginModal(true));
              } else {
                setAnimateSpin(true);
                // dispatch(updateBalance());
              }
            }}
            src={`/src/assets/${theme}/header/reload.png`}
            alt=""
            style={{ left: props.left }}
          />
        </div>
      )}
    </>
  );
};

export default CoinPurse;
