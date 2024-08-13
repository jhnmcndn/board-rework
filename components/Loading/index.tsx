'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const Loading = () => {
  return <ProgressBar height='3px' color='gray' options={{ showSpinner: false }} shallowRouting />;
};

export default Loading;
