'use client';

import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FC, ReactElement, useMemo, useState } from 'react';
import { useMessageStore } from '../Providers/MessageStoreProvider';
import styles from './index.module.scss';

export type AccordionComponentProps = {
  title: string;
  content: ReactElement[] | string;
  createdAt?: string;
  delay: number;
  background?: string;
  id?: number;
  img?: string;
  dropdownImg?: string;
};

export type AccordionComponent = FC<Readonly<AccordionComponentProps>>;

const Accordion: AccordionComponent = ({ title, content, createdAt, delay, background, id, img, dropdownImg }) => {
  const [expand, setExpand] = useState(false);
  const theme = useAccountStore((state) => state.theme);
  const { messageOnSites, setMessageOnSites } = useMessageStore((state) => state);
  const currentMessage = useMemo(() => messageOnSites.find((message) => message.id === id), [id]);

  const handleExpand = () => {
    setExpand((prev) => !prev);
    if (id && messageOnSites.length > 0) {
      setMessageOnSites(messageOnSites.map((mail) => (mail.id === id ? { ...mail, isRead: true } : mail)));
    }
  };

  return (
    <motion.div
      initial={{ x: -2000 }}
      animate={{ x: 0 }}
      transition={{ delay: delay * 0.05, duration: 0.7 }}
      className={styles.accordion}
      data-theme={theme}
    >
      <div>
        <div
          className={styles.header}
          style={{
            background,
          }}
          onClick={handleExpand}
        >
          {img && (
            <div className={styles.imageHolder}>
              <div className={styles.redCircle} style={{ opacity: currentMessage?.isRead ? 0 : 1 }} />
              <Image src={img} alt='Accordion image' />
            </div>
          )}
          <div className={styles.headerTitle}>
            <div className={styles.title}>{title}</div>
            {createdAt && (
              <div className={styles.timeWrapper}>
                <span>{createdAt}</span>
              </div>
            )}
          </div>
          {dropdownImg && (
            <div
              className={classNames(styles.headerImage, {
                [styles.expand]: expand,
              })}
            >
              <Image src={dropdownImg} alt='Header image' width={27} height={27} />
            </div>
          )}
        </div>
        <motion.div
          className={styles.body}
          initial={{ padding: 0, margin: 0, maxHeight: 0 }}
          animate={{
            marginTop: expand ? '-0.01rem' : 0,
            maxHeight: expand ? '1.5rem' : 0,
            padding: expand ? '0.05rem' : 0,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <div className={styles.message}>{content}</div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Accordion;
