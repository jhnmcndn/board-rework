import { createPortal } from 'react-dom';
import { serverConfig } from '@/server';
import Image from 'next/image';
import ModalLayout from '@/components/modals/ModalLayout';
import useIsMounted from '@/hooks/useIsMounted';
import useModalStore from '@/store/useModalStore';
import styles from './index.module.scss';

export default function AlertContainer() {
  const { content, isAlertOpen, closeAlert } = useModalStore();
  const alertIcon = require(`./assets/${serverConfig.server}/favicon.ico`);
  const isMounted = useIsMounted();

  const modalContent = (
    <ModalLayout isAlert onClose={closeAlert}>
      <div className={styles.alert__wrapper}>
        <div className={styles.alert__textContainer}>
          <div className={styles.alert__imageContainer}>
            <Image src={alertIcon} alt="alert" className={styles.alert__icon} />
          </div>
          {content.body && (
            <span className={styles.alert__message}>
              {content.link ? '复制链接:' : '复制:'} {content.body}
            </span>
          )}
          {content.notify && <span className={styles.alert__message}>{content.notify}</span>}
        </div>
      </div>
    </ModalLayout>
  );

  if (isMounted() && isAlertOpen) {
    const element = document.getElementById('modalRoot') as HTMLDivElement;
    return createPortal(modalContent, element);
  }

  return null;
}