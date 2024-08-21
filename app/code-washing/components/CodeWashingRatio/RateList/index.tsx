import { WashCodeRate } from '@/types/app';
import { motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import styles from './index.module.scss';

type RateListProps = {
  list: Omit<WashCodeRate, 'washCodeDescList'>[];
};

type RateItemProp = Omit<WashCodeRate, 'washCodeDescList'> & {
  active: number;
  onSetActive: (id: number) => void;
};

const RateList: FC<RateListProps> = ({ list = [] }) => {
  const [active, setActive] = useState<number>(0);
  const handleSetActive = (id: number) => setActive(id);

  useEffect(() => {
    if (list.length > 0) setActive(list[0].id);
  }, [list]);

  return (
    <motion.ul className={styles.rateList}>
      {list.map((item) => (
        <Item key={item.id} {...item} active={active} onSetActive={handleSetActive} />
      ))}
    </motion.ul>
  );
};

const Item: FC<RateItemProp> = ({ id, name, active, onSetActive }) => {
  return (
    <motion.li onClick={() => onSetActive(id)}>
      <span>{name}</span>
      {active === id && <motion.span className={styles.active} layoutId='item-active' />}
    </motion.li>
  );
};
Item.displayName = 'RateItem';

export default RateList;
