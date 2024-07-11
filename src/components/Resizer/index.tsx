import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';

const Resizer = ({ children }) => {
  const [orientation, setOrientation] = useState(window.innerWidth > window.innerHeight ? '' : 'portrait');

  const handleOrientationChange = () => {
    setOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
  };

  useEffect(() => {
    window.addEventListener('resize', handleOrientationChange);
    return () => {
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  return <div className={classNames(styles.content, `${orientation}`)}>{children}</div>;
};

export default Resizer;

// import { useLocation } from '@tanstack/react-router';
// import { useEffect } from 'react';
// import { isMobile } from 'react-device-detect';
//
// const Resizer = () => {
//   const location = useLocation();
//   const handleAppSize = () => {
//     const root = document.getElementById('root') as HTMLDivElement;
//     if (!location.pathname.includes('game') && !location.pathname.includes('webView')) {
//       if (isMobile) {
//         root.style.width = window.innerHeight + 'px';
//         root.style.height = window.innerWidth + 'px';
//         root.style.transform = 'rotate(90deg)';
//       } else {
//         root.style.width = window.innerWidth + 'px';
//         root.style.height = window.innerHeight + 'px';
//         root.style.transform = 'rotate(0deg)';
//       }
//     }
//   };
//   useEffect(() => {
//     window.addEventListener('resize', handleAppSize);
//     window.addEventListener('orientationchange', handleAppSize);
//     window.addEventListener('pageshow', handleAppSize);
//     document.addEventListener('visibilitychange', handleAppSize);
//     return () => {
//       window.removeEventListener('resize', handleAppSize);
//       window.removeEventListener('orientationchange', handleAppSize);
//       window.removeEventListener('pageshow', handleAppSize);
//       document.removeEventListener('visibilitychange', handleAppSize);
//     };
//   }, []);
//   return null;
// };
//
// export default Resizer;
