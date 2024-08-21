import { getWashCodeRateList } from '@/api/game';
import { WashCodeRate } from '@/types/app';
import { Fragment, useEffect, useState } from 'react';
import RateList from './RateList';

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
    <Fragment>
      <RateList list={codeRateList || []} />
    </Fragment>
  );
};

export default CodeWashingRatio;
