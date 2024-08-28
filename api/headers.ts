'use server';

import { APP_VERSION } from '@/constants/app';
import { serverConfig } from '@/server';
import { cookies } from 'next/headers';

export const headers = async () =>
  ({
    dev: '2',
    agent: serverConfig.agent,
    version: APP_VERSION,
    'Content-Type': 'application/json;charset=UTF-8',
    token: cookies().get(`${serverConfig.domain}-token`)?.value || '',
  }) satisfies HeadersInit;
