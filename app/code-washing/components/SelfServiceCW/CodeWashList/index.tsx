import Table from '@/components/Table';
import { FC } from 'react';
import styles from './index.module.scss';

type CodeWashListProps = {
  list: any;
  onRefresh: () => Promise<void>;
};

const CodeWashList: FC<CodeWashListProps> = ({ list, onRefresh }) => {
  const headers = ['游戏类型', '打码总额', '洗码比例', '洗码金额', ''];

  return (
    <div className={styles.wrapper}>
      <Table
        withHeader={{ headers, height: 0.7 }}
        content={list || []}
        withPullToRefresh={{
          isPullable: true,
          onRefresh: onRefresh,
        }}
      />
    </div>
  );
};
export default CodeWashList;
