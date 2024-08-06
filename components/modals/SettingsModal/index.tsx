'use client';
import HeaderModalTitle from '@/components/HeaderModalTitle';
import { onClickSound } from '@/utils/audioFile';
import ModalLayout from '../ModalLayout';
import PersonalInfo from './components/PersonalInfo';
import styles from './index.module.scss';

type listItemProps = {
  id: number;
  title: string;
};

const SettingsModal = () => {
  // const handleSetActive = (index: number) => setOmSideActive(index);

  const listItems: listItemProps[] = [
    { id: 0, title: '个人信息' },
    { id: 1, title: '音乐切换' },
    { id: 2, title: '修改密码' },
    { id: 3, title: '网站详情' },
    { id: 4, title: '改变主题' },
  ];

  const handleSetSelect = (index: number) => () => {
    onClickSound('pop');
    handleSetActive(index);
  };

  return (
    <ModalLayout>
      <div className={styles.settingsContainer}>
        <HeaderModalTitle title='设置' />
        <div className={styles.contentModal}>
          <div className={styles.sidebarContainer}>
            <ul className={styles.sidebarList}>
              {listItems.map((item) => (
                <li key={item.id} className={styles.sidebarItem}>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.settingContent}>
            <PersonalInfo />
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default SettingsModal;
