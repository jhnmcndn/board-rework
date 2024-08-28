import calendar from '@/assets/blackGold/header/calendar.png';
import coin from '@/assets/blackGold/header/coin.png';
import avatarPlaceholder from '@/assets/blackGold/header/defaultIcon.png';
import headerLogo from '@/assets/blackGold/header/headerLogo.png';
import promote from '@/assets/blackGold/header/promote.png';
import task from '@/assets/blackGold/header/task.png';
import guestLoginBtn from '@/assets/blackGold/loginModal/guestLoginBtn.png';
import guestNoticeBtn from '@/assets/blackGold/loginModal/guestNoticeBtn.png';
import hidePassword from '@/assets/blackGold/loginModal/hidePassIcon.png';
import loginClose from '@/assets/blackGold/loginModal/loginClose.png';
import loginRegisterBtn from '@/assets/blackGold/loginModal/loginRegisterBtn.png';
import showPassword from '@/assets/blackGold/loginModal/showPassIcon.png';
import supportIcon from '@/assets/blackGold/loginModal/supportIcon.png';
import sidebarTitle from '@/assets/blackGold/sidebar/sidebarTitle.png';
import fallback from '@/assets/commons/fallBacks/onErrorImg.png';
import loading from '@/assets/commons/fallBacks/squareLoad2.gif';
import hasSound from '@/assets/commons/have-sound.png';
import loginBtn from '@/assets/commons/loginBtn.png';
import noSound from '@/assets/commons/no-sound.png';
import vipBadge from '@/assets/commons/vipBadge.png';
import vipAdvJackpot from '@/assets/commons/vipImages/advancementJackpot.png';
import vipGift from '@/assets/commons/vipImages/gift.png';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { serverConfig } from '@/server';

export default function useImages() {
  const theme = useAccountStore((state) => state.theme);
  const accountInfo = useAccountStore((state) => state.accountInfo);
  const vipLevel = accountInfo.vip || 1;
  const nextVipLevel = vipLevel === 50 ? 50 : vipLevel + 1;

  const images = {
    avatarPlaceholder,
    sidebarTitle,
    calendar,
    coin,
    fallback,
    guestLoginBtn,
    guestNoticeBtn,
    headerLogo,
    loading,
    loginBtn,
    loginClose,
    loginRegisterBtn,
    promote,
    task,
    hasSound,
    noSound,
    hidePassword,
    showPassword,
    supportIcon,
    arrowDown: require(`@/assets/${theme}/fragments/arrowDown.png`),
    audio: require(`@/assets/${theme}/main/audioIcon.png`),
    backBtn: require(`@/assets/${theme}/header/backBtn.png`),
    closeBtn: require(`@/assets/${theme}/withdraw/closeBtnModal.png`),
    cardGameBack: require(`@/assets/${theme}/main/cardGameBack.png`),
    copy: require(`@/assets/${theme}/header/copy.png`),
    divider: require(`@/assets/${theme}/sidebar/divider.png`),
    envelope: require(`@/assets/${theme}/fragments/envelope.png`),
    historyRecord: require(`@/assets/${theme}/header/historyRecord.png`),
    megaphone: require(`@/assets/${theme}/footer/megaphone.png`),
    noData: require(`@/assets/${theme}/noData/noData.png`),
    reload: require(`@/assets/${theme}/header/reload.png`),
    user: require(`@/assets/${theme}/footer/user.png`),
    vault: require(`@/assets/${theme}/footer/vault.png`),
    withdrawSuccess: require(`@/assets/${theme}/withdraw/withdrawSuccessModal.png`),
    search: require(`@/assets/blackGold/main/searchIcon.png`),
    searchClear: require(`@/assets/blackGold/main/searchClear.png`),
    settings: require(`@/assets/${theme}/header/setting.png`),
    shareIcon: require(`@/assets/${theme}/header/shareIcon.png`),
    plusSign: require(`@/assets/${theme}/fragments/plusVector.png`),
    arrowSign: require(`@/assets/${theme}/fragments/arrowVector.png`),
    // Footer
    support: require(`@/assets/${theme}/footer/iconSupport.png`),
    chip: require(`@/assets/${theme}/footer/iconChip.png`),
    gift: require(`@/assets/${theme}/footer/iconGift.png`),
    message: require(`@/assets/${theme}/footer/iconMessage.png`),
    more: require(`@/assets/${theme}/footer/iconMore.png`),
    eyeShow: require(`@/assets/${theme}/footer/eyeShow.png`),
    eyeHide: require(`@/assets/${theme}/footer/eyeHide.png`),
    // VIP
    crown: require(`@/assets/${theme}/crown.png`),
    darkBlueCrown: require(`@/assets/darkBlue/crown.png`),
    vipAdvJackpot,
    vipBadge,
    vipGift,
    vipLevel: require(`@/assets/commons/vipLevels/vip${vipLevel}.png`),
    vipNextLevel: require(`@/assets/commons/vipLevels/vip${nextVipLevel}.png`),
    //Announcement
    logoIcon: require(`@/assets/${serverConfig.server}/modal_logo.png`),
    helpIcon: require(`@/assets/${theme}/announcementModal/helpIcon.png`),
    //Promotion
    promoOneIcon: require(`@/assets/commons/icons/promotionIcons/OneIcon.png`),
    promoTwoIcon: require(`@/assets/commons/icons/promotionIcons/TwoIcon.png`),
    promoThreeIcon: require(`@/assets/commons/icons/promotionIcons/ThreeIcon.png`),
    promoFourIcon: require(`@/assets/commons/icons/promotionIcons/FourIcon.png`),
  };

  return { images };
}
