import type { FC } from 'react';

export type AuthComponent = FC<Readonly<{ component: () => JSX.Element }>>;
