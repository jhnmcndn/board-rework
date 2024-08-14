import { getGameCategoryList } from '@/api/game';
import { getVipGiftInfo } from '@/api/platform';
import OtherHeader from '@/components/OtherHeader';
import { Fragment } from 'react';
import MainContent from './components/MainContent';

const PersonalInfo = async () => {
  const [vipGiftInfo, gameCategoryList] = await Promise.allSettled([getVipGiftInfo(), getGameCategoryList()]);
  return (
    <Fragment>
      <OtherHeader headerTitle='个人中心' showPurse />
      <MainContent vipGiftInfo={vipGiftInfo} gameCategoryList={gameCategoryList} />
    </Fragment>
  );
};

export default PersonalInfo;
