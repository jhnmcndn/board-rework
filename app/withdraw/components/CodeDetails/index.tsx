'use client';

import { refetch } from '@/api/refetch';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import Table from '@/components/Table';
import { API_ENDPOINT } from '@/types/enums';
import Image from 'next/image';
import { useMemo } from 'react';
import styles from './index.module.scss';

const CodingDetails = () => {
  const codeFlowList = useAccountStore((state) => state.codeFlowList);
  const headers = ['流水时间', '需求打码', '实际打码', '流水状态'];

  const listOfEwan = useMemo(
    () =>
      codeFlowList.map((flowList) => ({
        0: flowList.createTime,
        1: flowList.income,
        2: flowList.cur,
        3: (
          <Image
            src={require(`@/assets/commons/${flowList.status === 1 ? 'check' : 'close'}.png`)}
            width={1261}
            height={1260}
            alt='Status'
            className={styles.status}
          />
        ),
      })),
    [codeFlowList],
  );

  return (
    <div className={styles.codeDetailsWrapper}>
      <Table
        withHeader={{
          headers,
        }}
        content={listOfEwan}
        withPullToRefresh={{
          isPullable: true,
          onRefresh: () => refetch(API_ENDPOINT.CODE_FLOW_LIST),
        }}
      />
    </div>
  );
};

export default CodingDetails;
