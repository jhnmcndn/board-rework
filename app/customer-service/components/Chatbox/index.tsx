'use client';

import { Init } from '@/types/app';
import { FC, useRef } from 'react';
import styles from './index.module.scss';

const Chatbox: FC<
  Readonly<{
    init: Init;
  }>
> = ({ init }) => {
  const src = init.customerUrl || 'https://yangxianli1.cn?groupid=bd901135e6b1fe631dd7e40e506b38d4';
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const zoomOutContent = () => {
    if (!iframeRef.current) return;
    const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
    const element = (
      <style>
        {`html, body {
          zoom: 0.8; /* Adjust the value to zoom in or out */
          -moz-transform: scale(0.8); /* For Firefox */
          -webkit-transform: scale(0.8); /* For Chrome, Safari, and Opera */
          transform: scale(0.8);
          transform-origin: 0 0;

        }`}
      </style>
    );
    iframeDoc?.head.insertAdjacentElement('beforeend', element as unknown as Element);
  };
  return (
    <div className={styles.container} ref={iframeRef} onLoad={zoomOutContent}>
      <iframe src={src} title='Customer Service Chatbox' />
    </div>
  );
};

export default Chatbox;
