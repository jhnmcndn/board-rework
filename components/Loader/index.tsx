import loading from '@/assets/commons/fallBacks/loader.gif';
import Image from 'next/image';
import { FC } from 'react';
import styles from './index.module.scss';

type TProps = {
  load?: boolean;
};

const Loader: FC<TProps> = ({ load }) => {
  return (
    <div className={styles.loader} style={{ display: load ? 'flex' : 'none' }}>
      <Image src={loading} alt='' quality={100} height={80} width={80} />
    </div>
  );
};

export default Loader;
