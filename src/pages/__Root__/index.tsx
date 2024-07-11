import Music from '@/components/Music';
import Resizer from '@/components/Resizer';
import Title from '@/components/Title';
import { Outlet } from '@tanstack/react-router';

const Root = () => {
  return (
    <Resizer>
      <Title />
      <Music />
      <Outlet />
    </Resizer>
  );
};

export default Root;
