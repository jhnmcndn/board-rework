import activityAudioFile from '@/assets/music/activityPopup.mp3';
import baijialefpAudioFile from '@/assets/music/baijialefp.mp3';
import bjlEndBetAudioFile from '@/assets/music/bjlEndBet.mp3';
import bjlStartBetAudioFile from '@/assets/music/bjlStartBet.mp3';
import customerAudioFile from '@/assets/music/customer.mp3';
import giftAudioFile from '@/assets/music/gift.mp3';
import popAudioFile from '@/assets/music/pop.mp3';

import cleanCodeAudioFile from '@/assets/music/cleanCode.mp3';
import kaijiangAudioFile from '@/assets/music/kaijiang.mp3';
import lotteryAudioFile from '@/assets/music/lottery.mp3';
import messageAudioFile from '@/assets/music/message.mp3';
import musicAudioFile from '@/assets/music/music.mp3';
import musicWebviewControllerAudioFile from '@/assets/music/musicWebviewController.mp3';
import onClickPopAudioFile from '@/assets/music/onClickPop.mp3';

import promotionAudioFile from '@/assets/music/promotion.mp3';
import rechargeAudioFile from '@/assets/music/recharge.mp3';
import vaultActAudioFile from '@/assets/music/vaultAct.mp3';
import vipAudioFile from '@/assets/music/vip.mp3';
import withdrawAudioFile from '@/assets/music/withdraw.mp3';

type AudioType =
  | 'pop'
  | 'gift'
  | 'activityPop'
  | 'baijialefp'
  | 'bjlEndBet'
  | 'bjlStartBet'
  | 'cleanCode'
  | 'customer'
  | 'kaijiang'
  | 'lottery'
  | 'message'
  | 'musicWebviewController'
  | 'music'
  | 'onClickPop'
  | 'promotion'
  | 'recharge'
  | 'vaultAct'
  | 'vip'
  | 'withdraw';

export const isLoggedIn = () => !!sessionStorage.getItem('token');

/** Sound */
export const onClickSound = (type: AudioType) => {
  let audioFile;

  switch (type) {
    case 'pop':
      audioFile = popAudioFile;
      break;
    case 'gift':
      audioFile = giftAudioFile;
      break;
    case 'activityPop':
      audioFile = activityAudioFile;
      break;
    case 'baijialefp':
      audioFile = baijialefpAudioFile;
      break;
    case 'bjlEndBet':
      audioFile = bjlEndBetAudioFile;
      break;
    case 'bjlStartBet':
      audioFile = bjlStartBetAudioFile;
      break;
    case 'cleanCode':
      audioFile = cleanCodeAudioFile;
      break;
    case 'customer':
      audioFile = customerAudioFile;
      break;
    case 'kaijiang':
      audioFile = kaijiangAudioFile;
      break;
    case 'lottery':
      audioFile = lotteryAudioFile;
      break;
    case 'message':
      audioFile = messageAudioFile;
      break;
    case 'musicWebviewController':
      audioFile = musicWebviewControllerAudioFile;
      break;
    case 'music':
      audioFile = musicAudioFile;
      break;
    case 'onClickPop':
      audioFile = onClickPopAudioFile;
      break;
    case 'promotion':
      audioFile = promotionAudioFile;
      break;
    case 'recharge':
      audioFile = rechargeAudioFile;
      break;
    case 'vaultAct':
      audioFile = vaultActAudioFile;
      break;
    case 'vip':
      audioFile = vipAudioFile;
      break;
    case 'withdraw':
      audioFile = withdrawAudioFile;
      break;
    default:
      audioFile = giftAudioFile;
  }

  const audio = new Audio(audioFile);
  return audio.play();
};

/** Machine */
export const generateDeviceId = () => {
  const d = new Date().getTime();
  return 'xxxxxxyxxyxxxyy'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 15) % 15 | 0;
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(15);
  });
};
