'use client'

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import styles from './index.module.scss';
import Image from 'next/image'

type Props = {
  alertMe?: boolean;
  setCopy?: (value: boolean) => void;
  whatText?: string;
  link?: boolean;
  notify?: string;
}

const AlertContainer = (props: Props) => {
  let timer: number;

  useEffect(() => {
    timer = setTimeout(() => props?.setCopy && props?.setCopy(false), 500);

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
          transition={{ duration: 3 }}
          className={styles.alertContainer_wrapper}
        >
          <div className={styles.alertTextContainer}>
            <div className={styles.alertIconImageCont}>
              <Image
                src={require('@/assets/commons/logoIcon.png')}
                className={styles.alertIcon}
                width={720}
                height={720}
                alt="Alert Icon"
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