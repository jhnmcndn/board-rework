'use client';

import Input from '@/components/Input';
import useImages from '@/hooks/useImages';
import useIsMounted from '@/hooks/useIsMounted';
import useModalStore from '@/store/modals';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';
import { createPortal } from 'react-dom';
import ModalLayout from '../ModalLayout';
import styles from './index.module.scss';

const LoginOrRegisterModal: FC = () => {
  const isMounted = useIsMounted();
  const { images } = useImages();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const { isLoginOrRegisterOpen, closeLoginOrRegister, closeLoginOptions } = useModalStore();
  const isLogin = activeTab === 'login';

  const handleRedirect = () => {
    closeLoginOrRegister();
    closeLoginOptions();
  };

  const handelLoginMobile = (e: any) => {
    e.preventDefault();
    console.log('LOGIN SUBMITTED');
  };

  const handelRegisterMobile = (e: any) => {
    e.preventDefault();
    console.log('REGISTER SUBMITTED');
  };

  const switchToLogin = () => setActiveTab('login');
  const switchToRegister = () => setActiveTab('register');

  const modalContent = (
    <AnimatePresence>
      {isLoginOrRegisterOpen && (
        <ModalLayout closeOnOutsideClick onClose={closeLoginOrRegister} backdrop={0.8}>
          <div className={styles.registerLogin}>
            <div className={styles.header}>
              <motion.div
                animate={{ x: activeTab === 'login' ? '-100%' : '0' }}
                className={styles.header__activeTabBg}
              />
              <div onClick={switchToLogin}>手机号登录</div>
              <div onClick={switchToRegister}>手机号注册</div>
            </div>

            <div className={styles.bodyContainer}>
              <motion.div
                key='login'
                initial={{ x: 0, opacity: 0, display: 'none' }}
                animate={{
                  x: isLogin ? '0%' : '-20%',
                  opacity: isLogin ? 1 : 0,
                  display: isLogin ? 'block' : 'none',
                }}
                transition={{ duration: 0.5 }}
                className={styles.body}
              >
                <form onSubmit={handelLoginMobile} className={styles.form}>
                  <Input
                    label='username'
                    placeholder='请输入6-15位数字或字母'
                    maxLength={15}
                    className={styles.form__input}
                  />
                  <Input
                    label='password'
                    placeholder='请输入6-16位数字、字母的密码'
                    maxLength={16}
                    type='password'
                    passwordToggle
                    className={styles.form__input}
                  />
                  <button type='submit'>确认登录</button>
                  <button onClick={switchToRegister}>注册</button>
                </form>
                <div className={styles.body__footer}>
                  <Link href='/customer-service' onClick={handleRedirect}>
                    <Image src={images.supportIcon} height={22} width={22} alt='Support' />
                    有问题？找在线客服
                  </Link>
                  <div>
                    当前版本 <span>{process.env.NEXT_PUBLIC_APP_VERSION}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                key='register'
                initial={{ x: 0, opacity: 0, display: 'block' }}
                animate={{
                  x: isLogin ? '20%' : '0%',
                  opacity: isLogin ? 0 : 1,
                  display: isLogin ? 'none' : 'block',
                }}
                transition={{ duration: 0.5 }}
                className={styles.body}
              >
                <form onSubmit={handelRegisterMobile} className={styles.form}>
                  <Input
                    label='register-username'
                    placeholder='请输入您的手机号'
                    maxLength={15}
                    className={styles.form__input}
                  />
                  <Input
                    label='register-password'
                    placeholder='请输入密码'
                    maxLength={16}
                    type='password'
                    passwordToggle
                    className={styles.form__input}
                  />
                  <Input
                    label='confirm-password'
                    placeholder='请再次输入密码'
                    maxLength={16}
                    type='password'
                    passwordToggle
                    className={styles.form__input}
                  />
                  <Input
                    label='validate-username'
                    placeholder='请输入验证码'
                    maxLength={15}
                    className={styles.form__input}
                  />
                  <button type='submit'>确认注册</button>
                </form>
                <div className={styles.body__footer}>
                  <div>
                    已有账号, <span onClick={switchToLogin}>{'前往登陆>'}</span>
                  </div>
                </div>
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
