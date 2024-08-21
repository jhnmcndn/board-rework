import { moneyFormat } from '@/utils/helpers';
import { FC } from 'react';
import styles from './index.module.scss';

type TotalReceiveProps = {
  total: number;
  listLength: number;
};

const TotalReceived: FC<TotalReceiveProps> = ({ total = 0, listLength }) => {
  if (!!!listLength) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.totalContainer}>
        <div>可领取洗码总额</div>
        <div>¥ {moneyFormat(total)}</div>
      </div>
      <button className={styles.button}>一键领取</button>
    </div>
  );
};
export default TotalReceived;
