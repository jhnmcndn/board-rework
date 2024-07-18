'use client';

import styles from '@/app/customer-service/components/Iframe/index.module.scss';
import { useAccountStore } from '@/components/providers/AccountStoreProvider';
import { useRef } from 'react';

const Iframe = () => {
  const init = useAccountStore((state) => state.init);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const defaultCSUrl = 'https://yangxianli1.cn?groupid=bd901135e6b1fe631dd7e40e506b38d4';

  const zoomContent = () => {
    if (!iframeRef.current) return;
    const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
    const iframeStyles = (
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
    iframeDoc?.head.insertAdjacentElement('beforeend', iframeStyles as unknown as Element);
  };

  return (
    <div className={styles.iframeContainer}>
      <iframe
        src={init.customerUrl || defaultCSUrl}
        onLoad={() => zoomContent()}
        className={styles.iframe}
        title='Customer Service'
      />
    </div>
  );
};

export default Iframe;
