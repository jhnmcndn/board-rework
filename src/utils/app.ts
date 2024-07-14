import giftAudioFile from '@/assets/music/gift.mp3';
import popAudioFile from '@/assets/music/pop.mp3';

export const isLoggedIn = () => !!sessionStorage.getItem('token');

/** Sound */
export const onClickSound = (type: 'pop' | 'gift') => {
  if (type === 'pop') {
    const popAudio = new Audio(popAudioFile);
    return popAudio.play();
  }

  const giftAudio = new Audio(giftAudioFile);
  return giftAudio.play();
};

/** Machine */
export const generateDeviceId = () => {
  const d = new Date().getTime();
  return 'xxxxxxyxxyxxxyy'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 15) % 15 | 0;
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(15);
  });
};
