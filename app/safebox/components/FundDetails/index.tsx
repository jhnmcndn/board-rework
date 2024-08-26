import { refetch } from '@/api/refetch';
import Table from '@/components/Table';
import { TFundDetails } from '@/types/app';
import { API_ENDPOINT } from '@/types/enums';
import { FC } from 'react';
import styles from './index.module.scss';
const FundDetails: FC<{ readonly fundDetails: TFundDetails[] }> = ({ fundDetails }) => {
  const headers = ['时间', '状态', '支付'];

  return (
    <div className={styles.container}>
      <Table
        content={fundDetails.map(({ income, total, totalBefore, type, ...rest }) => rest)}
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
