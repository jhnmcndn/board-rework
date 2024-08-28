import { resetPassword } from '@/api/platform';
import useImages from '@/hooks/useImages';
import useModalStore from '@/store/modals';
import { PasswordsState } from '@/types/app';
import { ChangeEvent, FC, FormEvent, useCallback, useState } from 'react';
import styles from './index.module.scss';
import PasswordInput from './PasswordInput';

const initialPasswordsState: PasswordsState = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
  showOldPassword: false,
  showNewPassword: false,
  showConfirmPassword: false,
};

const ChangePassword: FC = () => {
  const { openAlert } = useModalStore();
  const { images } = useImages();
  const [passwords, setPasswords] = useState<PasswordsState>(initialPasswordsState);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const toggleIconVisible = useCallback((field: keyof PasswordsState) => {
    setPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = passwords;

    if (newPassword !== confirmPassword) {
      openAlert('新密码与确认密码不匹配');
      return;
    }

    if (newPassword.length < 8) {
      openAlert('由8-16位数字加字母组成');
      return;
    }

    try {
      const data = await resetPassword({ oldPasswd: oldPassword, newPasswd: newPassword });
      openAlert(data.msg);

      setPasswords(initialPasswordsState);
    } catch (error) {
      openAlert('错误');
    }
  };

  return (
    <div className={styles.passwordBg}>
      <form className={styles.passwordContainer} onSubmit={handleSubmit}>
        <PasswordInput
          label='旧密码:'
          value={passwords.oldPassword}
          type={passwords.showOldPassword ? 'text' : 'password'}
          name='oldPassword'
          placeholder='请输入旧密码'
          onChange={handleChange}
          toggleVisibility={() => toggleIconVisible('showOldPassword')}
          icon={passwords.showOldPassword ? images.eyeHide : images.eyeShow}
        />
        <PasswordInput
          label='新密码:'
          value={passwords.newPassword}
          type={passwords.showNewPassword ? 'text' : 'password'}
          name='newPassword'
          placeholder='请输入新密码'
          onChange={handleChange}
          toggleVisibility={() => toggleIconVisible('showNewPassword')}
          icon={passwords.showNewPassword ? images.eyeHide : images.eyeShow}
        />
        <PasswordInput
          label='确认密码:'
          value={passwords.confirmPassword}
          type={passwords.showConfirmPassword ? 'text' : 'password'}
          name='confirmPassword'
          placeholder='确认新密码'
          onChange={handleChange}
          toggleVisibility={() => toggleIconVisible('showConfirmPassword')}
          icon={passwords.showConfirmPassword ? images.eyeHide : images.eyeShow}
        />
        <div className={styles.passwordHandler}>
          <button className={styles.passwordBtn} type='submit'>
            确认修改
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
