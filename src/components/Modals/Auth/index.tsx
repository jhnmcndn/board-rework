import Login from '@/components/Modals/Auth/Login';
import Register from '@/components/Modals/Auth/Register';
import styles from '@/components/Modals/Auth/index.module.scss';
import useModalStore from '@/store/useModalStore';
import { createPortal } from 'react-dom';
import ModalLayout from '../ModalLayout';

const Auth = () => {
  const isAuthOpen = useModalStore((state) => state.isAuthOpen);
  const modalContent = (
    <ModalLayout>
      <div className={styles.modal}>
        <Login />
        <Register />
      </div>
    </ModalLayout>
  );

  if (isAuthOpen) {
    const element = document.getElementById('modalRoot') as HTMLDivElement;
    return createPortal(modalContent, element);
  }

  return null;
};

export default Auth;
