import { PasswordProps } from '@/types/app';
import Image from 'next/image';
import { FC } from 'react';
import styles from './index.module.scss';

const PasswordInput: FC<PasswordProps> = ({
  label,
  value,
  type,
  name,
  placeholder,
  onChange,
  toggleVisibility,
  icon,
}) => (
  <div className={styles.rowContainer}>
    <span>{label}</span>
    <input value={value} type={type} name={name} placeholder={placeholder} onChange={onChange} maxLength={16} />
    {value && <Image onClick={toggleVisibility} src={icon} alt='Eye Icon' />}
  </div>
);

export default PasswordInput;
