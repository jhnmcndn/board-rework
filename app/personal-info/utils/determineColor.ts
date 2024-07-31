export const determineColor = (color: 'blue' | 'orange' | 'pink') => {
  switch (color) {
    case 'blue':
      return 'linear-gradient(to bottom, #76C6DD, #00AC90)';
    case 'orange':
      return 'linear-gradient(to bottom, #F7C697, #DE7900)';
    default:
      return 'linear-gradient(to bottom, #F49E97,#FA6653)';
  }
};
