'use client';

import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { useCSStore } from '@/components/Providers/CSStoreProvider';
import styles from '@/components/Sidebar/index.module.scss';
import { onClickSound } from '@/utils/audioFile';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Dispatch, FC, SetStateAction } from 'react';

export type SidebarComponentProps = {
  sidebarItems: string[];
  activeSidebar?: number;
  setActiveSidebar?: Dispatch<SetStateAction<number>>;
  dispatch?: Function;
};

export type SidebarComponent = FC<Readonly<SidebarComponentProps>>;

const Sidebar: SidebarComponent = ({ sidebarItems, activeSidebar, setActiveSidebar, dispatch }) => {
  const pathname = usePathname();
  const isRechargePage = pathname.toLowerCase().includes('recharge');
  const activeTab = useCSStore((state) => state.activeTab);
  const setActiveTab = useCSStore((state) => state.setActiveTab);
  const withdrawActiveTab = useAccountStore((state) => state.withdrawActiveTab);
  const setWithdrawActiveTab = useAccountStore((state) => state.setWithdrawActiveTab);

  const handleTabClick = (index: number) => {
    onClickSound('pop');
    setWithdrawActiveTab(index);
    setActiveTab(index);
    setActiveSidebar && setActiveSidebar(index || 0);
    dispatch && dispatch(index);
  };

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className={styles.sidebarWrapper}
    >
      {/* NOTE: The code below needs restructure!
                Then combine with the code next to it. Does not need to be separate logic.
      */}
      {/* {isRechargePage && (
        sidebarItems.map((item, index) => (
          <div key={index} className={classNames(styles.sidebarItem, {
            [styles.activeItem]: index === activeTab
          })}
            onClick={() => handleTabClick(index)}
          >
            <div className={styles.imgHolder}>
              <Image src={item.iconUrl} alt="Icon" />
            </div>

            <div className={styles.text}>
              <span>{item.name}</span>
            </div>

            {item.recommend && (
              <div className={styles.recommend}>
                <span
                    style={{
                      background: 'white',
                      WebkitBackgroundClip: 'text',
                    }}
                  >
                    热
                  </span>
              </div>
            )}
          </div>
        ))
      )} */}

      {!isRechargePage &&
        sidebarItems.map((item, index) => (
          <div
            key={index}
            className={classNames(styles.sidebarItem, {
              [styles.activeTab]:
                index === activeTab || index === withdrawActiveTab || (activeSidebar && activeSidebar === index),
            })}
            bet-data={item === '' ? 'none' : undefined}
            onClick={() => handleTabClick(index)}
          >
            <span className={styles.text}>{item}</span>
          </div>
        ))}
    </motion.div>
  );
};

export default Sidebar;
