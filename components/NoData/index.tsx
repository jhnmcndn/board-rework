'use client';

import classnames from 'classnames';
import Image from 'next/image';
import { useAccountStore } from '../providers/AccountStoreProvider';
import styles from './index.module.scss';

type Props = {
  className?: string;
};

const NoData = ({ className }: Props) => {
  const theme = useAccountStore((state) => state.theme);
  return (
    <>
      <div className={classnames(className, styles.noDataContainer)}>
        <Image
          src={require(`@/assets/${theme}/noData/noData.png`)}
          alt='No Data'
          width={916}
          height={400}
          className={styles.noDataImage}
        />
        <div className={styles.noDataLabel}>暂无数据...</div>
      </div>
    </>
  );
};

export default NoData;
