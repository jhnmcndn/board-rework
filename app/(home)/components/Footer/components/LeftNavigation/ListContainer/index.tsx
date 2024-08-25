import { ListContainerProps } from '@/types/app';
import Image from 'next/image';
import { FC } from 'react';
import styles from './index.module.scss';

const ListContainer: FC<ListContainerProps> = ({ dataClick, onClick, icon, text, notif }) => (
  <li data-click={dataClick} data-notif={notif} onClick={onClick} className={styles.mainList}>
    <div className={styles.listContainer}>
      <Image src={icon} alt='Navigation Icon' />
      <span className={styles.text}>{text}</span>
    </div>
  </li>
);

export default ListContainer;
