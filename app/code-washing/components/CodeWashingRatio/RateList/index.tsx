import { WashCodeRate } from '@/types/app';
import { motion } from 'framer-motion';
import { FC } from 'react';
import styles from './index.module.scss';

type RateListProps = {
  list: Omit<WashCodeRate, 'washCodeDescList'>[];
  activeTab: number;
  onSetActive: (index: number) => void;
};

type RateItemProps = Omit<WashCodeRate, 'washCodeDescList'> & {
  activeTab: number;
  index: number;
  onSetActive: (index: number) => void;
};

const RateList: FC<RateListProps> = ({ list = [], activeTab, onSetActive }) => {
  const handleSetActive = (index: number) => onSetActive(index);

  return (
    <motion.ul className={styles.rateList}>
      {list.map((item, index) => (
        <Item key={item.id} {...item} activeTab={activeTab} index={index} onSetActive={handleSetActive} />
      ))}
    </motion.ul>
  );
};

const Item: FC<RateItemProps> = ({ index, name, activeTab, onSetActive }) => {
  return (
    <motion.li onClick={() => onSetActive(index)}>
      <span className={activeTab === index ? styles.activeNav : ''}>{name}</span>
      {activeTab === index && <motion.span className={styles.active} layoutId='item-active' />}
    </motion.li>
  );
};
Item.displayName = 'RateItem';

export default RateList;
