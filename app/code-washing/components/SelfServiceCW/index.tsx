import { getWashCodeDetail } from '@/api/game';
import Table from '@/components/Table';
import { WashCodeDetail } from '@/types/app';
import { useEffect, useMemo, useState } from 'react';
import styles from './index.module.scss';

const SelfServiceCW = () => {
  const headers = ['游戏类型', '打码总额', '洗码比例', '洗码金额', ''];
  const [washCode, setWashCode] = useState<WashCodeDetail>();

  useEffect(() => {
    const fetchWashCodeDetails = async () => {
      const codeWash = await getWashCodeDetail();
      setWashCode(codeWash);
    };
    fetchWashCodeDetails();
  }, []);

  const codeWashList = useMemo(
    () =>
      washCode?.rspGameTypeWashCodes.map((code) => ({
        0: code.gameTypeName,
        1: code.washCodeAmount,
        2: code.washCodeRate,
        3: code.codeAmountTotal,
        4: <button className={styles.button}>去完成</button>,
      })),
    [washCode],
  );

  useEffect(() => {}, [washCode]);

  return (
    <div className={styles.wrapper}>
      <Table
        withHeader={{ headers, height: 0.7 }}
        content={codeWashList || []}
        withPullToRefresh={{
          isPullable: true,
          onRefresh: async () => await console.log('自助派彩刷新'),
        }}
      />
    </div>
  );
};

export default SelfServiceCW;
