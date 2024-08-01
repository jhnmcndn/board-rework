'use client';

import { joinGame } from '@/api/game';
import useAuthCheck from '@/hooks/useAuthCheck';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

const Games = () => {
  const router = useRouter();
  const [data, setdata] = useState<string | undefined>();
  const [isDraggableTouched, setIsDraggableTouched] = useState(false);
  const pathname = usePathname();
  const inThirdPartyGamePage = pathname.includes('Games');
  const { isLoggedIn } = useAuthCheck();

  if (!isLoggedIn) {
    router.push('/');
  }

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
    fetchGame();
  }, []);

  const fetchGame = async () => {
    const id = sessionStorage.getItem('id');
    const game = await joinGame(id || '');
    if (game && typeof game === 'string') {
      setdata(game || '');
    }
  };

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
