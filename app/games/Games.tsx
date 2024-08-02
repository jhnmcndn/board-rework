'use client';

import { FC, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import BackButton from './components/BackButton';

type Props = {
  gameUrl: string;
};

const Games: FC<Props> = ({ gameUrl }) => {
  let lowZIndexTimer: NodeJS.Timeout;

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
      <BackButton />
      <iframe
        className='thirdPartGameIframe'
        title='Game'
        src={gameUrl}
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
