'use client';

import useImages from '@/hooks/useImages';
import classNames from 'classnames';
import Image from 'next/image';
import { FC, Fragment, useState } from 'react';
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
      {showDropdown && (
        <Fragment>
          <Backdrop />
          <div>
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
        </Fragment>
      )}
    </div>
  );
};

export default Dropdown;
