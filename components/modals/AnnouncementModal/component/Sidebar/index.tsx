'use client';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useModalStore from '@/store/modals';
import { sfx } from '@/utils/audioFile';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

const Sidebar: React.FC = () => {
  const { openSidebarAnnouncement } = useModalStore();
  const activityTypes = useAccountStore((state) => state.activityTypes);
  const fetchActivityType = useAccountStore((state) => state.fetchActivityType);
  const setContentAnnouncement = useModalStore((state) => state.setContentAnnouncement);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    fetchActivityType();
  }, [fetchActivityType]);

  useEffect(() => {
    if (activityTypes.length > 0) {
      setSelectedIndex(0);
      setContentAnnouncement(Number(activityTypes[0]?.id));
    }
  }, [activityTypes, setContentAnnouncement]);

  const handleSelectedTabs = (activityId: number, index: number) => {
    setContentAnnouncement(activityId);
    setSelectedIndex(index);
  };

  return (
    <div className={styles.sidebarContainer}>
      <ul>
        {openSidebarAnnouncement === 0 &&
          activityTypes.map((activityType, index) => (
            <li
              key={activityType.id}
              data-click={sfx.popAudio}
              onClick={() => handleSelectedTabs(Number(activityType?.id), index)}
              className={classNames({
                [styles.active]: index === selectedIndex,
              })}
            >
              <span>{activityType.name}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
