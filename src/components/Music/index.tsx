import backgroundMusic from '@/assets/music/music.mp3';
import { useMusicStore } from '@/store/music';
import * as React from 'react';

const Music = () => {
  const isBackgroundMusicOn = useMusicStore((state) => state.playState.music);
  const [didUserInteract, setDidUserInteract] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const shouldPlayMusic = didUserInteract && isBackgroundMusicOn;

  React.useEffect(() => {
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
