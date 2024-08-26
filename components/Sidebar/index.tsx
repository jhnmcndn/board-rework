'use client';

import styles from '@/components/Sidebar/index.module.scss';
import { sfx } from '@/utils/audioFile';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { Dispatch, FC, SetStateAction } from 'react';

export type SidebarComponentProps = {
  sidebarItems: string[];
  activeSidebarItem: number;
  setActiveSidebarItem: Dispatch<SetStateAction<number>>;
};

export type SidebarComponent = FC<Readonly<SidebarComponentProps>>;

const Sidebar: SidebarComponent = ({ sidebarItems, activeSidebarItem, setActiveSidebarItem, ...props }) => {
  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className={styles.sidebarWrapper}
    >
      {sidebarItems.map((item, index) => (
        <div
          key={index}
          data-click={sfx.popAudio}
          className={classNames(styles.sidebarItem, {
            [styles.activeTab]: index === activeSidebarItem,
          })}
          bet-data={item === '' ? 'none' : undefined}
          onClick={() => {
            setActiveSidebarItem(index);
          }}
        >
          <span className={styles.text}>{item}</span>
        </div>
      ))}
    </motion.div>
  );
};

export default Sidebar;
