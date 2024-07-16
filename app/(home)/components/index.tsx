'use client';

import { useStore } from '@/components/providers/StoreProvider';
import { Header } from '@/app/(home)/components/header';
import { FC, useEffect } from 'react';
import { ErrorData, Init, RootResponse } from '@/types/app';
import { initState } from '@/store';

export type HomePageComponent = FC<
  Readonly<{
    init?: Init | ErrorData;
    // messageHomeNoticesData: Pick<RootResponse<MessageHomeNotice[]>, 'data' | 'otherData'>;
  }>
>;

export const HomePage: HomePageComponent = ({ init }) => {
  const theme = useStore((state) => state.theme);
  const setInit = useStore((state) => state.setInit);

  useEffect(() => {
    if (init && !('message' in init)) {
      setInit(init || initState);
    }
  }, [init]);

  return (
    <div className='mainColor' data-theme={theme}>
      <Header />
      {/* <Main /> */}
      {/* <Footer /> */}
    </div>
  );
};
