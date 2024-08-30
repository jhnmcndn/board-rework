'use client';

import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useModalStore from '@/store/modals';
import { sfx } from '@/utils/audioFile';
import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import styles from './index.module.scss';

const Sidebar: FC = () => {
  const { openSidebarAnnouncement } = useModalStore();
  const { activityTypes, activityQuestSection, fetchActivityQuestSection, fetchActivityType } = useAccountStore(
    (state) => state,
  );
  const setContentAnnouncement = useModalStore((state) => state.setContentAnnouncement);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    fetchActivityType();
    fetchActivityQuestSection();
  }, [openSidebarAnnouncement]);

  useEffect(() => {
    if (activityTypes.length > 0) {
      setSelectedIndex(0);
      setContentAnnouncement(Number(activityTypes[0]?.id));
    }
    if (activityQuestSection.length > 0) {
      setSelectedIndex(0);
      setContentAnnouncement(Number(activityQuestSection[0]?.id));
    }
  }, [activityTypes, activityQuestSection]);

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
        {openSidebarAnnouncement === 1 &&
          activityQuestSection.map((activitySection, index) => (
            <li
              key={activitySection.id}
              data-click={sfx.popAudio}
              onClick={() => handleSelectedTabs(Number(activitySection?.id), index)}
              className={classNames({
                [styles.active]: index === selectedIndex,
              })}
            >
              <span>{activitySection.name}</span>
            </li>
          ))}
        {/* {openSidebarAnnouncement === 2 &&
          messageOnSites.map((messageOnSites, index) => (
            <li
              key={messageOnSites.id}
              data-click={sfx.popAudio}
              onClick={() => handleSelectedTabs(Number(messageOnSites?.id), index)}
              className={classNames({
                [styles.active]: index === selectedIndex,
              })}
            >
              <span>{messageOnSites.title}</span>
            </li>
          ))} */}
      </ul>
    </div>
  );
};

export default Sidebar;
