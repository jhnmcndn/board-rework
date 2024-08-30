'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';
import ModalLayout from '../ModalLayout';
import LoginForm from './elements/LoginForm';
import RegisterForm from './elements/RegisterForm';
import styles from './index.module.scss';

type LoginOrRegisterModalProps = {
  show: boolean;
  setShow: (val: boolean) => void;
};

const LoginOrRegisterModal: FC<LoginOrRegisterModalProps> = ({ show, setShow }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const isLogin = activeTab === 'login';

  const switchToLogin = () => setActiveTab('login');
  const switchToRegister = () => setActiveTab('register');

  const commonMotionProps = {
    transition: {
      type: 'spring',
      duration: 0.5,
      bounce: 0.2,
    },
  };

  return (
    <AnimatePresence>
      {show && (
        <ModalLayout closeOnOutsideClick onClose={() => setShow(false)} backdrop={0.2}>
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
                initial={{ x: '-110%' }}
                animate={{ x: isLogin ? '0' : '-110%' }}
                {...commonMotionProps}
                className={styles.body}
              >
                <LoginForm switchToRegister={switchToRegister} onSuccess={() => setShow(false)} />
              </motion.div>

              <motion.div
                key='register'
                initial={{ x: '110%', opacity: 1 }}
                animate={{ x: !isLogin ? '0' : '110%' }}
                {...commonMotionProps}
                className={styles.body}
              >
                <RegisterForm switchToLogin={switchToLogin} />
              </motion.div>
            </div>
          </div>
        </ModalLayout>
      )}
    </AnimatePresence>
  );
};

export default LoginOrRegisterModal;
