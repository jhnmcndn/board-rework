'use client';

import { getRecommendDetail } from '@/api/game';
import OtherHeader from '@/components/OtherHeader';
import useModalStore from '@/store/modals';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import styles from './page.module.scss';

const QRCode = dynamic(() => import('react-qr-code'), { ssr: false });

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

const Share = () => {
  const { openShare } = useModalStore();
  const [recommendDetailData, setRecommendDetailData] = useState<RecommendDetailData>({});
  const [isQrCode, setIsQrCode] = useState(false);

  useEffect(() => {
    updateRecommendDetail();
    setIsQrCode(localStorage?.getItem('share') === 'qrCode');
  }, []);

  const updateRecommendDetail = () => {
    getRecommendDetail().then((res) => setRecommendDetailData(res as RecommendDetailData));
  };

  return (
    <>
      <OtherHeader headerTitle={'推广代理'} showPurse />
      <div
        className={styles.shareQRCode}
        style={{
          backgroundImage: `url(${isQrCode ? recommendDetailData?.shareBackground : recommendDetailData?.shareIcon})`,
        }}
      >
        {isQrCode && (
          <>
            <div className={styles.shareQRCode__qrCodeScanner}>
              {recommendDetailData?.url && <QRCode value={recommendDetailData?.url} />}
            </div>
            <div
              className={styles.shareQRCode__qrCodeBtn}
              onClick={() => {
                openShare();
                localStorage.setItem('shareUrl', recommendDetailData?.url?.toString() || 'www.example.com');
              }}
            >
              <span>会员ID:{recommendDetailData?.memberCode}</span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Share;
