import Table from '@/components/Table';
import { VIPGiftInfo } from '@/types/app';
import { FC, useMemo } from 'react';
import styles from './index.module.scss';

const VipDetails: FC<
  Readonly<{
    vipGiftInfo: VIPGiftInfo;
  }>
> = ({ vipGiftInfo }) => {
  const headers = ['VIP级别', '总打码量范围', '晋级礼金', '周俸禄'];
  const vipSetList = useMemo(
    () =>
      vipGiftInfo.vipSetList.map((setList) => ({
        0: `VIP${setList.level}`,
        1: `${setList.bcode.toFixed(2)}+`,
        2: `${setList.levelBonus.toFixed(2)}元`,
        3: `${parseFloat(setList.weekBonus.toFixed(2))}元`,
      })),
    [vipGiftInfo],
  );
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <span>VIP晋级模式</span>
        </div>
        <div className={styles.details}>
          <Table withHeader headers={headers} content={vipSetList} />
        </div>
      </div>
    </div>
  );
};

export default VipDetails;
