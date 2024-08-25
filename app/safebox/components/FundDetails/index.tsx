import { refetch } from '@/api/refetch';
import Table from '@/components/Table';
import { TFundDetails } from '@/types/app';
import { API_ENDPOINT } from '@/types/enums';
import { FC } from 'react';
import styles from './index.module.scss';
const FundDetails: FC<{ readonly fundDetails: TFundDetails[] }> = ({ fundDetails }) => {
  const headers = ['时间', '状态', '支付'];
  const staticData = [
    {
      createTime: '2024-08-25 10:52:45',
      des: '保险箱记录',
      pay: -100.0,
      income: 0.0,
      total: 12378.7,
      totalBefore: 12478.7,
      type: 107,
    },
    {
      createTime: '2024-08-25 10:52:41',
      des: '保险箱记录',
      pay: 100.0,
      income: 0.0,
      total: 12478.7,
      totalBefore: 12378.7,
      type: 107,
    },
  ];

  return (
    <div className={styles.container}>
      <Table
        content={staticData.map(({ income, total, totalBefore, type, ...rest }) => rest)}
        withHeader={{ headers }}
        withPullToRefresh={{
          isPullable: true,
          onRefresh: () => refetch(API_ENDPOINT.FUND_DETAILS),
        }}
      />
    </div>
  );
};

export default FundDetails;
