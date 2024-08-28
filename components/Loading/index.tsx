'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { memo } from 'react';

const Loading = () => {
  return <ProgressBar height='3px' color='gray' options={{ showSpinner: false }} shallowRouting />;
};

export default memo(Loading);
