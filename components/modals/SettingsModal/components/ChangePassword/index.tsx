import { resetPassword } from '@/api/platform';
import useImages from '@/hooks/useImages';
import useModalStore from '@/store/modals';
import Image from 'next/image';
import { useState } from 'react';
import styles from './index.module.scss';

const ChangePassword: React.FC = () => {
  const { openAlert } = useModalStore();
  const { images } = useImages();
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    showOldPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleIconVisible = (field: 'showOldPassword' | 'showNewPassword' | 'showConfirmPassword') => {
    setPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = passwords;

    if (newPassword === confirmPassword) {
      if (newPassword.length >= 8) {
        try {
          const data = await resetPassword({ oldPasswd: oldPassword, newPasswd: newPassword });
          openAlert({ body: data.msg });

          setPasswords({
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            showOldPassword: false,
            showNewPassword: false,
            showConfirmPassword: false,
          });
        } catch (error) {
          openAlert({ body: 'Error' });
        }
      } else {
        openAlert({ body: '由8-16位数字加字母组成' });
      }
    } else {
      openAlert({ body: '新密码与确认密码不匹配' });
    }
  };

  return (
    <>
      <div className={styles.passwordBg}>
        <form className={styles.passwordContainer} onSubmit={handleSubmit}>
          <div className={styles.oldPass}>
            <span>新密码:</span>
            <input
              value={passwords.oldPassword}
              type={passwords.showOldPassword ? 'text' : 'password'}
              name='oldPassword'
              placeholder='请输入新密码'
              onChange={handleChange}
              maxLength={16}
            />
            {passwords.oldPassword && (
              <Image
                onClick={() => toggleIconVisible('showOldPassword')}
                src={passwords.showOldPassword ? images.eyeHide : images.eyeShow}
                alt='Eye Icon'
              />
            )}
          </div>
          <div className={styles.newPass}>
            <span>新密码:</span>
            <input
              value={passwords.newPassword}
              type={passwords.showNewPassword ? 'text' : 'password'}
              name='newPassword'
              placeholder='请输入新密码'
              onChange={handleChange}
              maxLength={16}
            />
            {passwords.newPassword && (
              <Image
                onClick={() => toggleIconVisible('showNewPassword')}
                src={passwords.showNewPassword ? images.eyeHide : images.eyeShow}
                alt='Eye Icon'
              />
            )}
          </div>
          <div className={styles.confirmPass}>
            <span>确认密码:</span>
            <input
              value={passwords.confirmPassword}
              type={passwords.showConfirmPassword ? 'text' : 'password'}
              name='confirmPassword'
              placeholder='确认新密码'
              onChange={handleChange}
              maxLength={16}
            />
            {passwords.confirmPassword && (
              <Image
                onClick={() => toggleIconVisible('showConfirmPassword')}
                src={passwords.showConfirmPassword ? images.eyeHide : images.eyeShow}
                alt='Eye Icon'
              />
            )}
          </div>
          <div className={styles.passwordHandler}>
            <button className={styles.passwordBtn} type='submit'>
              确认修改
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
