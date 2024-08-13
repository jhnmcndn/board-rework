'use client';

import { sfx } from '@/utils/audioFile';
import { useEffect, useRef, useState } from 'react';

const ClickSound = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioSrc, setAudioSrc] = useState(sfx.popAudio);

  useEffect(() => {
    const addClickListeners = () => {
      const elements = document.querySelectorAll('[data-click]');
      elements.forEach((element) => {
        element.addEventListener('click', handleClickSound);
      });
    };

    addClickListeners();

    return () => {
      const elements = document.querySelectorAll('[data-click]');
      elements.forEach((element) => {
        element.removeEventListener('click', handleClickSound);
      });
    };
  }, [audioSrc]);

  const handleClickSound = (event: Event) => {
    const target = event.target as HTMLElement;
    if (audioRef.current) {
      const soundSource = (target.getAttribute('data-click') || sfx.popAudio) as string;
      setAudioSrc(soundSource);
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return <audio ref={audioRef} className='sfx' src={audioSrc} />;
};

export default ClickSound;
