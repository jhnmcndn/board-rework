'use client';

import useImages from '@/hooks/useImages';
import classNames from 'classnames';
import Image from 'next/image';
import { FC, useState } from 'react';
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
    <div className={styles.container} onClick={() => setShowDropdown(!showDropdown)}>
      <span>{defaultValue}</span>
      <Image src={images.arrowDown} alt='Dropdown arrow' />
      {showDropdown && (
        <div>
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => {
                onSelect(option);
                console.log(option === defaultValue);
              }}
              className={classNames({
                [styles.highlight]: option === defaultValue,
              })}
            >
              {option}
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
