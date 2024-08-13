'use client';

import { refetch } from '@/api/refetch';
import styles from '@/app/customer-service/components/CSPop/index.module.scss';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { useCSStore } from '@/components/Providers/CSStoreProvider';
import { API_ENDPOINT } from '@/types/enums';
import { sfx } from '@/utils/audioFile';
import { copyToClipboard } from '@/utils/helpers';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';

const CSPop = () => {
  const csData = useCSStore((state) => state.csData);
  const theme = useAccountStore((state) => state.theme);

  return (
    <Fragment>
      {/* <Alert /> */}
      <div className={styles.container}>
        <div className={styles.headerTextWrapper}>
          <span>POP客服</span>
          <span>邀请好友即可成为代理 轻松月入百万</span>
        </div>

        <div className={styles.linksWrapper}>
          <PullToRefresh onRefresh={() => refetch(API_ENDPOINT.CUSTOMER_SERVICE)} className={styles.pullToRefresh}>
            <ul>
              {csData.length > 0 &&
                csData.map((data, index) => (
                  <li key={index}>
                    <div className={styles.leftContent} data-theme={theme}>
                      <Image src={data.icon as string} alt='Icon' />

                      <div>
                        <span>下载地址: {data.title || ''}</span>
                        <span>POP专员账号: {data.details || ''}</span>
                      </div>
                    </div>

                    <div className={styles.rightContent} data-theme={theme}>
                      <div
                        data-click={sfx.popAudio}
                        onClick={() => {
                          copyToClipboard(data.url || '');
                          // <Alert />
                        }}
                      >
                        <span>复制</span>
                      </div>

                      <Link
                        href={data.url && data.url.includes('https') ? data.url : `https://${data.url}`}
                        rel='noreferrer'
                        target='_blank'
                      >
                        打开微信
                      </Link>
                    </div>
                  </li>
                ))}
            </ul>
          </PullToRefresh>
        </div>
      </div>
    </Fragment>
  );
};

export default CSPop;
