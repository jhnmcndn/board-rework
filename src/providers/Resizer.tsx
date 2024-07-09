import { useEffect } from 'react';

const Resizer = () => {
  const root = document.getElementById('root') as HTMLDivElement;
  const orientation = screen.orientation.type;
  const rootWidth = root.clientWidth;
  const rootHeight = root.clientHeight;
  const isPortrait = rootWidth < rootHeight;

  useEffect(() => {
    const handleResize = () => {
      if (orientation.includes('landscape')) {
        console.log(isPortrait);
      }
    };
    addEventListener('resize', () => handleResize);
  }, []);

  return null;
};

export default Resizer;
