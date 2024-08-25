'use client';

import useIsMounted from '@/hooks/useIsMounted';
import useModalStore from '@/store/modals';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';
import { createPortal } from 'react-dom';
import ModalLayout from '../ModalLayout';
import LoginForm from './elements/LoginForm';
import RegisterForm from './elements/RegisterForm';
import styles from './index.module.scss';

const LoginOrRegisterModal: FC = () => {
  const isMounted = useIsMounted();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const { isLoginOrRegisterOpen, closeLoginOrRegister } = useModalStore();
  const isLogin = activeTab === 'login';

  const switchToLogin = () => setActiveTab('login');
  const switchToRegister = () => setActiveTab('register');

  const commonMotionProps = {
    initial: { x: 0, opacity: 0, display: 'none' },
    transition: { duration: 0.5, display: { duration: 0 } },
    className: styles.body,
  };

  const modalContent = (
    <AnimatePresence>
      {isLoginOrRegisterOpen && (
        <ModalLayout closeOnOutsideClick onClose={closeLoginOrRegister} backdrop={0.2}>
          <div className={styles.registerLogin}>
            <div className={styles.header}>
              <motion.div
                animate={{ x: activeTab === 'login' ? '-100%' : '0' }}
                className={styles.header__activeTabBg}
              />
              <div onClick={switchToLogin}>手机号登录</div>
              <div onClick={switchToRegister}>手机号注册</div>
            </div>

            <div className={styles.animateContainer}>
              <motion.div
                key='login'
                animate={{
                  x: isLogin ? '0%' : '-20%',
                  opacity: isLogin ? 1 : 0,
                  display: isLogin ? 'block' : 'none',
                }}
                {...commonMotionProps}
              >
                <LoginForm switchToRegister={switchToRegister} />
              </motion.div>

              <motion.div
                key='register'
                animate={{
                  x: isLogin ? '20%' : '0%',
                  opacity: isLogin ? 0 : 1,
                  display: isLogin ? 'none' : 'block',
                }}
                {...commonMotionProps}
              >
                <RegisterForm switchToLogin={switchToLogin} />
              </motion.div>
            </div>
          </div>
        </ModalLayout>
      )}
    </AnimatePresence>
  );

  if (isMounted()) {
    const element = document.getElementById('modal-root') as HTMLDivElement;
    if (element) return createPortal(modalContent, element);
  }

  return null;
};

export default LoginOrRegisterModal;
