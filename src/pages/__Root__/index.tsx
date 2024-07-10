import Music from '@/components/Music';
import Title from '@/components/Title';
import { Outlet } from '@tanstack/react-router';
import * as React from 'react';

const Root = () => {
  return (
    <React.Fragment>
      <Title />
      <Music />
      <Outlet />
    </React.Fragment>
  );
};

export default Root;
