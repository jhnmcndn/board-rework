import giftAudioFile from '@/assets/music/gift.mp3';
import popAudioFile from '@/assets/music/pop.mp3';

export const isLoggedIn = () => {
  return !!localStorage.getItem('loggedIn');
};

/** Sound utils */
export const onClickSound = (type: 'pop' | 'gift') => {
  if (type === 'pop') {
    const popAudio = new Audio(popAudioFile);
    return popAudio.play();
  }

  const giftAudio = new Audio(giftAudioFile);
  return giftAudio.play();
};
