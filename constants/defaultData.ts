import { AccountInfo, Init, PayTypeList, RootResponse } from '@/types/app';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  HatenaIcon,
  HatenaShareButton,
  InstapaperIcon,
  InstapaperShareButton,
  LineIcon,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  MailruIcon,
  MailruShareButton,
  OKIcon,
  OKShareButton,
  PocketIcon,
  PocketShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TumblrIcon,
  TumblrShareButton,
  TwitterIcon,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  VKIcon,
  VKShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

export const defaultRootResponse = {
  code: 500,
  data: null,
  hasNext: false,
  msg: '',
  otherData: '',
  total: 0,
} satisfies RootResponse;

export const defaultInitData = {
  actionSwitch: '',
  captchaId: '',
  customerUrl: '',
  customerUrl2: '',
  downUrl: '',
  firstRechargeUrl: '',
  hasNew: false,
  heCai6: {
    blue: [],
    green: [],
    reds: [],
  },
  latestFore: '',
  latestVersion: '',
  productId: '',
  starPic: '',
  updateText: '',
  webUrl: '',
} satisfies Init;

export const defaultAccountInfo = {
  token: undefined,
  id: undefined,
  nickName: undefined,
  vip: 1,
  headImg: undefined,
  accountNow: undefined,
  accountCharge: undefined,
  codeNow: undefined,
  codeWill: undefined,
  codeTotal: 0,
  nextLevelIntegral: 0,
  status: undefined,
  inviterCode: undefined,
  registerType: undefined,
  phone: undefined,
  newAccount: undefined,
} satisfies AccountInfo;

export const shareButtons = [
  { Button: EmailShareButton, Icon: EmailIcon, name: 'Email' },
  { Button: FacebookShareButton, Icon: FacebookIcon, name: 'Facebook' },
  { Button: WhatsappShareButton, Icon: WhatsappIcon, name: 'WhatsApp' },
  { Button: VKShareButton, Icon: VKIcon, name: 'VK' },
  { Button: HatenaShareButton, Icon: HatenaIcon, name: 'Hatena' },
  { Button: LinkedinShareButton, Icon: LinkedinIcon, name: 'LinkedIn' },
  { Button: InstapaperShareButton, Icon: InstapaperIcon, name: 'Instapaper' },
  { Button: LineShareButton, Icon: LineIcon, name: 'Line' },
  { Button: MailruShareButton, Icon: MailruIcon, name: 'Mailru' },
  { Button: OKShareButton, Icon: OKIcon, name: 'OK' },
  { Button: TelegramShareButton, Icon: TelegramIcon, name: 'Telegram' },
  { Button: PocketShareButton, Icon: PocketIcon, name: 'Pocket' },
  { Button: TwitterShareButton, Icon: TwitterIcon, name: 'Twitter' },
  { Button: ViberShareButton, Icon: ViberIcon, name: 'Viber' },
  { Button: RedditShareButton, Icon: RedditIcon, name: 'Reddit' },
  { Button: TumblrShareButton, Icon: TumblrIcon, name: 'Tumblr' },
];

export const defaultPayTypeList = {
  createBy: '',
  createTime: '',
  deviceType: '',
  effect: false,
  iconUrl: '',
  id: 0,
  name: '',
  openLevelMax: 0,
  openLevelMin: 0,
  recommend: false,
  sort: 0,
  tex1: '',
  tex2: '',
  tex3: '',
  tex4: '',
  tex5: '',
  type: 0,
  updateBy: '',
  updateTime: '',
} satisfies PayTypeList;
