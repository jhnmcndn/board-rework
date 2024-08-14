import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import Image from 'next/image';
import { themeColor } from './color';
import styles from './index.module.scss';

const ColorSystem: React.FC = () => {
  const { theme, setTheme } = useAccountStore((state) => state);

  return (
    <>
      <div className={styles.colorContainer}>
        <div className={styles.colorHeader}>选择主题</div>
        <div className={styles.colorOptions}>
          {themeColor.map((btn, index) => {
            return (
              <div
                key={index}
                className={styles.colorItem}
                style={{ background: btn.color }}
                onClick={() => {
                  setTheme(btn.theme);
                }}
              >
                {theme === btn.color && <Image src={btn.pic} alt='Theme Color' />}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ColorSystem;
