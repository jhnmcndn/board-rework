'use client';

import { refetch } from '@/api/refetch';
import styles from '@/app/mailbox/index.module.scss';
import MailList from '@/app/mailbox/MailList';
import OtherHeader from '@/components/OtherHeader';
import { API_ENDPOINT } from '@/types/enums';
import PullToRefresh from 'react-simple-pull-to-refresh';

const MailBox = () => {
  return (
    <div className={styles.container}>
      <OtherHeader headerTitle='邮箱' showPurse={false} />

      <div className={styles.contentWrapper}>
        <PullToRefresh onRefresh={() => refetch(API_ENDPOINT.MESSAGE_ON_SITES)}>
          <div className={styles.mailList}>
            <MailList />
          </div>
        </PullToRefresh>
      </div>
    </div>
  );
};

export default MailBox;
