'use client';

import { getFundDetails } from '@/api/platform';
import { refetch } from '@/api/refetch';
import Dropdown from '@/components/Dropdown';
import { usePersonalInfoStore } from '@/components/Providers/PersonalInfoStoreProvider';
import Table from '@/components/Table';
import { TFundDetails, TradeTypes } from '@/types/app';
import { API_ENDPOINT } from '@/types/enums';
import { FC, useEffect, useState } from 'react';
import styles from './index.module.scss';

const AccountDetails: FC<
  Readonly<{
    tradeTypes: TradeTypes[];
  }>
> = ({ tradeTypes }) => {
  const filterOptions = ['今天', '昨天', '一个月'];
  const headers = ['时间', '交易类型', '支出', '收入', '余额'];
  const [fundDetails, setFundDetails] = useState<TFundDetails[]>([]);
  const { setTradeTypes, setBettingFilter } = usePersonalInfoStore((s) => s);
  const enumMoney = usePersonalInfoStore((s) => s.betting.enumMoney);
  const filter = usePersonalInfoStore((s) => s.betting.filter);
  const filterDefaultValue = filter === 'today' ? '今天' : filter === 'yesterday' ? '昨天' : '一个月';

  useEffect(() => {
    const fetchData = async () => {
      const res = await getFundDetails({
        enumMoney: enumMoney || '全部交易状态',
        enumReqTime: filter,
      });

      if (res) setFundDetails(res);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.filterContainer}>
          <span>交易时间</span>
          <Dropdown defaultValue={filterDefaultValue} options={filterOptions} onSelect={setBettingFilter} />
        </div>
        <div className={styles.filterContainer}>
          <span>交易时间</span>
          <Dropdown
            defaultValue={enumMoney || '全部交易状态'}
            options={['全部交易状态', ...tradeTypes?.map((i) => i.des)]}
            onSelect={setTradeTypes}
          />
        </div>
      </div>
      <Table
        content={fundDetails}
        withHeader={{ headers }}
        withPullToRefresh={{
          isPullable: true,
          onRefresh: () => refetch(API_ENDPOINT.FUND_DETAILS),
        }}
      />
    </div>
  );
};

export default AccountDetails;
