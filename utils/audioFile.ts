import activityAudio from '@/assets/music/activityAudio.mp3';
import baijialefpAudio from '@/assets/music/baijialeAudio.mp3';
import bjlEndBetAudio from '@/assets/music/bjlEndAudio.mp3';
import bjlStartBetAudio from '@/assets/music/bjlStartAudio.mp3';
import customerAudio from '@/assets/music/customerAudio.mp3';
import giftAudio from '@/assets/music/gift.mp3';
import popAudio from '@/assets/music/pop.mp3';

import cleanCodeAudio from '@/assets/music/cleanCodeAudio.mp3';
import kaijiangAudio from '@/assets/music/kaijiangAudio.mp3';
import lotteryAudio from '@/assets/music/lotteryAudio.mp3';
import messageAudio from '@/assets/music/messageAudio.mp3';
import musicAudio from '@/assets/music/music.mp3';
import webviewAudio from '@/assets/music/webviewAudio.mp3';

import promotionAudio from '@/assets/music/promotionAudio.mp3';
import rechargeAudio from '@/assets/music/rechargeAudio.mp3';
import vaultActAudio from '@/assets/music/vaultActAudio.mp3';
import vipAudio from '@/assets/music/vipAudio.mp3';
import withdrawAudio from '@/assets/music/withdrawAudio.mp3';

export type AudioType =
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

export const onClickSound = (type: AudioType) => {
  let audioFile;

  switch (type) {
    case 'pop':
      audioFile = popAudio;
      break;
    case 'gift':
      audioFile = giftAudio;
      break;
    case 'activityPop':
      audioFile = activityAudio;
      break;
    case 'baijialefp':
      audioFile = baijialefpAudio;
      break;
    case 'bjlEndBet':
      audioFile = bjlEndBetAudio;
      break;
    case 'bjlStartBet':
      audioFile = bjlStartBetAudio;
      break;
    case 'cleanCode':
      audioFile = cleanCodeAudio;
      break;
    case 'customer':
      audioFile = customerAudio;
      break;
    case 'kaijiang':
      audioFile = kaijiangAudio;
      break;
    case 'lottery':
      audioFile = lotteryAudio;
      break;
    case 'message':
      audioFile = messageAudio;
      break;
    case 'musicWebviewController':
      audioFile = webviewAudio;
      break;
    case 'music':
      audioFile = musicAudio;
      break;
    case 'promotion':
      audioFile = promotionAudio;
      break;
    case 'recharge':
      audioFile = rechargeAudio;
      break;
    case 'vaultAct':
      audioFile = vaultActAudio;
      break;
    case 'vip':
      audioFile = vipAudio;
      break;
    case 'withdraw':
      audioFile = withdrawAudio;
      break;
    default:
      audioFile = giftAudio;
  }
  const audio = new Audio(audioFile);
  return audio.play();
};
