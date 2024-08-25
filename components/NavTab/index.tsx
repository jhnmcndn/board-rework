import { motion } from 'framer-motion';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';

type BaseItem = {
  id: string | number;
  name: string;
};

type NavTabProps<T extends BaseItem> = {
  list: T[];
  activeTab?: number;
  styles?: CSSProperties;
  onSetActive?: (index: number, data?: T) => void;
};

const NavTab = <T extends BaseItem>({
  list = [],
  activeTab: activeFromProps,
  styles: customStyle,
  onSetActive,
}: NavTabProps<T>) => {
  const navRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(activeFromProps ?? 0);
  const [constraint, setConstraint] = useState({ left: 0, right: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleSetActive = (index: number, data?: T) => {
    if (activeFromProps === index || isDragging) return;
    setActive(index);
    onSetActive?.(index, data);
  };

  useEffect(() => {
    const scroll = () => {
      if (!navRef.current) return;
      const scrollWidth = navRef.current.scrollWidth;
      const clientWidth = navRef.current.clientWidth;
      setConstraint((prev) => ({ ...prev, left: -(scrollWidth - clientWidth) }));
    };
    scroll();
  }, []);

  return (
    <div className={styles.wrapper} style={customStyle}>
      <motion.ul
        drag='x'
        ref={navRef}
        className={styles.tabList}
        dragConstraints={constraint}
        onDragEnd={() => setIsDragging(false)}
        onDragStart={() => setIsDragging(true)}
      >
        {list.map((item, index) => (
          <Item
            key={item.id ?? index}
            activeTab={activeFromProps ?? active}
            index={index}
            onSetActive={handleSetActive}
            item={item}
          />
        ))}
      </motion.ul>
    </div>
  );
};

type NavItemProps<T extends BaseItem> = Omit<NavTabProps<T>, 'list' | 'styles'> & {
  index: number;
};
const Item = <T extends BaseItem>({ index, activeTab, item, onSetActive }: NavItemProps<T> & { item: T }) => {
  const handleItemClick = () => onSetActive?.(index, item);
  return (
    <motion.li onClick={handleItemClick} id={`navTabItem-${index}`}>
      <span className={activeTab === index ? styles.activeNav : ''}>{item.name}</span>
      {activeTab === index && (
        <motion.span className={styles.active} layoutId='item-active' transition={{ type: 'spring', duration: 0.5 }} />
      )}
    </motion.li>
  );
};
Item.displayName = 'RateItem';

export default NavTab;
