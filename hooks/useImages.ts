import calendar_image from '@/assets/blackGold/header/calendar.png';
import coin_icon from '@/assets/blackGold/header/coin.png';
import avatar_placeholder from '@/assets/blackGold/header/defaultIcon.png';
import header_logo from '@/assets/blackGold/header/headerLogo.png';
import promote_image from '@/assets/blackGold/header/promote.png';
import task_image from '@/assets/blackGold/header/task.png';
import guest_login_btn from '@/assets/blackGold/loginModal/guestLoginBtn.png';
import guest_notice_btn from '@/assets/blackGold/loginModal/guestNoticeBtn.png';
import login_close from '@/assets/blackGold/loginModal/loginClose.png';
import login_register_btn from '@/assets/blackGold/loginModal/loginRegisterBtn.png';
import black_gold_title from '@/assets/blackGold/sidebar/sidebarTitle.png';
import fallback_icon from '@/assets/commons/fallBacks/onErrorImg.png';
import loading_icon from '@/assets/commons/fallBacks/squareLoad2.gif';
import login_btn from '@/assets/commons/loginBtn.png';
import vip_badge from '@/assets/commons/vipBadge.png';
import vip_adv_jackpot from '@/assets/commons/vipImages/advancementJackpot.png';
import vip_gift from '@/assets/commons/vipImages/gift.png';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';

export default function useImages() {
  const theme = useAccountStore((state) => state.theme);
  const accountInfo = useAccountStore((state) => state.accountInfo);
  const vipLevel = accountInfo.vip || 1;
  const nextVipLevel = vipLevel === 50 ? 50 : vipLevel + 1;

  const images = {
    avatar_placeholder,
    black_gold_title,
    calendar_image,
    coin_icon,
    fallback_icon,
    guest_login_btn,
    guest_notice_btn,
    header_logo,
    loading_icon,
    login_btn,
    login_close,
    login_register_btn,
    promote_image,
    task_image,
    arrow_down: require(`@/assets/${theme}/fragments/arrowDown.png`),
    audio_icon: require(`@/assets/${theme}/main/audioIcon.png`),
    back_btn: require(`@/assets/${theme}/header/backBtn.png`),
    close_btn: require(`@/assets/${theme}/withdraw/closeBtnModal.png`),
    card_game_back: require(`@/assets/${theme}/main/cardGameBack.png`),
    copy_icon: require(`@/assets/${theme}/header/copy.png`),
    divider: require(`@/assets/${theme}/sidebar/divider.png`),
    envelope_icon: require(`@/assets/${theme}/fragments/envelope.png`),
    history_record: require(`@/assets/${theme}/header/historyRecord.png`),
    megaphone_icon: require(`@/assets/${theme}/footer/megaphone.png`),
    no_data: require(`@/assets/${theme}/noData/noData.png`),
    reload_image: require(`@/assets/${theme}/header/reload.png`),
    user_icon: require(`@/assets/${theme}/footer/user.png`),
    vault_icon: require(`@/assets/${theme}/footer/vault.png`),
    withdraw_success: require(`@/assets/${theme}/withdraw/withdrawSuccessModal.png`),
    search_icon: require(`@/assets/blackGold/main/searchIcon.png`),
    search_clear: require(`@/assets/blackGold/main/searchClear.png`),
    settings_icon: require(`@/assets/${theme}/header/setting.png`),
    // Footer
    support_icon: require(`@/assets/${theme}/footer/iconSupport.png`),
    chip_icon: require(`@/assets/${theme}/footer/iconChip.png`),
    gift_icon: require(`@/assets/${theme}/footer/iconGift.png`),
    message_icon: require(`@/assets/${theme}/footer/iconMessage.png`),
    more_icon: require(`@/assets/${theme}/footer/iconMore.png`),
    // VIP
    vip_adv_jackpot,
    vip_badge,
    vip_gift,
    vip_level: require(`@/assets/commons/vipLevels/vip${vipLevel}.png`),
    vip_next_level: require(`@/assets/commons/vipLevels/vip${nextVipLevel}.png`),
  };

  return { images };
}
