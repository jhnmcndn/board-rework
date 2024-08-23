import { getGameCategoryList } from '@/api/game';
import { getTradeTypes, getVipGiftInfo } from '@/api/platform';
import OtherHeader from '@/components/OtherHeader';
import { Fragment } from 'react';
import MainContent from './components/MainContent';

const PersonalInfo = async () => {
  const [vipGiftInfo, gameCategoryList, tradeTypes] = await Promise.all([
    getVipGiftInfo(),
    getGameCategoryList(),
    getTradeTypes(),
  ]);

  return (
    <Fragment>
      <OtherHeader headerTitle='个人中心' showPurse />
      <MainContent vipGiftInfo={vipGiftInfo} gameCategoryList={gameCategoryList} tradeTypes={tradeTypes} />
    </Fragment>
  );
};

export default PersonalInfo;
