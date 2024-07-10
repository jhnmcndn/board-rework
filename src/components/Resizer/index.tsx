import { useLocation } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { isIOS, isMacOs, isMobile, isWindows } from 'react-device-detect';

const Resizer = () => {
  const orientation = screen.orientation.type;
  const [shouldRotate, setShouldRotate] = useState(orientation.includes('portrait'));
  const location = useLocation();
  const setAppSize = () => {
    if (!location.pathname.includes('game') && !location.pathname.includes('webView')) {
      const root = document.getElementById('root') as HTMLDivElement;
      if (isMobile) {
        root.style.height =
          (orientation.includes('portrait') ? window.innerWidth : window.innerHeight) + 'px';
        root.style.width = (orientation.includes('portrait') ? window.innerHeight : window.innerWidth) + 'px';
        root.style.transform = orientation.includes('portrait') ? 'rotate(90deg)' : 'rotate(0deg)';
      }
    }
  };
  useEffect(() => {
    window.addEventListener('orientationchange', () => {
      setAppSize();
      if (shouldRotate) return setShouldRotate(true);
      return false;
    });
  }, [shouldRotate]);
  useEffect(() => {
    if (!isWindows && !isMacOs && isIOS) {
      document.addEventListener('touchmove', () => {
        // if (e.scale)
      });
    }
  }, []);
  return null;
};

export default Resizer;
