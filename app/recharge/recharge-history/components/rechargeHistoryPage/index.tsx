'use client';
import { getWithdrawRechargeDetail } from '@/api/pay';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import Sidebar from '@/components/Sidebar';
import Table from '@/components/Table';
import { TWashCodeLogs } from '@/types/app';
import { RECHARGE_HISTORY } from '@/types/enums';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
const RechargeHistoryPage = () => {
  const [activeSidebarItem, setActiveSidebarItem] = useState(0);
  const theme = useAccountStore((state) => state.theme);
  const [rechargeLogs, setRechargeLogs] = useState<TWashCodeLogs[]>([]);
  const [historyType, setHistoryType] = useState(RECHARGE_HISTORY.ONLINE);
  const list = ['在线充值', '银行卡充值', 'USDT充值'];
  const headers = ['时间', '游戏分类', '洗码比例', '打码量', '洗码金额'];

  const fetchRechargeHistory = async () => {
    const withdrawRecordList = await getWithdrawRechargeDetail({
      type: historyType,
      pageNum: 1,
      pageSize: 50,
    });

    console.log(withdrawRecordList);

    if (withdrawRecordList) setRechargeLogs(withdrawRecordList);
  };
  useEffect(() => {
    fetchRechargeHistory();
  }, [historyType]);

  useEffect(() => {
    const fetchHistory = () => {
      switch (activeSidebarItem) {
        case 0:
          return setHistoryType(RECHARGE_HISTORY.ONLINE);
        case 1:
          return setHistoryType(RECHARGE_HISTORY.BANK);
        case 2:
          return setHistoryType(RECHARGE_HISTORY.USDT);
        default:
          return setHistoryType(RECHARGE_HISTORY.ONLINE);
      }
    };

    fetchHistory();
  }, [activeSidebarItem]);

  return (
    <>
      <div className={styles.wrapper}>
        <Sidebar
          sidebarItems={list}
          activeSidebarItem={activeSidebarItem}
          setActiveSidebarItem={setActiveSidebarItem}
        />
        <div className={styles.mainContent} data-theme={theme}>
          {/* {renderRechargeHistory()} */}
          <Table
            withHeader={{ headers }}
            content={rechargeLogs}
            withPullToRefresh={{
              isPullable: true,
              onRefresh: fetchRechargeHistory,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default RechargeHistoryPage;
