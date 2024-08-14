'use server';

import { serverConfig } from '@/server';
import { cookies } from 'next/headers';

export const headers = async () =>
  ({
    dev: '2',
    agent: serverConfig.agent,
    version: process.env.NEXT_PUBLIC_APP_VERSION,
    'Content-Type': 'application/json;charset=UTF-8',
    token: cookies().get('token')?.value || '',
  }) satisfies HeadersInit;
