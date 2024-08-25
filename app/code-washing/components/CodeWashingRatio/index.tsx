import { getWashCodeRateList } from '@/api/game';
import { WashCodeRate } from '@/types/app';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import RateList from './RateList';
import WashCodeList from './WashCodeList';

const CodeWashingRatio = () => {
  const [codeRateList, setCodeRateList] = useState<WashCodeRate[]>();

  useEffect(() => {
    const fetchWashCodeRateList = async () => {
      const washingRates = await getWashCodeRateList();
      if (!!washingRates) setCodeRateList(washingRates);
    };
    fetchWashCodeRateList();
  }, []);

  return (
    <div className={styles.wrapper}>
      <RateList list={codeRateList || []} />
      <WashCodeList list={codeRateList || []} />
    </div>
  );
};

export default CodeWashingRatio;
