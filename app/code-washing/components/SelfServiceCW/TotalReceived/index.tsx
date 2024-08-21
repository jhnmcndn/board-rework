import { toWashCode } from '@/api/game';
import { WashCodeDetail } from '@/types/app';
import { moneyFormat } from '@/utils/helpers';
import { FC } from 'react';
import styles from './index.module.scss';

type TotalReceiveProps = {
  total: number;
  listLength: number;
  updateWashCode: (newWashCode: WashCodeDetail) => void;
};

const TotalReceived: FC<TotalReceiveProps> = ({ total = 0, listLength, updateWashCode }) => {
  const handleClick = async () => {
    const washCode = await toWashCode();
    updateWashCode(washCode);
  };

  if (!!!listLength) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.totalContainer}>
        <div>可领取洗码总额</div>
        <div>¥ {moneyFormat(total)}</div>
      </div>
      <button disabled={!!!total} className={styles.button} onClick={handleClick}>
        一键领取
      </button>
    </div>
  );
};
export default TotalReceived;
