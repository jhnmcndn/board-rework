import Music from '@/components/Music';
import Resizer from '@/components/Resizer';
import Title from '@/components/Title';
import { Outlet } from '@tanstack/react-router';
import { Fragment } from 'react';

const Root = () => {
  return (
    <Fragment>
      <Title />
      <Resizer />
      <Music />
      <Outlet />
    </Fragment>
  );
};

export default Root;
