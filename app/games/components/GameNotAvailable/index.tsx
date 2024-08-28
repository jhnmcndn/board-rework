'use client';

import useModalStore from '@/store/modals';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const GameNotAvailable = () => {
  const openAlert = useModalStore((s) => s.openAlert);
  useEffect(() => {
    openAlert('游戏当前不可用，请稍后再试.');
  }, []);
  return redirect('/');
};

export default GameNotAvailable;
