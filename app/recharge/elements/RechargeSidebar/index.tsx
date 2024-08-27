import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import styles from './index.module.scss';

export type Props = {
  activeSidebarItem: number;
  setActiveSidebarItem: Dispatch<SetStateAction<number>>;
};

const RechargeSidebar = ({ setActiveSidebarItem, activeSidebarItem }: Props) => {
  const payTypeList = useAccountStore((state) => state.payTypeList);
  return (
    <motion.ul initial={{ x: -100 }} animate={{ x: 0 }} transition={{ duration: 0.3 }} className={styles.listContainer}>
      {payTypeList.map((item, index) => {
        return (
          <li
            key={item.id}
            className={classNames(styles.item, { [styles.activeItem]: index === activeSidebarItem })}
            onClick={() => setActiveSidebarItem(index)}
          >
            <div className={styles.imageHolder}>
              <Image className={styles.image} src={item.iconUrl} alt={item.name} width={200} height={200} />
            </div>
            <p className={styles.text}>{item.name}</p>
            <span className={classNames(styles.recommended, { [styles.isRecommended]: item.recommend })}>热</span>
          </li>
        );
      })}
    </motion.ul>
  );
};

export default RechargeSidebar;
