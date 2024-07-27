'use client';

import { refetch } from '@/api/refetch';
import styles from '@/app/mailbox/index.module.scss';
import MailList from '@/app/mailbox/MailList';
import { API_ENDPOINT } from '@/types/enums';
import PullToRefresh from 'react-simple-pull-to-refresh';

export const MailListContainer = () => {
  return (
    <PullToRefresh onRefresh={() => refetch(API_ENDPOINT.MESSAGE_ON_SITES)}>
      <div className={styles.mailList}>
        <MailList />
      </div>
    </PullToRefresh>
  );
};

export default MailListContainer;
