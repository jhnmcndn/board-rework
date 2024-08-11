'use client';
import HeaderModalTitle from '@/components/HeaderModalTitle';
import useModalStore from '@/store/modals';
import { onClickSound } from '@/utils/audioFile';
import classNames from 'classnames';
import { useState } from 'react';
import ModalLayout from '../ModalLayout';
import ChangePassword from './components/ChangePassword';
import ColorSystem from './components/ColorSystem';
import Music from './components/Music';
import PersonalInfo from './components/PersonalInfo';
import Version from './components/Version';
import styles from './index.module.scss';

type ListItemProps = {
  id: number;
  title: string;
};

const SettingsModal: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number>(0);
  const { closeSettings, isSettingsOpen } = useModalStore();
  const listItems: ListItemProps[] = [
    { id: 0, title: '个人信息' },
    { id: 1, title: '音乐切换' },
    { id: 2, title: '修改密码' },
    { id: 3, title: '网站详情' },
    { id: 4, title: '改变主题' },
  ];

  const handleSetSelect = (id: number) => {
    onClickSound('pop');
    setSelectedId(id);
  };

  const renderComponent = () => {
    switch (selectedId) {
      case 0:
        return <PersonalInfo />;
      case 1:
        return <Music />;
      case 2:
        return <ChangePassword />;
      case 3:
        return <Version />;
      case 4:
        return <ColorSystem />;
      default:
        return <PersonalInfo />;
    }
  };

  if (!isSettingsOpen) return null;

  return (
    <ModalLayout backdrop={0.8}>
      <div className={styles.settingsContainer}>
        <HeaderModalTitle title='设置' onClick={closeSettings} />
        <div className={styles.contentModal}>
          <div className={styles.sidebarContainer}>
            <ul className={styles.sidebarList}>
              {listItems.map((item) => (
                <li
                  key={item.id}
                  className={classNames({ [styles.sidebarItem]: selectedId === item.id })}
                  onClick={() => handleSetSelect(item.id)}
                >
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.settingContent}>{renderComponent()}</div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default SettingsModal;
