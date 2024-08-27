import {
  browserName,
  browserVersion,
  isBrowser,
  isMobile,
  mobileModel,
  mobileVendor,
  osName,
  osVersion,
} from 'react-device-detect';

export const getDeviceInfo = () => {
  if (isMobile) {
    return `${osName} ${osVersion} ${mobileVendor} ${mobileModel}`;
  } else if (isBrowser) {
    return `${osName} ${osVersion} ${browserName} ${browserVersion}`;
  }
  return null;
};

export const isHuaweiBrowser = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return userAgent.includes('huaweibrowser');
};

export const copyToClipboard = (text: string) => window.navigator.clipboard.writeText(text);

export const MODAL_BG_ANIMATION = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
};

export const MODAL_CONTENT_ANIMATION = {
  hidden: {
    scale: 0.9,
  },
  visible: {
    scale: 1,
    transition: {
      duration: 0.3,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export const getFromLocalStorage = (key: string, defaultValue: any = '') => {
  if (typeof localStorage === 'undefined') return defaultValue;
  else return localStorage.getItem(key) || defaultValue;
};

export const setToLocalStorage = (key: string, value: string) => {
  if (typeof localStorage === 'undefined') return;
  else return localStorage.setItem(key, value);
};

export const getDeviceId = () => {
  let deviceId = getFromLocalStorage('deviceId');
  if (!deviceId) {
    var d = new Date().getTime();
    deviceId = 'xxxxxxyxxyxxxyy'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 15) % 15 | 0;
      d = Math.floor(d / 15);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(15);
    });
    setToLocalStorage('deviceId', deviceId);
  }
  return deviceId;
};

export const moneyFormat = (money: number) => {
  const roundedNumber = Math.floor(money);
  const formatter = Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(roundedNumber);
};
