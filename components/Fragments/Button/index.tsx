import { ComponentPropsWithoutRef } from 'react';
import styles from './index.module.scss';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  text?: any;
  className?: string;
};

const Button = ({ text, className, ...props }: ButtonProps) => {
  return (
    // Please pass a className for this in order to modify margins and dimensions
    <button className={`${styles.buttonDesignTwo} ${className}`} {...props}>
      <span>{text}</span>
    </button>
  );
};

export default Button;
