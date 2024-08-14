import { ListContainerProps } from '@/types/app';
import Image from 'next/image';
import React from 'react';
import styles from './index.module.scss';

const ListContainer: React.FC<ListContainerProps> = ({ dataClick, onClick, icon, text }) => (
  <li data-click={dataClick} onClick={onClick} className={styles.mainList}>
    <div className={styles.listContainer}>
      <Image src={icon} alt='Navigation Icon' />
      <span className={styles.text}>{text}</span>
    </div>
  </li>
);

export default ListContainer;
