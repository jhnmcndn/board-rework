import classnames from 'classnames';
import { useStore } from "@/components/providers/StoreProvider";
import Image from "next/image";
import styles from './index.module.scss';

type Props = {
  className?: string;
}

const NoData = ({ className }: Props) => {
  const theme = useStore((state) => state.theme);
  return (
    <>
      <div
        className={classnames(className, styles.noDataContainer)}>
        <Image
          src={require(`/src/assets/${theme}/noData/noData.png`)}
          alt='No Data'
          width={916}
          height={400}
          className={styles.noDataImage}
        />
        <div className={styles.noDataLabel}>暂无数据...</div>
      </div>
    </>
  );
}

export default NoData;