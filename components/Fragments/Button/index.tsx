import styles from './index.module.scss';

type Props = {
  className?: string;
  onClick?: () => void;
  text?: string;
  type?: 'button' | 'submit' | 'reset';
};

const Button = ({ text, className, onClick, type }: Props) => {
  return (
    // Please pass a classname for this in order to modify margins and dimensions
    <button type={type} onClick={onClick} className={`${styles.buttonDesignTwo} ${className}`}>
      <span>{text}</span>
    </button>
  );
};

export default Button;
