import { bindPhone, requestOTP } from '@/api/platform';
import useImages from '@/hooks/useImages';
import useModalStore from '@/store/modals';
import { BindPhonePayload } from '@/types/app';
import classNames from 'classnames';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

const SecurityCenter = () => {
  const { images } = useImages();
  const { openAlert } = useModalStore();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [count, setCounter] = useState<number>(0);
  const [formData, setFormData] = useState<BindPhonePayload>({
    mobile: '',
    passwd: '',
    code: '',
  });

  const handleSendSms = async () => {
    if (!formData.mobile) {
      openAlert({ body: '请输入手机号码' });
      return;
    }
    if (count === 0) {
      const res = await requestOTP(formData.mobile);
      if (res?.code === 200) {
        openAlert({ body: res?.msg });
        setCounter(60);
      } else {
        openAlert({ body: res?.msg });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    switch (field) {
      case 'code':
        const val = e.target.value;
        if (val.length > 6) {
          return;
        }
        setFormData((prev) => ({ ...prev, [field]: val }));

      default:
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    }
  };

  const handleBind = () => {
    if (!formData.mobile) {
      openAlert({ body: '请输入中国大陆手机号' });
      return;
    }
    if (formData?.passwd.length < 6) {
      openAlert({ body: '请输入6-16位数字与字母的组合' });
      return;
    }

    if (formData.code.length < 6) {
      openAlert({ body: '请输入6位数字的验证码' });
      return;
    }

    bindPhone(formData);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (count > 0) {
      timer = setTimeout(() => setCounter(count - 1), 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [count]);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>绑定手机号</span>
        <div className={styles.line} />
      </div>
      <div className={styles.content}>
        <div className={styles.inputGroup}>
          <input
            type='number'
            placeholder='请输入中国大陆手机号'
            value={formData.mobile}
            onChange={(e) => handleInputChange(e, 'mobile')}
            onWheel={(e) => {
              e.currentTarget.blur();
              e.stopPropagation();
            }}
          />
        </div>
        <div className={classNames(styles.inputGroup, styles.passwordInput)}>
          <input
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => handleInputChange(e, 'passwd')}
            placeholder='请输入密码'
            value={formData.passwd}
          />
          <div className={styles.showPassword} onClick={() => setShowPassword(!showPassword)}>
            {!showPassword && <Image src={images.eyeHide} alt='Eye Icon' />}
            {showPassword && <Image src={images.eyeShow} alt='Eye Icon' />}
          </div>
        </div>
        <div className={classNames(styles.inputGroup, styles.withButtonInput)}>
          <input
            type='number'
            onChange={(e) => handleInputChange(e, 'code')}
            placeholder='请输入密码'
            value={formData.code}
          />
          <button className={styles.inputButton} onClick={handleSendSms}>
            {count === 0 ? '获取验证码' : count + 's'}
          </button>
        </div>
        <p className={styles.note}>温馨提示:实名认证手机号码可用手机号登入,账户安全更有保障。</p>
        <div className={styles.bindButton} onClick={handleBind}>
          绑定
        </div>
      </div>
    </div>
  );
};

export default SecurityCenter;
