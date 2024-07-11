import backgroundMusic from '@/assets/music/music.mp3';
import { useAppStore } from '@/store/useAppStore';
import { useEffect, useRef, useState } from 'react';

const Music = () => {
  const isBackgroundMusicOn = useAppStore((state) => state.musicState.music);
  const [didUserInteract, setDidUserInteract] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const shouldPlayMusic = didUserInteract && isBackgroundMusicOn;

  useEffect(() => {
    const bgMusic = audioRef.current;
    const playMusic = () => {
      if (bgMusic) {
        bgMusic.loop = true;
        bgMusic.play();
      }
    };
    const pauseMusic = () => {
      if (!bgMusic) return;
      bgMusic.pause();
    };
    const handleBackgroundMusic = () => {
      if (document.visibilityState === 'visible' && shouldPlayMusic) {
        playMusic();
      } else {
        pauseMusic();
      }
    };
    handleBackgroundMusic();
    const handleUserInteract = () => setDidUserInteract(true);
    addEventListener('click', handleUserInteract);
    document.addEventListener('visibilitychange', handleUserInteract);
    return () => {
      removeEventListener('click', handleUserInteract);
      document.removeEventListener('visibilitychange', handleUserInteract);
    };
  }, [isBackgroundMusicOn, didUserInteract]);

  return <audio ref={audioRef} src={backgroundMusic} />;
};

export default Music;
