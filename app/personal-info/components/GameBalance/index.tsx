import { gameWithdrawal } from '@/api/game';
import { refetch } from '@/api/refetch';
import useModalStore from '@/store/modals';
import { TGameBalance } from '@/types/app';
import { API_ENDPOINT } from '@/types/enums';
import { motion } from 'framer-motion';
import { FC } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';
import styles from './index.module.scss';

const GameBalanceItem: FC<Readonly<{ gameBalance: TGameBalance }>> = ({ gameBalance }) => {
  const { openAlert } = useModalStore();
  return (
    <div className={styles.itemContainer}>
      <div>{gameBalance?.platformName}</div>
      <div>¥ {gameBalance?.money.toFixed(1)}</div>
      <motion.div
        whileTap={{ scale: 0.95 }}
        onClick={async () => {
          const { msg } = await gameWithdrawal({ id: gameBalance?.platformId });

          openAlert({ notify: msg });
          refetch(API_ENDPOINT.GAME_BALANCE);
        }}
      >
        转出
      </motion.div>
    </div>
  );
};

const GameBalance: FC<Readonly<{ gameBalance: TGameBalance[] }>> = ({ gameBalance }) => {
  return (
    <div className={styles.container}>
      <PullToRefresh onRefresh={async () => refetch(API_ENDPOINT.GAME_BALANCE)}>
        <div>{gameBalance?.map((i) => <GameBalanceItem key={i.platformId} gameBalance={i} />)}</div>
      </PullToRefresh>
    </div>
  );
};

export default GameBalance;
