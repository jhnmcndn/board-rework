import { getGameBalance, getGameCategoryList } from '@/api/game';
import { getTradeTypes, getVipGiftInfo } from '@/api/platform';
import OtherHeader from '@/components/OtherHeader';
import MainContent from './components/MainContent';

const PersonalInfo = async () => {
  const [vipGiftInfo, gameCategoryList, tradeTypes, gameBalance] = await Promise.all([
    getVipGiftInfo(),
    getGameCategoryList(),
    getTradeTypes(),
    getGameBalance(),
  ]);

  return (
    <>
      <OtherHeader headerTitle='个人中心' showPurse />
      <MainContent
        vipGiftInfo={vipGiftInfo}
        gameCategoryList={gameCategoryList}
        tradeTypes={tradeTypes}
        gameBalance={gameBalance}
      />
    </>
  );
};

export default PersonalInfo;
