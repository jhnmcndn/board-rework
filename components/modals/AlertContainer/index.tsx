import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import Image from 'next/image';
import styles from './index.module.scss';

type Props = {
  alertMe: boolean;
  setCopy?: (value: boolean) => void;
  whatText?: string;
  link?: boolean;
  notify?: string;
  centered?: boolean;
  top?: number;
  left?: number;
  padding?: number;
}

const AlertContainer = (props: Props) => {
  let timer: number;

  useEffect(() => {
    timer = setTimeout(() => props?.setCopy && props?.setCopy(false), 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [props]);

  if (!props.alertMe) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className={styles.alertContainer_wrapper}
          style={props.centered ? { left: '50%' } : undefined}
        >
          <div className={styles.alertTextContainer}>
            <div className={styles.alertIconImageCont}>
              <Image
                src={require('@/assets/commons/logoIcon.png')}
                width={720}
                height={720}
                alt='alert'
                className={styles.alertIcon}
              />
            </div>
            {props.whatText ? (
              <span className={styles.alertMess}>
                {props.link ? '复制链接:' : '复制:'} {props.whatText}
              </span>
            ) : props.notify ? (
              <span className={styles.alertMess}>{props.notify}</span>
            ) : (
              <></>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default AlertContainer;
