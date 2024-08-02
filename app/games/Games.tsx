'use client';

import { usePathname } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

type Props = {
  gameId: string;
};

const Games: FC<Props> = ({ gameId }) => {
  const pathname = usePathname();
  const [data, setData] = useState<string | undefined>();
  const [isDraggableTouched, setIsDraggableTouched] = useState(false);
  const inThirdPartyGamePage = pathname.includes('Games');

  let lowZIndexTimer: NodeJS.Timeout;

  const draggableTouched = () => {
    setIsDraggableTouched(true);
  };

  const draggableUntouched = () => {
    lowZIndexTimer = setTimeout(() => {
      setIsDraggableTouched(false);
      clearTimeout(lowZIndexTimer);
    }, 2000);
  };

  useEffect(() => {
    thirdGameAppSize();
    window.addEventListener('orientationchange', () => {
      thirdGameAppSize();
    });

    return () => {
      const rootElement = document.getElementById('root');

      if (isMobile && rootElement) {
        setAppSize();
        rootElement.style.transform = window.orientation === 0 ? 'rotate(90deg)' : 'rotate(0deg)';
        window.removeEventListener('orientationchange', thirdGameAppSize);
        clearTimeout(lowZIndexTimer);
      }
    };
  }, []);

  useEffect(() => {
    if (gameId && typeof gameId === 'string') {
      setData(gameId);
    }
  }, []);

  const thirdGameAppSize = () => {
    const rootElement = document.getElementById('root');

    if (rootElement) {
      rootElement.style.height = 100 + '%';
      rootElement.style.width = 100 + '%';
      rootElement.style.transform = 'rotate(0deg)';
    }
  };

  const setAppSize = () => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.style.height = (window.orientation === 0 ? window.innerWidth : window.innerHeight) + 'px';
      rootElement.style.width = (window.orientation === 0 ? window.innerHeight : window.innerWidth) + 'px';
    }
  };

  return (
    <div
      className='thirdPartGameIframeContainer'
      style={{
        color: 'white',
        // width: "100%",
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <iframe
        className='thirdPartGameIframe'
        title='Game'
        src={data}
        style={{
          position: 'absolute',
          zIndex: '1',
          // zIndex: inThirdPartyGamePage
          //   ? isDraggableTouched
          //     ? '-10'
          //     : '1'
          //   : showQuitDialog && !isMacOs && !isWindows && isIOS
          //     ? '-1'
          //     : '1',
        }}
      />
    </div>
  );
};

export default Games;
