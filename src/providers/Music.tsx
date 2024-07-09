import backgroundMusic from '@/assets/music/music.mp3';
import popSound from '@/assets/music/pop.mp3';
import { useMusicStore } from '@/store/music';
import { Howl } from 'howler';
import { useEffect } from 'react';

const Music = () => {
  const musicPlayState = useMusicStore((state) => state.playState.music);
  const popPlayState = useMusicStore((state) => state.playState.pop);
  const music = new Howl({
    src: [backgroundMusic],
    loop: true,
  });
  const pop = new Audio(popSound);

  useEffect(() => {
    const playMusic = () => {
      if (!musicPlayState) return music.pause();
      return music.play();
    };
    playMusic();
  }, [musicPlayState]);

  useEffect(() => {
    const playPop = () => {
      if (!popPlayState) return;
      return pop.play();
    };
    playPop();
  }, [popPlayState]);

  return null;
};

export default Music;
