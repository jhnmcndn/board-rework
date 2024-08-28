import CoinPurse from '@/components/CoinPurse';
import { FC, memo } from 'react';
import { OtherHeaderProps } from '../..';
import styles from './index.module.scss';

const CoinPurseHeader: FC<Required<Pick<OtherHeaderProps, 'showPurse'>>> = ({ showPurse }) => {
  if (!showPurse) return null;
  return (
    <div className={styles.coinPurseContainer}>
      <CoinPurse />
    </div>
  );
};
export default memo(CoinPurseHeader);
