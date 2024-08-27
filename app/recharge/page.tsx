import { getPayTypeList } from '@/api/pay';
import RechargePage from './RechargePage';

const Recharge = async () => {
  const payTypeList = await getPayTypeList();

  return <RechargePage payTypeList={payTypeList} />;
};

export default Recharge;
