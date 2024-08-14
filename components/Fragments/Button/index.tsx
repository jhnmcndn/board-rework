import styles from './index.module.scss';

type Props = {
  className: string;
  onClick?: () => void;
  text?: any;
  type?: 'button' | 'submit' | 'reset';
  id?: any;
};

const Button = ({ text, className, onClick, type, id }: Props) => {
  return (
    // Please pass a classname for this in order to modify margins and dimensions
    <button id={id} type={type} onClick={onClick} className={`${styles.buttonDesignTwo} ${className}`}>
      <span>{text}</span>
    </button>
  );
};

export default Button;
