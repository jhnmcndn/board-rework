import styles from './index.module.scss';

type Props = {
  clickMe?: () => void;
  padding?: number;
  margin?: number;
  width?: number;
  height?: number;
  fwm?: number;
  fs?: number;
  brad?: number;
  buttonName?: string;
}

const ButtonDesignTwo = ({
  clickMe,
  padding,
  margin,
  width,
  height,
  fwm,
  fs,
  brad,
  buttonName
}: Props) => {
  return (
    <div
      onClick={clickMe}
      className={styles.buttonDesignTwo}
      style={{
        padding: padding,
        margin: `${margin}rem`,
        width: `${width}rem`,
        height: `${height}rem`,
        fontWeight: fwm,
        fontSize: `${fs}rem`,
        borderRadius: `${brad}rem`,
      }}
    >
      <span>{buttonName}</span>
    </div>
  );
};

export default ButtonDesignTwo;
