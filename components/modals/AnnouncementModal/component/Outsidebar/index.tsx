import useModalStore from '@/store/modals';
import { sfx } from '@/utils/audioFile';
import classNames from 'classnames';
import styles from './index.module.scss';

const Outsidebar: React.FC = () => {
  const { setSidebarAnnouncement, openSidebarAnnouncement } = useModalStore();

  const tabIndex = [
    { id: 0, label: '活动' },
    { id: 1, label: '任务' },
    { id: 2, label: '公告' },
  ];

  return (
    <ul className={styles.sideContainerTab}>
      {tabIndex.map((tab) => (
        <li
          key={tab.id}
          data-click={sfx.popAudio}
          className={classNames({ [styles.sideActiveTab]: openSidebarAnnouncement === tab.id })}
          onClick={() => setSidebarAnnouncement(tab.id)}
        >
          <span>{tab.label}</span>
        </li>
      ))}
    </ul>
  );
};

export default Outsidebar;
