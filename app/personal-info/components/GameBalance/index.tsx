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
  const testData = [
    {
      money: 0,
      platformId: 1,
      platformName: '开元棋牌',
    },
    {
      money: 0.0,
      platformId: 8,
      platformName: 'AG电子',
    },
    {
      money: 0,
      platformId: 30,
      platformName: 'JDB电子',
    },
    {
      money: 0.0,
      platformId: 9,
      platformName: 'MG电子',
    },
  ];
  console.log(gameBalance);
  return (
    <div className={styles.container}>
      <PullToRefresh onRefresh={async () => refetch(API_ENDPOINT.GAME_BALANCE)}>
        <div>{testData?.map((i) => <GameBalanceItem key={i.platformId} gameBalance={i} />)}</div>
      </PullToRefresh>
    </div>
  );
};

export default GameBalance;
