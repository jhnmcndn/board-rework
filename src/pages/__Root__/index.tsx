import Music from '@/components/Music';
import Title from '@/components/Title';
import { Outlet } from '@tanstack/react-router';
import { Fragment } from 'react';

const Root = () => {
  return (
    <Fragment>
      <Title />
      <Music />
      <Outlet />
    </Fragment>
  );
};

export default Root;
