import { refetch } from '@/api/refetch';
import Table from '@/components/Table/index';
import { API_ENDPOINT } from '@/types/enums';
import { useState } from 'react';

const CodeWashingRecord = () => {
  const [washCodeLogs, setWashCodeLogs] = useState([]);
  const headers = ['时间', '游戏分类', '洗码比例', '打码量', '洗码金额'];

  return (
    <Table
      withHeader={{ headers }}
      content={washCodeLogs}
      withPullToRefresh={{
        isPullable: true,
        onRefresh: () => refetch(API_ENDPOINT.WASH_CODE_LOGS),
      }}
    />
  );
};

export default CodeWashingRecord;
