import useImages from '@/hooks/useImages';
import { copyToClipboard } from '@/utils/helpers';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
  const { images } = useImages();
  const router = useRouter();
  const [channelCode, setChannelCode] = useState('1001');

  useEffect(() => {
    if (localStorage.getItem('channelCode')) {
      setChannelCode(localStorage.getItem('channelCode')!);
    }
  }, []);

  return (
    <div className={styles.myPromotion}>
      <div className={styles.myPromotion__topSection}>
        <div className={styles.myPromotion__headerContent}>
          <span>我的佣金</span>
          <span>返佣金额对照表 &gt;&gt;</span>
        </div>
        <div className={styles.myPromotion__mainContent}>
          <div className={styles.myPromotion__gridInput}>
            <div className={styles.myPromotion__inputContainer}>
              <span>
                <Image src={images.promoOneIcon} alt='promo one icon' width={22} height={22} />
                今日佣金
              </span>
              <input
                type='text'
                value={parseFloat(
                  recommendDetailData?.todaySion ? `${recommendDetailData?.todaySion}` : '0.00',
                ).toFixed(2)}
                readOnly
              />
            </div>
            <div className={styles.myPromotion__inputContainer}>
              <span>
                <Image src={images.promoThreeIcon} alt='promo one icon' width={22} height={22} />
                昨日佣金
              </span>
              <input
                type='text'
                value={parseFloat(
                  recommendDetailData?.yesterdaySion ? `${recommendDetailData?.yesterdaySion}` : '0.00',
                ).toFixed(2)}
                readOnly
              />
            </div>
            <div className={styles.myPromotion__inputContainer}>
              <span>
                <Image src={images.promoTwoIcon} alt='promo one icon' width={22} height={22} />
                历史总佣金
              </span>
              <input
                type='text'
                value={parseFloat(
                  recommendDetailData?.historySion ? `${recommendDetailData?.historySion}` : '0.00',
                ).toFixed(2)}
                readOnly
              />
            </div>
            <div className={styles.myPromotion__inputContainer}>
              <span>
                <Image src={images.promoFourIcon} alt='promo one icon' width={22} height={22} />
                可提取佣金
              </span>
              <input
                type='text'
                value={parseFloat(recommendDetailData?.canSion ? `${recommendDetailData?.canSion}` : '0.00').toFixed(2)}
                readOnly
              />
            </div>
          </div>
          <div className={styles.myPromotion__receiveCommissionBtn}>
            <button>领取佣金</button>
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
          <button onClick={() => router.push('/share')}>分享二维码</button>
          <div className={styles.myPromotion__copyCode} data-text={'复制'}>
            专属分享连接:{' '}
            {recommendDetailData?.url ? recommendDetailData?.url?.substring(0, 44) + '...' : 'www.example.com'}
            <span
              className={styles.myPromotion__copyBtn}
              onClick={() => copyToClipboard(recommendDetailData?.url ? recommendDetailData?.url : 'www.example.com')}
            >
              复制
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPromotion;
