import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useModalStore from '@/store/modals';
import { VersionRowProps } from '@/types/app';
import { copyToClipboard } from '@/utils/helpers';
import styles from './index.module.scss';

const VersionRow: React.FC<VersionRowProps> = ({ label, value, buttonLabel, onButtonClick }) => (
  <div className={styles.container}>
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
    <button onClick={onButtonClick}>{buttonLabel}</button>
  </div>
);

const Version: React.FC = () => {
  const init = useAccountStore((state) => state.init);
  const { openAlert, openVersion } = useModalStore();
  const linkUrl = 'https://yb3f68.com/chat/text/chat_1UdkUk.html';
  const version = `V ${process.env.NEXT_PUBLIC_APP_VERSION}`;

  const getUrl = () => {
    copyToClipboard(init.webUrl);
    openAlert({ body: init.webUrl });
  };

  const getLinkUrl = () => {
    copyToClipboard(linkUrl);
    openAlert({ body: linkUrl });
  };

  return (
    <div className={styles.versionContainer}>
      <VersionRow label='官方网址:' value={init.webUrl} buttonLabel='复制' onButtonClick={getUrl} />
      <VersionRow label='客服线:' value={linkUrl} buttonLabel='复制' onButtonClick={getLinkUrl} />
      <VersionRow label='当前版本号:' value={version} buttonLabel='获取版本' onButtonClick={() => openVersion()} />
    </div>
  );
};

export default Version;
