'use client';
import { getWashCodeLogs } from '@/api/game';
import Table from '@/components/Table/index';
import { TWashCodeLogs } from '@/types/app';
import { useEffect, useState } from 'react';

const CodeWashingRecord = () => {
  const [washCodeLogs, setWashCodeLogs] = useState<TWashCodeLogs[]>([]);
  const headers = ['时间', '游戏分类', '洗码比例', '打码量', '洗码金额'];

  const fetchWashCodeLogs = async () => {
    const codeLogs = await getWashCodeLogs({
      pageNum: 1,
      pageSize: 50,
    });
    if (codeLogs) setWashCodeLogs(codeLogs);
  };

  useEffect(() => {
    fetchWashCodeLogs();
  }, []);

  return (
    <Table
      withHeader={{ headers }}
      content={washCodeLogs}
      withPullToRefresh={{
        isPullable: true,
        onRefresh: fetchWashCodeLogs,
      }}
    />
  );
};

export default CodeWashingRecord;
