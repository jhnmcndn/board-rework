'use client';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useModalStore from '@/store/modals';
import React from 'react';
import styles from './index.module.scss';

const Sidebar: React.FC = () => {
  // const fetchActivityInfos = useAccountStore((state) => state.fetchActivityInfos);
  const fetchActivityTypes = useAccountStore((state) => state.fetchActivityTypes);
  const { openSidebarAnnouncement } = useModalStore();

  console.log(fetchActivityTypes, 'hehehe');

  return (
    <div className={styles.sidebarContainer}>
      <ul>
        {openSidebarAnnouncement === 0 && (
          <li>
            <span>lessgoo</span>
          </li>
        )}

        {openSidebarAnnouncement === 1 && (
          <>
            <li>
              <span>hello</span>
            </li>
            <li>
              <span>asdfsdfsdfsdf123</span>
            </li>
            <li>
              <span>asdfsdfsdfsdf123</span>
            </li>
          </>
        )}
        {openSidebarAnnouncement === 2 && (
          <>
            <li>
              <span>kenneth</span>
            </li>
            <li>
              <span>asdfsdfsdfsdf123</span>
            </li>
            <li>
              <span>asdfsdfsdfsdf123</span>
            </li>
            <li>
              <span>asdfsdfsdfsdf123</span>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
