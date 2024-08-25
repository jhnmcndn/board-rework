import { getBoxAccount, getFundDetails } from '@/api/platform';
import OtherHeader from '@/components/OtherHeader';
import MainContent from './components/MainContent';

const SafeBox = async () => {
  const [boxAccount, fundDetails] = await Promise.all([
    getBoxAccount({ boxPass: '1111' }),
    getFundDetails({ enumMoney: 'today', enumReqTime: 'SAFE_BOX', pageSize: 50 }),
  ]);
  return (
    <div>
      <OtherHeader headerTitle='保险箱' showPurse />
      <MainContent boxAccount={boxAccount} fundDetails={fundDetails} />
    </div>
  );
};

export default SafeBox;
