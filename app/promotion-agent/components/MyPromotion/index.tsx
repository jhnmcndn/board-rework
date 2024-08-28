import { receiveRecommendReward } from '@/api/game';
import useImages from '@/hooks/useImages';
import useModalStore from '@/store/modals';
import { copyToClipboard } from '@/utils/helpers';
import classnames from 'classnames';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import styles from './index.module.scss';

type RecommendDetailData = {
  canSion?: number;
  historySion?: number;
  inviterCode?: string | null;
  memberCode?: string;
  shareBackground?: string;
  shareIcon?: string;
  todaySion?: number;
  url?: string;
  yesterdaySion?: number;
};

type MyPromotionProps = {
  recommendDetailData: RecommendDetailData;
  updateRecommendDetail: () => void;
};

const MyPromotion = ({ recommendDetailData, updateRecommendDetail }: MyPromotionProps) => {
  const router = useRouter();
  const { images } = useImages();
  const pathname = usePathname();
  const [channelCode, setChannelCode] = useState('1001');
  const { openCommission, openAlert } = useModalStore();
  const channelCodeURL = useMemo(() => recommendDetailData?.url || 'www.example.com', [recommendDetailData?.url]);

  useEffect(() => {
    const storedChannelCode = localStorage.getItem('channelCode');
    if (storedChannelCode) {
      setChannelCode(storedChannelCode);
    }
    updateRecommendDetail();
  }, []);

  const handleGetCommission = async () => {
    if (recommendDetailData?.canSion === 0) {
      openAlert('暂无可领取的佣金');
      return;
    }

    try {
      const res = await receiveRecommendReward();
      openAlert(res?.code === 200 ? '操作成功' : res.msg);
    } catch (err: any) {
      openAlert(err.msg);
    }
  };

  const handleCopyURLCode = () => {
    openAlert(channelCodeURL);
    copyToClipboard(channelCodeURL);
  };

  const handleShareClick = (): void => {
    router.push('/share');
    localStorage.setItem('share', 'qrCode');
  };

  const renderInputContainer = (icon: any, label: string, value: number | undefined) => (
    <div className={styles.myPromotion__inputContainer}>
      <span>
        <Image src={icon} alt={`${label} icon`} width={22} height={22} />
        {label}
      </span>
      <input type='text' value={parseFloat(`${value || 0}`).toFixed(2)} readOnly />
    </div>
  );

  return (
    <div className={styles.myPromotion}>
      <div className={styles.myPromotion__topSection}>
        <div className={styles.myPromotion__headerContent}>
          <span className={classnames(styles['myPromotion--limeTextColor'], styles.myPromotion__headerLeftText)}>
            我的佣金
          </span>
          <span onClick={openCommission}>
            返佣金额对照表 <span className={styles['myPromotion--limeTextColor']}>&gt;&gt;</span>
          </span>
        </div>
        <div className={styles.myPromotion__mainContent}>
          <div className={styles.myPromotion__gridInput}>
            {renderInputContainer(images.promoOneIcon, '今日佣金', recommendDetailData?.todaySion)}
            {renderInputContainer(images.promoThreeIcon, '昨日佣金', recommendDetailData?.yesterdaySion)}
            {renderInputContainer(images.promoTwoIcon, '历史总佣金', recommendDetailData?.historySion)}
            {renderInputContainer(images.promoFourIcon, '可提取佣金', recommendDetailData?.canSion)}
          </div>
          <div className={styles.myPromotion__receiveCommissionBtn}>
            <button onClick={handleGetCommission}>领取佣金</button>
          </div>
        </div>
      </div>
      <div className={styles.myPromotion__bottomSection}>
        <div className={styles.myPromotion__userInfo}>
          <div className={styles.myPromotion__userId}>
            <div>
              <h1>{recommendDetailData?.memberCode ? recommendDetailData?.memberCode : '0'}</h1>
              <span>我的ID</span>
            </div>
          </div>
          <div className={styles.myPromotion__inviterCode}>
            <div>
              <h1>{recommendDetailData?.inviterCode ? recommendDetailData.inviterCode : channelCode}</h1>
              <span>推荐ID</span>
            </div>
          </div>
        </div>
        <div className={styles.myPromotion__shareQRCode}>
          <button onClick={handleShareClick}>分享二维码</button>
          <div className={styles.myPromotion__copyCode} data-text={'复制'}>
            专属分享连接:{' '}
            {recommendDetailData?.url ? recommendDetailData?.url?.substring(0, 44) + '...' : 'www.example.com'}
            <span className={styles.myPromotion__copyBtn} onClick={handleCopyURLCode}>
              复制
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPromotion;
