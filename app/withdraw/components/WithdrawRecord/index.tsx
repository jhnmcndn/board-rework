'use client';

import { refetch } from '@/api/refetch';
import NoData from '@/components/NoData';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useCopyToClipBoard from '@/hooks/useCopyToClipboard';
import { API_ENDPOINT } from '@/types/enums';
import { useRef } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';
import styles from './index.module.scss';

const WithdrawRecord = () => {
  const { copyToClipboard } = useCopyToClipBoard();
  const withdrawRecordList = useAccountStore((state) => state.withdrawRecordList);
  const textRef = useRef(null);

  return (
    <div className={styles.withdrawalRecordWrapper}>
      <PullToRefresh onRefresh={() => refetch(API_ENDPOINT.WITHDRAW_RECHARGE_DETAIL)}>
        {withdrawRecordList?.length > 0 ? (
          <ul className={styles.recordWrapper}>
            {withdrawRecordList.map((item, index) => (
              <li key={index} className={styles.recordList}>
                <span className={styles.time}>{item?.requestTime}</span>
                <div className={styles.orderWrapper}>
                  <span className={styles.orderNumber} ref={textRef}>
                    {item?.orderNo}
                  </span>
                  <span className={styles.copyBtn} onClick={() => copyToClipboard(item?.orderNo)}>
                    复制
                  </span>
                </div>
                <span className={styles.remark} style={{ color: item?.color }}>
                  {item?.remark}
                </span>
                <span className={styles.money}>{item?.money}</span>
              </li>
            ))}
          </ul>
        ) : (
          <NoData />
        )}
      </PullToRefresh>
    </div>
  );
};

export default WithdrawRecord;
