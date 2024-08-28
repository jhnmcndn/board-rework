'use client';

import useModalStore from '@/store/modals';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const GameNotAvailable = () => {
  const openAlert = useModalStore((s) => s.openAlert);
  useEffect(() => {
    openAlert({ body: 'Game is currently unavailable. Please try again later.' });
  }, []);
  return redirect('/');
};

export default GameNotAvailable;
