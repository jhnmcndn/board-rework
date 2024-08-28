'use client';

import useImages from '@/hooks/useImages';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { FC, useState } from 'react';
import Backdrop from '../Backdrop';
import styles from './index.module.scss';

const Dropdown: FC<
  Readonly<{
    defaultValue: string;
    options: string[];
    onSelect: (filter: string) => void;
  }>
> = ({ defaultValue, options, onSelect }) => {
  const { images } = useImages();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div
      className={classNames(styles.container, {
        [styles.active]: !!showDropdown,
      })}
      onClick={() => setShowDropdown(!showDropdown)}
    >
      <span>{defaultValue}</span>
      <Image src={images.arrowDown} alt='Dropdown arrow' />

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.1 }}
            className={styles.dropdownWrapper}
          >
            <div className={styles.dropdownContent}>
              <Backdrop />
              {options.map((option, index) => (
                <li
                  key={index}
                  onClick={() => {
                    onSelect(option);
                  }}
                  className={classNames({
                    [styles.highlight]: option === defaultValue,
                  })}
                >
                  {option}
                </li>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
