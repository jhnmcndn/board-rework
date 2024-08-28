'use client';

import useImages from '@/hooks/useImages';
import classnames from 'classnames';
import Image from 'next/image';
import { memo } from 'react';
import styles from './index.module.scss';

type Props = {
  className?: string;
};

const NoData = ({ className }: Props) => {
  const { images } = useImages();

  return (
    <div className={classnames(className, styles.noDataContainer)}>
      <Image src={images.noData} alt='No Data' width={916} height={400} className={styles.noDataImage} />
      <div className={styles.noDataLabel}>暂无数据...</div>
    </div>
  );
};

export default memo(NoData);
