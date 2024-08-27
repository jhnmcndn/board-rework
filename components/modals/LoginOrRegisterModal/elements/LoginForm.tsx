import Input from '@/components/Input';
import { APP_VERSION } from '@/constants/app';
import { loginPhoneSchema } from '@/constants/validateSchema';
import useAuthActions from '@/hooks/useAuthActions';
import useValidate from '@/hooks/useFormValidate';
import useImages from '@/hooks/useImages';
import useModalStore from '@/store/modals';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect } from 'react';
import styles from '../index.module.scss';

type LoginFormProps = {
  switchToRegister: () => void;
};

const LoginForm: FC<LoginFormProps> = ({ switchToRegister }) => {
  const { login } = useAuthActions();
  const { images } = useImages();
  const { openAlert } = useModalStore();
  const { closeLoginOrRegister, closeLoginOptions } = useModalStore();
  const defaultValues = { phoneNumber: '', password: '' };
  const { values, errors, handleSubmit, reset, registerField } = useValidate({
    defaultValues,
    schema: loginPhoneSchema,
  });

  useEffect(() => {
    const errorInstance = errors('phoneNumber') || errors('password');
    if (errorInstance) {
      openAlert({ body: errorInstance });
    }
  }, [errors]);

  const closeLoginModals = () => {
    closeLoginOrRegister();
    closeLoginOptions();
  };

  const loginPhone = async () => {
    const res = await login('phone', { id: values('phoneNumber'), password: values('password') });
    if (res) reset();
  };

  const inputClassNames = { className: styles.form__input, containerClassName: styles.form__inputContainer };

  return (
    <>
      <form onSubmit={handleSubmit(loginPhone)} className={styles.form}>
        <Input
          placeholder='请输入6-15位数字或字母'
          maxLength={15}
          {...inputClassNames}
          {...registerField('phoneNumber')}
        />
        <Input
          placeholder='请输入6-16位数字、字母的密码'
          maxLength={16}
          type='password'
          passwordToggle
          {...inputClassNames}
          {...registerField('password')}
        />
        <button className={styles.form__button} type='submit'>
          确认登录
        </button>
        <button className={styles.form__button} type='button' onClick={switchToRegister}>
          注册
        </button>
      </form>
      <div className={styles.body__footer}>
        <Link href='/customer-service' onClick={closeLoginModals}>
          <Image src={images.supportIcon} height={22} width={22} alt='Support' />
          有问题？找在线客服
        </Link>
        <div>
          当前版本<span>{APP_VERSION}</span>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
