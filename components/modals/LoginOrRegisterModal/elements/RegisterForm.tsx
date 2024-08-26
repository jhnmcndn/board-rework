import Input from '@/components/Input';
import { registerPhoneSchema } from '@/constants/validateSchema';
import useValidate from '@/hooks/useFormValidate';
import useRegisterPhone from '@/hooks/useRegisterPhone';
import useModalStore from '@/store/modals';
import { FC, useEffect } from 'react';
import styles from '../index.module.scss';

type RegisterFormProps = {
  switchToLogin: () => void;
};

const RegisterForm: FC<RegisterFormProps> = ({ switchToLogin }) => {
  const { openAlert } = useModalStore();
  const { requestVerifyCode, registerPhone } = useRegisterPhone();
  const defaultValues = { phoneNumber: '', password: '', confirmPassword: '', verifyCode: '' };
  const { values, errors, handleSubmit, reset, registerField } = useValidate({
    defaultValues,
    schema: registerPhoneSchema,
  });

  useEffect(() => {
    const errorInstance =
      errors('phoneNumber') || errors('password') || errors('confirmPassword') || errors('verifyCode');
    if (errorInstance) {
      openAlert({ body: errorInstance });
    }
  }, [errors]);

  const handleRequestVerify = () => {
    requestVerifyCode(values('phoneNumber'));
  };

  const tryRegisterPhone = async () => {
    const res = await registerPhone({
      phone: values('phoneNumber'),
      password: values('password'),
      verifyCode: values('verifyCode'),
    });
    if (res) {
      reset();
      switchToLogin();
    }
  };

  const inputClassNames = { className: styles.form__input, containerClassName: styles.form__inputContainer };

  return (
    <>
      <form onSubmit={handleSubmit(tryRegisterPhone)} className={styles.form}>
        <Input placeholder='请输入您的手机号' maxLength={15} {...inputClassNames} {...registerField('phoneNumber')} />
        <Input
          placeholder='请输入密码'
          maxLength={16}
          type='password'
          passwordToggle
          {...inputClassNames}
          {...registerField('password')}
        />
        <Input
          placeholder='请再次输入密码'
          maxLength={16}
          type='password'
          passwordToggle
          {...inputClassNames}
          {...registerField('confirmPassword')}
        />
        <Input
          placeholder='请输入验证码'
          maxLength={6}
          {...inputClassNames}
          {...registerField('verifyCode')}
          onRequestVerification={handleRequestVerify}
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
