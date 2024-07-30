import { THEME } from '@/types/enums';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export const getCrownImageByTheme = (theme: THEME): StaticImport => {
  switch (theme) {
    case THEME.DARK_BLUE:
      return require('@/assets/darkBlue/personalInfo/crown.png');
    case THEME.WHITE_GOLD:
      return require('@/assets/whiteGold/personalInfo/crown.png');
    default:
      return require('@/assets/commons/crown.png');
  }
};
