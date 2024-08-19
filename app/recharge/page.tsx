'use server';

import RechargePage from '@/app/recharge/components/RechargePage';
import { getPayTypeList } from '@/api/pay';

const Recharge = async () => {
  const payTypeList = await getPayTypeList();
  return <RechargePage payTypeList={payTypeList} />;
};

export default Recharge;
