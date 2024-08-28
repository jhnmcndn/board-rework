import Input from '@/components/Input';
import NECaptcha from '@/components/NECaptcha';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { APP_VERSION } from '@/constants/app';
import { loginPhoneSchema } from '@/constants/validateSchema';
import useAuthActions from '@/hooks/useAuthActions';
import useValidate from '@/hooks/useFormValidate';
import useImages from '@/hooks/useImages';
import useModalStore from '@/store/modals';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import styles from '../index.module.scss';

type LoginFormProps = {
  switchToRegister: () => void;
};

const LoginForm: FC<LoginFormProps> = ({ switchToRegister }) => {
  const { images } = useImages();
  const { login } = useAuthActions();
  const { openAlert } = useModalStore();
  const [isCaptchaOpen, setIsCaptchaOpen] = useState(false);
  const { closeLoginOrRegister, closeLoginOptions } = useModalStore();
  const { captchaId, actionSwitch } = useAccountStore((state) => state.init);
  const isCaptchaEnabled = actionSwitch === '1' ? true : false;
  const defaultValues = { phoneNumber: '', password: '' };
  const { values, errors, handleSubmit, reset, registerField } = useValidate({
    defaultValues,
    schema: loginPhoneSchema,
  });

  useEffect(() => {
    const errorInstance = errors('phoneNumber') || errors('password');
    if (errorInstance) {
      openAlert(errorInstance);
    }
  }, [errors]);

  const closeLoginModals = () => {
    closeLoginOrRegister();
    closeLoginOptions();
  };

  const loginPhone = async (validate?: string) => {
    const success = await login('phone', { id: values('phoneNumber'), password: values('password'), validate });
    if (success) reset();
  };

  const tryLoginPhone = () => {
    if (isCaptchaEnabled) setIsCaptchaOpen(true);
    else loginPhone();
  };

  const inputClassNames = { className: styles.form__input, containerClassName: styles.form__inputContainer };

  return (
    <>
      {isCaptchaOpen && (
        <NECaptcha
          captchaId={captchaId}
          isCaptchaOpen={isCaptchaOpen}
          setIsCaptchaOpen={setIsCaptchaOpen}
          onSuccess={(validate) => loginPhone(validate)}
        />
      )}
      <form onSubmit={handleSubmit(tryLoginPhone)} className={styles.form}>
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
