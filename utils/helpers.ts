import { isMobile, osName, osVersion, mobileVendor, mobileModel, isBrowser, browserName, browserVersion } from "react-device-detect";

export const getDeviceInfo = () => {
  if (isMobile) {
    return `${osName} ${osVersion} ${mobileVendor} ${mobileModel}`;
  } else if (isBrowser) {
    return `${osName} ${osVersion} ${browserName} ${browserVersion}`;
  }
  return null;
};

export const copyToClipboard = (text: string) => window.navigator.clipboard.writeText(text);