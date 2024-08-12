import { getVipGiftInfo } from '@/api/platform';
import OtherHeader from '@/components/OtherHeader';
import { Fragment } from 'react';
import MainContent from './MainContent';

const PersonalInfo = async () => {
  const vipGiftInfo = await getVipGiftInfo();
  return (
    <Fragment>
      <OtherHeader headerTitle='个人中心' showPurse />
      <MainContent vipGiftInfo={vipGiftInfo} />
    </Fragment>
  );
};

export default PersonalInfo;
