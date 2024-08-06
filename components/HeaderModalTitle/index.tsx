import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import React, { FC } from 'react';
import styles from './index.module.scss';

interface HeaderProps {
  title?: string;
  logoSrc?: string | StaticImport;
  onClick?: () => void;
}

const TextTitle: FC<Required<Pick<HeaderProps, 'title'>>> = ({ title }) => {
  return (
    <div className={styles.headerTitle}>
      <div className={styles.text}>{title}</div>
    </div>
  );
};

const LogoTitle: FC<Required<Pick<HeaderProps, 'logoSrc'>>> = ({ logoSrc }) => {
  return (
    <div className={styles.logoContainer}>
      <Image src={logoSrc} alt='Logo' className={styles.logo} />
    </div>
  );
};

const HeaderModalTitle: React.FC<HeaderProps> = ({ title, logoSrc, onClick }) => {
  return (
    <div className={styles.headContainer}>
      {title ? <TextTitle title={title} /> : logoSrc && <LogoTitle logoSrc={logoSrc} />}

      <span className={styles.closeBtn} onClick={onClick} />
    </div>
  );
};

export default HeaderModalTitle;
