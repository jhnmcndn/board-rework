'use client';

import { useEffect } from 'react';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';

const ThemeProvider = () => {
  const theme = useAccountStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return null;
};

export default ThemeProvider;
