import { refetch } from '@/api/refetch';
import styles from '@/app/customer-service/components/FAQ/index.module.scss';
import { API_ENDPOINT } from '@/types/enums';
import { FC } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';

export type HelpSectionComponentProps = {
  children: JSX.Element;
};

export type HelpSectionComponent = FC<Readonly<HelpSectionComponentProps>>;

const HelpSection: HelpSectionComponent = ({ children }) => {
  return (
    <PullToRefresh onRefresh={() => refetch(API_ENDPOINT.MESSAGE_COMMON_PROBLEMS)} className={styles.pullToRefresh}>
      {children}
    </PullToRefresh>
  );
};

export default HelpSection;
