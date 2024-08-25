import Input from '@/components/Input';
import { FC } from 'react';
import styles from '../index.module.scss';

type RegisterFormProps = {
  switchToLogin: () => void;
};

const RegisterForm: FC<RegisterFormProps> = ({ switchToLogin }) => {
  const handleRequestVerification = () => {
    console.log('REQUEST VERIFICATION');
  };

  const handelRegisterMobile = (e: any) => {
    e.preventDefault();
    console.log('REGISTER SUBMITTED');
  };

  const inputClassNames = { className: styles.form__input, containerClassName: styles.form__inputContainer };

  return (
    <>
      <form onSubmit={handelRegisterMobile} className={styles.form}>
        <Input label='register-username' placeholder='请输入您的手机号' maxLength={15} {...inputClassNames} />
        <Input
          label='register-password'
          placeholder='请输入密码'
          maxLength={16}
          type='password'
          passwordToggle
          {...inputClassNames}
        />
        <Input
          label='confirm-password'
          placeholder='请再次输入密码'
          maxLength={16}
          type='password'
          passwordToggle
          {...inputClassNames}
        />
        <Input
          label='verification-code'
          placeholder='请输入验证码'
          maxLength={15}
          {...inputClassNames}
          onRequestVerification={handleRequestVerification}
        />
        <button className={styles.form__button} type='submit'>
          确认注册
        </button>
      </form>
      <div className={styles.body__footer}>
        <div>
          已有账号, <span onClick={switchToLogin}>{'前往登陆>'}</span>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
