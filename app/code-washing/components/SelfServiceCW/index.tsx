import { getWashCodeDetail } from '@/api/game';
import { WashCodeDetail } from '@/types/app';
import { useEffect, useMemo, useState } from 'react';
import CodeWashList from './CodeWashList';
import styles from './index.module.scss';
import TotalReceived from './TotalReceived';

const SelfServiceCW = () => {
  const [washCode, setWashCode] = useState<WashCodeDetail>();

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

  const total = codeWashList?.reduce((total, code) => total + code[3], 0) || 0;

  useEffect(() => {
    const fetchWashCodeDetails = async () => {
      const codeWash = await getWashCodeDetail();
      setWashCode(codeWash);
    };
    fetchWashCodeDetails();
  }, []);

  return (
    <div className={styles.wrapper} style={{ height: codeWashList?.length ? 'auto' : '100%' }}>
      <CodeWashList list={codeWashList} />
      <TotalReceived total={total} listLength={codeWashList?.length || 0} />
    </div>
  );
};

export default SelfServiceCW;
