import VersionModal from '@/components/modals/VersionModal';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { APP_VERSION } from '@/constants/app';
import useCopyToClipBoard from '@/hooks/useCopyToClipboard';
import { VersionRowProps } from '@/types/app';
import { FC, useState } from 'react';
import styles from './index.module.scss';

const VersionRow: FC<VersionRowProps> = ({ label, value, buttonLabel, onButtonClick }) => (
  <div className={styles.container}>
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
    <button onClick={onButtonClick}>{buttonLabel}</button>
  </div>
);

const Version: FC = () => {
  const init = useAccountStore((state) => state.init);
  const { copyToClipboard } = useCopyToClipBoard();
  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);
  const linkUrl = 'https://yb3f68.com/chat/text/chat_1UdkUk.html';
  const version = `V ${APP_VERSION}`;

  return (
    <div className={styles.versionContainer}>
      <VersionRow
        label='官方网址:'
        value={init.webUrl}
        buttonLabel='复制'
        onButtonClick={() => copyToClipboard(init.webUrl)}
      />
      <VersionRow label='客服线:' value={linkUrl} buttonLabel='复制' onButtonClick={() => copyToClipboard(linkUrl)} />
      <VersionRow
        label='当前版本号:'
        value={version}
        buttonLabel='获取版本'
        onButtonClick={() => setIsVersionModalOpen(true)}
      />
      <VersionModal show={isVersionModalOpen} setShow={setIsVersionModalOpen} />
    </div>
  );
};

export default Version;
