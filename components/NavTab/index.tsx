import { motion } from 'framer-motion';
import { useState } from 'react';
import styles from './index.module.scss';

type BaseItem = {
  id: string | number;
  name: string;
};

type NavTabProps<T extends BaseItem> = {
  list: T[];
  activeTab?: number;
  onSetActive?: (index: number) => void;
};

const NavTab = <T extends BaseItem>({ list = [], activeTab, onSetActive }: NavTabProps<T>) => {
  const [active, setActive] = useState(activeTab ?? 0);
  const handleSetActive = (index: number) => {
    setActive(index);
    onSetActive?.(index);
  };

  return (
    <motion.ul className={styles.tabList}>
      {list.map((item, index) => (
        <Item
          key={item.id ? item.id : index}
          activeTab={active}
          index={index}
          onSetActive={handleSetActive}
          {...item}
        />
      ))}
    </motion.ul>
  );
};

type NavItemProps<T extends BaseItem> = Omit<NavTabProps<T>, 'list'> & {
  index: number;
  name: string;
  activeTab: number;
  onSetActive: (index: number) => void;
};

const Item = <T extends BaseItem>({ index, name, activeTab, onSetActive }: NavItemProps<T>) => {
  return (
    <motion.li onClick={() => onSetActive(index)}>
      <span className={activeTab === index ? styles.activeNav : ''}>{name}</span>
      {activeTab === index && <motion.span className={styles.active} layoutId='item-active' />}
    </motion.li>
  );
};
Item.displayName = 'RateItem';

export default NavTab;
