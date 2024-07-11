import ModalLayout from '@/components/ModalLayout';
import { SERVER } from '@/constants/app';
import useIsMounted from '@/hooks/useIsMounted';
import useAlertModalStore from '@/store/useAlertModalStore';
import { createPortal } from 'react-dom';
import styles from './index.module.scss';

export default function AlertContainer() {
  const { content, isOpen, closeAlert } = useAlertModalStore();
  const alertIcon = `./assets/${SERVER}/favicon.ico`;
  const isMounted = useIsMounted();

  const modalContent = (
    <ModalLayout isAlert onClose={closeAlert}>
      <div className={styles.alert__wrapper}>
        <div className={styles.alert__textContainer}>
          <div className={styles.alert__imageContainer}>
            <img src={alertIcon} alt="alert" className={styles.alert__icon} />
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

  if (isMounted() && isOpen) {
    const element = document.getElementById('modalRoot') as HTMLDivElement;
    return createPortal(modalContent, element);
  }

  return null;
}
