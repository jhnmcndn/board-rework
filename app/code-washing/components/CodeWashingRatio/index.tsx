import { getWashCodeRateList } from '@/api/game';
import { WashCodeRate } from '@/types/app';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import RateList from './RateList';
import WashCodeList from './WashCodeList';

const CodeWashingRatio = () => {
  const [codeRateList, setCodeRateList] = useState<WashCodeRate[]>();
  const [activeTab, setActiveTab] = useState<number>(0);
  const handleSetActive = (index: number) => setActiveTab(index);

  const fetchWashCodeRateList = async () => {
    const washingRates = await getWashCodeRateList();
    if (!!washingRates) setCodeRateList(washingRates);
  };

  useEffect(() => {
    fetchWashCodeRateList();
  }, []);

  return (
    <div className={styles.wrapper}>
      <RateList list={codeRateList || []} activeTab={activeTab} onSetActive={handleSetActive} />
      <WashCodeList
        list={codeRateList || []}
        activeTab={activeTab}
        onRefresh={fetchWashCodeRateList}
        onSetActive={handleSetActive}
      />
    </div>
  );
};

export default CodeWashingRatio;
