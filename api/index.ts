import { serverConfig } from '@/server';
import { API_ENDPOINT, APP_ROUTE } from '@/types/enums';
import { cookies } from 'next/headers';

const headers = {
  dev: '2',
  agent: serverConfig.agent,
  version: process.env.APP_VERSION,
  'Content-Type': 'application/json;charset=UTF-8',
} satisfies HeadersInit;

export type RequestParams = {
  route: APP_ROUTE;
  endpoint: API_ENDPOINT;
  body?: unknown;
};

export const request = async <T>({ route, endpoint, body }: RequestParams): Promise<T> => {
  const domain = serverConfig.domain;
  const method = 'POST';
  const response = await fetch(`${domain}${route}${endpoint}`, {
    headers,
    method,
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};
