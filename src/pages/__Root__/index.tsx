import { Music, Resizer, Title } from '@/providers';
import { Outlet } from '@tanstack/react-router';

const Root = () => {
  return (
    <>
      <Title />
      <Music />
      <Resizer />
      <Outlet />
    </>
  );
};

export default Root;
