import type { FC, ReactNode } from 'react';

export type AuthComponent = FC<Readonly<{ component: () => JSX.Element }>>;

export type ResizerComponent = FC<Readonly<{ children: ReactNode }>>;

export type CoinPurseProps = {
  position: any;
  accountNow: string | number;
  top: number;
  left: string;
  iColor?: string;
  betLog?: boolean;
  inputBg?: string;
  noShuffle?: boolean;
};

export type CoinPurseComponent = FC<Readonly<CoinPurseProps>>;
